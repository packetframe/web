<script>
    import RecordField from "../../components/RecordField";
    import Title from "../../components/Title";
    import Select from "../../components/Select";
    import Button from "../../components/Button/Button.svelte";
    import Card from "../../components/Card/Card.svelte";
    import RecordTable from "../../components/RecordTable/RecordTable.svelte";
    import {onMount} from "svelte";
    import Spinner from "../../components/Spinner/Spinner.svelte";
    import Input from "../../components/Input/Input.svelte";

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
                    zoneDocs = data.data.zones
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
        selectedZoneID = zoneDocs[zones.indexOf(selectedZone)].id;
        fetch("http://localhost:8080/dns/records/" + selectedZoneID, {
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
                id: selectedZoneID
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

    function addUser() {
        fetch("http://localhost:8080/dns/zones/user", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                zone: selectedZoneID,
                user: userInputEmail
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
                    loadZones()
                    userInputEmail = ""
                } else {
                    userInputEmailError = data.message
                }
            })
    }

    function removeUser() {
        fetch("http://localhost:8080/dns/zones/user", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                zone: selectedZoneID,
                user: userInputEmail
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
                    loadZones()
                    userInputEmail = ""
                } else {
                    userInputEmailError = data.message
                }
            })
    }

    // TODO: Fix this zone state management so there aren't so many fields
    let recordDisplay = "loading";
    let zones = [];
    let zoneDocs = [];
    let selectedZone = zones[0];
    let selectedZoneID = "";
    let records = [];
    let showMenu = false;
    let userInputEmail = "";
    let userInputEmailError = "";

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
        <div style="margin: 25px">
            <Spinner/>
        </div>
    {:else if recordDisplay === "display"}
        <div style="margin: 12px">
            <div style="display: flex; flex-direction: row; align-items: center">
                <RecordField bind:parentZoneID={selectedZoneID} callback={loadRecords}/>
                <div style="margin-top: 18px">
                    <Button variant={showMenu ? "" : "secondary"} icon="expand_more"
                            on:click={() => {showMenu = !showMenu}}/>
                </div>
            </div>
            {#if showMenu}
                <div style="padding-bottom: 18px">
                    <Card>
                        <div style="display: flex; align-items: center">
                            <Input bind:error={userInputEmailError} bind:value={userInputEmail} fixErrorHeight={false} label="Email" placeholder="Enter email..." style="margin-bottom: 10px" type="text"/>
                            <div style="display: flex; margin-top: 6px;">
                                <Button variant="secondary" icon="person" on:click={addUser}>Add User</Button>
                                <Button variant="secondary" icon="person" on:click={removeUser}>Delete User</Button>
                            </div>
                        </div>

                        <p style="margin-left: 5px">Users:</p>
                        <ul style="margin-left: 30px; margin-bottom: 15px">
                            {#each zoneDocs[zones.indexOf(selectedZone)].user_emails as email}
                                <li on:click={() => {userInputEmail = email}}>{email}</li>
                            {/each}
                        </ul>

                        <Button icon="delete" danger on:click={deleteZone}>Delete Zone</Button>
                    </Card>
                </div>
            {/if}
        </div>
        <RecordTable {records} callback={loadRecords}/>
    {:else}
        <!-- TODO: Button has extra space on the left -->
        <Card title="Add a domain to get started">
            <Button variant="filled" on:click={() => {window.location = "/dashboard/onboarding"}}>Add Domain</Button>
        </Card>
    {/if}
</main>
