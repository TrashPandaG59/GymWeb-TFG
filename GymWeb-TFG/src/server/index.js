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

export const guardar_fichar = async (id_usuario, roll_usuario, estado) => {
  try {
    let data, error;

    const now = new Date();

    const fecha = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const hora = now.toTimeString().split(' ')[0]; // "HH:MM:SS"

    if (roll_usuario.toLowerCase() === 'cliente') {
      ({ data, error } = await supabase.from('asistencias_clientes').insert([
        {
          cliente_id: id_usuario,
          fecha: fecha,
          hora_entrada: hora,
          hora_salida: null,
          estado: estado
        }
      ]));
    } else {
      ({ data, error } = await supabase.from('asistencias_empleados').insert([
        {
          empleado_id: id_usuario,
          fecha: fecha,
          hora_entrada: hora,
          hora_salida: null,
          estado: estado
        }
      ]));
    }

    if (error) {
      console.error('Error al fichar :', error.message);
    } else {
      console.log('Fichado con éxito:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};

export const guardar_salida = async (id_usuario, roll_usuario, estado) => {
  try {
    const now = new Date();
    const hora = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
    const tabla = roll_usuario.toLowerCase() === 'cliente' ? 'asistencias_clientes' : 'asistencias_empleados';
    const tipoUser = roll_usuario.toLowerCase() === 'cliente' ? 'cliente_id' : 'empleado_id';

    // Obtener el id del último registro creado por ese usuario
    const { data: ultimoRegistro, error: fetchError } = await supabase
      .from(tabla)
      .select('id') // Solo necesitamos el ID
      .eq(tipoUser, id_usuario)
      .order('hora_entrada', { ascending: false }) // Orden por creación
      .limit(1)
      .single(); // Solo uno

    if (fetchError || !ultimoRegistro) {
      console.error('No se encontró registro:', fetchError?.message);
      return;
    }

    const asistenciaId = ultimoRegistro.id;

    // Ahora hacemos el update solo a ese registro
    const { data, error } = await supabase
      .from(tabla)
      .update({
        hora_salida: hora,
        estado: estado
      })
      .eq('id', asistenciaId);

    if (error) {
      console.error('Error al hacer update:', error.message);
    } else {
      console.log('Registro actualizado:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err.message);
  }
};



export const obtener_hora_entrada = async (id_usuario, roll) => {
  console.log('Obteniendo hora de entrada para el usuario:', id_usuario);
  console.log('Rol del usuario:', roll);

  let tipo_user, tabla;

  if (roll.toLowerCase() === 'cliente') {
    tipo_user = 'cliente_id';
    tabla = 'asistencias_clientes';
  } else {
    tipo_user = 'empleado_id';
    tabla = 'asistencias_empleados';
  }


  console.log('Tipo de usuario:', tipo_user);
  console.log('Tabla:', tabla);

  try {
    const { data, error } = await supabase
      .from(`${tabla}`)
      .select('estado')
      .eq(`${tipo_user}`, id_usuario)
      .order('hora_entrada', { ascending: false }) // Orden por creación
      .limit(1)
      .single(); // Solo uno

    if (error) {
      console.error('Error al buscar usuario:', error.message);
      return false;
    } else if (data) {
      console.log('Usuario encontrado:', data.estado);

      return data.estado;
    } else {
      console.log('Usuario no encontrado');
      return false;
    }
  } catch (err) {
    console.error('Error:', err.message);
    return false;
  }
};

export const apuntarse_a_la_Clase = async (id_user, id_clase) => {
  try {

    console.log('Apuntando al usuario:', id_user, 'a la clase:', id_clase);
    const { data, error } = await supabase
      .rpc('p_clase_cliente', {
        c_clase_id: id_clase,
        c_cliente_id: id_user
      });

    if (error) {
      console.error('Error al unirse a la clase:', error.message);
    } else {
      console.log('Usuario registrado en clase con éxito:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};

export const guardarDobleFactor = async (id_usuario, roll_usuario, code) => {
  try {
    let data, error;

    if (roll_usuario.toLowerCase() === 'cliente') {
      ({ data, error } = await supabase
        .from('clientes')
        .update({ cod_multifactor: code })
        .eq('id', id_usuario));
    } else {
      ({ data, error } = await supabase
        .from('empleados')
        .update({ cod_multifactor: code })
        .eq('id', id_usuario));
    }

    if (error) {
      console.error('Error al fichar :', error.message);
    } else {
      console.log('Fichado con éxito:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};

export const buscarDobleFactor = async (username) => {
  try {
    const { data, error } = await supabase
      .from('v_validar_usuario')
      .select('*')
      .eq('usuario', username)
      .maybeSingle();

    if (error) {
      console.error('Error al buscar usuario:', error.message);
      return false;
    } else if (data) {
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