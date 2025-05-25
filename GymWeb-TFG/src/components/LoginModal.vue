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
  import { buscarUser } from '@/server'
  import '../assets/ComponentStyles/LoginModal.css'
  import { ref } from 'vue'
  import router from '@/router'

  import { useUsuarioStore } from '@/assets/stores/infoUserTemp'

  import { enviarCorreo } from '@/server/correo'
  
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
        console.log('ResultadoAAA:', resultado)
        console.log("resultado.rol_nombre: ",resultado.rol_nombre)
        console.log("IDDDDD :",resultado.id)
        console.log("tipo_usuario:::::::::::",resultado.tipo_usuario)
        useUsuarioStore().guardarIdentidadUsuario(resultado.id, resultado.rol_nombre);

        if (resultado.rol_nombre === 'CLIENTE') {
          router.push({ path: '/clientes' })
        } else {
          if(resultado.rol_nombre === 'ENTRENADOR'){
            router.push({ path: '/personal_limitado' })
          }else if(resultado.rol_nombre === 'ADMINISTRADOR'){
            router.push({ path: '/personal' })
          }
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

      useUsuarioStore().guardarInfo(info);

      function generarToken() {
        const fecha = Date.now().toString(36); // marca de tiempo en base 36
        const aleatorio = Math.random().toString(36).substring(2, 8); // 6 caracteres aleatorios
        return `${fecha}-${aleatorio}`;
      }

      const token = generarToken();
      console.log("Token único generado:", token);

      useUsuarioStore().guardarToken(token);
      // console.log("L token: ",useUsuarioStore().cargarToken());

      const baseUrl = window.location.href.split('#')[0];
      const newURL = baseUrl + `#code=${token}`;

      enviarCorreo(info.email, newURL);
      alert("Enlace de verficación enviado a tu correo para completar el registro.");
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
  