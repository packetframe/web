<script>
    import Navbar from "../../components/Navbar/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import {page} from '$app/stores';
</script>

{#if $page.path === "/dashboard/signup" || $page.path !== "/dashboard/login" || $page.path !== "/dashboard/password_reset"}
    <Navbar elements={[]}/>
{:else}
    <Navbar/>
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
