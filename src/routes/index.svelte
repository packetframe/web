<script>
    import {onMount} from "svelte";
    import Computer from "../components/Animations/Computer.svelte";
    import Connector from "../components/Animations/Connector.svelte";
    import Dig from "../components/Animations/Dig.svelte";
    import Penguin from "../components/Animations/Penguin.svelte";
    import SpinningGlobe from "../components/Animations/SpinningGlobe.svelte";
    import Footer from "../components/Footer.svelte";
    import SplashCard from "../components/SplashCard";
    import Navbar from "../components/Navbar";
    import Email from "../components/Email.svelte";
    import NotificationBar from "../components/NotificationBar.svelte";

    let growBg = false;
    let animateLogo = false;
    let loadContent = false;
    let scrollContent = false;

    // Comment out to enable fancy scroll animation
    loadContent = true;
    scrollContent = true;

    onMount(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                growBg = entry.isIntersecting;
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
                    setTimeout(() => {
                        scrollContent = true
                    }, 500);
                } else {
                    // loadContent = false;
                }
            })
        })

        observer3.observe(document.getElementById("pf-bg-trigger-3"))
    })
</script>

<svelte:head>
    <title>Packetframe | The Open Cloud Platform.</title>
</svelte:head>

<div class="wrapper" class:hidden={loadContent}>
    <main class="index-wrapper">
        <img alt="Under Construction" class="pf-hole" class:hidden={animateLogo} src="pf-hole.png">
        <img alt="flat cloud" class="pf-cloud" class:animate={animateLogo} src="cloud-hover.png">
        <img alt="flat cloud" class="pf-cloud flat" class:animate={animateLogo} class:hidden={!animateLogo} src="cloud-flat-striped.png">
        <div class="pf-bg-delay"></div>
        <div class="pf-bg" class:growBg></div>
        <div class="pf-bg-trigger-delay"></div>
        <div class="pf-bg-trigger" class:fixed={animateLogo} id="pf-bg-trigger"></div>
        <div class="pf-bg-trigger-2" class:sticky={animateLogo} id="pf-bg-trigger-2"></div>
        <h1 class="pf-header" class:animate={animateLogo}>Packetframe</h1>
    </main>
    <div class="pf-bg-trigger-3" id="pf-bg-trigger-3"></div>
</div>

<!--<NotificationBar/>-->

<div class:hidden={!loadContent}>
    <Navbar homepage/>
</div>

<div class="content" class:animate={scrollContent} class:hidden={!loadContent}>
    <img alt="flat cloud" class="pf-cloud-2" src="cloud-flat-striped.png">
    <h1 class="pf-header-2">Packetframe</h1>

    <div class="hero" class:animate={scrollContent}>
        <p>
            The Open Cloud Platform.
        </p>

        <p style="font-size: 14pt">
            Packetframe is an open-source content delivery network and distributed cloud platform supporting open-source projects, nonprofits, and communities with open infrastructure.
        </p>
    </div>

    <Dig/>

    <SplashCard title="Globally Distributed">
        <div slot="text">
            Packetframe is present on all 6 consumer-inhabited continents in over 40 cities worldwide. Temporary cache nodes are available to serve a local region during large events, coordinated tests, and disaster scenarios.
        </div>
        <SpinningGlobe/>
    </SplashCard>

    <Connector/>

    <SplashCard reverse title="Built for Developers">
        <div slot="text">
            Packetframe was built with developers in mind. All functionality of the platform is exposed via the API and the entire codebase is <a href='https://github.com/packetframe'>open source</a>.
        </div>
        <Computer/>
    </SplashCard>

    <Connector side="right"/>

    <SplashCard title="Community Centric">
        <div slot="text">
            Packetframe is designed to support open-source projects, nonprofits, and communities with open infrastructure. We are committed to providing a platform that is free to use and open to all.
            Want to get involved? Feel free to send an email to
            <Email/>
            or hop in #packetframe on <a href='https://libera.chat/guides/connect'>Libera.Chat</a>.
        </div>
        <Penguin/>
    </SplashCard>

    <Footer/>
</div>

<style>
    div.wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        background: rgb(213, 59, 171);
        background: linear-gradient(135deg, rgba(213, 59, 171, 1) 30%, rgba(128, 32, 192, 1) 70%);
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
        margin-top: 0.7rem;
        margin-bottom: 0;
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
        padding-bottom: 10px;
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

    .hero p {
        margin-top: 0;
        margin-bottom: 15px;
    }

    div.hero.animate {
        padding-top: 0;
        transition: ease padding-top 1s;
        text-align: center;
    }

    main.index-wrapper {
        width: 100%;
        height: 400%;
        position: relative;
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
        color: #d000ff;
    }
</style>
