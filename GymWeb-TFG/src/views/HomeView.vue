<template>
  <div class="home">
    <header class="hero">
      <h1>Zanshin Salud y Bienestar</h1>
      <p class="tagline">Transforma tu cuerpo, mente y espíritu con nosotros</p>
      <button class="btn-primary" @click="mostrarModal = true">Iniciar sesión</button>
    </header>

    <section class="features">
      <div class="feature">
        <h3>Entrenadores Profesionales</h3>
        <p>Expertos certificados te acompañan en cada paso de tu camino hacia el bienestar.</p>
      </div>
      <div class="feature">
        <h3>Equipamiento Moderno</h3>
        <p>Accede a instalaciones de última generación diseñadas para tu comodidad y seguridad.</p>
      </div>
      <div class="feature">
        <h3>Clases Integrales</h3>
        <p>Yoga, Pilates, HIIT y más. Opciones para cuerpo y mente en todos los niveles.</p>
      </div>
    </section>

    <LoginModal v-if="mostrarModal" @close="mostrarModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginModal from '../components/LoginModal.vue'
import '../assets/ViewStyles/HomeView.css'

const mostrarModal = ref(false)
</script>


