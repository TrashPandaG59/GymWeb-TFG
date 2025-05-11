<script setup>
import Fichaje from '../components/Fichaje.vue'
import ListaClases from '../components/ListaClases.vue'
import CalendarioClases from '../components/CalendarioClases.vue'
import Inventario from '../components/Inventario.vue'

const endpoints = [
    { name: 'Fichar', component: Fichaje },
    { name: 'Clases', component: ListaClases },
    { name: 'Calendario', component: CalendarioClases },
    { name: 'Inventario', component: Inventario },
    // Lo ve solo el gerente y los administradores
    { name: 'ListadoClientes', component: ListadoClientes },
    { name: 'ListadoEmpleados', component: ListadoEmpleados },
];

const currentComponent = ref(Fichar);
</script>

<template>
<div class="main">
    <header>
        <div class="sub-header">
            <div class="btn-group" role="group" aria-label="Endpoints" v-for="endpoint in endpoints" :key="endpoint">
                <button class="btn btn-outline-primary border-0 shadow-none flex-fill" @click="currentComponent = endpoint.component">{{ endpoint.name }}</button>
            </div>
        </div>
    </header>
    <main>
        <component :is="currentComponent"></component>
    </main>
</div>
</template>

