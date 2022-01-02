<script>
    import {onMount} from "svelte";

    onMount(() => {
        let netMap = L.map("netmap").setView([6.76, -0.35], 3);
        let CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        });
        CartoDB_DarkMatter.addTo(netMap)

        let icon = new L.Icon({
            iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })

        fetch("https://packetframe.com/nodes.json")
            .then(resp => resp.json())
            .then(nodes => {
                for (const i in nodes) {
                    fetch("https://www.peeringdb.com/api/fac/" + nodes[i]["pdb"])
                        .then(resp => resp.json())
                        .then(data => {
                            L.marker([data.data[0].latitude, data.data[0].longitude], {icon: icon})
                                .addTo(netMap)
                                .bindPopup(`
                            <b>${nodes[i]["name"].toUpperCase()} (${nodes[i]["id"]})</b>
                            <br>
                            <a href='https://peeringdb.com/fac/${nodes[i]['pdb']}'>${data.data[0].name}</a>
                        `)
                        })
                }
            })
    })
</script>

<svelte:head>
    <link crossorigin="" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" rel="stylesheet"/>
    <script crossorigin="" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
</svelte:head>

<main>
    <div id="netmap"></div>
</main>

<style>
    #netmap {
        height: 100vh;
        margin-bottom: 15px;
    }
</style>
