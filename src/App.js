import {TiPencil} from 'react-icons/ti'
import {RxCross1} from 'react-icons/rx'
import {useState} from 'react'
import './App.css'

const TodoItem = ({id, task, onUpdate, onDelete, count}) => {
  const [updatedCount, setUpdatedCount] = useState(count)
  const [isEditing, setIsEditing] = useState(false)
  const [updatedTask, setUpdatedTask] = useState(task)

  const handleUpdate = () => {
    setUpdatedCount(updatedCount + 1)
    onUpdate(id, updatedTask)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  const handleInputChange = e => {
    setUpdatedTask(e.target.value)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setUpdatedTask(task)
    setIsEditing(false)
  }

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input type="text" value={updatedTask} onChange={handleInputChange} />
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
          <button type="button" onClick={handleUpdate}>
            Save
          </button>
        </>
      ) : (
        <>
          <span>
            {task} (Changed {updatedCount}{' '}
            {updatedCount === 1 ? 'time' : 'times'})
          </span>

          <button
            aria-label="Update Task"
            type="button"
            onClick={handleEditClick}
          >
            <TiPencil />
          </button>
          <button
            type="button"
            aria-label="Delete Task"
            onClick={handleDelete}
            className="deletebtn"
          >
            <RxCross1 />
          </button>
        </>
      )}
    </div>
  )
}

const TodoList = ({todos, onUpdate, onDelete}) => (
  <div>
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        task={todo.task}
        onUpdate={onUpdate}
        onDelete={onDelete}
        count={todo.count}
      />
    ))}
  </div>
)

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const matches = newTodo.match(/(.+)\s(\d+)/)
      const task = matches ? matches[1] : newTodo
      const quantity = matches ? parseInt(matches[2], 10) : 1

      for (let i = 0; i < quantity; i += 1) {
        setTodos(prevTodos => [
          ...prevTodos,
          {id: Date.now() + i, task, count: 0},
        ])
      }

      setNewTodo('')
    }
  }

  const handleUpdate = (id, updatedTask) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {...todo, task: updatedTask, count: todo.count + 1}
          : todo,
      ),
    )
  }

  const handleDelete = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <h1 className="h1">Day Goals!</h1>
      <input
        type="text"
        placeholder="Add a todo"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button type="button" onClick={addTodo}>
        Add Todo
      </button>
      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  )
}
export default App