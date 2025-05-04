<template>
    <div class="modal-overlay" @click.self="cerrar">
      <div class="form-box">
        <form class="form" @submit.prevent="loginF">
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
import { buscarUser } from '@/server'
import '../assets/ComponentStyles/LoginModal.css'
import { ref } from 'vue'

const emit = defineEmits(['close'])

const usuario = ref('')
const password = ref('')


function cerrar() {
  emit('close')
}

function loginF() {
  console.log('Usuario:', usuario.value);
  console.log('Password:', password.value);

  // Manejar la promesa con .then()
  buscarUser(usuario.value, password.value)
    .then(resultado => {
      alert(resultado); // Mostrar el resultado en el alert
    })
    .catch(error => {
      console.error('Error en el login:', error);
    });

  cerrar();
}

</script>
