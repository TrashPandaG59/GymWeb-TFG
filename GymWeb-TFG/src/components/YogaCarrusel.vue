<template>
  <div class="entrenadores-carrusel">
    <h2>Nuestras próximas clases de yoga</h2>
    <p class="intro">
      En Zanshin Salud y Bienestar estamos trabajando para ofrecer una variedad de clases de yoga para todos los niveles. Conecta cuerpo y mente a través de nuestras sesiones guiadas por instructores expertos.
    </p>

    <div class="entrenador">
      <img :src="clases[actual].imagen" :alt="clases[actual].nombre" />
      <h3>{{ clases[actual].nombre }}</h3>
      <p><strong>Nivel:</strong> {{ clases[actual].nivel }}</p>
      <p>{{ clases[actual].descripcion }}</p>
    </div>

    <div class="controles">
      <button @click="anterior">←</button>
      <button @click="siguiente">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../assets/ComponentStyles/EntrenadoresCarrusel.css'
import vinyasa from '../assets/img/yoga1.jpg'
import hatha from '../assets/img/yoga2.jpg'
import ashtanga from '../assets/img/yoga3.webp'

const clases = [
  {
    nombre: 'Vinyasa Flow',
    imagen: vinyasa,
    nivel: 'Intermedio',
    descripcion: 'Una clase dinámica que conecta movimiento y respiración. Ideal para mejorar la fuerza, flexibilidad y concentración.'
  },
  {
    nombre: 'Yoga de Invierno',
    imagen: hatha,
    nivel: 'Principiante',
    descripcion: 'Enfocada en posturas básicas y respiración consciente. Explosivo si se ejecuta de manera correcta. Se realizarán revisiones de mochilas aleatorias'
  },
  {
    nombre: 'Ashtanga Yoga',
    imagen: ashtanga,
    nivel: 'Avanzado',
    descripcion: 'Una práctica intensa con una secuencia fija de posturas. Ideal para quienes buscan disciplina, vigor y evolución física.'
  }
]

const actual = ref(0)
let intervalo = null

function siguiente() {
  actual.value = (actual.value + 1) % clases.length
}

function anterior() {
  actual.value = (actual.value - 1 + clases.length) % clases.length
}

onMounted(() => {
  intervalo = setInterval(siguiente, 5000) // cambia cada 5 segundos
})

onUnmounted(() => {
  clearInterval(intervalo)
})
</script>
