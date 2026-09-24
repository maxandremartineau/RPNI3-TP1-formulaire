import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
    plugins: [tailwindcss()],
    base: '~martineaum/rpni3/tp1/',
})