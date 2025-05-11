<style scoped>
  .card {
    width: 350px;
    height: 350px;
    background: #E8EAEA;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title, .more {
    padding: 10px 15px;
  }

  .user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
  }

  .user__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }

  .user__container {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-weight: 900;
    font-size: 1.3em;
  }

  .name {
    font-weight: 800;
  }

  .username {
    font-size: .9em;
    color: #64696e;
  }

  .image {
    width: 60px;
    height: 60px;
    background: rgb(22,19,70);
    background: linear-gradient(295deg, rgba(22,19,70,1) 41%, rgba(89,177,237,1) 100%);
    border-radius: 50%;
    margin-right: 15px;
  }

  .follow {
    border: none;
    border-radius: 25px;
    background-color: #0f1113;
    color: white;
    padding: 8px 15px;
    font-weight: 700;
  }

  .more {
    display: block;
    text-decoration: none;
    color: rgb(29, 155, 240);
    font-weight: 800;
  }

  .user:hover {
    background-color: #b3b6b6;
  }

  .more:hover {
    background-color: #b3b6b6;
    border-radius: 0px 0px 15px 15px;
  }

  .follow:hover {
    background-color: #2c3136;
  }
</style>

<template>
  <div class="card">
    <p class="title">Listado Inventario</p>
    <div class="user__container">
      <div 
        class="user" 
        v-for="producto in productos" 
        :key="producto.id">
        <!-- <div class="image"></div> -->
        <div class="user__content">
          <div class="text">
            <span class="name">{{ producto.descripcion }}</span>
            <p class="username">Código: {{ producto.codigo_producto }}</p>
          </div>
          <button v-on:click="infoProducto(producto)"
           type="button" class="follow btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
          >Ver</button>
        </div>
      </div>
    </div>
    <a class="more" href="#">See more</a>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h2>Descripción: {{ productoSeleccionado.descripcion }}</h2>
            <h2>Código: {{ productoSeleccionado.codigo_producto }}</h2>
            <h2>Cantidad Actual: {{ productoSeleccionado.cantidad_actual }}</h2>
            <h2>Cantidad Mínima: {{ productoSeleccionado.cantidad_minima }}</h2>
            <h2>Precio Unitario: {{ productoSeleccionado.precio_unitario }}</h2>
            <h2>Fecha Último Ingreso: {{ productoSeleccionado.fecha_ultimo_ingreso }}</h2>
            <h2>Responsable ID: {{ productoSeleccionado.responsable_id }}</h2>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { listarTodo } from '@/server';
import { onMounted } from 'vue';
import { ref } from 'vue';

const productos = ref([]);
const productoSeleccionado = ref({});

const infoProducto = (producto) => {
    productoSeleccionado.value = producto;
    console.log(producto);
}

onMounted(async () => {
    productos.value = await listarTodo("inventario");
    console.log(productos.value);
});
</script>
