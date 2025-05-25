<template>
  <div class="perfil-container">
    <div class="perfil-card">
      <h2>{{ usuario.nombre }} {{ usuario.apellidos }}</h2>

      <div class="perfil-info">
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>Teléfono:</strong> {{ usuario.telefono }}</p>
        <p><strong>Fecha de nacimiento:</strong> {{ usuario.fecha_nacimiento }}</p>
        <p><strong>Usuario:</strong> {{ usuario.usuario }}</p>
        <p>
          <strong>Clases por semana:</strong>
          <select v-model="usuario.clases_por_semana" class="select-clases">
            <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
          </select>
        </p>
      </div>

      <button class="btn-editar">Editar perfil</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const usuario = ref({
  nombre: 'María',
  apellidos: 'Pérez López',
  email: 'maria@example.com',
  telefono: '+34 612 345 678',
  fecha_nacimiento: '1990-06-15',
  usuario: 'mariap',
  clases_por_semana: 3
})
</script>

