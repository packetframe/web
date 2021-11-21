<script lang="ts">
    import {page} from '$app/stores';
    import {onMount} from "svelte";

    export let elements = [
        {label: "DNS", href: "/dashboard/dns"},
        // {label: "Containers", href: "/dashboard/containers"},
        {label: "Account", href: "/dashboard/account"},
    ];

    let open = false;
    let width;

    onMount(() => {
        fetch("http://localhost:8080/user/info", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 401 && $page.path !== "/dashboard/login") {
                    window.location.pathname = "/dashboard/login"
                }
                return response.json()
            })
            .then((data) => {
                if (data.success && data.data.admin) {
                    elements = [...elements, {label: "Admin", href: "/dashboard/admin"}]
                }
            })
    })

    // $: if ($location !== "") {
    // 	open = false;
    // }

    $: if (width > 825) {
        open = false;
    }
</script>

<svelte:window bind:innerWidth={width}></svelte:window>

<nav class="pf-nav">
    <a href="/"><h1>Packetframe</h1></a>
    <ul class:open>
        {#each [...elements, {label: "Logout", href: "/dashboard/logout"}] as item}
            <li class:active={$page.path === item.href}>
                <a href={item.href}>{item.label}</a>
            </li>
        {/each}
    </ul>
    <span class="nav-expand" class:open></span>
    <span class="material-icons" class:open on:click={() => open = !open}>
        {open ? 'close' : 'menu'}
    </span>
</nav>

<style global lang="scss" src="./Navbar.scss">
</style>
