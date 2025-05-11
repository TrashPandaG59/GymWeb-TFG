<template>
    <div class="modal-overlay" @click.self="cerrar">
      <div class="form-box">
        <!-- LOGIN -->
        <form class="form" @submit.prevent="loginF" v-if="vista === 'login'">
          <span class="title">Iniciar sesión</span>
          <span class="subtitle">Accede a tu cuenta para continuar</span>
  
          <div class="form-container">
            <input class="input" type="text" placeholder="Usuario" v-model="usuario" required />
            <input class="input" type="password" placeholder="Contraseña" v-model="password" required />
          </div>
  
          <button type="submit">Entrar</button>
  
          <div class="form-section">
            ¿No tienes cuenta? <a href="#" @click.prevent="vista = 'registro'">Regístrate</a>
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
  
          <div class="form-section">
            ¿Ya tienes cuenta? <a href="#" @click.prevent="vista = 'login'">Iniciar sesión</a>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { buscarUser, insertarUsuario } from '@/server'
  import '../assets/ComponentStyles/LoginModal.css'
  import { ref } from 'vue'
  
  const emit = defineEmits(['close'])
  
  const vista = ref('login')
  
  // --- LOGIN ---
  const usuario = ref('')
  const password = ref('')
  
  function cerrar() {
    emit('close')
  }
  
  function loginF() {
    console.log('Usuario:', usuario.value)
    console.log('Password:', password.value)
  
    buscarUser(usuario.value, password.value)
      .then(resultado => {
        alert(resultado.rol_nombre)
        if (resultado.tipo_usuario === 'Cliente'){
          router.push({ path: '/clientes' })
        } else {
          router.push({ path: '/personal' })
        }
      })
      .catch(error => {
        console.error('Error en el login:', error)
      })
  
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
    if (contrasena.value !== confirmarContrasena.value) {
      alert('Las contraseñas no coinciden. Por favor, revísalas.')
      return
    }else{
      const info = {
        nombre: nombre.value,
        apellidos: apellidos.value,
        email: email.value,
        telefono: telefono.value,
        fecha_nacimiento: fecha_nacimiento.value,
        usuario: usuarioRegistro.value,
        contrasena: contrasena.value
      }
      insertarUsuario(info)
        .then(resultado => {
          alert(resultado)
        })
        .catch(error => {
          console.error('Error en el registro:', error)
        })
    }
  
    // console.log('Datos de registro:')
    // console.log({
    //   nombre: nombre.value,
    //   apellidos: apellidos.value,
    //   email: email.value,
    //   telefono: telefono.value,
    //   fecha_nacimiento: fecha_nacimiento.value,
    //   usuario: usuarioRegistro.value,
    //   contrasena: contrasena.value
    // })
  
    // alert('Te has registrado correctamente (demo)')
    cerrar()
  }
  </script>
  