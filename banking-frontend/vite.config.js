import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react({
    include: ['**/*.js', '**/*.jsx'] // Process both .js and .jsx files as JSX
  })],
   server: {
    port: 9090,   // 👈 change this to whatever port you want
  },
})
