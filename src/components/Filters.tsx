import { FILTER_BUTTONS } from '../conts'
import { type FiltersValue } from '../type'
import { useTodoStore } from '../store/useTodoStore'
import '../App.css'

const Filters: React.FC = () => {
    const [filter, changeFilter, todos, clearCompletedTodos] = useTodoStore(state => [state.filter, state.changeFilter, state.todos, state.clearCompletedTodos])
    const completedCount: number = todos.filter((todo) => todo.completed).length
    const noCompleted: number = todos.length - completedCount

    return (
        <footer className='footer'>
            <ul className='filters'>
                {
                    Object.entries(FILTER_BUTTONS).map(([key, { text, href }]) => {
                        const isSelected = filter === key
                        const className = isSelected ? 'selected' : ''

                        return (
                            <li key={key}>
                                <a href={href} className={className} onClick={(event) => {
                                    event.preventDefault()
                                    changeFilter(key as FiltersValue)
                                }}>{text}</a>
                            </li>
                        )
                    })
                }
            </ul>
            <div className='todo-count'>
                <strong>Todo pending: {noCompleted}</strong>
                <button className='clear-todos' onClick={clearCompletedTodos}>Clear all completed</button>
            </div>
        </footer>
    )
}

export default Filters
