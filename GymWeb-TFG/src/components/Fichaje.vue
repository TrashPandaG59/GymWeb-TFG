<template>
  <div class="fichar-container">
    <div class="contenido">
      <h1 class="titulo">Fichar</h1>

      <div class="fecha-hora">
        <span class="fecha">{{ fecha }}</span>
        <span class="hora">{{ hora }}</span>
      </div>

      <div class="selector">
        {{ tipoFichaje }}
        <!-- <option value="entrada">Entrada</option>
        <option value="salida">Salida</option> -->
      </div>

      <button class="btn-fichar" @click="fichar">FICHAR</button>

      <p class="mensaje" v-if="mensaje">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../assets/ComponentStyles/fichaje.css'
import { guardar_fichar, guardar_salida, obtener_hora_entrada } from '@/server'
import { useUsuarioStore } from '@/assets/stores/infoUserTemp'


const tipoFichaje = ref('Entrada')
const fecha = ref('')
const hora = ref('')
const mensaje = ref('')

const estado = ref(false)

function actualizarFechaHora() {
  const ahora = new Date()
  fecha.value = ahora.toLocaleDateString()
  hora.value = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function fichar() {
  mensaje.value = `Fichaje de ${tipoFichaje.value} registrado`
  setTimeout(() => mensaje.value = '', 3000)

  const IdentidadUsuario = useUsuarioStore().darIdentidadUsuario();

  console.log("ID Usuario:", IdentidadUsuario.id, "::", IdentidadUsuario.roll)


   estado.value = !estado.value

  if (estado.value === true) {
    tipoFichaje.value = 'Salida';
    guardar_fichar(IdentidadUsuario.id, IdentidadUsuario.roll, true)
  } else {
    tipoFichaje.value = 'Entrada';
    guardar_salida(IdentidadUsuario.id, IdentidadUsuario.roll, false)

  }

 

}

onMounted(async () => {
  actualizarFechaHora()
  setInterval(actualizarFechaHora, 1000)

  const IdentidadUsuario = useUsuarioStore().darIdentidadUsuario();

  estado.value = await obtener_hora_entrada(IdentidadUsuario.id, IdentidadUsuario.roll);
  console.log("Estado de fichaje:", estado.value);

  if (estado.value === true) {
    tipoFichaje.value = 'Salida';
  } else {
    tipoFichaje.value = 'Entrada';
  }

})
</script>
