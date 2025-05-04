import { createClient } from '@supabase/supabase-js';

import bcrypt from 'bcryptjs';

const hashear = async (password) => {
  const phrase = 'Ensaimadas en mallas';
  const base64Salt = btoa(phrase).slice(0, 22);
  const manualSalt = `$2a$10$${base64Salt}`;

  try {
    const hash = await bcrypt.hash(password, manualSalt);
    console.log('Contraseña hasheada con salt "Ensaimadas en mallas":', hash);
    return hash;
  } catch (err) {
    console.error('Error al hashear la contraseña:', err);
    return null;
  }
};


const supabase = createClient(
  'https://hdrhnxjxrlwypkarclsn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcmhueGp4cmx3eXBrYXJjbHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNTAyODUsImV4cCI6MjA2MTkyNjI4NX0.H_VlradD7UPsP5zqqp0l5FxF6fdOWJwb6FIkILGVUXA'
);

export const buscarUser = async (name, pass) => {
  const hashedPass = await hashear(pass);
  console.log('Buscando usuario:', name, hashedPass); // Imprimir los parámetros de búsqueda
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('nombre', name)
      .eq('contrasena', hashedPass)
      .maybeSingle(); // .single() para obtener solo un resultado

    if (error) {
      console.error('Error al buscar usuario:', error.message);
      return false; // Si hay error, devuelve false
    } else if (data) {
      console.log('Usuario encontrado:', data.prompt); // Imprimir el usuario encontrado

      return data.nombre; // Retorna el prompt si se encuentra
    } else {
      console.log('Usuario no encontrado');
      return false; // Si no se encuentra el usuario, devuelve false
    }
  } catch (err) {
    console.error('Error:', err.message);
    return false; // En caso de error en la ejecución, devuelve false
  }
};

export const insertarUsuario = async (info) => {
  try {

    info.contrasena = await hashear(info.contrasena);
    console.log('Insertando usuario:', info); // Imprimir la información del usuario a insertar
    const { data, error } = await supabase
      .from('clientes') // Cambia esto si tu tabla se llama diferente
      .insert([
        info
      ]);

    if (error) {
      console.error('Error al guardar el usuario:', error.message);
    } else {
      console.log('Usuario guardado con éxito:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};


// console.log('prueba', await insertarUsuario(
//   {
//     nombre: 'dani2',
//     apellidos: 'el dani1',
//     email: 'dani2@gmail.com',
//     telefono: '123456781',
//     fecha_nacimiento: '1025-05-01',
//     usuario: 'crotolamo1',
//     contrasena: await hashear('1234'),
//     activo: true
//   }
// ));