<template>
    <div :class="mostrar_calendario" class="mostrado">
      <h2>Calendario</h2>
      <div class="calendar-controls">
        <button class="btn" @click="prevWeek">Semana Anterior</button>
        <select v-model="year" @change="updateCalendar">
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
        <span>{{ monthNames[month - 1] }}</span>
        <button class="btn" @click="nextWeek">Semana Siguiente</button>
      </div>
      <table class="calendar">
        <thead>
          <tr>
            <th>Hora</th>
            <th v-for="day in 7" :key="day">Día {{ startDay + day - 1 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hour in 24" :key="hour">
            <td>{{ hour }}:00</td>
            <td
              v-for="day in 7"
              :key="day"
              :class="{ ocupado: isOcupado(startDay + day - 1, hour) }"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
//   import { getCitas } from '@/stores/api.js'
//   import { usarTokenStore } from '@/stores/token.js'
  
  const mostrar_calendario = ref('citas-list-ver')
  
  const citas = ref([])
  const year = ref(new Date().getFullYear())
  const month = ref(new Date().getMonth() + 1)
  const startDay = ref(1)
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  
  const getTodasCitas = async () => {
  // Datos ficticios para pruebas
  const fetchedCitas = [
    {
      center: 'Centro Médico San José',
      created_at: '11/05/2025 10:00:00',
      date: '15/05/2025 09:00:00',
      username: 'juanperez'
    },
    {
      center: 'Clínica Norte',
      created_at: '10/05/2025 14:30:00',
      date: '16/05/2025 11:00:00',
      username: 'mariagarcia'
    },
    {
      center: 'Hospital Central',
      created_at: '09/05/2025 08:15:00',
      date: '17/05/2025 16:00:00',
      username: 'carloslopez'
    }
  ];

  citas.value = fetchedCitas;
}

  
  const isOcupado = (day, hour) => {
    return citas.value.some(cita => {
      const [fecha, horaCompleta] = cita.date.split(' ')
      const [diaCita, mesCita, anioCita] = fecha.split('/')
      const [horaCita] = horaCompleta.split(':')
  
      const diaCitaNum = parseInt(diaCita, 10)
      const mesCitaNum = parseInt(mesCita, 10)
      const anioCitaNum = parseInt(anioCita, 10)
      const horaCitaNum = parseInt(horaCita, 10)
  
      return (
        diaCitaNum === day &&
        mesCitaNum === month.value &&
        anioCitaNum === year.value &&
        horaCitaNum === hour
      )
    })
  }
  
  const prevWeek = () => {
    startDay.value -= 7
    if (startDay.value < 1) {
      month.value -= 1
      if (month.value < 1) {
        month.value = 12
        year.value -= 1
      }
      const daysInPrevMonth = new Date(year.value, month.value, 0).getDate()
      startDay.value = daysInPrevMonth + startDay.value
    }
  }
  
  const nextWeek = () => {
    const daysInMonth = new Date(year.value, month.value, 0).getDate()
    startDay.value += 7
    if (startDay.value > daysInMonth) {
      startDay.value -= daysInMonth
      month.value += 1
      if (month.value > 12) {
        month.value = 1
        year.value += 1
      }
    }
  }
  
  const updateCalendar = () => {
    // Puedes agregar lógica aquí si deseas actualizar más datos
  }
  
  getTodasCitas()
  </script>
  
  <style scoped>
  .mostrado {
    position: absolute;
    width: 80%;
    visibility: visible;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
    pointer-events: auto;
    background: #36393d;
    color: #eaeaea;
    padding: 12px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    border: 1px solid #23272a;
  }
  
  .calendar-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .calendar {
    width: 100%;
    border-collapse: collapse;
  }
  
  .calendar th,
  .calendar td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 4px;
  }
  
  .ocupado {
    background-color: red;
  }
  </style>
  