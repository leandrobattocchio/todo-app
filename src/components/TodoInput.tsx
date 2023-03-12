import { useState } from 'react'
import { createTodo } from '../services/todoService'
import { useTodoStore } from '../store/useTodoStore'

const TodoInput: React.FC = () => {
    const [todoInput, setTodoInput] = useState('')
    const [addTodo] = useTodoStore(state => [state.addTodo])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        setTodoInput('')
        createTodo({ title: todoInput, completed: false })
            .then(({ id }) => {
                addTodo({ id, title: todoInput, completed: false })
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <form onSubmit={handleSubmit} >
            <input type='text' className='new-todo' style={{ backgroundColor: '#c3c9c9' }} value={todoInput} onChange={({ target }) => { setTodoInput(target.value) }} />
        </form>
    )
}
export default TodoInput
