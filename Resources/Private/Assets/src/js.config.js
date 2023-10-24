// vite.config.js
import legacy from '@vitejs/plugin-legacy'
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
        legacy({
            targets: ['ie >= 11'],
            // additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
            polyfills: false,
        }),
    ],
})