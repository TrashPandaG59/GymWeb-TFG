<template>
  <div class="home">
    <h1>Bienvenido al Gimnasio Épico 💪</h1>
    <p>¡Prepárate para transformar tu cuerpo y tu mente!</p>
    <button @click="mostrarModal = true">Iniciar sesión</button>

    <LoginModal v-if="mostrarModal" @close="mostrarModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginModal from '../components/LoginModal.vue'
import '../assets/ViewStyles/HomeView.css'


const mostrarModal = ref(false)
</script>
