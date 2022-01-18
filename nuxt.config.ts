import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    meta: {
        meta: [
          // <meta name="viewport" content="width=device-width, initial-scale=1">
            { charset: 'UTF-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        ],
    },
    // ssr: false,
    build: {
        transpile: ['emoji-mart-vue-fast'],
    },
    serverMiddleware: {
        '/server/middleware': '~/server/middleware'
    }
})
