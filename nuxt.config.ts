export default defineNuxtConfig({
  srcDir: 'app/',
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },
  modules: ['@nuxtjs/prismic'],
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0b0b0b' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://images.prismic.io' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' },
        { rel: 'shortcut icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }
      ]
    }
  },
  prismic: {
    endpoint: process.env.PRISMIC_REPOSITORY_NAME || 'portfolio2026',
    clientConfig: {
      routes: [
        { type: 'page', path: '/:uid' },
        { type: 'case', path: '/cases/:uid' },
        { type: 'settings', path: '/' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: 'André Oliveira Portfolio'
    }
  },
  typescript: {
    strict: true
  },
  compatibilityDate: '2025-01-01'
})
