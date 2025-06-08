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

/* Modal */
.modal-content {
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: none;
  padding: 20px 24px;
}

.modal-body h2 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;
}

.modal-footer {
  border-top: none;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.btn-editar {
  background-color: #ff7043;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-editar:hover {
  background-color: #e64a19;
}
</style>

<template>
  <div class="card">
    <p class="title">Listado Inventario</p>

    <div class="user__container">
      <div class="user" v-for="producto in productos" :key="producto.id">
        <div class="user__content">
          <div class="text">
            <span class="name">{{ producto.descripcion }}</span>
            <p class="username">Código: {{ producto.codigo_producto }}</p>
          </div>
          <button
            @click="infoProducto(producto)"
            type="button"
            class="follow btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Ver
          </button>
        </div>
      </div>
    </div>

    <a class="more" href="#">See more</a>

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles del producto</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="cancelarEdicion"
            ></button>
          </div>

          <div class="modal-body">
            <div v-if="!editando">
              <h2>Descripción: {{ productoSeleccionado.descripcion }}</h2>
              <h2>Código: {{ productoSeleccionado.codigo_producto }}</h2>
              <h2>Cantidad Actual: {{ productoSeleccionado.cantidad_actual }}</h2>
              <h2>Cantidad Mínima: {{ productoSeleccionado.cantidad_minima }}</h2>
              <h2>Precio Unitario: {{ productoSeleccionado.precio_unitario }} €</h2>
              <h2>Fecha Último Ingreso: {{ productoSeleccionado.fecha_ultimo_ingreso }}</h2>
              <!-- <h2>Responsable ID: {{ productoSeleccionado.responsable_id }}</h2> -->
            </div>

            <div v-else>
              <label>Descripción:
                <input v-model="productoEditado.descripcion" class="form-control mb-2" />
              </label>
              <label>Código:
                <input v-model="productoEditado.codigo_producto" class="form-control mb-2" />
              </label>
              <label>Cantidad Actual:
                <input type="number" v-model="productoEditado.cantidad_actual" class="form-control mb-2" />
              </label>
              <label>Cantidad Mínima:
                <input type="number" v-model="productoEditado.cantidad_minima" class="form-control mb-2" />
              </label>
              <label>Precio Unitario (€):
                <input type="number" step="0.01" v-model="productoEditado.precio_unitario" class="form-control mb-2" />
              </label>
              <label>Fecha Último Ingreso:
                <!-- <input type="date" v-model="productoEditado.fecha_ultimo_ingreso" class="form-control mb-2" /> -->
                 <p class="form-control mb-2">{{productoEditado.fecha_ultimo_ingreso}}</p>
              </label>
              <!-- <label>Responsable ID:
                <input type="text" v-model="productoEditado.responsable_id" class="form-control mb-2" />
              </label> -->
            </div>
          </div>

          <div class="modal-footer">
            <template v-if="!editando">
              <button class="btn btn-warning" @click="editarProducto">Editar</button>
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
import { listarTodo, modificarProducto } from '@/server'
import { onMounted, ref } from 'vue'

const productos = ref([])
const productoSeleccionado = ref({})
const editando = ref(false)
const productoEditado = ref({})

const infoProducto = (producto) => {
  productoSeleccionado.value = producto
  editando.value = false
}

const editarProducto = () => {
  productoEditado.value = { ...productoSeleccionado.value }

  // Asigna la fecha actual en formato "YYYY-MM-DDTHH:mm:ss.SSSSS"
  const now = new Date()
  const pad = (n, z = 2) => ('00' + n).slice(-z)
  const ms = ('00000' + now.getMilliseconds()).slice(-5)
  productoEditado.value.fecha_ultimo_ingreso =
    now.getFullYear() + '-' +
    pad(now.getMonth() + 1) + '-' +
    pad(now.getDate()) + 'T' +
    pad(now.getHours()) + ':' +
    pad(now.getMinutes()) + ':' +
    pad(now.getSeconds()) + '.' +
    ms

  editando.value = true
}

const cancelarEdicion = () => {
  editando.value = false
}

const guardarCambios = async () => {
  productoSeleccionado.value = { ...productoEditado.value }
  editando.value = false
  await modificarProducto("inventario", productoSeleccionado.value)
  alert('Cambios guardados con éxito')
}

onMounted(async () => {
  productos.value = await listarTodo('inventario')
})
</script>
