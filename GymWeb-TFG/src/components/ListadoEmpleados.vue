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
    <p class="title">Listado Clientes</p>
    <div class="user__container">
    <div 
      class="user" 
      v-for="cliente in clientes" 
      :key="cliente.id">
      <div class="image"></div>
      <div class="user__content">
        <div class="text">
        <span class="name">{{ cliente.nombre }}</span>
        <p class="username">@{{ cliente.usuario }}</p>
        <!-- .toLowerCase().replace(/\s+/g, '') -->
        </div>
        <button v-on:click="infouser(cliente)"
         type="button" class="follow btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
        >Ver</button>
      </div>
    </div>

    </div>
    <a class="more" href="#">See more</a>
    <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h2>nombre: {{cliente.nombre}} {{ cliente.apellidos }}</h2>
        <h2>email: {{cliente.email}}</h2>
      </div>
      <h2>telefono: {{cliente.telefono}}</h2>
      <h2>fecha_nacimiento: {{cliente.fecha_nacimiento}}</h2>
      <h2>fecha_registro: {{cliente.fecha_registro}}</h2>
      <h2>id: {{cliente.id}}</h2>
      <h2>usuario: {{cliente.usuario}}</h2>
<!-- apellidos
contrasena
email
fecha_nacimiento
fecha_registro
id
nombre
telefono
usuario -->
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

const clientes = ref([]);

const cliente = ref([]);

const infouser = (info) => {
    cliente.value = info;
    console.log(info);
}

onMounted( async () => {
    clientes.value = await listarTodo("empleados");
    console.log(clientes.value[0].nombre);
});


</script>
