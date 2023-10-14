const successColor = [23, 171, 0]
const errorColor = [210, 0, 0]

const getPlayerPedId = () => {
    const playerPedId = PlayerPedId()

    return {
        playerPedId,
    }
}

const getPlayerOccupiedVehicle = (playerPedId) => {
    const vehicle = GetVehiclePedIsIn(playerPedId, false)

    return {
        vehicle,
    }
}

const fixVehicle = (vehicle) => {
    return SetVehicleFixed(vehicle)
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
    const message = 'Veículo reparado com sucesso!'
    const type = 'success'

    return emitMessage({
        message,
        type,
    })
}

const fixPlayerVehicle = () => {
    const { playerPedId } = getPlayerPedId()
    const { vehicle } = getPlayerOccupiedVehicle(playerPedId)

    fixVehicle(vehicle)

    return handleSuccessCallback()
}

RegisterCommand('fix', fixPlayerVehicle) // /fix