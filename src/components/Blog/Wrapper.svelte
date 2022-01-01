<script>
    import Footer from "../Footer.svelte";
    import Navbar from "../Navbar/Navbar.svelte";

    export let title;
    export let date;
    export let author;
</script>

<main>
    <Navbar homepage={true}/>

    <h1>{title}</h1>
    <p style="margin-bottom: 2px">{date}</p>
    <p>{author}</p>

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
    line-height: 1.75;
    max-width: 800px;
  }

  .post :global(pre) {
    max-width: 100%;
    overflow: scroll;
  }

  .post :global(blockquote) {
    font-style: italic;
  }

  h1 {
    margin-top: 0;
    padding-top: 0;
    margin-bottom: 10px;
  }

  p {
    padding: 0;
    margin: 0;
  }
</style>
