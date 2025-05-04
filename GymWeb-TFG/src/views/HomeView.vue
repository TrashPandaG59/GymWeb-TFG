<template>
  <div class="home">
    <header class="hero">
      <h1>Zanshin Salud y Bienestar</h1>
      <p class="tagline"  id="move">Transforma tu cuerpo, mente y espíritu con nosotros</p>
      <button class="btn-primary" id="move" @click="mostrarModal = true">Iniciar sesión</button>
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
import { ref, onMounted } from 'vue'
import LoginModal from '../components/LoginModal.vue'
import '../assets/ViewStyles/HomeView.css'
import { gsap } from 'gsap' // Importar GSAP
import { Draggable } from 'gsap/Draggable' // Importar Draggable



onMounted(() => {
  // Animación de entrada
  gsap.from('.hero', { duration: 1, opacity: 0, y: -50 });
  gsap.from('.features', { duration: 1, opacity: 0, y: 50, stagger: 0.2 });

  console.log(Draggable); // Esto debería mostrar el objeto Draggable en la consola
  Draggable.create("#move", {
    type: "x,y",
    bounds: "body"
  });
});

const mostrarModal = ref(false)
</script>

<style>
#move {
  position: relative; /* Permite que GSAP manipule las coordenadas */
  cursor: grab; /* Cambia el cursor para indicar que es arrastrable */
}
</style>

