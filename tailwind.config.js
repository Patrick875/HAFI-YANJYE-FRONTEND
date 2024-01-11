/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				"login-green": "#034732",
				"primary-sky": "#407FBF",
				"primary-violet": "#3D348B",
				"theme-yellow": "#FEA509",
			},
			fontFamily: {
				nunito: ["Nunito"],
				loginDes: ["loginDes"],
			},
		},
	},
	plugins: [],
};
