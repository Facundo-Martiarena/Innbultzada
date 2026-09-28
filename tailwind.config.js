import plugin from 'tailwindcss/plugin';

/** Los colores se leen de design tokens (CSS variables) definidos en src/styles/tokens.css */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: token('navy'), 700: token('navy-700'), 500: token('navy-500'), 300: token('navy-300'), 100: token('navy-100'), 50: token('navy-50') },
        magenta: { DEFAULT: token('magenta'), 600: token('magenta-600'), 100: token('magenta-100'), 50: token('magenta-50') },
        impact: { DEFAULT: token('green'), 600: token('green-600'), 100: token('green-100'), 50: token('green-50') },
        opportunity: { DEFAULT: token('yellow'), 600: token('yellow-600'), 100: token('yellow-100') },
        ink: { DEFAULT: token('ink'), soft: token('ink-soft'), muted: token('ink-muted') },
        paper: { DEFAULT: token('paper'), raised: token('paper-raised'), sunk: token('paper-sunk') },
        line: token('line'),
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', '"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { xl2: '1.25rem' },
      boxShadow: {
        card: '0 1px 2px rgb(var(--navy) / 0.06), 0 4px 16px -4px rgb(var(--navy) / 0.08)',
        lift: '0 2px 4px rgb(var(--navy) / 0.06), 0 16px 40px -12px rgb(var(--navy) / 0.22)',
      },
      keyframes: {
        rise: { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'none' } },
        dash: { to: { strokeDashoffset: '-24' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: 0.5 }, '100%': { transform: 'scale(1.6)', opacity: 0 } },
        revealUp: {
          '0%': { opacity: 0, transform: 'translateY(30px) scale(.94)' },
          '55%': { opacity: 1 },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        popIn: {
          '0%': { opacity: 0, transform: 'scale(.5) rotate(-8deg)' },
          '100%': { opacity: 1, transform: 'scale(1) rotate(0)' },
        },
        swipeHint: {
          '0%, 22%': { transform: 'translateX(0) rotate(0deg)' },
          '46%, 62%': { transform: 'translateX(20px) rotate(6deg)' },
          '86%, 100%': { transform: 'translateX(0) rotate(0deg)' },
        },
        stampIn: {
          '0%, 34%': { opacity: 0, transform: 'rotate(-12deg) scale(.85)' },
          '48%, 64%': { opacity: 1, transform: 'rotate(-12deg) scale(1)' },
          '82%, 100%': { opacity: 0, transform: 'rotate(-12deg) scale(.85)' },
        },
      },
      animation: {
        rise: 'rise .5s cubic-bezier(.2,.7,.2,1) both',
        dash: 'dash 1.2s linear infinite',
        pulseRing: 'pulseRing 1.8s ease-out infinite',
        reveal: 'revealUp .55s cubic-bezier(.22,1.2,.36,1) both',
        popIn: 'popIn .5s cubic-bezier(.34,1.56,.64,1) .12s both',
        swipeHint: 'swipeHint 3.6s ease-in-out infinite',
        stampIn: 'stampIn 3.6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('present', ':root.present &');
    }),
  ],
};
