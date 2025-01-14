/* eslint-disable @typescript-eslint/naming-convention */
import Task from '#models/task'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [state, setState] = useState<'list' | 'create' | 'edit'>('list')
  const [todos, setTodos] = useState<Task[]>([])
  const [edit, setEdit] = useState<Task | null>(null)

  async function fetchTodos() {
    const response = await fetch('/api/todos')
    const data = await response.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  function handleTabClick(button: HTMLButtonElement) {
    setState(button.id as 'list' | 'create' | 'edit')
  }

  async function onDelete(id: number) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    await fetchTodos()
  }

  async function onUpdate(id: number) {
    setEdit(todos.find((todo) => todo.id === id)!)
    setState('edit')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const title = (form.title as unknown as HTMLInputElement).value
    const isCompleted = form.isCompleted.checked

    await fetch(`/api/todos${state === 'edit' ? `/${edit!.id}` : ''}`, {
      method: state === 'edit' ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, isCompleted }),
    })

    await fetchTodos()

    setEdit(null)
    setState('list')
  }

  return (
    <>
      <Head title="Homepage" />

      <div className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-6xl font-medium text-[#5a45ff] mb-12">Todo-List App</h1>
        <div className="flex flex-col p-5 gap-2 bg-[#5a45ff] w-full max-w-4xl rounded-xl">
          <div className="flex gap-2">
            <button
              id="list"
              onClick={(x) => handleTabClick(x.target as HTMLButtonElement)}
              className="p-2 bg-[#f9f9f9] rounded-md font-medium"
            >
              View Task
            </button>
            <button
              id="create"
              onClick={(x) => handleTabClick(x.target as HTMLButtonElement)}
              className="p-2 bg-[#f9f9f9] rounded-md font-medium"
            >
              Create Task
            </button>
          </div>
          <hr />
          {state === 'list' ? (
            <div className="flex flex-col bg-[#f9f9f9] rounded-md p-2 min-h-10">
              {todos.length ? (
                todos.map((todo, i) => (
                  <div
                    key={todo.id}
                    className="flex justify-between items-center p-2 border-[#5a45ff]"
                  >
                    <p className="font-medium">
                      {++i}. {todo.title} ({todo.isCompleted ? 'Completed' : 'Not Completed'})
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdate(todo.id)}
                        className="p-2 bg-[#5a45ff] text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(todo.id)}
                        className="p-2 bg-red-700 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center font-medium">Task Empty</p>
              )}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-[#f9f9f9] rounded-xl overflow-hidden p-5 gap-3"
            >
              <input
                name="title"
                type="text"
                placeholder="Task Title"
                value={edit?.title}
                onChange={(x) => state === 'edit' && setEdit({ ...edit!, title: x.target.value })}
                className="p-2 rounded-md border-[1px]"
              />
              <div className="flex">
                <input
                  name="isCompleted"
                  id="isCompleted"
                  type="checkbox"
                  checked={edit?.isCompleted}
                  onChange={(x) =>
                    state === 'edit' && setEdit({ ...edit!, isCompleted: x.target.checked })
                  }
                  className="peer hidden"
                />
                <label
                  htmlFor="isCompleted"
                  className="select-none cursor-pointer rounded-lg border-2 py-2 px-4 font-medium transition-colors duration-200 ease-in-out peer-checked:bg-[#5a45ff] peer-checked:text-[#f9f9f9] peer-checked:border-gray-200"
                >
                  Completed
                </label>
              </div>
              <button type="submit" className="p-2 bg-[#5a45ff] text-white rounded-md">
                {state === 'edit' ? 'Update' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
