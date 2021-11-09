<script>
    import Input from "../../components/Input";
    import Card from "../../components/Card";
    import Button from "../../components/Button";
    import Title from "../../components/Title";
</script>

<main>
    <Title>
        <div slot="header">Domain Onboarding</div>
    </Title>
    <Card title="Add a domain">
        <p>Make sure your domain's nameservers are configured to <b>ns1.packetframe.com</b> and <b>ns2.packetframe.com</b>.</p>
        <Input fixErrorHeight={false} label="Domain" placeholder="example.com" type="text"/>
        <Button style="margin-top: 18px" variant="secondary">Add</Button>
    </Card>
</main>
