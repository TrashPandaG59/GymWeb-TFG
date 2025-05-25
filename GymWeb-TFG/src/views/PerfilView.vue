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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../assets/ViewStyles/PerfilView.css'
import { listarTodo } from '@/server'
import { useUsuarioStore } from '@/assets/stores/infoUserTemp'

const usuario = ref({
  nombre: 'María',
  apellidos: 'Pérez López',
  email: 'maria@example.com',
  telefono: '+34 612 345 678',
  fecha_nacimiento: '1990-06-15',
  usuario: 'mariap',
  // clases_por_semana: 3
})

onMounted(async () => {
  try {
    const datos = useUsuarioStore().darIdentidadUsuario();

    const id_user = datos.id;
    const roll = datos.roll;
    
    let tipoUser;
    
    if (roll.toLowerCase() === 'clientes') {
      tipoUser = 'clientes';
    }else{
      tipoUser = 'empleados';
    }
    
    const response = await listarTodo(tipoUser);


    if (response) {
      console.log('Filtrando datos...');
      const soloID2 = response.filter(persona => Number(persona.id) === id_user)[0];
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
