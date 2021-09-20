import vercel from "@sveltejs/adapter-vercel";
import netlify from "@sveltejs/adapter-netlify";
import preprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    scss: {
      prependData: '@import "./src/_vars.scss";',
    },
    postcss: {
      plugins: [autoprefixer],
    },
  }),
  kit: {
    adapter: netlify(),
    target: "#svelte",
  },
};

export default config;
