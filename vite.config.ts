import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
    plugins: [tailwindcss()],
    base: '~martineaum/rpni3/tp1/',
    input: {
        index: resolve(import.meta.dirname, 'index.html'),
        merci: resolve(import.meta.dirname, 'merci.html'),
    }
})