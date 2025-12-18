import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

export default defineConfig(({ mode }) => {

    return {
        plugins: [react(), tailwindcss()],
    }
})
