/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ThemeBg: '#1d71d4',
                letters: '#f5f5f5',
                'btn-close': '#2d8df3',
                'btn-transaction': '#4a4ec3',
                'btn-transaction-hover': '#4246af',
                'btn-close-hover': '#0684df',
                'backgound-hover': '#0684df',
                'background-overlay': 'rgba(0,0,0,0.5)',
                'pattern-success': 'rgba(16, 117, 23, 0.8)',
                'pattern-cancel': 'rgba(178, 34, 34, 0.8)',
                'pattern-edit': 'rgba(30,144,255, 0.9)',
                'pattern-info': '#1d71d4',
            },
        },
    },
    plugins: [],
};
