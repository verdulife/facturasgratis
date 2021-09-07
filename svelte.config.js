import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: '@import "./src/_vars.scss";'
		},
		postcss: {
			plugins: [autoprefixer]
		}
	}),
	kit: {
		target: '#svelte'
	}
};

export default config;
