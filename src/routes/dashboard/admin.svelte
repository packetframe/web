<script>
    import Card from "../../components/Card";
    import Button from "../../components/Button";
    import Title from "../../components/Title";
    import Select from "../../components/Select/Select.svelte";
    import {onMount} from "svelte";

    let users = [];
    let selectedUser;

    onMount(() => {
        fetch("http://localhost:8080/admin/user/list", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) {
                    alert(data.data.message)
                } else {
                    users = data.data.users;
                    selectedUser = users[0];
                }
            })
    })

    function getUserEmail(option, filterText) {
        return option["email"];
    }
</script>

<main>
    <Title>
        <div slot="header">Admin</div>
    </Title>

    <Card title="Users">
        <Select label="User" bind:value={selectedUser} isSearchable items={users} selectProps={{labelIdentifier: 'email', optionIdentifier: 'email', getOptionLabel: getUserEmail, getSelectionLabel: getUserEmail}}/>

        <p>Groups:</p>
        {#if selectedUser}
            <ul style="margin-left: 30px; margin-bottom: 15px">
                {#each selectedUser["groups"] as group}
                    <li>{group}</li>
                {/each}
            </ul>
        {/if}

        <div class="button-group">
            <Button icon="person" variant="secondary">Impersonate</Button>
            <Button icon="hide_source" variant="secondary">Disable</Button>
        </div>
    </Card>
</main>

<style>
    .button-group {
        display: flex;
        align-items: center;
    }
</style>
