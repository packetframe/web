<script>
    import {onMount} from "svelte";

    let email;
    onMount(() => {
        email = window.atob("aW5mb0BwYWNrZXRmcmFtZS5jb20="); // encoded contact email
    })
</script>

<main>
    <div class="icons">
        <a href="mailto:{email}"><i class="fa fa-envelope fa-xl"></i></a>
        <a href="https://github.com/packetframe"><i class="fab fa-github fa-xl"></i></a>
        <a href="https://twitter.com/packetframe"><i class="fab fa-twitter fa-xl"></i></a>
    </div>

    <p>&copy; Packetframe 2022</p>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 15px;
        color: white;
    }

    a {
        margin: 5px;
        color: white;
        text-decoration: none;
    }

    a:hover {
        color: #dd00ff;
    }
</style>
