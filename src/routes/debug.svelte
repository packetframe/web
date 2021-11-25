<script>
    import {onMount} from "svelte";
    import {meta} from "../version";

    let serverVersion;
    let serverCommit;
    let serverBuildDate;

    function loadServerMetadata() {
        fetch("/api/meta", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(resp => resp.json())
            .then(data => {
                serverVersion = data.data.version;
                serverCommit = data.data.commit.substring(0, 7);
                serverBuildDate = new Date(data.data.date).toLocaleTimeString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric'});
            })
    }

    onMount(() => {
        loadServerMetadata()
    })
</script>

<main>
    <h1>Packetframe</h1>
    <img alt="" src="cloud-flat.png">
    <p>
        API: <a href="https://github.com/packetframe/api/releases/v{serverVersion}">v{serverVersion}-{serverCommit}</a> built {serverBuildDate}
        <br>
        Frontend: <a href="https://github.com/packetframe/web/releases/v{meta.version}">v{meta.version}-{meta.commit.substring(0, 7)}</a> built {new Date(meta.date).toLocaleTimeString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric'})}
    </p>
</main>

<style global>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        margin-top: 25px;
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
        color: white;
    }
</style>
