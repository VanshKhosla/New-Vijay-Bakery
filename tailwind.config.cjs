// tailwind.config.cjs
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4e513c',  // dark olive -> main background
        accent:  '#d4c28b',  // golden -> text/highlights
        card:    '#8e6a5e',  // lighter brown for cards (contrast)
        cream:   '#f8f2e7'   // light cream (if needed inside inputs)
      }
    },
  },
  plugins: [],
}
