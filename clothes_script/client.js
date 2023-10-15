const successColor = [23, 171, 0]
const errorColor = [210, 0, 0]

const clothes = {
    cabeca: 0,
    mascara: 1,
    cabelo: 2,
    maos: 3,
    calca: 4,
    bolsa: 5,
    sapatos: 6,
    acessorios: 7,
    camisa: 8,
    colete: 9,
    decalque: 10,
    blusa: 11,
}

const props = {
    chapeu: 0,
    oculos: 1,
    ouvidos: 2,
    relogio: 6,
    pulseiras: 7,
}

const getPlayerPedId = () => {
    const playerPedId = PlayerPedId()

    return {
        playerPedId,
    }
}

const getClothingIdFromArgs = (args) => {
    const firstIndexOfArgs = 0

    const clothingId = args.at(firstIndexOfArgs)

    return {
        clothingId,
    }
}

const getClothingTextureFromArgs = (args) => {
    const secondIndexOfArgs = 1

    const textureId = args.at(secondIndexOfArgs)

    return {
        textureId,
    }
}

const getComponentIdFromClothingType = (clothingType) => {
    const componentId = clothes[clothingType]

    return {
        componentId,
    }
}

const convertStringToNumber = (string) => {
    return Number(string) || 0
}

const validateClothingDataFromArgs = ({ clothingId, textureId }) => {
    if (!clothingId) {
        const message = 'É necessário informar o número do item!'
        throw new AppError(message)
    }

    const clothingIdNumber = convertStringToNumber(clothingId)

    if (clothingIdNumber < 0) {
        const message = 'O número da roupa deve ser maior ou igual a zero!'
        throw new AppError(message)
    }

    const textureIdNumber = convertStringToNumber(textureId)

    if (textureId && textureIdNumber < 0) {
        const message = 'O número da textura deve ser maior ou igual a zero!'
        throw new AppError(message)
    }
}

const processClothingDataFromArgs = (args) => {
    const { clothingId } = getClothingIdFromArgs(args)
    const { textureId } = getClothingTextureFromArgs(args)

    validateClothingDataFromArgs({ clothingId, textureId })

    const clothingIdNumber = convertStringToNumber(clothingId)
    const textureIdNumber = convertStringToNumber(textureId)

    return {
        clothingId: clothingIdNumber,
        textureId: textureIdNumber,
    }
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
    const message = 'Roupa obtida com sucesso!'
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

const setPlayerClothing = (args, clothingType) => {
    try {
        const { playerPedId } = getPlayerPedId()

        const { componentId } = getComponentIdFromClothingType(clothingType)

        const { clothingId, textureId } = processClothingDataFromArgs(args)

        SetPedComponentVariation(playerPedId, componentId, clothingId, textureId, 0)

        handleSuccessCallback()
    } catch (error) {
        handleErrorCallback(error)
    }
}

const getComponentIdFromPropType = (propType) => {
    const componentId = props[propType]

    return {
        componentId,
    }
}

const setPlayerProp = (args, propType) => {
    try {
        const { playerPedId } = getPlayerPedId()

        const { componentId } = getComponentIdFromPropType(propType)

        const { clothingId, textureId } = processClothingDataFromArgs(args)

        SetPedPropIndex(playerPedId, componentId, clothingId, textureId, 0)

        handleSuccessCallback()
    } catch (error) {
        handleErrorCallback(error)
    }
}

for (const clothing in clothes) {
    RegisterCommand(clothing, (_, args) => { // /sapatos 5 || /sapatos 10 2
        return setPlayerClothing(args, clothing)
    })
}

for (const prop in props) {
    RegisterCommand(prop, (_, args) => { // /oculos 5 || /oculos 10 2
        return setPlayerProp(args, prop)
    })
}