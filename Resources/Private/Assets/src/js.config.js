// vite.config.js
// import legacy from '@vitejs/plugin-legacy'
// import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    mode: 'production',
    build: {
        target: 'es2015',
        assetsDir: '',
        outDir: '../../../Public/JavaScript',
        lib: {
            entry: path.resolve(__dirname, 'js/main.js'),
            name: 'DPCookieConsent',
            fileName: 'dp_cookieconsent',
            formats: ['umd']
        },
        rollupOptions: {
            // input: {
            //     'dp_cookieconsent': path.resolve(__dirname, 'js/main.js')
            // },
            //
            output: {
                entryFileNames: `dp_cookieconsent.js`,
                chunkFileNames: `[name].[ext]`,
                assetFileNames: `[name].[ext]`,
            }
        }
    },
    plugins: [
        // commonjs(),
        // legacy({
        //     targets: ["IE >= 11"],
        //     polyfills: ["es.promise.finally", "es/map", "es/set", "es/object"],
        //     additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        // })
    ],
})