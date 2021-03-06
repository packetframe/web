import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import {mdsvex} from "mdsvex";
import {fsindexer} from "./src/fsindexer.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    extensions: [".svelte", ".mdx"],
    preprocess: [
        mdsvex({
            extensions: [".mdx"],
            layout: {
                blog: "src/components/Blog/Wrapper.svelte",
            },
        }),
        fsindexer(),
        preprocess()
    ],

    kit: {
        prerender: {
            default: true
        },
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null
        }),
        trailingSlash: "always"
    }
};

export default config;
