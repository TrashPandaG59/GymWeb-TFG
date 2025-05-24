<script setup>
import Fichaje from '../components/Fichaje.vue'
import ListaClases from '../components/ListaClases.vue'
import CalendarioClases from '../components/CalendarioClases.vue'

import { ref } from 'vue'
import '../assets/ViewStyles/ClientesView.css'
const endpoints = [
    { name: 'Fichar', component: Fichaje },
    { name: 'Clases', component: ListaClases },
    { name: 'Calendario', component: CalendarioClases }
];

const currentComponent = ref(Fichaje);
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

