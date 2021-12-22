<script>
    import SpinningGlobe from "../components/Animations/SpinningGlobe.svelte";
    import Computer from "../components/Animations/Computer.svelte";
    import Penguin from "../components/Animations/Penguin.svelte";
    import Dig from "../components/Animations/Dig.svelte";
    import Footer from "../components/Footer.svelte";

    let screenWidth;
</script>

<svelte:window bind:innerWidth={screenWidth}/>

<main>
    <div class="hero">
        <h1 class="text-gradient">Packetframe</h1>
        <p>Welcome to Packetframe, the Open Source CDN for technology enthusiasts.</p>
        <Dig/>
    </div>

    <div class="feature-block">
        <div class="feature-graphic">
            <SpinningGlobe/>
        </div>
        <div class="feature-caption">
            <h1>Globally Distributed</h1>
            <p>Packetframe has a presence in over 40 cities across all 6 consumer-inhabited continents. (We're still working on finding a way to put servers to Antarctica).</p>
        </div>
    </div>

    <div class="feature-block feature-blockReverse">
        <div class="feature-caption">
            <h1>Built for Developers</h1>
            <p>Packetframe was built with developers in mind. All functionality of the platform is exposed via the <a href="https://packetframe.com/docs/api">API</a> and the entire codebase is <a href="https://github.com/packetframe">open source</a>.</p>
        </div>
        <div class="feature-graphic">
            <Computer/>
        </div>
    </div>

    <div class="feature-block">
        <div class="feature-graphic">
            <Penguin/>
        </div>
        <div class="feature-caption">
            <h1>Community Centric</h1>
            <p>The open source community plays a huge role in the CDN infrastructure. Want to get involved? Email info@ or hop in #packetframe on <a href="https://libera.chat/guides/connect">Libera.Chat</a>.</p>
        </div>
    </div>

    <Footer/>
</main>

<style lang="scss">
  main {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .feature-block .feature-blockReverse h1 {
    font-size: 1.2em;
  }

  .feature-block {
    display: flex;
    flex-wrap: wrap;
    width: #{"clamp(0px, 950px, 95%)"};
    margin-top: 25px;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
  }

  .feature-block.feature-blockReverse {
    flex-wrap: wrap-reverse;
  }

  .feature-caption {
    width: #{"clamp(0px, 500px, 95%)"};
    font-size: larger;
    line-height: 30px;
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

  .feature-caption p {
    margin-top: 0;
  }

  .feature-graphic {
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

  .hero {
    text-align: center;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 50px auto 50px;
    box-sizing: unset;
    flex-wrap: wrap-reverse;
    width: #{"clamp(0px, 950px, 95%)"};
  }

  .hero h1 {
    margin-bottom: 0;
  }

  .hero p {
    margin-bottom: 65px;
  }
</style>
