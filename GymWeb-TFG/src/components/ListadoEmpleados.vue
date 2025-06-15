<template>
  <div class="card">
    <p class="title">Listado Empleados</p>
    <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#nuevoEmpleadoModal">
      ➕ Añadir empleado
    </button>
    <button class="btn btn-outline-primary mb-3" @click="mostrarDesactivados = !mostrarDesactivados">
      {{ mostrarDesactivados ? '← Ver activos' : 'Ver empleados desactivados' }}
    </button>

    <div class="user__container">
      <div class="user" v-for="e in mostrarDesactivados ? empleadosInactivos : empleadosActivos" :key="e.id">
        <div class="user__content">
          <div class="text">
            <span class="name">{{ e.nombre }} {{ e.apellidos }}</span>
            <p class="username">@{{ e.usuario }}</p>
          </div>
          <button @click="infoEmpleado(e)" type="button" class="follow btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#empleadoModal">
            Ver
          </button>
          <button v-if="mostrarDesactivados" class="btn btn-success ms-2" @click="reactivarEmpleado(e)">
            Reactivar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="empleadoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Ficha de Empleado</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="cancelarEdicion"></button>
          </div>

          <div class="modal-body">
            <div v-if="!editando">
              <h5><strong>Nombre:</strong> {{ empleado.nombre }} {{ empleado.apellidos }}</h5>
              <h5><strong>Usuario:</strong> {{ empleado.usuario }}</h5>
              <h5><strong>Email:</strong> {{ empleado.email }}</h5>
              <h5><strong>Teléfono:</strong> {{ empleado.telefono }}</h5>
              <h5><strong>Fecha Nacimiento:</strong> {{ empleado.fecha_nacimiento }}</h5>
              <h5><strong>Fecha Registro:</strong> {{ empleado.fecha_inicio }}</h5>
              <h5><strong>Fecha Pago:</strong> {{ empleado.fecha_pago }}</h5>
              <h5><strong>Rol:</strong> {{ empleado.rol }}</h5>
              <h5><strong>Salario Base:</strong> {{ empleado.salario_base }} €</h5>
              <h5><strong>Tipo Contrato:</strong> {{ empleado.tipo_contrato }}</h5>
              <h5><strong>ID:</strong> {{ empleado.id }}</h5>
            </div>

            <div v-else>
              <div class="modal-body">
                <label>Nombre:
                  <input v-model="empleadoEditado.nombre" class="form-control mb-2" required />
                </label>
                <label>Apellidos:
                  <input v-model="empleadoEditado.apellidos" class="form-control mb-2" required />
                </label>
                <label>Email:
                  <input v-model="empleadoEditado.email" class="form-control mb-2" type="email" required />
                </label>
                <label>Teléfono:
                  <input v-model="empleadoEditado.telefono" class="form-control mb-2" />
                </label>
                <label>Fecha de nacimiento:
                  <input v-model="empleadoEditado.fecha_nacimiento" class="form-control mb-2" type="date" />
                </label>
                <label>Cargo:
                  <input v-model="empleadoEditado.cargo" class="form-control mb-2" />
                </label>
                <label>Usuario:
                  <input v-model="empleadoEditado.usuario" class="form-control mb-2" required />
                </label>
                <label>Contraseña:
                  <input v-model="empleadoEditado.contrasena" class="form-control mb-2" type="password" required />
                </label>
                <label>Fecha inicio:
                  <input v-model="empleadoEditado.fecha_inicio" class="form-control mb-2" type="date" />
                </label>
                <label>Salario base (€):
                  <input v-model="empleadoEditado.salario_base" class="form-control mb-2" type="number" step="0.01" />
                </label>
                <label>Activo:
                  <select v-model="empleadoEditado.activo" class="form-control mb-2">
                    <option :value="true">Sí</option>
                    <option :value="false">No</option>
                  </select>
                </label>
                <label>Fecha pago:
                  <input v-model="empleadoEditado.fecha_pago" class="form-control mb-2" type="date" />
                </label>
                <label>Total devengado (€):
                  <input v-model="empleadoEditado.total_devengado" class="form-control mb-2" type="number"
                    step="0.01" />
                </label>
                <label>Total deducciones (€):
                  <input v-model="empleadoEditado.total_deducciones" class="form-control mb-2" type="number"
                    step="0.01" />
                </label>
                <label>Neto pagable (€):
                  <input v-model="empleadoEditado.neto_pagable" class="form-control mb-2" type="number" step="0.01" />
                </label>
                <label>Estado nómina:
                  <select v-model="empleadoEditado.estado" class="form-control mb-2">
                    <option>PENDIENTE</option>
                    <option>PROCESADA</option>
                    <option>PAGADA</option>
                    <option>CANCELADA</option>
                  </select>
                </label>
                <br>
                <label>Tipo contrato:
                  <select v-model="empleadoEditado.tipo_contrato" class="form-control mb-2">
                    <option>INDEFINIDO</option>
                    <option>TEMPORAL</option>
                    <option>SERVICIOS</option>
                  </select>
                </label>
                <br>
                <label>Rol:
                  <select v-model="empleadoEditado.rol" class="form-control mb-2">
                    <option>ADMINISTRADOR</option>
                    <option>ENTRENADOR</option>
                    <option>RECEPCIONISTA</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <template v-if="!editando">
              <button class="btn btn-warning" @click="editarEmpleado">Editar</button>
              <button v-if="empleado.activo" class="btn btn-danger" @click="desactivarEmpleado">Desactivar
                empleado</button>
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
    <div class="modal fade" id="nuevoEmpleadoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-hidden="true">
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
            <label>Email:
              <input v-model="nuevoEmpleado.email" class="form-control mb-2" type="email" required />
            </label>
            <label>Teléfono:
              <input v-model="nuevoEmpleado.telefono" class="form-control mb-2" />
            </label>
            <label>Fecha de nacimiento:
              <input v-model="nuevoEmpleado.fecha_nacimiento" class="form-control mb-2" type="date" />
            </label>
            <label>Cargo:
              <input v-model="nuevoEmpleado.cargo" class="form-control mb-2" />
            </label>
            <label>Usuario:
              <input v-model="nuevoEmpleado.usuario" class="form-control mb-2" required />
            </label>
            <label>Contraseña:
              <input v-model="nuevoEmpleado.contrasena" class="form-control mb-2" type="password" required />
            </label>
            <label>Fecha inicio:
              <input v-model="nuevoEmpleado.fecha_inicio" class="form-control mb-2" type="date" />
            </label>
            <label>Salario base (€):
              <input v-model="nuevoEmpleado.salario_base" class="form-control mb-2" type="number" step="0.01" />
            </label>
            <label>Activo:
              <select v-model="nuevoEmpleado.activo" class="form-control mb-2">
                <option :value="true">Sí</option>
                <option :value="false">No</option>
              </select>
            </label>
            <label>Fecha pago:
              <input v-model="nuevoEmpleado.fecha_pago" class="form-control mb-2" type="date" />
            </label>
            <label>Total devengado (€):
              <input v-model="nuevoEmpleado.total_devengado" class="form-control mb-2" type="number" step="0.01" />
            </label>
            <label>Total deducciones (€):
              <input v-model="nuevoEmpleado.total_deducciones" class="form-control mb-2" type="number" step="0.01" />
            </label>
            <label>Neto pagable (€):
              <input v-model="nuevoEmpleado.neto_pagable" class="form-control mb-2" type="number" step="0.01" />
            </label>
            <label>Estado nómina:
              <select v-model="nuevoEmpleado.estado" class="form-control mb-2">
                <option>PENDIENTE</option>
                <option>PROCESADA</option>
                <option>PAGADA</option>
                <option>CANCELADA</option>
              </select>
            </label>
            <br>
            <label>Tipo contrato:
              <select v-model="nuevoEmpleado.tipo_contrato" class="form-control mb-2">
                <option>INDEFINIDO</option>
                <option>TEMPORAL</option>
                <option>SERVICIOS</option>
              </select>
            </label>
            <br>
            <label>Rol:
              <select v-model="nuevoEmpleado.rol" class="form-control mb-2">
                <option>ADMINISTRADOR</option>
                <option>ENTRENADOR</option>
                <option>RECEPCIONISTA</option>
              </select>
            </label>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="guardarNuevoEmpleado">Guardar</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              @click="resetNuevoEmpleado">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { listarTodo, modificarUser, crearUser } from '@/server'
