import { type FILTERS } from './conts'

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type ListOfTodos = Todo[]

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>
export type FiltersValue = typeof FILTERS[keyof typeof FILTERS]
