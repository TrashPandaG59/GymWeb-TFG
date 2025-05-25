<script setup>
import Fichaje from '../components/Fichaje.vue'
import ListaClases from '../components/ListaClases.vue'
import CalendarioClases from '../components/CalendarioClases.vue'
import Perfil from '../views/PerfilView.vue'
import vistaespecial from '@/components/vistaespecial.vue'

import { ref } from 'vue'
import '../assets/ViewStyles/ClientesView.css'

const endpoints = [
    { name: 'Fichar', component: Fichaje },
    { name: 'Clases', component: ListaClases },
    { name: 'Calendario', component: CalendarioClases },
    { name: 'Perfil', component: Perfil }
];

const currentComponent = ref(Fichaje);
const showvistaespecial = ref(false);

// Secuencia esperada
const expectedSequence = ['Fichar', 'Fichar', 'Calendario', 'Calendario', 'Clases', 'Clases'];
let currentSequence = [];

function handleClick(endpoint) {
    currentComponent.value = endpoint.component;
    currentSequence.push(endpoint.name);

    // Si se excede la longitud, corta lo viejo
    if (currentSequence.length > expectedSequence.length) {
        currentSequence.shift();
    }

    // Verifica si la secuencia es correcta
    if (JSON.stringify(currentSequence) === JSON.stringify(expectedSequence)) {
        alert('Codigo insertado');
        showvistaespecial.value = true;
        currentSequence = [];
    }

    // Si se rompe la secuencia esperada, reiniciar
    for (let i = 0; i < currentSequence.length; i++) {
        if (currentSequence[i] !== expectedSequence[i]) {
            currentSequence = [];
            break;
        }
    }
}
</script>

<template>
<div class="main">
    <header>
        <div class="sub-header">
            <div class="btn-group" role="group" aria-label="Endpoints" v-for="endpoint in endpoints" :key="endpoint.name">
                <button class="btn btn-outline-primary border-0 shadow-none flex-fill" @click="handleClick(endpoint)">
                    {{ endpoint.name }}
                </button>
            </div>
        </div>
    </header>
    <main>
        <component :is="currentComponent"></component>
    </main>

    <!-- vistaespecial aparece encima con animación -->
    <transition name="fall-down">
        <vistaespecial v-if="showvistaespecial" class="vistaespecial-overlay" />
    </transition>
</div>
</template>

<style>
/* Asegura que vistaespecial se muestre encima de todo y animado */
.vistaespecial-overlay {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    pointer-events: auto;
}

/* Animación "caer del cielo" */
.fall-down-enter-active {
    animation: fall 0.8s ease-out forwards;
}
@keyframes fall {
    0% {
        transform: translate(-50%, -200px);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, 0);
        opacity: 1;
    }
}
</style>
