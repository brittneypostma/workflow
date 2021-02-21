module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ['./**/**/*.html', './**/**/*.svelte'],

    options: {
      whitelistPatterns: [/svelte-/],
      defaultExtractor: (content) =>
        [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
          ([_match, group, ..._rest]) => group
        ),
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto'
      },
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        DEFAULT: '#0EB4F3',
        '50': '#E9F8FE',
        '100': '#D0F0FD',
        '200': '#A0E1FA',
        '300': '#6FD2F8',
        '400': '#3FC3F5',
        '500': '#0EB4F3',
        '600': '#0A91C4',
        '700': '#076D94',
        '800': '#054963',
        '900': '#032532'
      },
      secondary: {
        DEFAULT: '#16599C',
        '50': '#A5CCF2',
        '100': '#8FBFEF',
        '200': '#62A5E9',
        '300': '#358CE3',
        '400': '#1C72C9',
        '500': '#16599C',
        '600': '#103F6F',
        '700': '#092643',
        '800': '#030D16',
        '900': '#051934'
      },
      yellow: {
        50: '#F2BC1B',
      },
    },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
