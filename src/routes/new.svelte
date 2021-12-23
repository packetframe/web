<script>
    import SpinningGlobe from "../components/Animations/SpinningGlobe.svelte";
    import Computer from "../components/Animations/Computer.svelte";
    import Penguin from "../components/Animations/Penguin.svelte";
    import Dig from "../components/Animations/Dig.svelte";
    import Connector from "../components/Animations/Connector.svelte";
    import SplashCard from "../components/SplashCard";
    import Button from "../components/Button/Button.svelte";
    import Footer from "../components/Footer.svelte";

    let screenWidth;
</script>

<svelte:window bind:innerWidth={screenWidth}/>

<main>

</main>

<style global lang="scss">
  @import "../styles/global";
  @import "../styles/generic/reset";

  main.pf-layout {
    max-width: 900px;
    padding: 5px;
    margin: 0 auto;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    background-color: #040404;
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

  a {
    color: #b03ac6;
  }

  main {
    line-height: 30px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px auto auto;
    box-sizing: unset;
    flex-wrap: wrap-reverse;
  }

  header {
    margin-bottom: 80px;
  }

  .no-border {
    border: none !important;
  }

  .shrink {
    height: 50px !important;
  }

  .featureBlock .featureBlockReverse h1 {
    font-size: 1.2em;
  }

  .featureBlock {
    display: flex;
    margin-top: 0;
    flex-wrap: wrap;
    width: #{"clamp(0px, 950px, 95%)"};
    margin-left: auto;
    margin-right: auto;
  }

  .featureBlock.featureBlockReverse {
    flex-wrap: wrap-reverse;
  }

  .featureCaption {
    width: #{"clamp(0px, 500px, 95%)"};
    font-size: larger;
    margin-left: 20px;
    margin-right: 20px;
    display: inline-flex;
    flex-direction: column;
    height: auto;
    background-color: black;
    background-clip: padding-box;
    border: solid 3px transparent;
    position: relative;
    box-sizing: border-box;
    border-radius: 0.375rem;
    flex-grow: 1;
    justify-self: start;
    padding: 0 20px;
    justify-content: center;
  }

  .featureCaption p {
    margin-top: 0;
  }

  .featureCaption::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -3px;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(153, 109, 224, 1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .featureImageWrapper {
    display: flex;
    flex-grow: 1;
    width: #{"min(50%, 350px)"};
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .featureImage {
    width: #{"min(100%, 300px)"};
    margin: 0;
  }

  a {
    color: #d000ff;
  }

  .hero {
    text-align: center;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: #{"clamp(0px, 950px, 95%)"};
  }

  .hero h1, p {
    padding-bottom: 25px;
  }
</style>
