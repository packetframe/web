<script>
    import {pages} from "../mdp-meta.js";
    import Footer from "../components/Footer.svelte";
    import Title from "../components/Title/Title.svelte";
    import Navbar from "../components/Navbar/Navbar.svelte";
</script>

<main>
    <Navbar homepage={true}/>

    <div class="centered">
        <Title>
            <div slot="header">Blog</div>
        </Title>

        <div class="items">
            {#each Object.values(pages).sort((a, b) => { // Sort the blog posts by date
                let ad = new Date(a.date);
                let bd = new Date(b.date);
                if (ad < bd) {
                    return 1
                } else if (ad > bd) {
                    return -1
                } else {
                    return 0
                }
            }) as page, i}
                {#if !page.hidden}
                    <div class="blog-post">
                        {#if i !== 0}
                            <hr>
                        {/if}
                        <a href="/blog/{page.link}"><h2>{page.title}</h2></a>
                        <span>{page.date}</span>
                    </div>
                {/if}
            {/each}
        </div>
    </div>

    <Footer/>
</main>

<style lang="scss">
    .centered {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        color: white;
        display: flex;
        flex-direction: column;
    }

    .blog-post {
        margin-left: 4px;
        margin-right: 4px;
        margin-top: 30px;
    }

    a {
        text-decoration: none;
    }

    h2 {
        margin-top: 25px;
        margin-bottom: 5px;
    }
</style>
