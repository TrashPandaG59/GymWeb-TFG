<template>
  <div class="modal-overlay">
    <div class="form-box">
      <!-- LOGIN -->
      <form class="form" @submit.prevent="loginF" v-if="vista === 'login'">
        <span class="title">Iniciar sesión</span>
        <span class="subtitle">Accede a tu cuenta para continuar</span>

        <div class="form-container">
          <input class="input" type="text" placeholder="Usuario" v-model="usuario" required />
          <input class="input" type="password" placeholder="Contraseña o Código doble factor" v-model="password" required />
        </div>

        <button type="submit">Entrar</button>

        <!-- Mensaje de error -->
        <p v-if="errorLogin" class="login-error-msg">
          Usuario, contraseña o código de doble factor incorrectos. Inténtalo de nuevo.
        </p>

        <div class="form-section">
          ¿No tienes cuenta?
          <a href="#" @click.prevent="vista = 'registro'; errorLogin = false">Regístrate</a>
        </div>
        <div class="form-section">
          <button type="button" @click="cerrar" class="btn-cerrar-mini">Cancelar</button>
        </div>
      </form>

      <!-- REGISTRO -->
      <form class="form" @submit.prevent="registrarF" v-else>
        <span class="title">Registro</span>
        <span class="subtitle">Crea tu cuenta</span>

        <div class="form-container">
          <input class="input" type="text" placeholder="Nombre" v-model="nombre" required />
          <input class="input" type="text" placeholder="Apellidos" v-model="apellidos" />
          <input class="input" type="email" placeholder="Email" v-model="email" required />
          <input class="input" type="tel" placeholder="Teléfono" v-model="telefono" />
          <input class="input" type="date" placeholder="Fecha de nacimiento" v-model="fecha_nacimiento" />
          <input class="input" type="text" placeholder="Usuario" v-model="usuarioRegistro" required />
          <input class="input" type="password" placeholder="Contraseña" v-model="contrasena" required />
          <input class="input" type="password" placeholder="Confirmar contraseña" v-model="confirmarContrasena" required />
        </div>

        <button type="submit">Registrarse</button>

        <!-- Mensaje de error de contraseñas -->
        <p v-if="errorRegistro" class="login-error-msg">
          Las contraseñas no coinciden. Por favor, revísalas.
        </p>

        <!-- Mensaje de éxito -->
        <div v-if="registroExitoso" class="login-success-msg">
          <p>✅ Enlace de verificación enviado a tu correo para completar el registro.</p>
        </div>

        <div class="form-section">
          ¿Ya tienes cuenta?
          <a href="#" @click.prevent="vista = 'login'">Iniciar sesión</a>
        </div>

        <!-- Botón de cerrar solo visible en modo registro -->
        <div class="form-section">
          <button type="button" @click="cerrar" class="btn-cerrar-mini">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { buscarUser } from '@/server'
import { validarDobleFactor } from '@/server/validarDobleFactor'
import { buscarDobleFactor } from '@/server'
import { enviarCorreo } from '@/server/correo'
import { useUsuarioStore } from '@/assets/stores/infoUserTemp'
import '../assets/ComponentStyles/LoginModal.css'

const emit = defineEmits(['close'])

const vista = ref('login')
const errorLogin = ref(false)
const errorRegistro = ref(false)
const registroExitoso = ref(false)

// --- LOGIN ---
const usuario = ref('')
const password = ref('')

function cerrar() {
  emit('close')
  registroExitoso.value = false
}

async function loginF() {
  
  // console.log('Usuario:', usuario.value)
  // console.log('Password:', password.value)

  const haytoken = ref(true)

  const token = await buscarDobleFactor(usuario.value)
  // console.log("Token de doble factor:", token.cod_multifactor)
  if (token.cod_multifactor != null) {
    haytoken.value = validarDobleFactor(token.cod_multifactor, password.value);
  }


  if (!haytoken.value) {
    buscarUser(usuario.value, password.value)
      .then(resultado => {
        // console.log('ResultadoAAA:', resultado)
        // console.log("resultado.rol_nombre: ", resultado.rol_nombre)
        // console.log("IDDDDD :", resultado.id)
        // console.log("tipo_usuario:::::::::::", resultado.tipo_usuario)
        useUsuarioStore().guardarIdentidadUsuario(resultado.id, resultado.rol_nombre);

        if (resultado.rol_nombre === 'CLIENTE') {
          router.push({ path: '/clientes' })
        } else {
          if (resultado.rol_nombre === 'ENTRENADOR') {
            router.push({ path: '/personal_limitado' })
          } else if (resultado.rol_nombre === 'ADMINISTRADOR') {
            router.push({ path: '/personal' })
          }
        }
      })
      .catch(error => {
        console.error('Error en el login:', error)
      })
  } else {
    const resultado = token;
    // console.log('Doble factor verificado, resultado:', resultado)
    // console.log('ResultadoAAA:', resultado)
    // console.log("resultado.rol_nombre: ", resultado.rol_nombre)
    // console.log("IDDDDD :", resultado.id)
    // console.log("tipo_usuario:::::::::::", resultado.tipo_usuario)
    useUsuarioStore().guardarIdentidadUsuario(resultado.id, resultado.rol_nombre);

    if (resultado.rol_nombre === 'CLIENTE') {
      router.push({ path: '/clientes' })
    } else {
      if (resultado.rol_nombre === 'ENTRENADOR') {
        router.push({ path: '/personal_limitado' })
      } else if (resultado.rol_nombre === 'ADMINISTRADOR') {
        router.push({ path: '/personal' })
      }
    }
  }


  cerrar()
}

// --- REGISTRO ---
const nombre = ref('')
const apellidos = ref('')
const email = ref('')
const telefono = ref('')
const fecha_nacimiento = ref('')
const usuarioRegistro = ref('')
const contrasena = ref('')
const confirmarContrasena = ref('')

function registrarF() {
  errorRegistro.value = false
  registroExitoso.value = false

  if (contrasena.value !== confirmarContrasena.value) {
    errorRegistro.value = true
    return
  }

  const info = {
    nombre: nombre.value,
    apellidos: apellidos.value,
    email: email.value,
    telefono: telefono.value,
    fecha_nacimiento: fecha_nacimiento.value,
    usuario: usuarioRegistro.value,
    contrasena: contrasena.value
  }

  useUsuarioStore().guardarInfo(info)

  const token = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`
  useUsuarioStore().guardarToken(token)

  const baseUrl = window.location.href.split('#')[0]
  const newURL = `${baseUrl}#code=${token}`

  enviarCorreo(info.email, newURL)
  registroExitoso.value = true

  setTimeout(() => {
    cerrar()
  }, 5000)
}
</script>

