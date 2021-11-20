module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--background)',
        bgSecondary: 'var(--background-secondary)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        accentPrimary: 'var(--accent-primary)',
        accentSecondary: 'var(--accent-secondary)',
      },
      fontFamily: {
        'sans': ["Source Sans Pro","ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        'serif': ["Playfair Display", 'ui-serif', "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
       },
       backgroundImage: {
        'hero-pattern': "url('/img/hero.svg')",
        'footer-pattern': "url('/img/footer.svg')",
       }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
