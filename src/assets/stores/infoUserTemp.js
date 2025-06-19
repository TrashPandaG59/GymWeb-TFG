import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUsuarioStore = defineStore('usuario', () => {
  const info = ref({});

  const guardarToken = (token) => {
    info.value.token = token;
    localStorage.setItem('token', token);
  };

  const cargarToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      info.value.token = token;
      return token;
    }
  };

  const eliminarToken = () => {
    info.value.token = null;
    localStorage.removeItem('token');
  };

  const guardarInfo = (userInfo) => {
    info.value = { ...userInfo };
    // console.log('Guardando info:', info.value);
    localStorage.setItem('info', JSON.stringify(info.value));
  };

  const cargarInfo = () => {
    const data = localStorage.getItem('info');
    if (data) {
      info.value = JSON.parse(data);
      // console.log('Cargando info:', info.value);
      const { token, ...usuarioSinToken } = info.value;
      return usuarioSinToken;
    }
  };

  // NUEVAS FUNCIONES PARA id y roll
  const guardarIdentidadUsuario = ( id, roll ) => {
    const identidad = { id, roll };
    // console.log('Guardando identidad del usuario:', identidad);
    localStorage.setItem('identidad_usuario', JSON.stringify(identidad));
  };

  const darIdentidadUsuario = () => {
    const data = localStorage.getItem('identidad_usuario');
    // console.log('Datos de identidad del usuario:', data);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  const borrarIdentidadUsuario = () => {
    localStorage.removeItem('identidad_usuario');
  };

  return {
    info,
    guardarToken,
    cargarToken,
    eliminarToken,

    guardarInfo,
    cargarInfo,
    
    guardarIdentidadUsuario,
    darIdentidadUsuario,
    borrarIdentidadUsuario
  };
});
