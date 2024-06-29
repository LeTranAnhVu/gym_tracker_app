/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [],
    theme: {
        extend: {
            colors: {
                accent: '#272D34',
                'accent-2': '#E1F0F4',
                'neutral-1': '#F5F5F6',
            },
            borderRadius: {
                // full: '9999px',
                xl: '1rem',
                '2xl': '2rem',
            },
        },
    },
    plugins: [],
}
