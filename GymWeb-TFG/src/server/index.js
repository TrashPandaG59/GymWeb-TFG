import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hdrhnxjxrlwypkarclsn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcmhueGp4cmx3eXBrYXJjbHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNTAyODUsImV4cCI6MjA2MTkyNjI4NX0.H_VlradD7UPsP5zqqp0l5FxF6fdOWJwb6FIkILGVUXA'
);

const prueba = async (name) => {
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      // .eq('pokemonName', name)
      .maybeSingle(); // .single() para obtener solo un resultado

    if (error) {
      console.error('Error al buscar usuario:', error.message);
      return false; // Si hay error, devuelve false
    } else if (data) {
      // console.log('Usuario encontrado:', data.prompt); // Imprimir el usuario encontrado
      return data; // Retorna el prompt si se encuentra
    } else {
      console.log('Usuario no encontrado');
      return false; // Si no se encuentra el usuario, devuelve false
    }
  } catch (err) {
    console.error('Error:', err.message);
    return false; // En caso de error en la ejecución, devuelve false
  }
};

const insertarUsuario = async () => {
  try {
    const { data, error } = await supabase
      .from('clientes') // Cambia esto si tu tabla se llama diferente
      .insert([
        {
          nombre: 'dani',
          apellidos: 'el dani',
          email: 'dani@gmail.com',
          telefono: '123456788',
          fecha_nacimiento: '1025-05-04',
          usuario: 'crotolamo',
          contrasena: 'dani1234',
          activo: true
        }
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


console.log('prueba', await prueba('pepe'));
console.log('prueba', await insertarUsuario());