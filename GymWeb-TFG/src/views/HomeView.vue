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
        <img src="../assets/fitness-room.jpg" alt="Sala de fitness moderna" class="imagen-seccion" />
      </div>
    </section>

    <section class="seccion entrenadores">
      <div class="contenido">
        <div class="texto">
          <h2>Entrenadores Profesionales</h2>
          <p>Nuestro equipo está formado por expertos certificados listos para ayudarte a alcanzar tus metas.</p>
          <ul>
            <li>Certificaciones internacionales</li>
            <li>Atención personalizada</li>
            <li>Experiencia en diversas disciplinas</li>
          </ul>
        </div>
        <img src="../assets/trainers.jpg" alt="Entrenadores del gimnasio" class="imagen-seccion" />
      </div>
    </section>

    <section class="seccion clases">
      <div class="contenido">
        <div class="texto">
          <h2>Clases Integrales</h2>
          <p>Ofrecemos una amplia gama de clases diseñadas para todos los niveles y objetivos.</p>
          <ul>
            <li>Yoga, Pilates, HIIT, Spinning</li>
            <li>Horarios flexibles</li>
            <li>Ambiente motivador y de comunidad</li>
          </ul>
        </div>
        <img src="../assets/classes.jpg" alt="Clase de yoga" class="imagen-seccion" />
      </div>
    </section>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
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

const modalBtn = ref(null)

onMounted(() => {

  const hash = window.location.hash
  if (hash.includes('#code=')) {
    if (hash.split('#code=')[1] === useUsuarioStore().cargarToken()) {

      const infoStore = useUsuarioStore().cargarInfo();

      console.log("useUsuarioStore().cargarInfo(info) desde modal: ",infoStore);

      useUsuarioStore().eliminarToken();

      // insertarUsuario(info)
      //   .then(resultado => {
      //     alert(resultado)
      //   })
      //   .catch(error => {
      //     console.error('Error en el registro:', error)
      //   })

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
</style>

