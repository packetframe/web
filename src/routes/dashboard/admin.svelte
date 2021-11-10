<script>
    import Card from "../../components/Card";
    import Button from "../../components/Button";
    import Title from "../../components/Title";
    import Select from "../../components/Select/Select.svelte";
    import Map from "../../components/Map.svelte";
    import Table from "../../components/Table.svelte";

    let users = ["user1@example.com", "user2@example.com"]

    let nodes = [
        {lat: 29.8283, lon: -96.5795, name: "PDX01 Portland, Oregon", active: false},
        {lat: 37.8283, lon: -90.5795, name: "SEA01 Seattle, Washington", active: true},
        {lat: 43.8283, lon: -102.5795, name: "PHX02 Phoenix, Arizona", active: false},
    ]

    let nodeNames = nodes.map(node => node.name);

    function setSelected(index) {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].active = (i === index)
        }
        // TODO: This updates the nodes array correctly but the map doesn't redraw
    }
</script>

<main>
    <Title>
        <div slot="header">Admin</div>
    </Title>

    <Card title="Nodes">
        <Map {nodes}/>
        <Select bind:value={nodeNames[0]} items={nodeNames} label="Node" on:select={(e) => setSelected(e.detail.index)}/>

        <Table header={["Label", "Value"]} rows={[
            ["Unicast IP", "192.0.2.189"],
            ["Provider", "Example Provider"],
            ["Location", "Portland, Oregon, USA"],
            ["Datacenter", "Example Datacenter"],
            ["CPU", "4 x Intel(R) Core(TM) i7-6700K CPU @ 4.00GHz"],
            ["RAM", "32 GB"],
            ["Disk", "1000 GB"],
        ]}/>

        <Table header={["Service", "Status", "Uptime"]} rows={[
            ["DNS", "OK", "3 months"]
        ]}/>

        <div class="button-group">
            <Button icon="alt_route" variant="secondary">Withdraw</Button>
            <Button icon="restart_alt" variant="secondary">Reboot</Button>
            <Button icon="trending_up" variant="secondary">Grafana</Button>
        </div>
    </Card>

    <Card title="Users">
        <Select bind:value={users[0]} items={users} label="User"/>

        <div class="button-group">
            <Button icon="person" variant="secondary">Impersonate</Button>
            <Button icon="hide_source" variant="secondary">Disable</Button>
            <Button icon="lock_reset" variant="secondary">Reset Password</Button>
            <Button icon="delete" variant="secondary">Delete</Button>
        </div>
    </Card>
</main>

<style>
    .button-group {
        display: flex;
        align-items: center;
    }
</style>
