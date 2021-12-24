<script>
    import Navbar from "../../components/Navbar/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import {onMount} from "svelte";

    let path;
    onMount(() => {
        path = window.location.pathname
    })
</script>

{#if path !== "/dashboard/signup" && path !== "/dashboard/login"}
    <Navbar/>
{:else}
    <Navbar elements={[]}/>
{/if}

<main class="pf-layout">
    <slot></slot>
    <Footer/>
</main>

<style global lang="scss">
  @import "../../styles/global";
  @import "../../styles/generic/reset";

  main.pf-layout {
    max-width: 900px;
    padding: 5px;
    margin: 0 auto;
  }
</style>
