<template>
  <div class="auth-container">
    <div v-if="!isLinked" class="qr-section">
      <h2>Escanea este código QR</h2>

      <div v-if="qrCodeDataUrl">
        <img :src="qrCodeDataUrl" alt="QR Code" />
      </div>
      <p v-else style="color: gray;">Generando código QR...</p>

      <p>O usa esta clave:</p>
      <code>{{ secret }}</code>
      <button @click="isLinked = true">Ya lo escaneé</button>
    </div>

    <div v-else class="verify-section">
      <h2>Ingresa el código de 6 dígitos</h2>
      <input
        v-model="token"
        maxlength="6"
        placeholder="123456"
        @keydown.enter.prevent="verifyToken"
      />
      <button @click="verifyToken">Verificar</button>
      <p v-if="verified === true" class="success">✅ Código correcto</p>
      <p v-if="verified === false" class="error">❌ Código incorrecto</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';

const secret = ref('');
const qrCodeDataUrl = ref('');
const token = ref('');
const isLinked = ref(false);
const verified = ref(null);
let totp = null;

onMounted(() => {
  // Obtener o generar secreto
  const savedSecret = localStorage.getItem('2fa-secret');
  if (savedSecret) {
    secret.value = savedSecret;
    console.log('[2FA] Secreto cargado de localStorage:', secret.value);
  } else {
    secret.value = generateBrowserSafeSecret();
    localStorage.setItem('2fa-secret', secret.value);
    console.log('[2FA] Secreto generado y guardado:', secret.value);
  }

  // Crear TOTP con OTPAuth
  totp = new OTPAuth.TOTP({
    issuer: 'VueApp 2FA Test',
    label: 'usuario_demo@example.com',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromB32(secret.value),
  });

  // Generar URI y QR
  const otpauthUrl = totp.toString();
  console.log('[2FA] otpauth URI:', otpauthUrl);

  QRCode.toDataURL(otpauthUrl)
    .then(url => {
      qrCodeDataUrl.value = url;
      console.log('[2FA] QR generado correctamente');
    })
    .catch(err => {
      console.error('[2FA] Error generando QR:', err);
    });

  // Código actual para comparar
  const code = totp.generate();
  console.log('[2FA] Código TOTP actual:', code);
});

const verifyToken = () => {
  console.log('[2FA] Código ingresado:', token.value);
  const delta = totp.validate({ token: token.value });
  console.log('[2FA] Resultado de validación (delta):', delta);
  verified.value = delta !== null;
};

function generateBrowserSafeSecret(length = 20) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; // Base32
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-family: Arial, sans-serif;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

img {
  margin: 12px 0;
  width: 200px;
  height: 200px;
}

input {
  padding: 8px;
  width: 160px;
  font-size: 16px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

code {
  display: block;
  margin: 10px auto;
  padding: 6px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
}

.success {
  color: green;
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
