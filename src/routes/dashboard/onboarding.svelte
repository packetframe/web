<script>
    import Input from "../../components/Input";
    import Card from "../../components/Card";
    import Button from "../../components/Button";
    import Title from "../../components/Title";

    let zone;
    let zoneError;

    function submit() {
        zoneError = ""
        fetch("/api/dns/zones", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "zone": zone,
            })
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location.pathname = "/dashboard/login"
                } else if (response.status === 409) {
                    zoneError = "Zone already exists"
                    return
                }
                return response.json()
            })
            .then((data) => {
                if (data.success) {
                    window.location.pathname = "/dashboard/dns"
                } else {
                    zoneError = "Invalid domain"
                }
            })
    }
</script>

<main>
    <Title>
        <div slot="header">Domain Onboarding</div>
    </Title>
    <Card title="Add a domain">
        <p>Make sure your domain's nameservers are configured to <b>ns1v4.packetframe.com</b> and <b>ns2v4.packetframe.com</b>.</p>
        <Input bind:value={zone} bind:error={zoneError} fixErrorHeight={false} label="Domain" placeholder="example.com" type="text"/>
        <Button style="margin-top: 18px" variant="secondary" on:click={submit}>Add</Button>
    </Card>
</main>
