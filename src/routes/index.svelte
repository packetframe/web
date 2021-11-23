<script>
    import { onMount } from "svelte";

    let growBg = false;
    let animateLogo = false;

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
    })

</script>

<div class="wrapper">
    <main class="index-wrapper">
        <img class="pf-hole" src="pf-hole.png" alt="Under Construction">
        <img class="pf-cloud" src="cloud-hover.png" alt="flat cloud">
        <div class="pf-bg-delay"></div>
        <div class="pf-bg" class:growBg></div>
        <div class="pf-bg-trigger-delay"></div>
        <div class="pf-bg-trigger" id="pf-bg-trigger" class:fixed={animateLogo}></div>
        <div class="pf-bg-trigger-2" id="pf-bg-trigger-2" class:sticky={animateLogo}></div>
        <h1 class="pf-header" class:animate={animateLogo}>Packetframe</h1>
        <!-- <p class="footer">&copy; Packetframe 2021</p> -->
    </main>
</div>


<style global>


    div.wrapper {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        /* overflow-x: hidden; */
        /* overflow-y: scroll; */
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 12;
    }

    div.pf-bg-delay {
        width: 100vw;
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
        background-color: #161616;
        transition: ease all 1s;
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

    div.growBg {
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    h1.pf-header {
        position: fixed;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0%);
        z-index: 20;
        transition: ease all 0.5s;
        color: white;
    }

    h1.pf-header.animate {
        top: calc(50% + 25px);
        transition: ease all 1s;
    }

    main.index-wrapper {
        width: 100vw;
        height: 400%;
        position: relative;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
    }

    * {
        box-sizing: border-box;
    }

    div#svelte {
        width: 100vw;
        height: 100vh;
    }

    ::selection {
        background: #b03ac6;
    }

    ::-moz-selection {
        background: #b03ac6;
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
