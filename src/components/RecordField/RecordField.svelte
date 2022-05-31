<script defer lang="ts">
    import Input from "../Input";
    import Button from "../Button";
    import Select from "../Select";
    import {onMount} from "svelte";

    export let zoneFqdn = "";
    export let parentZoneID = "";
    export let callback: () => void;
    export let record = {
        id: "",
        zone: "", // Zone ID
        label: "",
        ttl: 86400,
        type: "A",
        value: "",
        proxy: false
    };

    function deleteSelfRecord() {
        if (!confirm("Are you sure you want to delete this record?")) {
            return
        }

        fetch("/api/dns/records", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                zone: record.zone,
                record: record.id
            })
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location.pathname = "/dashboard/login"
                }
                return response.json()
            })
            .then((data) => {
                if (!data.success) {
                    alert(data.message)
                } else {
                    callback()
                }
            })
    }

    // export let type = "A";
    export let isInDropdown = false;
    export let mobile = false;

    let cm;
    let showScriptEditor;
    let cmEditor; // This is bound to the codemirror div

    let recordTypes = [];
    $: {
        if (!isInDropdown) {
            if (zoneFqdn && zoneFqdn.endsWith(".arpa.")) {
                recordTypes = [
                    {value: "PTR", label: "PTR"},
                    {value: "NS", label: "NS"},
                    {value: "TXT", label: "TXT"},
                ];
                record["type"] = "PTR";
            } else {
                recordTypes = [
                    {value: "A", label: "A"},
                    {value: "AAAA", label: "AAAA"},
                    {value: "CNAME", label: "CNAME"},
                    {value: "MX", label: "MX"},
                    {value: "TXT", label: "TXT"},
                    {value: "NS", label: "NS"},
                    {value: "SRV", label: "SRV"},
                    {value: "SCRIPT", label: "SCRIPT"}
                ];
                record["type"] = "A";
            }
        }
    }

    function submit() {
        error = "";

        if (record["type"] !== "A" && record["type"] !== "AAAA") {
            record.proxy = false;
        }

        // record["type"] = type;
        record.ttl = parseInt(record.ttl);
        record.zone = parentZoneID;
        if (record["type"] === "SRV") {
            record.value = `${priority} ${weight} ${port} ${srvHost}`
        } else if (record["type"] === "MX") {
            record.value = `${mxPriority} ${mxHost}`
        } else if (record["type"] === "SCRIPT") {
            record.value = cm.getValue()
        }

        fetch("/api/dns/records", {
            method: record.id === "" ? "POST" : "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record)
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location.pathname = "/dashboard/login"
                }
                return response.json()
            })
            .then((data) => {
                if (data.success) {
                    callback()
                } else {
                    if (data.data) {
                        let err = data.data.reason[0].FailedField.split("at line")[0].split(": ")[1]
                        if (err !== undefined) {
                            error = err.charAt(0).toUpperCase() + err.slice(1); // Capitalize first letter
                        } else {
                            error = JSON.stringify(data.data.reason)
                        }
                    } else {
                        alert(data.message)
                    }
                }
            })
    }

    // If the component is in the record edit dropdown, set a static record type
    onMount(() => {
        if (isInDropdown) {
            recordTypes = [{value: record['type'], label: record['type']}];
            if (record["type"] === "SCRIPT") {
                loadCodeMirror(record["value"]);
            }
        }
    });

    function loadCodeMirror(value) {
        showScriptEditor = true

        // TODO: This is (presumably) required because the editor DOM element hasn't loaded yet
        setTimeout(() => {
            cmEditor.innerHTML = ""
            cm = CodeMirror(cmEditor, {
                lineNumbers: true,
                mode: "javascript",
                value: value
            })
        }, 50)
    }

    function handleRecordSelect(event) {
        record['type'] = event.detail.value;

        if (record["type"] === "SCRIPT") {
            loadCodeMirror(`async function handleQuery(query) {
    return {
        "authoritative": true,
        "rrs": [
            {
                name: query.name,
                ttl: 86400,
                type: "TXT",
                value: '"Hello World"'
            }
        ]
    }
}
`)

        } else {
            showScriptEditor = false
        }
    }

    let error = "";

    // SRV record values
    let priority = 0;
    let weight = 0;
    let port = 0;
    let srvHost = "";

    // MX record values
    let mxPriority = 0;
    let mxHost = "";

    onMount(() => {
        if (record["type"] === "SRV") {
            let srvValueParts = record.value.split(" ");
            priority = parseInt(srvValueParts[0])
            weight = parseInt(srvValueParts[1])
            port = parseInt(srvValueParts[2])
            srvHost = srvValueParts[3]
        } else if (record["type"] === "MX") {
            let mxValueParts = record.value.split(" ");
            mxPriority = parseInt(mxValueParts[0]);
            mxHost = mxValueParts[1];
        }
    })
</script>

<style global lang="scss" src="./RecordField.scss">
</style>

<div class="pf-record-field" class:mobile>
    <form class="pf-record-field__row" on:submit|preventDefault={submit}>
        <Input bind:error bind:value={record.label} label="Label"/>
        <span class="pf-record-field__small-select">
            <Select isDisabled={isInDropdown} items={recordTypes}
                    label="Type"
                    on:select={handleRecordSelect}
                    value={record['type']}/>
        </span>
        {#if !showScriptEditor}
            <Input bind:value={record.ttl} class="small" label="TTL" min="0" placeholder="86400" type="number"/>
        {/if}

        {#if record["type"] === "A"}
            <Input bind:value={record.value} label="IPv4 Address"/>
        {:else if record["type"] === "AAAA"}
            <Input bind:value={record.value} label="IPv6 Address"/>
        {:else if record["type"] === "MX"}
            <Input bind:value={mxPriority} class="small" type="number" label="Priority" min="0"/>
            <Input bind:value={mxHost} label="Server"/>
        {:else if record["type"] === "NS"}
            <Input bind:value={record.value} label="Nameserver"/>
        {:else if record["type"] === "TXT"}
            <Input bind:value={record.value} label="Value"/>
        {:else if record["type"] === "CNAME" || record["type"] === "PTR"}
            <Input bind:value={record.value} label="Hostname"/>
        {:else if record["type"] === "SRV"}
            <Input class="small" type="number" label="Priority" min="0" bind:value={priority}/>
            <Input class="small" type="number" label="Weight" min="0" bind:value={weight}/>
            <Input class="small" type="number" label="Port" min="0" bind:value={port}/>
            <Input bind:value={srvHost} label="Target"/>
        {/if}
        {#if record["type"] === "A" || record["type"] === "AAAA"}
            <Button type="button" icon={record.proxy ? "cloud_queue" : "cloud_off"} on:click={() => record.proxy = !record.proxy} variant="secondary"/>
        {/if}
        <Button type="submit" variant="secondary">{isInDropdown ? "Save" : "Add"}</Button>
        {#if mobile}
            <Button danger icon="delete_outline" on:click={deleteSelfRecord}/>
        {/if}
    </form>

    {#if showScriptEditor}
        <div class="editor-container">
            <div bind:this="{cmEditor}"></div>
        </div>
    {/if}
</div>
