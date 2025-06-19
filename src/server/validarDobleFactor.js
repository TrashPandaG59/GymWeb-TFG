import * as OTPAuth from 'otpauth'

export function validarDobleFactor(secretBase32, userToken) {
    const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromBase32(secretBase32),
        digits: 6,
        period: 30
    })

    const delta = totp.validate({ token: userToken })

    if (delta !== null) {
        console.log('Token correcto')
        return true
    } else {
        console.log('Token incorrecto')
        return false
    }
}

// validarDobleFactor('JHJJWO4JRLZTOC5527I26D4HNKZQT7MK', '275362') // Reemplaza con tu secreto y token de usuario

// import { buscarDobleFactor } from '.'

// console.log('buscarDobleFactor: ', await buscarDobleFactor('pp'))