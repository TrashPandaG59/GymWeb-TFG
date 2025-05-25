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
    console.log('Guardando info:', info.value);
    localStorage.setItem('info', JSON.stringify(info.value));
  };

  const cargarInfo = () => {
    const data = localStorage.getItem('info');
    if (data) {
      info.value = JSON.parse(data);
        console.log('Cargando info:', info.value);
        const { token, ...usuarioSinToken } = info.value;
        return usuarioSinToken;
    }
  };

  return {
    info,
    guardarToken,
    cargarToken,
    eliminarToken,
    guardarInfo,
    cargarInfo
  };
});
