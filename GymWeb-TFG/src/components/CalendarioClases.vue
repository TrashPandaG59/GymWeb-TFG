<template>
  <div :class="mostrar_calendario" class="mostrado">
    <h2>Calendario</h2>

    <div class="calendar-controls">
      <button class="btn" @click="prevWeek" :disabled="!puedeRetrocederSemana()">← Semana Anterior</button>

      <div class="fecha-info">
        <span class="fecha-actual">{{ mesActual }} {{ anioActual }}</span>
      </div>

      <button class="btn btn-next" @click="nextWeek">Semana Siguiente →</button>
    </div>

    <table class="calendar">
      <thead>
        <tr>
          <th>Hora</th>
          <th v-for="i in 7" :key="i">
            {{ formatDate(addDays(startDate, i - 1)) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hour in hours" :key="hour">
          <td>{{ hour }}:00</td>
          <td v-for="i in 7" :key="i" :class="{ ocupado: isOcupado(addDays(startDate, i - 1), hour) }" v-on:click="llamarDIA(addDays(startDate, i - 1), hour)" data-bs-toggle="modal" data-bs-target="#exampleModal"></td>
        </tr>
      </tbody>
    </table>
  </div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg"> <!-- centrado y más grande -->
    <div class="modal-content shadow-lg rounded-3">
      <div class="modal-header bg-primary text-white">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Detalle de la Clase</h1>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <div v-if="infoCitaDia !== 'No hay nada en este dia'">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Clase:</strong> {{ infoCitaDia.clase }}
            </li>
            <li class="list-group-item">
              <strong>Profesor:</strong> {{ infoCitaDia.nombre_profesor }} {{ infoCitaDia.apellidos_profesor }}
            </li>
            <li class="list-group-item">
              <strong>Día:</strong> {{ infoCitaDia.dia }}
            </li>
            <li class="list-group-item">
              <strong>Hora:</strong> {{ infoCitaDia.hora_inicio }} - {{ infoCitaDia.hora_fin }}
            </li>
            <li class="list-group-item">
              <strong>Capacidad:</strong> {{ infoCitaDia.capacidad_actual }} de {{ infoCitaDia.capacidad_maxima }} alumnos
            </li>
          </ul>
        </div>
        <div v-else class="text-center fs-5 text-muted py-3">
          No hay nada en este día
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>


</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import '../assets/ComponentStyles/Calendario.css'
import { listarTodo } from '@/server'

const mostrar_calendario = ref('citas-list-ver')
const citas = ref([])

// Solo horas de 17 a 22
const hours = [17, 18, 19, 20, 21, 22]

// Día de hoy y cálculo del lunes actual
const today = new Date()
const startDate = ref(getStartOfWeek(today))

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

// Utilidades de fecha
function getStartOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date, days) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

function formatDate(date) {
  const texto = date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}


// Ocupación
function isOcupado(fechaDia, hora) {
  return citas.value.some(cita => {
    const [fecha, horaCompleta] = cita.date.split(' ')
    const [dia, mes, anio] = fecha.split('/').map(Number)
    const [horaCita] = horaCompleta.split(':').map(Number)

    return (
      dia === fechaDia.getDate() &&
      mes === fechaDia.getMonth() + 1 &&
      anio === fechaDia.getFullYear() &&
      hora === horaCita
    )
  })
}

// Navegación semanas
function puedeRetrocederSemana() {
  const inicioSemanaActual = getStartOfWeek(new Date())
  return startDate.value > inicioSemanaActual
}

function prevWeek() {
  if (!puedeRetrocederSemana()) return
  startDate.value = addDays(startDate.value, -7)
}

function nextWeek() {
  startDate.value = addDays(startDate.value, 7)
}

// Mes y año dinámicos
const mesActual = computed(() => monthNames[startDate.value.getMonth()])
const anioActual = computed(() => startDate.value.getFullYear())

// Mock citas
// const getTodasCitas = async () => {
//   citas.value = [
//     { center: 'Centro 1', date: '27/05/2025 17:00:00', username: 'ana' },
//     { center: 'Centro 2', date: '28/05/2025 18:00:00', username: 'luis' },
//   ]
// }

// getTodasCitas()

const infoCitaDia = ref('No hay nada en este dia')

const llamarDIA = (fechaDia, hora) => {
  const cita = citas.value.find(cita => {
    const [fecha, horaCompleta] = cita.date.split(' ')
    const [dia, mes, anio] = fecha.split('/').map(Number)
    const [horaCita] = horaCompleta.split(':').map(Number)

    return (
      dia === fechaDia.getDate() &&
      mes === fechaDia.getMonth() + 1 &&
      anio === fechaDia.getFullYear() &&
      hora === horaCita
    )
  })

  if (cita) {
    infoCitaDia.value = cita.todosLosDatos;
    console.log("Cita encontrada:", cita.todosLosDatos)
  } else {
    infoCitaDia.value = 'No hay nada en este dia';
    console.log("No hay cita en esa fecha y hora.")
  }
}


onMounted( async() => { 
  const clases = await listarTodo('v_profesor_clases');
  console.log("clases: ", clases);

  clases.forEach(clase => {
    const [anio, mes, dia] = clase.dia.split("-");
    const citaFormateada = `${dia}/${mes}/${anio} ${clase.hora_inicio}`;
    citas.value.push({ date: citaFormateada, todosLosDatos: clase });
  });

  console.log("citas: ", citas.value[0].todosLosDatos);

})
</script>

