<script lang="ts">
    import RecordField from "../RecordField";
    import Button from "../Button";

    type Record = {
        id: string,
        label: string;
        type: string;
        ttl: number;
        value: string;
        proxy: boolean;
        zone: string;
    };

    export let callback: () => void;
    export let record: Record;
    export let zebra = false;
    export let mobile = false;
    export let allowSelection = true;
    export let selectedState = false;
    export let handleSelection: (selectedState: boolean, data: Record, e?: MouseEvent) => void = undefined;

    let open = false;
</script>

<tr class="pf-record" class:mobile class:open class:zebra on:click={() => {if (!mobile) {open = !open}}}>

    {#if mobile}
        <div class="pf-record-mobile__wrapper">
            <span class="pf-record-field pf-record__type">{record.type}</span>
            <span class="pf-record-field pf-record__label">
        {record.label}
                <span class="material-icons">arrow_right</span>
                {record.value}
      </span>
        </div>
        <Button variant="secondary" icon="tune" on:click={() => {open = !open}}/>

        <!-- <span class="pf-record-field pf-record__arrow">
          <span class="material-icons-round">expand_more</span>
        </span> -->
    {:else}
        {#if allowSelection}
            <td class="pf-record__checkbox">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="checkbox">
                  <span class="checkbox__input">
                    <input on:click|stopPropagation={(e) => {handleSelection(!selectedState, record, e)}} type="checkbox" name="checkbox" bind:checked={selectedState}/>
                    <span class="checkbox__control">
                      <span class="bg"></span>
                    </span>
                  </span>
                </label>
            </td>
        {/if}
        <td class="pf-record__label">{record.label}</td>
        <td id="col2" class="pf-record__type">{record.type}</td>
        <td class="pf-record__ttl">{record.ttl}</td>
        <td class="pf-record__value">{record.value}</td>
        <td class="pf-record__icon">
            {#if record.proxy}
                <span class="material-icons-round">cloud_queue</span>
            {/if}
        </td>
        <td class="pf-record__arrow">
            <!-- TODO: This arrow doesn't load at first (see other todo about moving to a npm package) -->
            <span class="material-icons-round">expand_more</span>
        </td>
    {/if}

    <!-- <td style="width: 34px">
        <span on:click={() => {
           prompt("Are you sure you want to delete this record?")
        }} class="material-icons-round">delete_outline</span>
    </td> -->
</tr>
{#if open}
    <tr class="pf-record__dropdown" class:open class:mobile>
        <td colspan="7" headers="col2" class="pf-record__dropdown-wrap">
            <div class="pf-record__dropdown-anchor">
                <RecordField {callback} {record} isInDropdown {mobile} parentZoneID={record.zone}/>
            </div>
        </td>
    </tr>
{/if}

<style global lang="scss" src="./Record.scss">
</style>

<!-- TODO: The values in the record row shouldn't be reactive to the input fields, otherwise someone could edit the text box and collapse the dropdown without pressing save, and might think it's been saved -->
