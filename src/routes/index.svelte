<main>
    <p class="upper">
        Under Construction
        <br>
        <span>Early 2022</span>
    </p>
    <img src="construction.png" alt="Under Construction">
    <p class="footer">&copy; Packetframe 2021</p>
</main>

<!-- TODO: Navigating to the DNS tab and back to index breaks index styling -->

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet">
</svelte:head>

<style global>
    main {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    img {
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

    p {
        font-family: 'Rock Salt', cursive;
        text-align: center;
    }

    p.upper {
        position: absolute;
        color: #161616;
        font-size: 52px;
        font-weight: bold;
        text-space: 10px;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

    p.upper span {
        font-size: 32px;
    }

    p.footer {
        position: absolute;
        color: #161616;
        font-size: 10px;
        font-weight: bold;
        text-space: 10px;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }
</style>
