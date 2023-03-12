import debounce from 'just-debounce-it'
import { useCallback, useState } from 'react'
import { deleteTodoFromDatabase, updateTodoInDataBase } from '../services/todoService'
import { useTodoStore } from '../store/useTodoStore'
import { type Todo as TodoType } from '../type'

interface Props {
    todo: TodoType
}
const Todo: React.FC<Props> = ({ todo }) => {
    const [toggleCompletedTodo, deleteTodo, updateTodoInStore] = useTodoStore(state => [state.toggleCompletedTodo, state.deleteTodo, state.updateTodoInStore])
    const [isEditing, setIsEditing] = useState(false)
    const [editInput, setEditInput] = useState(todo.title)

    const debounceUpdateTodo = debounce(useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        updateTodoInDataBase({ id: todo.id, completed: event.target.checked, title: todo.title })
    }, []), 1000)

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        toggleCompletedTodo({
            id: todo.id,
            completed: event.target.checked
        })
        debounceUpdateTodo(event)
    }, []
    )

    const handleDelete = (): void => {
        deleteTodo({ id: todo.id })
        deleteTodoFromDatabase({ id: todo.id })
            .catch(error => { console.log(error) })
    }

    const handleDoubleClick = (): void => {
        setIsEditing(true)
    }

    const handleCancelEdit = (): void => {
        setIsEditing(false)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        updateTodoInStore({ id: todo.id, completed: todo.completed, title: editInput })
        updateTodoInDataBase({ id: todo.id, completed: todo.completed, title: editInput })
        setIsEditing(false)
    }

    const isCompleted = todo.completed
    const className = isCompleted ? 'completed' : ''

    return (
        <li key={todo.id} className={className}>
            {
                isEditing
                    ? (
                        <form onSubmit={handleSubmit} className='edit-todo'>
                            <input className='completed'
                                value={editInput}
                                onChange={({ target }) => { setEditInput(target.value) }}
                            />
                            <div>
                                <button type='submit'>✔</button>
                                <button onClick={handleCancelEdit}>✘</button>
                            </div>
                        </form>
                    )
                    : (
                        <>
                            <input className='toggle' type='checkbox' onChange={handleChange} checked={todo.completed} />
                            <label className='completed' onDoubleClick={handleDoubleClick}><span>{todo.title}</span></label>
                            <button className='destroy' onClick={handleDelete}></button>
                        </>
                    )
            }
        </li>
    )
}

export default Todo
