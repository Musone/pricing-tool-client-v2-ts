/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'white': 'white',
                // 'black': rgb(0, 0, 0),
                'offWhite': '#f6f6f6',
                'offWhiteOutline': '#e8e8e8',
                'muted': '#6c757d',
                'primary_main': '#2f33d0',
                'primary_alt': '#ff97d6',

                // 'secondary_1': '#00deb5',
                'secondary_1': '#01a99c',
                // 'secondary_1': '#02865d',
                // 'secondary_2': '#ffc501',
                'secondary_2': '#458ccc',
                'secondary_3': '#ff4b00',
                'secondary_4': '#009159',
                'secondary_5': '#ff4b00',


                // 'secondary_5': '#ff4b00',
                // 'secondary_5': '#ff4b00',
            }
        },
    },
    plugins: [],
}
