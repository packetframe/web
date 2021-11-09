<script>
    import RecordField from "../../components/RecordField";
    import Title from "../../components/Title";
    import Select from "../../components/Select";
    import Button from "../../components/Button/Button.svelte";
    import Card from "../../components/Card/Card.svelte";
    import RecordTable from "../../components/RecordTable/RecordTable.svelte";

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
    let zones = ["test.com"];
    let zone = zones[0];
</script>

<main>
    <Title>
        <div slot="header">DNS</div>
        <div slot="items">
            {#if zones.length > 0}
                <Select bind:value={zone} items={zones} isSearchable/>
            {/if}
        </div>
    </Title>
    {#if zones.length > 0}
        <div style="margin: 12px">
            <RecordField/>
        </div>
        <RecordTable {records}/>
    {:else}
        <!-- TODO: Button has extra space on the left -->
        <Card title="Add a domain to get started">
            <Button variant="filled" on:click={() => {window.location = "/dashboard/onboarding"}}>Add Domain</Button>
        </Card>
    {/if}
</main>
