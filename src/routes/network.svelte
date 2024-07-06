<script>
	import { onMount } from 'svelte';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar/Navbar.svelte';
	import { nodes } from '../nodes.js';

	onMount(() => {
		let netMap = L.map('netmap').setView([0, 0], 1);
		let CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: 'abcd',
			maxZoom: 19
		});
		CartoDB_DarkMatter.addTo(netMap);

		let icon = new L.Icon({
			iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});

		for (const i in nodes) {
			let node = nodes[i];
			L.marker(node.geo, { icon: icon })
				.addTo(netMap)
				.bindPopup(`<b>${node.name.toUpperCase()} (${node.id})</b>
												<br>
												<a href='https://peeringdb.com/fac/${node.pdb}'>${node.pdbname}</a>`);
		}
	});
</script>

<main>
	<Navbar homepage />
	<br>

	<div class="body">
		<h1>Packetframe Network</h1>

		<p>
			Packetframe operates it's own global anycast network built on donations from the <a
			href="/community">community</a>.
			We can deploy on anything from a small virtual machine to spare rack space, so if you're interested in
			sponsoring a node, please reach out!
		</p>

		<h2>Peering with Packetframe</h2>
		<p>
			Packetframe has an open peering policy. See <a href="https://peeringdb.com/asn/968">AS968 on PeeringDB</a>
			for more information. AS968 routes are also available at all <a href="https://as34553.net">AS34553</a>
			locations.
		</p>

		<div id="netmap"></div>

		<p>Each Packetframe node announces it's anycast routes tagged with a BGP community to indicate which PoP it was
			originated from:</p>
		<table>
			<thead>
			<tr>
				<th>Node</th>
				<th>Community</th>
			</tr>
			</thead>
			<tbody>
			{#each nodes as node}
				<tr>
					<td>{node.name.toUpperCase()}</td>
					<td>968:33:{node.id}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>

	<Footer />
</main>

<style>
    h1, h2 {
        margin-bottom: 0;
    }

    #netmap {
        height: 50vh;
        margin-top: 25px;
    }

    .body {
        color: white;
        padding: 0 5px 0 15px;
        max-width: 900px;
        margin: 0 auto;
    }

    tr {
        text-align: left;
    }
</style>
