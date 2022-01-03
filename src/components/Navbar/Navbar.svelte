<script lang="ts">
    import {page} from '$app/stores';
    import {onMount} from "svelte";

    export let sticky = true;
    export let homepage = false;
    export let elements = [
        {label: "DNS", href: "/dashboard/dns"},
        // {label: "Containers", href: "/dashboard/containers"},
        {label: "Account", href: "/dashboard/account"},
    ];

    let open = false;
    let width;

    onMount(() => {
        if (homepage) {
            sticky = false;
            elements = [
                {label: "Blog", href: "/blog"},
                {label: "Community", href: "/community"},
                {label: "Dashboard", href: "/dashboard"},
            ]
        } else {
            elements.push({label: "Logout", href: "/dashboard/logout"})
            fetch("/api/user/info", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.status === 401 && $page.path !== "/dashboard/login" && $page.path !== "/dashboard/signup" && $page.path !== "/dashboard/password_reset") {
                        window.location.pathname = "/dashboard/login"
                    }
                    return response.json()
                })
                .then((data) => {
                    if (data.success && data.data.admin) {
                        elements = [...elements, {label: "Admin", href: "/dashboard/admin"}]
                    }
                })
        }
    })

    // $: if ($location !== "") {
    // 	open = false;
    // }

    $: if (width > 825) {
        open = false;
    }
</script>

<svelte:window bind:innerWidth={width}></svelte:window>

<nav class="pf-nav" class:sticky={sticky}>
    <a href="/">
        <img alt="Logo" src="/cloud-flat-striped.png">
        <h1>Packetframe</h1>
    </a>
    <ul class:open>
        {#each elements as item}
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
