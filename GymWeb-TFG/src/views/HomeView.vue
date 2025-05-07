<template>
  <div class="home">
    <header class="hero">
      <img src="../assets/img/logoZanshin.jpg" alt="Logo Zanshin" class="logo" />
      <h1>Zanshin Salud y Bienestar</h1>
      <p class="tagline">Transforma tu cuerpo, mente y espíritu con nosotros</p>
      <button class="btn-primary" @click="mostrarModal = true">Iniciar sesión</button>
    </header>

    <section class="seccion entrenamiento">
      <div class="contenido">
        <div class="texto">
          <h2>Entrenamiento Moderno</h2>
          <p>Accede a instalaciones de última generación diseñadas para tu comodidad y seguridad.</p>
          <ul>
            <li>Equipamiento de última generación</li>
            <li>Espacios amplios y ventilados</li>
            <li>Planes de entrenamiento personalizados</li>
          </ul>
        </div>
        <img src="../assets/fitness-room.jpg" alt="Sala de fitness moderna" class="imagen-seccion" />
      </div>
    </section>

    <section class="seccion entrenadores">
      <div class="contenido">
        <div class="texto">
          <h2>Entrenadores Profesionales</h2>
          <p>Nuestro equipo está formado por expertos certificados listos para ayudarte a alcanzar tus metas.</p>
          <ul>
            <li>Certificaciones internacionales</li>
            <li>Atención personalizada</li>
            <li>Experiencia en diversas disciplinas</li>
          </ul>
        </div>
        <img src="../assets/trainers.jpg" alt="Entrenadores del gimnasio" class="imagen-seccion" />
      </div>
    </section>

    <section class="seccion clases">
      <div class="contenido">
        <div class="texto">
          <h2>Clases Integrales</h2>
          <p>Ofrecemos una amplia gama de clases diseñadas para todos los niveles y objetivos.</p>
          <ul>
            <li>Yoga, Pilates, HIIT, Spinning</li>
            <li>Horarios flexibles</li>
            <li>Ambiente motivador y de comunidad</li>
          </ul>
        </div>
        <img src="../assets/classes.jpg" alt="Clase de yoga" class="imagen-seccion" />
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

