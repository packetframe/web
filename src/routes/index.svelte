<script>
    import Computer from "../components/Animations/Computer.svelte";
    import Connector from "../components/Animations/Connector.svelte";
    import Dig from "../components/Animations/Dig.svelte";
    import Penguin from "../components/Animations/Penguin.svelte";
    import SpinningGlobe from "../components/Animations/SpinningGlobe.svelte";

    import Button from "../components/Button";
    import Footer from "../components/Footer.svelte";

    import SplashCard from "../components/SplashCard";

    import { onMount } from "svelte";
    import Navbar from "../components/Navbar";

    let growBg = false;
    let animateLogo = false;
    let loadContent = false;
    let scrollContent = false;

    onMount(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    growBg = true;
                } else {
                    growBg = false;
                }
            })
        })

        observer.observe(document.getElementById("pf-bg-trigger"))

        const observer2 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateLogo = true;
                } else {
                    animateLogo = false;
                }
            })
        })

        observer2.observe(document.getElementById("pf-bg-trigger-2"))

        const observer3 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadContent = true;
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                    setTimeout(() => {scrollContent = true}, 500);
                } else {
                    // loadContent = false;
                }
            })
        })

        observer3.observe(document.getElementById("pf-bg-trigger-3"))
    })

</script>

<div class="wrapper" class:hidden={loadContent}>
    <main class="index-wrapper">
        <img class="pf-hole" src="pf-hole.png" alt="Under Construction" class:hidden={animateLogo}>
        <img class="pf-cloud" src="cloud-hover.png" alt="flat cloud" class:animate={animateLogo}>
        <img class="pf-cloud flat" src="cloud-flat-striped.png" alt="flat cloud" class:animate={animateLogo}  class:hidden={!animateLogo}>
        <div class="pf-bg-delay"></div>
        <div class="pf-bg" class:growBg></div>
        <div class="pf-bg-trigger-delay"></div>
        <div class="pf-bg-trigger" id="pf-bg-trigger" class:fixed={animateLogo}></div>
        <div class="pf-bg-trigger-2" id="pf-bg-trigger-2" class:sticky={animateLogo}></div>
        <h1 class="pf-header" class:animate={animateLogo}>Packetframe</h1>
    </main>
    <div class="pf-bg-trigger-3" id="pf-bg-trigger-3"></div>
</div>

<div class:hidden={!loadContent}>
    <Navbar homepage/>
</div>
<div class="content" class:animate={scrollContent} class:hidden={!loadContent}>

    <img class="pf-cloud-2" src="cloud-flat-striped.png" alt="flat cloud">
    <h1 class="pf-header-2">Packetframe</h1>

    <div class="hero" class:animate={scrollContent}>
        <p>Welcome to Packetframe, the Open Source CDN for technology enthusiasts. The platform is currently in private beta, contact for more information.</p>
        <!-- <Button href="/dashboard/dns" variant="filled">Get Started</Button> -->
    </div>

    <Dig/>

    <SplashCard
            text="There are currently 41 PoPs across 38 cities and with a presence in all 6 consumer-inhabited continents. (If you know of a datacenter in Antarctica, let me know!)"
            title="Globally Distributed"
    >
        <SpinningGlobe/>
    </SplashCard>

    <Connector />

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

    <Footer />
</div>


<style global>

    div.wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        background: rgb(213,59,171);
        background: linear-gradient(135deg, rgba(213,59,171,1) 30%, rgba(128,32,192,1) 70%); 
    }
    
    img.pf-hole {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
    img.pf-cloud {
        position: fixed;
        top: calc(50% + 5px);
        left: calc(50% + 2px);
        transform: translate(-50%, -50%);
        z-index: 15;
        transition: ease all 1s;
    }

    img.pf-cloud.flat {
        top: 50%;
        left: 50%;
        z-index: 14;
        opacity: 1;
        width: 135px;
    }

    img.pf-cloud-2 {
        width: 135px;
    }

    img.pf-cloud.animate {
        opacity: 0;
    }

    img.pf-cloud.flat.animate {
        opacity: 1;
    }

    div.pf-bg-delay {
        width: 100%;
        height: 100vh;
        background-color: transparent;
    }

    div.pf-bg {
        width: 70vw;
        height: 70vh;
        top: 15vh;
        left: 15vw;
        position: sticky;
        z-index: 11;
        background-color: #040404;
        transition: ease all 1s;
        box-shadow: rgba(0, 0, 0, 0.431) 30px 20px 20px;
    }

    div.pf-bg-trigger-delay {
        width: 100%;
        height: 50vh;
        position: relative;
        z-index: 20;
    }

    div.pf-bg-trigger {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 230vh;
        z-index: 20;
        background-color: transparent;
        left: 0;
    }

    div.sticky {
        position: sticky !important;
        top: 0vh !important;
    }

    div.fixed {
        position: fixed !important;
        top: 0vh !important;
    }

    div.pf-bg-trigger-2 {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 320vh;
        z-index: 20;
        background-color: transparent;
    }

    .hidden {
        display: none !important;
    }
    
    div.pf-bg-trigger-3 {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 350vh;
        z-index: 25;
        background-color: transparent;
    }

    div.growBg {
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
    }

    h1.pf-header {
        position: fixed;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0%);
        z-index: 20;
        transition: ease all 0.5s;
        text-align: center;
        color: white;
    }

    h1.pf-header-2 {
        margin-top: 0.25rem;
        margin-bottom: 0px;
    }

    .pf-header.animate {
        top: calc(50% + 24px + 0.25rem);
        transition: ease all 1s;
    }

    div.content {
        color: white;
        max-width: 750px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        padding-top: calc(50vh - 44px - 92px);
        padding-bottom: 10rem;
    }

    div.content.animate {
        padding-top: 2rem;
        transition: ease padding-top 0.5s;
    }

    img.hidden {
        display: none;
    }

    div.hero {
        margin-top: 10px;
        padding-top: 50vh;
        padding-bottom: 0;
        font-size: 1.25rem;
    }

    div.hero.animate {
        padding-top: 0px;
        transition: ease padding-top 1s;
        text-align: center;
    }

    main.index-wrapper {
        width: 100%;
        height: 400%;
        position: relative;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    * {
        box-sizing: border-box;
    }

    div#svelte {
        width: 100%;
        height: 100%;
    }

    ::selection {
        background: #b03ac6;
    }

    ::-moz-selection {
        background: #b03ac6;
    }

    a {
        color: #d000ff;
    }

    p.footer {
        position: absolute;
        color: #161616;
        font-size: 10px;
        opacity: 0.4;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }
</style>
