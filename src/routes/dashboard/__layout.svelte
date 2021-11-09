<script>
    import Navbar from "../../components/Navbar/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Navbar/>

<main>
    <slot></slot>
    <Footer/>
</main>

<style global lang="scss">
  @import "../../styles/global";
  @import "../../styles/generic/reset";

  main {
    max-width: 900px;
    margin: 0 auto;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    background-color: #040404; // 121212
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: #b03ac6;
  }

  ::-moz-selection {
    background: #b03ac6;
  }
</style>
