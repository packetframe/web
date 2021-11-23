<main class="index-wrapper">
    <img class="construction" src="construction.png" alt="Under Construction">
    <p class="footer">&copy; Packetframe 2021</p>
</main>

<style global>
    main.index-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    img.construction {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
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
