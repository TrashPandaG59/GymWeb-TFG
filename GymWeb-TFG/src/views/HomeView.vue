<template>
  <div class="home">
    <header class="hero">
      <img src="../assets/img/logoZanshin.jpg" alt="Logo Zanshin" class="logo" />
      <h1>Zanshin Salud y Bienestar</h1>
      <p class="tagline">Transforma tu cuerpo, mente y espíritu con nosotros</p>
      <button class="btn-primary" @click="mostrarModal = true" >Iniciar sesión</button>
    </header>

    <section class="seccion entrenamiento">
      <div class="contenido">
        <div class="texto">
          <h2>Entrenamiento Moderno</h2>
          <p>Accede a instalaciones de última generación diseñadas para tu comodidad y seguridad.</p>
          <ul>
            <li>Equipamiento de última generación</li>
            <li>Espacios amplios y ventilados</li>
            <li>Planes de entrenamiento personalizados</li>
          </ul>
        </div>
        <img src="../assets/img/salafitness1.jpg" alt="Sala de fitness moderna" class="imagen-seccion" />
      </div>
    </section>

<section class="entrenadores">
  <EntrenadoresCarrusel />
</section>

    <section class="seccion clases">
      <YogaCarrusel/>
    </section>

<!-- Modal -->
<div class="modal fade custom-modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content shadow-lg rounded-4 border-0">
      <div class="modal-header bg-success text-white rounded-top-4">
        <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel">
          <i class="bi bi-check-circle-fill me-2"></i>
          ¡Correo verificado!
        </h1>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center py-4">
        <p class="mb-2 fs-5">Tu correo ha sido verificado correctamente.</p>
        <p class="mb-0 text-muted">Ahora puedes iniciar sesión y disfrutar de todos los servicios.</p>
      </div>
      <div class="modal-footer justify-content-center border-0 pb-4">
        <button type="button" class="btn btn-success px-4" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<button
    ref="modalBtn"
    type="button"
    class="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  ></button>

    <LoginModal v-if="mostrarModal" @close="mostrarModal = false"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoginModal from '../components/LoginModal.vue'
import '../assets/ViewStyles/HomeView.css'
import { gsap } from 'gsap' // Importar GSAP
import { Draggable } from 'gsap/Draggable' // Importar Draggable
import { useUsuarioStore } from '@/assets/stores/infoUserTemp'
import { insertarUsuario } from '@/server'
import EntrenadoresCarrusel from '../components/EntrenadoresCarrusel.vue'
import YogaCarrusel from '../components/YogaCarrusel.vue'
const modalBtn = ref(null)

onMounted(() => {

  const hash = window.location.hash
  if (hash.includes('#code=')) {
    if (hash.split('#code=')[1] === useUsuarioStore().cargarToken()) {

      const infoStore = useUsuarioStore().cargarInfo();

      console.log("useUsuarioStore().cargarInfo(info) desde modal: ",infoStore);

      useUsuarioStore().eliminarToken();

      insertarUsuario(infoStore)
        .then(resultado => {
          alert(resultado)
        })
        .catch(error => {
          console.error('Error en el registro:', error)
        })
      modalBtn.value?.click()
    }
  }

  // Animación de entrada
  gsap.from('.hero', { duration: 1, opacity: 0, y: -50 });
  gsap.from('.features', { duration: 1, opacity: 0, y: 50, stagger: 0.2 });

  console.log(Draggable); // Esto debería mostrar el objeto Draggable en la consola
  Draggable.create("#move", {
    type: "x,y",
    bounds: "body"
  });
});

const mostrarModal = ref(false)
</script>

<style>
#move {
  position: relative; /* Permite que GSAP manipule las coordenadas */
  cursor: grab; /* Cambia el cursor para indicar que es arrastrable */
}

.custom-modal .modal-content {
  background: #f8f9fa;
  border-radius: 1.5rem;
}
.custom-modal .modal-header {
  border-bottom: none;
  background: linear-gradient(90deg, #38b000 0%, #70e000 100%);
}
.custom-modal .modal-footer {
  border-top: none;
}
</style>

