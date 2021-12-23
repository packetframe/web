<script>
    import Footer from "../Footer.svelte";
    import Navbar from "../Navbar/Navbar.svelte";

    export let title;
    export let date;
</script>

<main>
    <Navbar homepage={true}/>

    <h1>{title}</h1>
    <p>{date}</p>

    <div class="post">
        <slot/>
    </div>

    <Footer/>
</main>

<style lang="scss">
  main {
    width: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .post {
    font-size: 14pt;
    line-height: 1.75;
    padding-top: 15px;
    margin: auto;
    max-width: 800px;
  }

  .post :global(pre) {
    max-width: 100%;
    overflow: scroll;
  }

  .post :global(blockquote) {
    font-style: italic;
  }
</style>
