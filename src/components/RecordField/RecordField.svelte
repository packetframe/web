<script lang="ts">
    import Input from "../Input";
    import Button from "../Button";
    import Select from "../Select";
    import {onMount} from "svelte";

    export let parentZoneID = "";
    export let record = {
        zone: "", // Zone ID
        label: "",
        ttl: 86400,
        type: "A",
        value: "",
        proxied: false
    };

    export let error = "";
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

        if (record.type === "SRV") {
            record.value = `${priority} ${weight} ${port} ${srvHost}`
        }
        record.zone = parentZoneID

        fetch("http://localhost:8080/dns/records", {
            method: "POST",
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
                    document.location.reload() // TODO: Call loadRecords() in dns.svelte instead
                } else {
                    error = data.data.reason[0].FailedField.split("at line")[0]
                }
            })
    }

    // If the component is in the record edit dropdown, set a static record type
    onMount(() => {
        if (isInDropdown) {
            recordTypes = [{value: record.type, label: record.type}];
        }
    });

    // SRV record values
    let srvHost = ""
    let priority = 0;
    let weight = 0;
    let port = 0;
</script>

<style global lang="scss" src="./RecordField.scss">
</style>

<div class="pf-record-field" class:mobile>
    <div class="pf-record-field__row">
        <Input bind:error={error} bind:value={record.label} label="Label"/>
        <span class="pf-record-field__small-select">
            <Select bind:value={record.type} isDisabled={isInDropdown}
                    items={recordTypes}
                    label="Type"/>
        </span>
        <Input bind:value={record.ttl} class="small" label="TTL" min="0" placeholder="86400" type="number"/>

        {#if record.type === "A"}
            <Input bind:value={record.value} label="IPv4 Address"/>
        {:else if record.type === "AAAA"}
            <Input bind:value={record.value} label="IPv6 Address"/>
        {:else if record.type === "MX"}
            <Input class="small" type="number" label="Priority" min="0"/>
            <Input bind:value={record.value} label="Server"/>
        {:else if record.type === "NS"}
            <Input bind:value={record.value} label="Nameserver"/>
        {:else if record.type === "TXT"}
            <Input bind:value={record.value} label="Value"/>
        {:else if record.type === "CNAME"}
            <Input bind:value={record.value} label="Hostname"/>
        {:else if record.type === "SRV"}
            <Input class="small" type="number" label="Priority" min="0" bind:value={priority}/>
            <Input class="small" type="number" label="Weight" min="0" bind:value={weight}/>
            <Input class="small" type="number" label="Port" min="0" bind:value={port}/>
            <Input bind:value={srvHost} label="Target"/>
        {/if}
        <Button icon={record.proxied ? "cloud_queue" : "cloud_off"} on:click={() => record.proxied = !record.proxied} variant="secondary"/>
        <Button on:click={submit} variant="secondary">{isInDropdown ? "Save" : "Add"}</Button>
        {#if mobile}
            <Button danger icon="delete_outline" on:click={() => alert("Are you sure you want to delete this record?")}/>
        {/if}
    </div>
</div>
