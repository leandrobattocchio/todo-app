import { ACCESS_KEY, MASTER_KEY } from '../conts'
import { type TodoId, type Todo } from '../type'

export const createTodo = async ({ title, completed }: Pick<Todo, 'title' | 'completed'>): Promise<Todo> => {
    const response = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': `${MASTER_KEY}`,
            'X-Access-Key': `${ACCESS_KEY}`
        },
        body: JSON.stringify({ title, completed })
    })

    const { record, metadata } = await response.json()
    return {
        id: metadata.id,
        title: record.title,
        completed: record.completed
    }
}

export const updateTodoInDataBase = ({ id, title, completed }: Todo): void => {
    fetch(`https://api.jsonbin.io/v3/b/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': `${MASTER_KEY}`,
            'X-Access-Key': `${ACCESS_KEY}`
        },
        body: JSON.stringify({ title, completed })
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const getTodosIds = async (): Promise<string[]> => {
    const response = await fetch('https://api.jsonbin.io/v3/c/uncategorized/bins/', {
        method: 'GET',
        headers: {
            'X-Master-Key': `${MASTER_KEY}`
        }
    })

    const data = await response.json()
    const todoIds = data.map(({ record }: any) => record)
    return todoIds
}

export const getTodos = async (ids: string[]): Promise<Todo[]> => {
    const todos = []

    for (const id of ids) {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${id}`, {
            method: 'GET',
            headers: {
                'X-Master-Key': `${MASTER_KEY}`,
                'X-Access-Key': `${ACCESS_KEY}`
            }
        })
        const { record, metadata } = await response.json()
        todos.push({ id: metadata.id, title: record.title, completed: record.completed })
    }

    return todos
}

export const deleteTodoFromDatabase = async ({ id }: TodoId): Promise<void> => {
    await fetch(`https://api.jsonbin.io/v3/b/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Master-Key': `${MASTER_KEY}`,
            'X-Access-Key': `${ACCESS_KEY}`
        }
    })
}
