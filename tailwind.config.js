/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'forest': "url('../public/images/forest.jpg')",
				'pokeball': "url('../public/images/pokeball.jpg')",
				'pokemon': "url('../public/images/pokemon-bg.avif')",
			  }
		},
	},
	plugins: [],
}