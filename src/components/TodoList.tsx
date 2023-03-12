
import { FILTERS } from '../conts'
import { useTodoStore } from '../store/useTodoStore'
import Todo from './Todo'

export const TodoList: React.FC = () => {
    const [todos, filter] = useTodoStore(state => [state.todos, state.filter])

    const todoFilters = todos.filter((todo) => {
        if (filter === FILTERS.COMPLETED) return todo.completed
        if (filter === FILTERS.NO_COMPLETED) return !todo.completed
        return todo
    })

    return (
        <ul className='todo-list'>
            {todoFilters.length > 0
                ? (
                    todoFilters.map((todo) => {
                        return <Todo key={todo.id} todo={todo} />
                    })
                )
                : <div className='no-todo-results'>No results</div>
            }
        </ul>
    )
}
