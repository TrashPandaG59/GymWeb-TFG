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
          <td
            v-for="i in 7"
            :key="i"
            :class="{ ocupado: isOcupado(addDays(startDate, i - 1), hour) }"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import '../assets/ComponentStyles/Calendario.css'

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
const getTodasCitas = async () => {
  citas.value = [
    { center: 'Centro 1', date: '27/05/2025 17:00:00', username: 'ana' },
    { center: 'Centro 2', date: '28/05/2025 18:00:00', username: 'luis' },
  ]
}

getTodasCitas()
</script>
