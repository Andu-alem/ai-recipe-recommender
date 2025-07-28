// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    dbUri: process.env.MONGODB_URI
  },
  modules: [
    '@nuxt/eslint',
    'nuxt-mongoose',
    'shadcn-nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    '@pinia/nuxt',
    'nuxt-lucide-icons'
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
  }
})