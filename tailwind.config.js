/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'offWhite': '#f6f6f6',
                'offWhiteOutline': '#e8e8e8',
                'muted': '#6c757d',
                'primary_main': '#2f33d0',
                'primary_alt': '#ff97d6',

                'secondary_1': '#01a99c',
                'secondary_2': '#458ccc',
                'secondary_3': '#812600',
                'secondary_4': '#009159',
                'secondary_5': '#ff4b00',
            }
        },
    },
    plugins: [],
}
