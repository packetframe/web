// Filesystem indexer svelte preprocessor plugin
// This plugin writes an exported array of blog posts

import matter from "gray-matter";
import glob from "glob";
import fs from "fs";

export function fsindexer() {
    let pages = {};
    return {
        markup: ({content, f}) => {
            glob("src/routes/blog/*.mdx", {}, (err, files) => {
                if (err !== null) {
                    console.log(err)
                }

                for (const i in files) {
                    let filename = files[i];
                    let filenameParts = filename.replace(".mdx", "").split("/");
                    const metadata = matter(fs.readFileSync(filename)).data

                    pages[metadata.id] = {
                        id: metadata.id,
                        link: filenameParts[filenameParts.length-1],
                        title: metadata.title,
                        subtitle: metadata.subtitle,
                        date: metadata.date,
                        hidden: metadata.hidden
                    }
                }
            })

            fs.writeFile("src/mdp-meta.js", `// This file is autogenerated\nexport let pages = ${JSON.stringify(pages)};`, err => {
                if (err) console.error(err);
            })

            return {code: content, dependencies: []};
        }
    }
}
