<template>
  <div>
    <h2>Escanea este código QR con Google Authenticator</h2>
    <img :src="qrCode" v-if="qrCode" alt="QR Code" />
    <p><strong>Secreto:</strong> {{ secret }}</p>

    <input v-model="userToken" placeholder="Introduce código" />
    <button @click="verificarToken">Verificar</button>

    <p v-if="verificado === true">✅ Código correcto</p>
    <p v-else-if="verificado === false">❌ Código incorrecto</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as OTPAuth from 'otpauth'
import QRCode from 'qrcode'
import { guardarDobleFactor } from '@/server'
import { useUsuarioStore } from '@/assets/stores/infoUserTemp'

const secret = ref('')
const qrCode = ref('')
const userToken = ref('')
const verificado = ref(null)

onMounted(async () => {
  const totp = new OTPAuth.TOTP({
    issuer: 'GymWeb-TFG',
    label: 'usuario@gymweb',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
  })

  secret.value = totp.secret.base32
  const otpAuthUrl = totp.toString()
  qrCode.value = await QRCode.toDataURL(otpAuthUrl)
})

function verificarToken () {
  const totp = new OTPAuth.TOTP({
    secret: OTPAuth.Secret.fromBase32(secret.value),
    digits: 6
  })

  const delta = totp.validate({ token: userToken.value })
  verificado.value = delta !== null

  if (verificado.value) {
    const infoUser = useUsuarioStore().darIdentidadUsuario()
    console.log('infoUserinfoUser:', infoUser)
    guardarDobleFactor(infoUser.id, infoUser.roll, secret.value)
  } else {
    console.log('Código incorrecto:', userToken.value)
  }
}
</script>
