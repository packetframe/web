<script lang="ts">
    import { page } from '$app/stores';

    export const elements = [
        {label: "DNS", href: "/dashboard/dns"},
        // {label: "Containers", href: "/dashboard/containers"},
        {label: "Account", href: "/dashboard/account"}
    ];

    let open = false;
	let width;

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
        {#each elements as item}
            <li class:active={$page.path === item.href}>
                <a href={item.href}>{item.label}</a>
            </li>
        {/each}
    </ul>
    <span class="nav-expand" class:open></span>
    <span class="material-icons" on:click={() => open = !open} class:open>
        {open ? 'close' : 'menu'}
    </span>
</nav>

<style global lang="scss" src="./Navbar.scss">
</style>
