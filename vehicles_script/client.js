let createdVehicles = []

const isNetwork = true
const netMissionEntity = true
const seatIndex = -1

const successColor = [23, 171, 0]
const errorColor = [210, 0, 0]

const getPlayerPedId = () => {
    const playerPedId = PlayerPedId()

    return {
        playerPedId,
    }
}

const getVehicleNameFromArgs = (args) => {
    const firstIndexOfArgs = 0

    const vehicleName = args.at(firstIndexOfArgs)

    return {
        vehicleName,
    }
}

const validateVehicleDataFromArgs = ({ vehicleName }) => {
    if (!vehicleName) {
        const message = 'É necessário escolher um veículo!'
        throw new AppError(message)
    }
}

const getVehicleHashFromName = (vehicle) => {
    const vehicleHash = GetHashKey(vehicle)

    return {
        vehicleHash,
    }
}

const processVehicleDataFromArgs = (args) => {
    const { vehicleName } = getVehicleNameFromArgs(args)

    validateVehicleDataFromArgs({ vehicleName })

    const { vehicleHash } = getVehicleHashFromName(vehicleName)

    return {
        vehicleName,
        vehicleHash,
    }
}

const getPlayerPedData = () => {
    const { playerPedId } = getPlayerPedId()
    const { pedHeading } = getPlayerHeading(playerPedId)
    const [coordX, coordY, coordZ] = GetEntityCoords(playerPedId)

    const playerPedCoords = {
        coordX,
        coordY,
        coordZ,
    }

    return {
        playerPedId,
        pedHeading,
        playerPedCoords,
    }
}

const checkPlayerInVehicle = (playerPedId) => {
    const playerInVehicle = !!GetVehiclePedIsIn(playerPedId, false)

    return {
        playerInVehicle,
    }
}

const removeCurrentPlayerVehicle = () => {
    const { playerPedId } = getPlayerPedId()
    const currentVehicle = GetVehiclePedIsIn(playerPedId, false)

    const currentVehicleIndexInCreatedVehicles = createdVehicles.indexOf(currentVehicle)
    const isVehicleInList = currentVehicleIndexInCreatedVehicles !== -1

    isVehicleInList && createdVehicles.splice(currentVehicleIndexInCreatedVehicles, 1)

    SetEntityAsMissionEntity(currentVehicle, true, true)
    DeleteVehicle(currentVehicle)
}

const deleteVehicle = (vehicle) => {
    SetEntityAsMissionEntity(vehicle, true, true)
    DeleteVehicle(vehicle)

    const vehicleIndexInCreatedVehicles = createdVehicles.indexOf(vehicle)
    const isVehicleInList = vehicleIndexInCreatedVehicles !== -1

    isVehicleInList && createdVehicles.splice(vehicleIndexInCreatedVehicles, 1)
}

const checkAndHandleVehicleList = () => {
    const isVehicleListFull = createdVehicles.length >= 5
    const firstVehicleInList = createdVehicles[0];

    if (isVehicleListFull) {
        return deleteVehicle(firstVehicleInList)
    }
}

const checkPlayerAndHandleVehicle = (playerPedId) => {
    const { playerInVehicle } = checkPlayerInVehicle(playerPedId);

    if (playerInVehicle) {
        removeCurrentPlayerVehicle();
    }

    checkAndHandleVehicleList();
}

const getPlayerHeading = (playerPedId) => {
    const pedHeading = GetEntityHeading(playerPedId)

    return {
        pedHeading,
    }
}

const createVehicle = ({ vehicleHash, coordX, coordY, coordZ, pedHeading }) => {
    const newVehicle = CreateVehicle(vehicleHash, coordX, coordY, coordZ, pedHeading, isNetwork, netMissionEntity)

    createdVehicles.push(newVehicle)

    return {
        newVehicle,
    }
}

const seatPlayerInVehicle = ({ playerPedId, newVehicle, seatIndex }) => {
    SetPedIntoVehicle(playerPedId, newVehicle, seatIndex)
}

const releaseModelAndVehicle = ({ newVehicle, vehicleHash }) => {
    SetVehicleAsNoLongerNeeded(newVehicle)
    SetModelAsNoLongerNeeded(vehicleHash)
}

const emitMessage = ({ message, type }) => {
    const color = type === 'success' ? successColor : errorColor

    return emit('chat:addMessage', {
        args: [message],
        color,
        multiline: true,
    })
}

const handleSuccessCallback = () => {
    const message = 'Veículo obtido com sucesso!'
    const type = 'success'

    return emitMessage({
        message,
        type,
    })
}

const handleErrorCallback = (error) => {
    const message = error.message
    const type = 'error'

    return emitMessage({
        message,
        type,
    })
}

const grantVehicleToPlayer = async (_, args) => {
    try {
        const { playerPedId, pedHeading, playerPedCoords } = getPlayerPedData()
        const { coordX, coordY, coordZ } = playerPedCoords

        const { vehicleHash } = processVehicleDataFromArgs(args)

        await loadVehicleModel(vehicleHash)

        checkPlayerAndHandleVehicle(playerPedId)

        const { newVehicle } = createVehicle({ vehicleHash, coordX, coordY, coordZ, pedHeading })

        seatPlayerInVehicle({ playerPedId, newVehicle, seatIndex })
        releaseModelAndVehicle({ newVehicle, vehicleHash })

        handleSuccessCallback()
    } catch (error) {
        handleErrorCallback(error)
    }
}

RegisterCommand('carro', grantVehicleToPlayer) // /carro <nome_do_carro>