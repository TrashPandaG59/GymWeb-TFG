<template>
  <div class="fichar-container">
    <div class="contenido">
      <h1 class="titulo">Fichar</h1>

      <div class="fecha-hora">
        <span class="fecha">{{ fecha }}</span>
        <span class="hora">{{ hora }}</span>
      </div>

      <select v-model="tipoFichaje" class="selector">
        <option value="entrada">Entrada</option>
        <option value="salida">Salida</option>
      </select>

      <button class="btn-fichar" @click="fichar">FICHAR</button>

      <p class="mensaje" v-if="mensaje">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../assets/ComponentStyles/fichaje.css'
const tipoFichaje = ref('entrada')
const fecha = ref('')
const hora = ref('')
const mensaje = ref('')

function actualizarFechaHora() {
  const ahora = new Date()
  fecha.value = ahora.toLocaleDateString()
  hora.value = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function fichar() {
  mensaje.value = `Fichaje de ${tipoFichaje.value.toUpperCase()} registrado`
  setTimeout(() => mensaje.value = '', 3000)
}

onMounted(() => {
  actualizarFechaHora()
  setInterval(actualizarFechaHora, 1000)
})
</script>
