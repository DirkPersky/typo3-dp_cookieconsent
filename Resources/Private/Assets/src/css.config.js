// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import babel from '@rollup/plugin-babel';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        assetsDir: '',
        outDir: '../../../Public/css',
        rollupOptions: {
            input: {
                'dp_cookieconsent.css': path.resolve(__dirname, 'scss/dp_cookieconsent.scss')
            },

            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].[ext]`,
                assetFileNames: `[name].[ext]`
            }
        }
    },
    plugins: [
    ],
})