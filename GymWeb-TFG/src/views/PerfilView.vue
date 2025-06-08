<template>
  <div class="perfil-container">
    <div class="perfil-card">
      <h2>{{ usuario.nombre }} {{ usuario.apellidos }}</h2>

      <div class="perfil-info" v-if="!editandoPerfil">
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>Teléfono:</strong> {{ usuario.telefono }}</p>
        <p><strong>Fecha de nacimiento:</strong> {{ usuario.fecha_nacimiento }}</p>
        <p><strong>Usuario:</strong> {{ usuario.usuario }}</p>
      </div>

      <div class="perfil-info" v-else>
        <label>Email:
          <input v-model="usuarioEditado.email" class="form-control mb-2" />
        </label>
        <label>Teléfono:
          <input v-model="usuarioEditado.telefono" class="form-control mb-2" />
        </label>
        <label>Fecha de nacimiento:
          <input type="date" v-model="usuarioEditado.fecha_nacimiento" class="form-control mb-2" />
        </label>
        <label>Usuario:
          <input v-model="usuarioEditado.usuario" class="form-control mb-2" />
        </label>
        <label>Nueva contraseña:
          <input type="password" v-model="nuevaContrasena" class="form-control mb-2" />
        </label>
        <label>Confirmar contraseña:
          <input type="password" v-model="confirmarContrasena" class="form-control mb-2" />
        </label>
        <p v-if="errorContrasena" class="login-error-msg">
          Las contraseñas no coinciden. Por favor, revísalas.
        </p>
      </div>

      <p v-if="mensajeGuardado" class="login-success-msg">
        ✅ Perfil actualizado correctamente.
      </p>

      <div class="d-flex gap-2 mt-3">
        <button v-if="!editandoPerfil" class="btn-editar" @click="activarEdicion">Editar perfil</button>
        <button v-else class="btn btn-success" @click="guardarPerfil">Guardar cambios</button>
        <button class="btn-editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Doble factor</button>
      </div>
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
const usuarioEditado = ref({})
const editandoPerfil = ref(false)
const nuevaContrasena = ref('')
const confirmarContrasena = ref('')
const errorContrasena = ref(false)
const mensajeGuardado = ref(false)

function activarEdicion() {
  usuarioEditado.value = { ...usuario.value }
  editandoPerfil.value = true
  mensajeGuardado.value = false
}

function guardarPerfil() {
  errorContrasena.value = false
  mensajeGuardado.value = false

  if (nuevaContrasena.value && nuevaContrasena.value !== confirmarContrasena.value) {
    errorContrasena.value = true
    return
  }

  usuario.value = { ...usuarioEditado.value }
  if (nuevaContrasena.value) {
    console.log('Guardar nueva contraseña:', nuevaContrasena.value) // aquí se enviaría al servidor
  }
  editandoPerfil.value = false
  mensajeGuardado.value = true

  setTimeout(() => {
    mensajeGuardado.value = false
  }, 3000)
}

onMounted(async () => {
  try {
    const datos = useUsuarioStore().darIdentidadUsuario();
    const id_user = datos.id;
    const roll = datos.roll;
    let tipoUser;

    if (roll.toLowerCase() === 'cliente') {
      tipoUser = 'clientes';
    } else {
      tipoUser = 'empleados';
    }

    const response = await listarTodo(tipoUser);

    if (response) {
      const soloID2 = response.find(persona => Number(persona.id) === id_user);
      usuario.value = {
        nombre: soloID2.nombre,
        apellidos: soloID2.apellidos,
        email: soloID2.email,
        telefono: soloID2.telefono,
        fecha_nacimiento: soloID2.fecha_nacimiento,
        usuario: soloID2.usuario
      };
    }
  } catch (error) {
    console.error('Error al cargar el usuario:', error);
  }
})
</script>

