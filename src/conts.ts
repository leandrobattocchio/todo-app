export const FILTERS = {
    ALL: 'all',
    COMPLETED: 'completed',
    NO_COMPLETED: 'no_completed'
} as const

export const FILTER_BUTTONS = {
    [FILTERS.ALL]: {
        text: 'All',
        href: '?filters=all'
    },
    [FILTERS.COMPLETED]: {
        text: 'Completed',
        href: '?filters=completed'
    },
    [FILTERS.NO_COMPLETED]: {
        text: 'No completed',
        href: '?filters=no_completed'
    }
} as const

export const MASTER_KEY = import.meta.env.VITE_MASTER_KEY

export const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
