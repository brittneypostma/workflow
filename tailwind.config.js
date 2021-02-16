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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
