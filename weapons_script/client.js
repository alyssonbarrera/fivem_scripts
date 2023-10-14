const defaultAmountWeaponAmmo = 100
const isHidden = false
const bForceInHand = false

const successColor = [23, 171, 0]
const errorColor = [210, 0, 0]

const getWeaponDataFromArgs = (args) => {
    const firstIndexOfArgs = 0
    const secondIndexOfArgs = 1

    const weaponName = args.at(firstIndexOfArgs)
    const amountWeaponAmmo = args.at(secondIndexOfArgs)

    return {
        weaponName,
        amountWeaponAmmo,
    }
}

const getWeaponHashFromName = (weapon) => {
    const weaponName = weapons[weapon]
    const weaponHash = GetHashKey(weaponName)

    return {
        weaponHash,
    }
}

const formatWeaponName = (name) => {
    const formattedWeaponName = name.toLowerCase()

    return {
        formattedWeaponName,
    }
}

const formatWeaponAmmo = (amountWeaponAmmo) => {
    const formattedAmountWeaponAmmo = parseInt(amountWeaponAmmo)

    return {
        formattedAmountWeaponAmmo,
    }
}

const formatWeaponData = ({ weaponName, amountWeaponAmmo }) => {
    const { formattedWeaponName } = formatWeaponName(weaponName)
    const { formattedAmountWeaponAmmo } = formatWeaponAmmo(amountWeaponAmmo)

    return {
        formattedWeaponName,
        formattedAmountWeaponAmmo,
    }
}

const getMessageByType = (type) => {
    const messages = {
        grantWeaponSuccessMessage: `O jogador ganhou uma arma!`,
        grantAllWeaponsSuccessMessage: `O jogador ganhou todas as armas!`,
        notFoundWeapon: `Arma não encontrada!`,
        undefinedArgs: `É necessário escolher uma arma!`,
        invalidAmountWeaponAmmo: `A quantidade de munição deve ser maior que 0!`
    }

    const message = messages[type]

    return {
        message,
    }
}

const validateWeaponDataFromArgs = ({ weaponName, amountWeaponAmmo}) => {
    if (!weaponName) {
        const { message } = getMessageByType('undefinedArgs')
        throw new AppError(message)
    }

    if (amountWeaponAmmo < 0) {
        const { message } = getMessageByType('invalidAmountWeaponAmmo')
        throw new AppError(message)
    }
}

const processWeaponDataFromArgs = (args) => {
    const { weaponName, amountWeaponAmmo } = getWeaponDataFromArgs(args)
  
    validateWeaponDataFromArgs({
        weaponName,
        amountWeaponAmmo,
    })

    const { formattedWeaponName, formattedAmountWeaponAmmo } = formatWeaponData({
        weaponName,
        amountWeaponAmmo,
    })

    const { weaponHash } = getWeaponHashFromName(formattedWeaponName)
  
    if (!weaponHash) {
      const { message } = getMessageByType('notFoundWeapon')
      throw new AppError(message)
    }
  
    return {
        weaponHash,
        amountWeaponAmmo: formattedAmountWeaponAmmo,
    };
}

const emitMessage = (message, color) => {
    return emit('chat:addMessage', {
        args: [message],
        color,
        multiline: true,
    })
}

const handleSuccessCallback = (type) => {
    const messageType = {
        grantWeapon: 'grantWeaponSuccessMessage',
        grantAllWeapons: 'grantAllWeaponsSuccessMessage',
    }[type]

    const { message } = getMessageByType(messageType)

    return emitMessage(message, successColor)
}

const handleErrorCallback = (error) => {
    const message = error.message

    return emitMessage(message, errorColor)
}

const getPlayerPedId = () => {
    const playerPedId = PlayerPedId()

    return {
        playerPedId,
    }
}

const grantWeaponToPlayer = (_, args) => {
    try {
        const { playerPedId } = getPlayerPedId()

        const { weaponHash, amountWeaponAmmo } = processWeaponDataFromArgs(args)

        const ammoCount = amountWeaponAmmo || defaultAmountWeaponAmmo

        GiveWeaponToPed(playerPedId, weaponHash, ammoCount, isHidden, bForceInHand)

        handleSuccessCallback('grantWeapon')
    } catch (error) {
        handleErrorCallback(error)
    }
}

const grantAllWeaponsToPlayer = () => {
    const { playerPedId } = getPlayerPedId()

    for (const weapon in weapons) {
        const { weaponHash } = getWeaponHashFromName(weapon)

        GiveWeaponToPed(playerPedId, weaponHash, defaultAmountWeaponAmmo, isHidden, bForceInHand)
    }

    handleSuccessCallback('grantAllWeapons')
}

RegisterCommand('arma', grantWeaponToPlayer) // /arma <nome_da_arma> || /arma <nome_da_arma> <quantidade_de_munição>
RegisterCommand('armas', grantAllWeaponsToPlayer) // /armas