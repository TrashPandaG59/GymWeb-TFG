<style scoped>
  .card {
  background: #f4f7fb;
  border-radius: 20px;
  padding: 30px;
  max-width: 800px;
  margin: 40px auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1f2a52;
  text-align: center;
}

.user__container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user {
  background: white;
  border-radius: 12px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.user:hover {
  background: #eef2f8;
}

.name {
  font-weight: 700;
  font-size: 1.1rem;
}

.username {
  font-size: 0.95rem;
  color: #777;
}

.follow {
  background-color: #2575fc;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.follow:hover {
  background-color: #1a57c5;
}

</style>
<template>
  <div class="card">
    <p class="title">Listado Empleados</p>
    <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#nuevoEmpleadoModal">
  ➕ Añadir empleado
</button>

    <div class="user__container">
      <div class="user" v-for="e in empleados" :key="e.id">
        <div class="user__content">
          <div class="text">
            <span class="name">{{ e.nombre }} {{ e.apellidos }}</span>
            <p class="username">@{{ e.usuario }}</p>
          </div>
          <button
            @click="infoEmpleado(e)"
            type="button"
            class="follow btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#empleadoModal"
          >
            Ver
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="empleadoModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Ficha de Empleado</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="cancelarEdicion"
            ></button>
          </div>

          <div class="modal-body">
            <div v-if="!editando">
              <h5><strong>Nombre:</strong> {{ empleado.nombre }} {{ empleado.apellidos }}</h5>
              <h5><strong>Usuario:</strong> {{ empleado.usuario }}</h5>
              <h5><strong>Email:</strong> {{ empleado.email }}</h5>
              <h5><strong>Teléfono:</strong> {{ empleado.telefono }}</h5>
              <h5><strong>Fecha Nacimiento:</strong> {{ empleado.fecha_nacimiento }}</h5>
              <h5><strong>Fecha Registro:</strong> {{ empleado.fecha_registro }}</h5>
              <h5><strong>ID:</strong> {{ empleado.id }}</h5>
            </div>

            <div v-else>
              <label>Nombre:
                <input v-model="empleadoEditado.nombre" class="form-control mb-2" />
              </label>
              <label>Apellidos:
                <input v-model="empleadoEditado.apellidos" class="form-control mb-2" />
              </label>
              <label>Usuario:
                <input v-model="empleadoEditado.usuario" class="form-control mb-2" />
              </label>
              <label>Email:
                <input v-model="empleadoEditado.email" class="form-control mb-2" />
              </label>
              <label>Teléfono:
                <input v-model="empleadoEditado.telefono" class="form-control mb-2" />
              </label>
              <label>Fecha Nacimiento:
                <input type="date" v-model="empleadoEditado.fecha_nacimiento" class="form-control mb-2" />
              </label>
            </div>
          </div>

          <div class="modal-footer">
            <template v-if="!editando">
              <button class="btn btn-warning" @click="editarEmpleado">Editar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </template>
            <template v-else>
              <button class="btn btn-success" @click="guardarCambios">Guardar</button>
              <button class="btn btn-outline-secondary" @click="cancelarEdicion">Cancelar</button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal para añadir nuevo empleado -->
<div
  class="modal fade"
  id="nuevoEmpleadoModal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Nuevo empleado</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetNuevoEmpleado"></button>
      </div>
      <div class="modal-body">
        <label>Nombre:
          <input v-model="nuevoEmpleado.nombre" class="form-control mb-2" required />
        </label>
        <label>Apellidos:
          <input v-model="nuevoEmpleado.apellidos" class="form-control mb-2" required />
        </label>
        <label>Usuario:
          <input v-model="nuevoEmpleado.usuario" class="form-control mb-2" required />
        </label>
        <label>Email:
          <input v-model="nuevoEmpleado.email" class="form-control mb-2" type="email" required />
        </label>
        <label>Teléfono:
          <input v-model="nuevoEmpleado.telefono" class="form-control mb-2" />
        </label>
        <label>Fecha de nacimiento:
          <input v-model="nuevoEmpleado.fecha_nacimiento" class="form-control mb-2" type="date" />
        </label>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" @click="guardarNuevoEmpleado">Guardar</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetNuevoEmpleado">Cancelar</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
import { listarTodo } from '@/server'
import { ref, onMounted } from 'vue'

const empleados = ref([])
const empleado = ref({})
const empleadoEditado = ref({})
const editando = ref(false)

const infoEmpleado = (e) => {
  empleado.value = e
  editando.value = false
}

const editarEmpleado = () => {
  empleadoEditado.value = { ...empleado.value }
  editando.value = true
}

const cancelarEdicion = () => {
  editando.value = false
}

const guardarCambios = () => {
  empleado.value = { ...empleadoEditado.value }
  editando.value = false
  alert('Cambios guardados con éxito')
}

onMounted(async () => {
  empleados.value = await listarTodo('empleados')
})

const nuevoEmpleado = ref({
  nombre: '',
  apellidos: '',
  usuario: '',
  email: '',
  telefono: '',
  fecha_nacimiento: ''
})

const resetNuevoEmpleado = () => {
  nuevoEmpleado.value = {
    nombre: '',
    apellidos: '',
    usuario: '',
    email: '',
    telefono: '',
    fecha_nacimiento: ''
  }
}

const guardarNuevoEmpleado = () => {
  if (
    !nuevoEmpleado.value.nombre ||
    !nuevoEmpleado.value.apellidos ||
    !nuevoEmpleado.value.usuario ||
    !nuevoEmpleado.value.email
  ) {
    alert('Por favor, completa todos los campos obligatorios.')
    return
  }

  const nuevo = {
    ...nuevoEmpleado.value,
    id: Date.now().toString(),
    fecha_registro: new Date().toISOString().split('T')[0]
  }

  empleados.value.push(nuevo)
  alert('Empleado añadido con éxito')
  resetNuevoEmpleado()
  document.getElementById('nuevoEmpleadoModal').click() // Cierra el modal
}

</script>
