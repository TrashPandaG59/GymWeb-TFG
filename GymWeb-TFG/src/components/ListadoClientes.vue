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

.more {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-weight: 600;
  color: #2575fc;
  text-decoration: none;
}

.more:hover {
  text-decoration: underline;
}
</style>
<template>
  <div class="card">
    <p class="title">Listado Clientes</p>
    <div class="user__container">
      <div class="user" v-for="c in clientes" :key="c.id">
        <div class="user__content">
          <div class="text">
            <span class="name">{{ c.nombre }} {{ c.apellidos }}</span>
            <p class="username">@{{ c.usuario }}</p>
          </div>
          <button @click="infouser(c)" type="button" class="follow btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#clienteModal">
            Ver
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="clienteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="clienteModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="clienteModalLabel">Ficha de Cliente</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="cancelarEdicion"></button>
          </div>
          <div class="modal-body">
            <div v-if="!editando">
              <h5><strong>Nombre:</strong> {{ cliente.nombre }} {{ cliente.apellidos }}</h5>
              <h5><strong>Usuario:</strong> {{ cliente.usuario }}</h5>
              <h5><strong>Email:</strong> {{ cliente.email }}</h5>
              <h5><strong>Teléfono:</strong> {{ cliente.telefono }}</h5>
              <h5><strong>Fecha Nacimiento:</strong> {{ cliente.fecha_nacimiento }}</h5>
              <h5><strong>Fecha Registro:</strong> {{ cliente.fecha_registro }}</h5>
              <h5><strong>ID:</strong> {{ cliente.id }}</h5>
            </div>

            <div v-else>
              <label>Nombre:
                <input v-model="clienteEditado.nombre" class="form-control mb-2" />
              </label>
              <label>Apellidos:
                <input v-model="clienteEditado.apellidos" class="form-control mb-2" />
              </label>
              <label>Email:
                <input v-model="clienteEditado.email" class="form-control mb-2" />
              </label>
              <label>Monto:
                <input type="number" v-model.number="clienteEditado.monto" class="form-control mb-2" readonly />
              </label>
              <label>Teléfono:
                <input v-model="clienteEditado.telefono" class="form-control mb-2" type="tel" pattern="[0-9]*"
                  inputmode="numeric" @input="clienteEditado.telefono = $event.target.value.replace(/\D/g, '')" />
              </label>
              <br>
              <label>Estado:
                <select v-model="clienteEditado.activo" class="form-select mb-2">
                  <option :value="true">Activo</option>
                  <option :value="false">Inactivo</option>
                </select>
              </label>
              <label>Tipo de Suscripción:
                <select v-model="clienteEditado.tipo_suscripcion"
                  @change="clienteEditado.monto = [0, 30, 35, 40, 45][+(clienteEditado.tipo_suscripcion.match(/\d/)?.[0] || 0)]"
                  class="form-select mb-2">

                  <option value="MENSUAL: 1 CLASE/SEMANA">MENSUAL: 1 CLASE/SEMANA</option>
                  <option value="MENSUAL: 2 CLASE/SEMANA">MENSUAL: 2 CLASE/SEMANA</option>
                  <option value="MENSUAL: 3 CLASE/SEMANA">MENSUAL: 3 CLASE/SEMANA</option>
                  <option value="MENSUAL: 4 CLASE/SEMANA">MENSUAL: 4 CLASE/SEMANA</option>
                  <option value="Sin Suscripción">Sin Suscripción</option>
                </select>
              </label>

              <label>Fecha Nacimiento:
                <input type="date" v-model="clienteEditado.fecha_nacimiento" class="form-control mb-2" />
              </label>

              <label>Fecha Vencimiento:
                <input type="date" v-model="clienteEditado.fecha_vencimiento" class="form-control mb-2" />
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <template v-if="!editando">
              <button class="btn btn-warning" @click="editarCliente">Editar</button>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listarTodo, modificarCliente } from '@/server'

const clientes = ref([])
const cliente = ref({})
const clienteEditado = ref({})
const editando = ref(false)

const infouser = (info) => {
  cliente.value = info
  editando.value = false
}

const editarCliente = () => {
  clienteEditado.value = { ...cliente.value }
  editando.value = true
}

const cancelarEdicion = () => {
  editando.value = false
}

const guardarCambios = async () => {
  cliente.value = { ...clienteEditado.value }
  editando.value = false
  console.log('Cambios guardados:', cliente.value)

  await modificarCliente('p_actualizar_clientes', cliente.value);

  alert('Cambios guardados con éxito')



}

onMounted(async () => {
  clientes.value = await listarTodo('v_clientes_niveles_clientes')

  // console.log("await listarTodo('V_clientes_niveles_clientes'): ",await listarTodo('v_clientes_niveles_clientes'))
})
</script>
