/* eslint-disable quotes */
module.exports = {
  content: ['./pages/**/*.{html,js,tsx}', './components/**/*.{html,js,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--background)',
        bgSecondary: 'var(--background-secondary)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        accentPrimary: 'var(--accent-primary)',
        accentSecondary: 'var(--accent-secondary)'
      },
      fontFamily: {
        sans: [
          'Source Sans Pro',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        serif: [
          'Playfair Display',
          'ui-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif'
        ],
        mono: [
          'Source Code Pro',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ]
      },
      backgroundImage: {
        'hero-pattern': "url('/img/hero.svg')",
        'footer-pattern': "url('/img/footer.svg')"
      },
      listStyleType: {
        circle: 'circle'
      }
    }
  },
  plugins: []
};
