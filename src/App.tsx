import { useEffect, useState } from "react"
import TodoInput from "./componenets/TodoInput"
import TodoList from "./componenets/TodoList"

function App() {

  // stateful variable
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function handleAddTodos(newTodoVal: any){
    const newTodoList = [...todos, newTodoVal]
    setTodos(newTodoList)
    persistData(newTodoList)
  }

  function handleDeleteTodo(index: number){
    const newTodoList = todos.filter((_, todoIndex) => {      
      return todoIndex !== index
    })
    setTodos(newTodoList)
    persistData(newTodoList)

  }

  function handleEditTodo(index: number){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)

  }

  function persistData(newList: any[]) {
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  useEffect(() => {
    if (!localStorage){
      return
    }
    const localTodos = localStorage.getItem('todos')
    if (!localTodos){
      return
    }
    const parsedTodos = JSON.parse(localTodos).todos
    setTodos(parsedTodos)
  }, [])

  return (
    <>
     <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos = {handleAddTodos}/>
     <TodoList todos={todos} handleDeleteTodo = {handleDeleteTodo}  handleEditTodo={handleEditTodo}/>
    </>
  )
}

export default App
