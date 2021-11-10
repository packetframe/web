<script defer>
    import {onMount} from "svelte";

    export let nodes = [];

    onMount(() => {
        let blackIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        let purpleIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        let mymap = L.map("netmap").setView([51.505, -0.09], 13);
        mymap.setView([35, 10], 1);

        let CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        });

        CartoDB_DarkMatter.addTo(mymap)

        for (const i in nodes) {
            const lat = nodes[i].lat
            const lon = nodes[i].lon
            L.marker([lat, lon], {icon: nodes[i].active ? purpleIcon : blackIcon})
                .addTo(mymap)
                .bindPopup(`<b>${nodes[i]["name"]}</b>`)
        }
    })
</script>

<main>
    <div id="netmap"></div>
</main>

<style>
    #netmap {
        height: 400px;
        margin-bottom: 15px;
    }
</style>

<svelte:head>
    <link crossorigin="" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" rel="stylesheet"/>
    <script crossorigin="" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
</svelte:head>
