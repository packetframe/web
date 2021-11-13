<script>
    import RecordField from "../../components/RecordField";
    import Title from "../../components/Title";
    import Select from "../../components/Select";
    import Button from "../../components/Button/Button.svelte";
    import Card from "../../components/Card/Card.svelte";
    import RecordTable from "../../components/RecordTable/RecordTable.svelte";
    import {onMount} from "svelte";
    import Spinner from "../../components/Spinner/Spinner.svelte";

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

    function deleteZone() {
        if (!confirm(`Are you sure you want to delete ${selectedZone}?`)) {
            return
        }

        fetch("http://localhost:8080/dns/zones", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: zoneIDs[zones.indexOf(selectedZone)]
            })
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location = "/dashboard/login"
                }
                return response.json()
            })
            .then((data) => {
                if (data.success) {
                    window.location.reload()
                } else {
                    alert(data.message)
                }
            })
    }

    let recordDisplay = "loading";
    let zones = [];
    let zoneIDs = [];
    let selectedZone = zones[0];
    let records = [];
    let showMenu = false;

    onMount(() => {
        loadZones()
    })
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
        <Spinner/>
    {:else if recordDisplay === "display"}
        <div style="margin: 12px">
            <div style="display: flex; flex-direction: row; align-items: center">
                <RecordField bind:parentZoneID={zoneIDs[zones.indexOf(selectedZone)]}/>
                <div style="margin-top: 18px">
                    <Button variant={showMenu ? "" : "secondary"} icon="expand_more"
                            on:click={() => {showMenu = !showMenu}}/>
                </div>
            </div>
            {#if showMenu}
                <div style="padding-bottom: 18px">
                    <Card>
                        <div style="display: flex; align-items: center">
                            <Button icon="delete" danger on:click={deleteZone}>Delete Zone</Button>
<!--                            <Button icon="person">Add User</Button>-->
<!--                            <Button icon="person">Delete User</Button>-->
<!--                            <ul style="margin-left: 30px">-->
<!--                                <li>User 1</li>-->
<!--                                <li>User 2</li>-->
<!--                                <li>User 3</li>-->
<!--                            </ul>-->
                        </div>
                    </Card>
                </div>
            {/if}
        </div>
        <RecordTable {records}/>
    {:else}
        <!-- TODO: Button has extra space on the left -->
        <Card title="Add a domain to get started">
            <Button variant="filled" on:click={() => {window.location = "/dashboard/onboarding"}}>Add Domain</Button>
        </Card>
    {/if}
</main>
