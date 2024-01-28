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
				"primary-backg": "#F3F7F9",
				"sidebar-bg": "#F7F7F7",
				"tab-hover": "#FEBB95",
			},
			fontFamily: {
				nunito: ["Nunito"],
				loginDes: ["loginDes"],
			},
		},
	},
	plugins: [],
};
