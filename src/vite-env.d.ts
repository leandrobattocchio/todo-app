// eslint-disable-next-line
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MASTER_KEY: string
    readonly VITE_ACCESS_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
