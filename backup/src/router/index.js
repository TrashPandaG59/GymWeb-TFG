import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonalView from '../views/PersonalView.vue'
import ClientesView from '../views/ClientesView.vue'
import PerfilPersonalView from '../views/PerfilPersonalView.vue'
import PerfilClientesView from '../views/PerfilClientesView.vue'
import PerfilView from '../views/PerfilView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalView
  },
  {
    path: '/personal_limitado',
    name: 'personallimitado',
    component: () => import('../views/PersonalView_limitado.vue')
  },
  {
    path: '/personal/:username',
    name: 'usuario_personal',
    component: PerfilPersonalView
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ClientesView
  },
  {
    path: '/clientes/:username',
    name: 'usuario_clientes',
    component: PerfilClientesView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
