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

export const buscarUser = async (username, pass) => {
  const hashedPass = await hashear(pass);
  console.log('Buscando usuario:', username, hashedPass); 
  try {
    const { data, error } = await supabase
      .from('v_validar_usuario')
      .select('*')
      .eq('usuario', username)
      .eq('contrasena', hashedPass)
      .maybeSingle(); 

    if (error) {
      console.error('Error al buscar usuario:', error.message);
      return false; 
    } else if (data) {
      console.log('Usuario encontrado:', data.usuario);
      console.log('Usuario ROLL:', data.rol_nombre);
      console.log('DATA:', data);

      return data; 
    } else {
      console.log('Usuario no encontrado');
      return false; 
    }
  } catch (err) {
    console.error('Error:', err.message);
    return false; 
  }
};

export const insertarUsuario = async (info) => {
  try {

    info.contrasena = await hashear(info.contrasena);
    console.log('Insertando usuario:', info); 
    const { data, error } = await supabase
    .rpc('p_alta_cliente', {
      c_apellidos: info.apellidos,
      c_contrasena: info.contrasena,
      c_email: info.email,
      c_fecha_nacimiento: info.fecha_nacimiento,
      c_nombre: info.nombre,
      c_telefono: info.telefono,
      c_usuario: info.usuario
  });

    if (error) {
      console.error('Error al guardar el usuario:', error.message);
    } else {
      console.log('Usuario guardado con éxito:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};


export const listarTodo = async (roll) => {
  try {
    const { data, error } = await supabase
      .from(roll)
      .select('*')
      // .maybeSingle(); 

    if (error) {
      console.error('Error al buscar usuario:', error.message);
      return false; 
    } else if (data) {
      console.log('Usuario encontrado:', data); 

      return data; 
    } else {
      console.log('Usuario no encontrado');
      return false; 
    }
  } catch (err) {
    console.error('Error:', err.message);
    return false; 
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