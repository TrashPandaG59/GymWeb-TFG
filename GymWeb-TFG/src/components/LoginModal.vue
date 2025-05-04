<template>
    <div class="modal-overlay" @click.self="cerrar">
      <div class="form-box">
        <form class="form" @submit.prevent="login">
          <span class="title">Iniciar sesión</span>
          <span class="subtitle">Accede a tu cuenta para continuar</span>
  
          <div class="form-container">
            <input class="input" type="text" placeholder="Usuario" v-model="usuario" required />
            <input class="input" type="password" placeholder="Contraseña" v-model="password" required />
          </div>
  
          <button type="submit">Entrar</button>
  
          <div class="form-section">
            ¿No tienes cuenta? <a href="#">Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  </template>
<script setup>
import '../assets/ComponentStyles/LoginModal.css'
import { ref } from 'vue'

const emit = defineEmits(['close'])

const usuario = ref('')
const password = ref('')

function cerrar() {
  emit('close')
}

function login() {
  console.log('Usuario:', usuario.value)
  console.log('Password:', password.value)
  alert('Has iniciado sesión (demo 😄)')
  cerrar()
}
</script>
