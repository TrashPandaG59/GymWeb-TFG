<template>
  <div class="entrenadores-carrusel">
        <h2>Nuestros profesionales</h2>
    <p class="intro">
      En Zanshin Salud y Bienestar contamos con un equipo de entrenadores altamente cualificados que te guiarán en cada paso de tu evolución física y mental. Desde fuerza y funcional hasta disciplinas cuerpo-mente como yoga y pilates.
    </p>
    <div class="entrenador">
      <img :src="entrenadores[actual].imagen" :alt="entrenadores[actual].nombre" />
      <h3>{{ entrenadores[actual].nombre }}</h3>
      <p>{{ entrenadores[actual].descripcion }}</p>
    </div>

    <div class="controles">
      <button @click="anterior">←</button>
      <button @click="siguiente">→</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted  } from 'vue'
import '../assets/ComponentStyles/EntrenadoresCarrusel.css'
import entrenador1 from '../assets/img/entrenador1.png'
import entrenador2 from '../assets/img/entrenadora3.jpg'
import entrenador3 from '../assets/img/entrenador2.jpg'

const entrenadores = [
  {
    nombre: 'Carlos Ramírez',
    imagen: entrenador1,
    descripcion: 'Especialista en fuerza y acondicionamiento físico. 10 años de experiencia diseñando rutinas personalizadas para todos los niveles.'
  },
  {
    nombre: 'Laura Gómez',
    imagen: entrenador2,
    descripcion: 'Instructora de yoga y pilates. Enfocada en el equilibrio mente-cuerpo y en mejorar la flexibilidad, postura y respiración consciente.'
  },
  {
    nombre: 'Amadeo LLadós',
    imagen: entrenador3,
    descripcion: 'Entrenador personal certificado, experto en entrenamiento funcional y preparación física para deportes de resistencia.'
  }
]
const actual = ref(0)
let intervalo = null

function siguiente() {
  actual.value = (actual.value + 1) % entrenadores.length
}

function anterior() {
  actual.value = (actual.value - 1 + entrenadores.length) % entrenadores.length
}

onMounted(() => {
  intervalo = setInterval(siguiente, 5000) // cambia cada 5 segundos
})

onUnmounted(() => {
  clearInterval(intervalo)
})
</script>
