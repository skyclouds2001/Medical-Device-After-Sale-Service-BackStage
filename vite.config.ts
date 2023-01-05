import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import eslint from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), legacy(), eslint(), visualizer()],
  css: {
    postcss: '.postcssrc.js',
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  }
})
