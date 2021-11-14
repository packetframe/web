<script lang="ts">
    import Input from "../Input";
    import Button from "../Button";
    import Select from "../Select";
    import {onMount} from "svelte";

    export let parentZoneID = "";
    export let callback;
    export let record = {
        id: "",
        zone: "", // Zone ID
        label: "",
        ttl: 86400,
        type: "A",
        value: "",
        proxied: false
    };

    export let type = "A";
    export let isInDropdown = false;
    export let mobile = false;

    let recordTypes = [
        {value: "A", label: "A"},
        {value: "AAAA", label: "AAAA"},
        {value: "CNAME", label: "CNAME"},
        {value: "MX", label: "MX"},
        {value: "TXT", label: "TXT"},
        {value: "NS", label: "NS"},
        {value: "SRV", label: "SRV"}
    ];

    function submit() {
        error = ""

        record.type = type;
        record.ttl = parseInt(record.ttl)
        record.zone = parentZoneID
        if (record.type === "SRV") {
            record.value = `${priority} ${weight} ${port} ${srvHost}`
        }

        fetch("http://localhost:8080/dns/records", {
            method: record.id === "" ? "POST" : "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record)
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location = "/dashboard/login"
                }
                return response.json()
            })
            .then((data) => {
                if (data.success) {
                    callback()
                } else {
                    if (data.data) {
                        error = data.data.reason[0].FailedField.split("at line")[0]
                    } else {
                        alert(data.message)
                    }
                }
            })
    }

    // If the component is in the record edit dropdown, set a static record type
    onMount(() => {
        if (isInDropdown) {
            recordTypes = [{value: type, label: type}];
        }
    });

    function handleRecordSelect(event) {
        type = event.detail.value;
    }

    let error = "";

    // SRV record values
    let priority = 0;
    let weight = 0;
    let port = 0;
    let srvHost = "";

    onMount(() => {
        if (record.type === "SRV") {
            let srvValueParts = record.value.split(" ");
            priority = parseInt(srvValueParts[0])
            weight = parseInt(srvValueParts[1])
            port = parseInt(srvValueParts[2])
            srvHost = srvValueParts[3]
        }
    })
</script>

<style global lang="scss" src="./RecordField.scss">
</style>

<div class="pf-record-field" class:mobile>
    <div class="pf-record-field__row">
        <Input bind:error bind:value={record.label} label="Label"/>
        <span class="pf-record-field__small-select">
            <Select bind:value={record.type} isDisabled={isInDropdown}
                    items={recordTypes}
                    label="Type"
                    on:select={handleRecordSelect}/>
        </span>
        <Input bind:value={record.ttl} class="small" label="TTL" min="0" placeholder="86400" type="number"/>

        {#if type === "A"}
            <Input bind:value={record.value} label="IPv4 Address"/>
        {:else if type === "AAAA"}
            <Input bind:value={record.value} label="IPv6 Address"/>
        {:else if type === "MX"}
            <Input class="small" type="number" label="Priority" min="0"/>
            <Input bind:value={record.value} label="Server"/>
        {:else if type === "NS"}
            <Input bind:value={record.value} label="Nameserver"/>
        {:else if type === "TXT"}
            <Input bind:value={record.value} label="Value"/>
        {:else if type === "CNAME"}
            <Input bind:value={record.value} label="Hostname"/>
        {:else if type === "SRV"}
            <Input class="small" type="number" label="Priority" min="0" bind:value={priority}/>
            <Input class="small" type="number" label="Weight" min="0" bind:value={weight}/>
            <Input class="small" type="number" label="Port" min="0" bind:value={port}/>
            <Input bind:value={srvHost} label="Target"/>
        {/if}
        <Button icon={record.proxied ? "cloud_queue" : "cloud_off"} on:click={() => record.proxied = !record.proxied} variant="secondary"/>
        <Button on:click={submit} variant="secondary">{isInDropdown ? "Save" : "Add"}</Button>
        {#if mobile}
            <!-- TODO: Actually make this delete -->
            <Button danger icon="delete_outline" on:click={() => alert("Are you sure you want to delete this record?")}/>
        {/if}
    </div>
</div>
