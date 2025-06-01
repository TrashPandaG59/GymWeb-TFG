<template>
  <div class="perfil-container">
    <div class="perfil-card">
      <h2>{{ usuario.nombre }} {{ usuario.apellidos }}</h2>

      <div class="perfil-info">
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>Teléfono:</strong> {{ usuario.telefono }}</p>
        <p><strong>Fecha de nacimiento:</strong> {{ usuario.fecha_nacimiento }}</p>
        <p><strong>Usuario:</strong> {{ usuario.usuario }}</p>
        <!-- <p>
          <strong>Clases por semana:</strong>
          <select v-model="usuario.clases_por_semana" class="select-clases">
            <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
          </select>
        </p> -->
      </div>

      <button class="btn-editar">Editar perfil</button>
      <button class="btn-editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Doble factor</button>
    </div>
  </div>



<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="staticBackdropLabel">Doble factor de autenticación</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <Authenticator />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../assets/ViewStyles/PerfilView.css'
import { listarTodo } from '@/server'
import { useUsuarioStore } from '@/assets/stores/infoUserTemp'
import Authenticator from '@/components/Authenticator.vue'

const usuario = ref({})

onMounted(async () => {
  try {
    const datos = useUsuarioStore().darIdentidadUsuario();

    const id_user = datos.id;
    const roll = datos.roll;
    
    let tipoUser;
    
    console.log('Cargando usuario con ID:', id_user);
    console.log('Rol del usuario:', roll);

    if (roll.toLowerCase() === 'cliente') {
      tipoUser = 'clientes';
    }else{
      tipoUser = 'empleados';
    }
    
    const response = await listarTodo(tipoUser);


    if (response) {
      console.log('Filtrando datos...');
      const soloID2 = response.filter(persona => Number(persona.id) === id_user)[0];
      console.log('Datos filtrados:', soloID2);
      usuario.value = {
        nombre: soloID2.nombre,
        apellidos: soloID2.apellidos,
        email: soloID2.email,
        telefono: soloID2.telefono,
        fecha_nacimiento: soloID2.fecha_nacimiento,
        usuario: soloID2.usuario,
        // clases_por_semana: soloID2.clases_por_semana
      };
      // console.log('Usuario cargado:', soloID2);
    }

  } catch (error) {
    console.error('Error al cargar el usuario:', error);
  }
});

</script>
