/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ThemeBg: '#1d71d4',
                letters: '#f5f5f5',
                'btn-close': '#2d8df3',
                'btn-close-hover': '#0684df',
                'backgound-hover': '#0684df',
            },
        },
    },
    plugins: [],
};
