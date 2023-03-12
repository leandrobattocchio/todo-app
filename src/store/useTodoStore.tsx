import { create } from 'zustand'
import { FILTERS } from '../conts'
import { deleteTodoFromDatabase } from '../services/todoService'
import { type ListOfTodos, type FiltersValue, type Todo, type TodoId } from '../type'

interface TodoState {
  todos: ListOfTodos
  filter: FiltersValue
  toggleCompletedTodo: ({ id, completed }: Pick<Todo, 'id' | 'completed'>) => void
  changeFilter: (filter: FiltersValue) => void
  deleteTodo: ({ id }: TodoId) => void
  addTodo: (todo: Todo) => void
  clearCompletedTodos: () => void
  addInitialsTodos: (todos: ListOfTodos) => void
  updateTodoInStore: ({ id, title, completed }: Todo) => void
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  filter: FILTERS.ALL,
  addInitialsTodos: (todos) => {
    set(() => ({
      todos
    }))
  },
  toggleCompletedTodo: ({ id, completed }) => {
    set((state) => {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed
          }
        }
        return todo
      })
      return { todos: newTodos }
    })
  },
  changeFilter: (filter) => {
    set(() => ({
      filter
    }))
  },
  deleteTodo: ({ id }) => {
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id)
      return { todos: newTodos }
    })
  },
  addTodo: (todo) => {
    set((state) => ({
      todos: [
        ...state.todos,
        todo
      ]
    }))
  },
  clearCompletedTodos: () => {
    set((state) => {
      const noCompletedTodos = state.todos.filter((todo) => {
        if (todo.completed) {
          deleteTodoFromDatabase({ id: todo.id }).catch((error) => { console.log(error) })
        }
        return !todo.completed
      })

      return { todos: noCompletedTodos }
    })
  },
  updateTodoInStore: ({ id, title, completed }: Todo) => {
    set((state) => {
      const newTodos: ListOfTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            completed
          }
        }
        return todo
      })

      return { todos: newTodos }
    })
  }
}))
