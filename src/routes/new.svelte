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
    <div class="hero">
        <h1>Packetframe</h1>
        <p>Welcome to Packetframe, the Open Source CDN for technology enthusiasts. The platform is currently in private beta, contact for more information.</p>
        <Button href="/dashboard/dns" variant="primary">Get Started</Button>
        <Dig/>
    </div>

    <SplashCard
            text="There are currently 41 PoPs across 38 cities and with a presence in all 6 consumer-inhabited continents. (If you know of a datacenter in Antarctica, let me know!)"
            title="Globally Distributed"
    >
        <SpinningGlobe/>
    </SplashCard>

    <Connector/>

    <SplashCard
            reverse
            text="Packetframe was built with developers in mind. With the Packetframe CDN, the only thing kept private is <a href='https://packetframe.com/docs/privacy-policy'>your data</a> and keys to the infrastructure. Everything else is open and accessible. All functionality of the platform is exposed via the <a href='https://packetframe.com/docs/api'>API</a> and the entire codebase is <a href='https://github.com/packetframe/cdn'>open source</a>."
            title="Built for Developers"
    >
        <Computer/>
    </SplashCard>

    <Connector side="right"/>

    <SplashCard
            text="While the code is written by one person (<a href='https://natesales.net'>me!</a>), the open source community plays a huge role in the CDN infrastructure. Special thanks to <a href='https://fosshost.org'>fosshost</a> for their support and partnership in the project. Want to get involved? Feel free to send an email to or hop in #packetframe on <a href='https://libera.chat/guides/connect'>Libera.Chat</a> and ask away!"
            title="Community Centric"
    >
        <Penguin/>
    </SplashCard>

    <Footer/>
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
