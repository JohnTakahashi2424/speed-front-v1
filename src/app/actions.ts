'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

// Obtener todas las tareas
export async function getTasks() {
  try {
    const { rows } = await sql`SELECT * FROM tasks ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Si la tabla no existe, devolvemos un array vacío para no romper la app
    return [];
  }
}

// Crear una nueva tarea
export async function createTask(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  if (!title) {
    throw new Error('El título es requerido');
  }

  try {
    await sql`
      INSERT INTO tasks (title, description)
      VALUES (${title}, ${description})
    `;
    revalidatePath('/');
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Fallo al crear la tarea');
  }
}

// Marcar una tarea como completada o no completada
export async function toggleTaskCompletion(id: number, currentStatus: boolean) {
  try {
    await sql`
      UPDATE tasks
      SET is_completed = ${!currentStatus}
      WHERE id = ${id}
    `;
    revalidatePath('/');
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Fallo al actualizar la tarea');
  }
}

// Eliminar una tarea
export async function deleteTask(id: number) {
  try {
    await sql`
      DELETE FROM tasks
      WHERE id = ${id}
    `;
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Fallo al eliminar la tarea');
  }
}