import { ref, onMounted, computed } from 'vue'
import "../assets/ComponentStyles/ListadoEmpleados.css"
const empleados = ref([])
const empleado = ref({})
const empleadoEditado = ref({})
const editando = ref(false)
const mostrarDesactivados = ref(false)

const empleadosActivos = computed(() => empleados.value.filter(e => e.activo))
const empleadosInactivos = computed(() => empleados.value.filter(e => !e.activo))

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

const guardarCambios = async () => {
  empleado.value = { ...empleadoEditado.value }
  editando.value = false
  await modificarUser("p_actualizar_empleados", empleado.value)
  alert('Cambios guardados con éxito')
}

const desactivarEmpleado = async () => {
  empleado.value.activo = false
  editando.value = false

  await modificarUser("p_actualizar_empleados", empleado.value)
  alert('Empleado desactivado')
}

const reactivarEmpleado = async (emp) => {
  emp.activo = true

  await modificarUser("p_actualizar_empleados", emp)


  alert('Empleado reactivado')
}

onMounted(async () => {
  const resultado = await listarTodo('v_perfil_empleados')
  empleados.value = resultado.map(e => ({ ...e, activo: e.activo !== false }))
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

const guardarNuevoEmpleado = async () => {
  if (
    !nuevoEmpleado.value.nombre ||
    !nuevoEmpleado.value.apellidos ||
    !nuevoEmpleado.value.usuario ||
    !nuevoEmpleado.value.email
  ) {
    alert('Por favor, completa todos los campos obligatorios.')
    return
  }else{
    await crearUser("p_alta_empleados", nuevoEmpleado.value)
  }

  const nuevo = {
    ...nuevoEmpleado.value,
    id: Date.now().toString(),
    fecha_registro: new Date().toISOString().split('T')[0],
    activo: true
  }

  empleados.value.push(nuevo)
  alert('Empleado añadido con éxito')
  resetNuevoEmpleado()
  document.getElementById('nuevoEmpleadoModal').click()
}
</script>
