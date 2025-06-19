<template>
  <div id="app">
    <button
      @click="showIA = !showIA"
      style="position: fixed; top: 16px; left: 16px; z-index: 1000;"
    >
      {{ showIA ? 'Ocultar IA' : 'Mostrar IA' }}
    </button>
    <!-- Contenedor para IA animado debajo del botón -->
    <transition name="fade-slide">
      <div
        v-if="showIA"
        class="ia-container"
        style="position: fixed; top: 56px; left: 16px; z-index: 1000;"
      >
        <IA />
      </div>
    </transition>
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IA from './components/IA.vue';

const showIA = ref(false);
</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.ia-container {
  /* Ajusta el ancho, fondo, sombra, etc. según tu diseño */
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 16px;
  min-width: 300px;
}
</style>
