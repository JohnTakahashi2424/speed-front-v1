import { getTasks, createTask, toggleTaskCompletion, deleteTask } from './actions';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
            Vercel Task Manager
          </h1>
          <p className="text-neutral-400">
            Un proyecto de prueba con Next.js y PostgreSQL en Vercel
          </p>
        </header>

        {/* Formulario para agregar tareas */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-neutral-200">Nueva Tarea</h2>
          <form action={createTask} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="¿Qué necesitas hacer?"
              required
              className="bg-neutral-950 border border-neutral-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="text"
              name="description"
              placeholder="Descripción (opcional)"
              className="bg-neutral-950 border border-neutral-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Añadir Tarea
            </button>
          </form>
        </section>

        {/* Lista de tareas */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-neutral-200">Tus Tareas</h2>
          {tasks.length === 0 ? (
            <div className="text-center p-8 border border-neutral-800 border-dashed rounded-2xl text-neutral-500">
              No hay tareas todavía. ¡Crea la primera!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {tasks.map((task: any) => (
                <div
                  key={task.id}
                  className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                    task.is_completed
                      ? 'bg-neutral-900/50 border-neutral-800/50 opacity-60'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Botón para completar */}
                    <form action={toggleTaskCompletion.bind(null, task.id, task.is_completed)}>
                      <button type="submit" className="mt-1 text-neutral-400 hover:text-blue-400 transition-colors">
                        {task.is_completed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>
                    </form>
                    
                    <div>
                      <h3 className={`text-lg font-medium ${task.is_completed ? 'line-through text-neutral-500' : 'text-neutral-100'}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-neutral-400 mt-1">{task.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Botón para eliminar */}
                  <form action={deleteTask.bind(null, task.id)}>
                    <button type="submit" className="text-neutral-600 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
