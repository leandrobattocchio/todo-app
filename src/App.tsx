import Filters from './components/Filters'
import { TodoList } from './components/TodoList'
import TodoInput from './components/TodoInput'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import { getTodos, getTodosIds } from './services/todoService'
import { useTodoStore } from './store/useTodoStore'
import 'todomvc-app-css/index.css'
import './App.css'
import Spinner from './components/Spinner'

function App (): JSX.Element {
  const [addInitialsTodos] = useTodoStore(state => [state.addInitialsTodos])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getTodosIds()
      .then((response) => {
        getTodos(response)
          .then((response) => {
            addInitialsTodos(response)
            setIsLoading(false)
          })
          .catch((error) => { console.log(error) })
      })
      .catch((error) => { console.log(error) })
  }, [])

  return (
    <main className="main">
      <div className='todoapp'>
        <Header />
        {
          isLoading
            ? <Spinner />
            : (
              <>
                <TodoInput />
                <TodoList />
                <Filters />
              </>
            )
        }
      </div>
    </main>
  )
}

export default App
