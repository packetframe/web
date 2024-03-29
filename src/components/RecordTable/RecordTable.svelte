<script lang="ts">
    import Record from "../Record";

    type Record = {
        zone: string,
        id: string,
        label: string,
        type: string,
        ttl: number,
        value: string,
        proxy: boolean,
    }

    export let callback: () => void;
    export let allowDeletion: boolean = true;
    export let allowSelection: boolean = true;
    export let handleSelection: (selectionState: boolean, data: Record, e: MouseEvent) => any = () => {
    };

    export let handleDeletion: (data: Record[]) => any = (d) => {
        if (!confirm(`Are you sure you want to delete ${d.length > 1 ? "these records" : "this record"}?`)) {
            return
        }

        for (const record of d) {
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
    }

    export let records: Record[] = [];
    $: selectionStates = records.map(r => {
        return {data: r, selected: false}
    });

    let deleteIcon: string = "delete_outline";

    let innerWidth;
    let isLarge: boolean = true;

    $: if (innerWidth <= 800 && isLarge) {
        isLarge = false;
    } else if (innerWidth >= 800 && !isLarge) {
        isLarge = true;
    }
</script>

<svelte:window bind:innerWidth/>

<main>
    {#if isLarge}
        <table class="pf-record-table">
            <tr class="pf-record-table__tr">
                {#if allowSelection && allowDeletion}
                    <th on:click={() => {handleDeletion(selectionStates.filter(r => r.selected).map(r => r.data))}} class="pf-record-table__header material-icons" style="display: flex; font-size: 20px; cursor: pointer;">
                        {deleteIcon}
                    </th>
                {:else if allowSelection}
                    <th class="pf-record-table__header"></th>
                {/if}
                <!-- TODO: When expanding a zone with the arrow icon, the label and type table headers jump around -->
                {#each ["Label", "Type", "TTL", "Value", "", ""] as head}
                    <th class="pf-record-table__header">{head}</th>
                {/each}
            </tr>
            <tr class="pf-record-table__spacer"></tr>
            {#each records as record, i}
                <tr class="pf-record-table__spacer"></tr>
                <Record selectedState={selectionStates[i].selected} {callback} {allowDeletion} {allowSelection} handleSelection={(s, d, e) => {selectionStates[i].selected = s; handleSelection(s, d, e)}} {record} zebra={records.length < 3 || i%2 === 0}/>
            {/each}
        </table>
    {:else}
        <div class="pf-record-table_mobile">
            {#each records as record, i}
                <Record mobile {callback} {allowDeletion} {allowSelection} handleSelection={(s, d, e) => {selectionStates[i].selected = s; handleSelection(s, d, e)}} {record} zebra={records.length < 3 || i%2 === 0}/>
            {/each}
        </div>
    {/if}
</main>

<style global lang="scss" src="./RecordTable.scss"></style>
