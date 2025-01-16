/** @type {import('tailwindcss').Config}   */

export const darkMode = false;

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
]

export const safeList = [
  'bg-tujuan-1',
  'bg-tujuan-2',
  'bg-tujuan-3',
  'bg-tujuan-4',
  'bg-tujuan-5',
  'bg-tujuan-6',
  'bg-tujuan-7',
  'bg-tujuan-8',
  'bg-tujuan-9',
  'bg-tujuan-10',
  'bg-tujuan-11',
  'bg-tujuan-12',
  'bg-tujuan-13',
  'bg-tujuan-14',
  'bg-tujuan-15',
  'bg-tujuan-16',
  'bg-tujuan-17',
]

export const theme = {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      danger: '#dc2626',
      primary: '#0891b2',
      tujuan: {
        1: '#E5243B',
        2: '#DDA63A',
        3: '#4C9F38',
        4: '#C5192D',
        5: '#FF3A21',
        6: '#26BDE2',
        7: '#FCC30B',
        8: '#A21942',
        9: '#FD6925',
        10: '#DD1367',
        11: '#FD9D24',
        12: '#BF8B2E',
        13: '#3F7E44',
        14: '#0A97D9',
        15: '#56C02B',
        16: '#00689D',
        17: '#19486A',
      }
    },
    animation: {
      'spin-slow': 'spin 2s linear infinite'
    }
  },
}

export const plugins = [
  require('tailwind-scrollbar'),
]

