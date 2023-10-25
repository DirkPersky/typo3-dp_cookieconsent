// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        assetsDir: '',
        outDir: '../../../Public/JavaScript',
        rollupOptions: {
            input: {
                'dp_cookieconsent': path.resolve(__dirname, 'js/main.js')
            },

            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].[ext]`,
                assetFileNames: `[name].[ext]`
            }
        }
    },
    plugins: [
        commonjs(),
        // legacy({
        //     targets: ["ie >= 11"],
        //     polyfills: ["es.promise.finally", "es/map", "es/set", "es/object"],
        //     additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        // })
    ],
})