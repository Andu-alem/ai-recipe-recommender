// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'ChefGPT - Cooking Companion',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.png',
        },
      ],
    },
  },

  runtimeConfig: {
    dbUri: process.env.MONGODB_URI,
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET
  },

  modules: [
    '@nuxt/eslint',
    'nuxt-mongoose',
    'shadcn-nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    '@pinia/nuxt',
    'nuxt-lucide-icons',
    '@nuxtjs/color-mode',
    'motion-v/nuxt',
    '@sentry/nuxt/module'
  ],

  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
    devtools: true
  },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  colorMode: {
    classSuffix: ''
  },

  sentry: {
    sourceMapsUploadOptions: {
      org: 'andudev',
      project: 'ai-recipe-recommender'
    },

    autoInjectServerSentry: 'top-level-import'
  },

  sourcemap: {
    client: 'hidden'
  }
})