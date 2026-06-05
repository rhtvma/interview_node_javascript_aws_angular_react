/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f5f7ff',
                    100: '#ebf0ff',
                    200: '#d6e0ff',
                    300: '#b3c7ff',
                    400: '#8ca5ff',
                    500: '#667eea',
                    600: '#5568d3',
                    700: '#4451b8',
                    800: '#343b94',
                    900: '#252b6b',
                },
                secondary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#764ba2',
                    600: '#6b3d91',
                    700: '#5f2f7f',
                    800: '#4c2564',
                    900: '#3a1c4a',
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}

// Made with ❤️ for Interview Preparation
