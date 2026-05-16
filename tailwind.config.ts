import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/slices/**/*.vue',
    './app/app.vue'
  ],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Articulat CF', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        brand: '16px'
      },
      transitionTimingFunction: {
        refined: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
} satisfies Config
