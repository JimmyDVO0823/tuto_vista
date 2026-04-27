import { supabase } from './tuto_vista_vite/src/lib/supabase.js';

async function testFetch() {
  const { data, error } = await supabase
    .from('perfiles_tutor')
    .select(`
      *,
      perfiles:usuario_id (
        nombre_completo,
        url_avatar
      ),
      tutor_materias (
        materia_id,
        materias (
          nombre
        )
      )
    `)
    .eq('esta_disponible', true);
  
  if (error) {
    console.error('Error fetching tutors:', error);
  } else {
    console.log('Tutors found:', JSON.stringify(data, null, 2));
  }
}

// testFetch(); // Uncomment if running locally with node and appropriate environment variables
