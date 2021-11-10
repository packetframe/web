<script>
    import RecordField from "../../components/RecordField";
    import Title from "../../components/Title";
    import Select from "../../components/Select";
    import Button from "../../components/Button/Button.svelte";
    import Card from "../../components/Card/Card.svelte";
    import RecordTable from "../../components/RecordTable/RecordTable.svelte";
    import {onMount} from "svelte";

    function loadZones() {
        fetch("http://localhost:8080/dns/zones", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location = "/dashboard/login"
                }
                return response.json()
            })
            .then((data) => {
                if (data.success) {
                    zones = data.data.zones.map(z => z.zone.slice(0, -1))
                    zoneIDs = data.data.zones.map(z => z.id)
                    selectedZone = zones[0]
                    loadRecords()
                    if (zones.length > 0) {
                        recordDisplay = "display"
                    } else {
                        recordDisplay = "onboard"
                    }
                } else {
                    alert(data.message)
                }
            })
    }

    function loadRecords() {
        fetch("http://localhost:8080/dns/records/" + zoneIDs[zones.indexOf(selectedZone)], {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location = "/dashboard/login"
                }
                return response.json()
            })
            .then((data) => {
                if (data.success) {
                    records = data.data.records
                } else {
                    alert(data.message)
                }
            })
    }

    let recordDisplay = "loading";
    let zones = [];
    let zoneIDs = [];
    let selectedZone = zones[0];

    onMount(() => {
        loadZones()
    })

    let records = [
        {label: "packetframe.com", type: "A", ttl: 86400, value: "23.141.0.15"},
        {label: "packetframe.com", type: "AAAA", ttl: 86400, value: "2001:db8::51:3"},
        {label: "packetframe.com", type: "MX", ttl: 86400, value: "10 mail.example.com."},
        {label: "packetframe.com", type: "TXT", ttl: 86400, value: "v=DKwIDAQABkfd~jkldakjlfdjjk2klfdsjfdakCCjdkaldfkjIUIDJKALKDjfda'fkd"},
        {label: "packetframe.com", type: "A", ttl: 86400, value: "23.141.0.15", proxied: true},
        {label: "packetframe.com", type: "SRV", ttl: 86400, value: "23.141.0.15"},
        {label: "packetframe.com", type: "A", ttl: 86400, value: "23.141.0.15"},
        {label: "packetframe.com", type: "A", ttl: 86400, value: "23.141.0.15"},
        {label: "packetframe.com", type: "A", ttl: 86400, value: "23.141.0.15"},
        {label: "packetframe.com", type: "A", ttl: 86400, value: "23.141.0.15"},
    ];
</script>

<main>
    <Title>
        <div slot="header">DNS</div>
        <div slot="items">
            {#if zones.length > 0}
                <Select bind:value={selectedZone} items={zones} isSearchable on:select={loadRecords}/>
            {/if}
        </div>
    </Title>
    {#if recordDisplay === "loading"}
        <p style="color: white; margin-left: 4px">Loading...</p>
    {:else if recordDisplay === "display"}
        <div style="margin: 12px">
            <RecordField bind:parentZoneID={zoneIDs[zones.indexOf(selectedZone)]}/>
        </div>
        <RecordTable {records}/>
    {:else}
        <!-- TODO: Button has extra space on the left -->
        <Card title="Add a domain to get started">
            <Button variant="filled" on:click={() => {window.location = "/dashboard/onboarding"}}>Add Domain</Button>
        </Card>
    {/if}
</main>
