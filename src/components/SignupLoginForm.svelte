<script lang="ts">
    import Title from "./Title";
    import Card from "./Card/Card.svelte";
    import Input from "./Input/Input.svelte";
    import Button from "./Button/Button.svelte";

    type Options = "signup" | "login";
    export let mode: Options = undefined;
</script>

<main>
    <Title>
        <div slot="header">{mode === "login" ? "Login" : "Signup"}</div>
    </Title>

    <Card>
        <Input fixErrorHeight={false} label="Email" placeholder="Enter email..." style="margin-bottom: 10px" type="text"/>
        <Input fixErrorHeight={false} label="Password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
        {#if mode === "signup"}
            <Input fixErrorHeight={false} label="Repeat password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
            <Input fixErrorHeight={false} label="How did you hear about Packetframe?" placeholder="I heard about Packetframe from..." type="text"/>
        {/if}
        <p>{mode === "signup" ? "Already have an account?" : "Need an account?"} <a href={mode === "signup" ? "/dashboard/login" : "/dashboard/signup"}>{mode === "signup" ? "Login" : "Signup"}</a></p>
        <Button style="margin-top: 18px" variant="secondary">{mode === "login" ? "Login" : "Signup"}</Button>
    </Card>
</main>

<style>
    main {
        max-width: 500px;
        padding-top: 15px;
        padding-left: 15px;
        padding-right: 15px;
    }

    p {
        margin-top: 15px;
        margin-left: 4px;
    }
</style>
