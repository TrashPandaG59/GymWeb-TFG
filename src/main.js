import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'


import { createApp } from 'vue'  // Crea la app Vue
import { createPinia } from 'pinia'  // Para el manejo de estado

import App from './App.vue'  // Componente raíz
import router from './router'  // Tus rutas

import { gsap } from "gsap";
    
import { TextPlugin } from "gsap/TextPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(Draggable)

const app = createApp(App)

app.use(createPinia())  // Usa Pinia
app.use(router)  // Usa el router

app.mount('#app')  // Monta la app en el div con id="app"
