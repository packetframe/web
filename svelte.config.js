import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        replace: [['$apiServer', process.env.PFWEB_DEV ? "http://localhost:8080" : "https://v4.packetframe.com/api"]],
    }),

    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null
        })
    }
};

export default config;
