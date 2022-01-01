<script>
    let hidden = false;
</script>

<main class:hidden>
    <span></span>
    <div>
        Welcome to the new Packetframe! 🎉 We've made some big changes to our architecture; check out the <a href="/blog/welcome-v4">blog post</a> for more information.
    </div>
    <span class="material-icons" on:click={() => {hidden = true}}>close</span>
</main>

<style>
    .hidden {
        display: none;
    }

    a {
        color: black;
    }

    main {
        display: flex;
        justify-content: space-between;
        padding: 7px;
        background: #cb00e8;
        color: black;
    }

    span {
        cursor: pointer;
    }
</style>
