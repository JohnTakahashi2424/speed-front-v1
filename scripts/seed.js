const { sql } = require('@vercel/postgres');

async function main() {
  try {
    console.log('Iniciando la creación de la tabla...');
    
    // Crear la tabla de tareas
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log('¡Tabla "tasks" creada exitosamente o ya existía!');
    
    // Opcional: Insertar una tarea de prueba si la tabla está vacía
    const result = await sql`SELECT COUNT(*) FROM tasks`;
    if (result.rows[0].count === '0') {
      console.log('Insertando una tarea de prueba...');
      await sql`
        INSERT INTO tasks (title, description)
        VALUES ('Probar Vercel', 'Desplegar esta aplicación para probar Vercel y Postgres')
      `;
      console.log('Tarea de prueba insertada.');
    }
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
}

main();
