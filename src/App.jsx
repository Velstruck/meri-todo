import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  //Adding todos
  const addTodo = (todo) => {
    setTodos((prev) => [ ...prev,{ id: Date.now(), ...todo }])
  }
  //Updating todos
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  //Deleting todos
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  //Toggle complete
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((PrevTodo) => PrevTodo.id === id ? { ...PrevTodo, completed: !PrevTodo.completed } : PrevTodo))
  }

  //Local Storage get
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }

  }, [])

  //Local Storage set
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, toggleComplete, updateTodo }}>
      <div className='bg-[#172842] min-h-screen min-w-screen py-8'>
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Tasks</h1>
            <div className="mb-4">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div className='w-full' key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
            </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
