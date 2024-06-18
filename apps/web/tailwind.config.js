/* eslint-disable @typescript-eslint/no-var-requires */
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');
const { nextui } = require('@nextui-org/react');

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ':root': newVars,
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    addVariablesForColors,
    nextui({
      prefix: 'creators-treat',
      addCommonColors: true,
      layout: {
        fontSize: {
          small: '12px',
          medium: '14px',
          large: '16px',
          tiny: '8px',
        },
      },
      themes: {},
    }),
  ],
};
