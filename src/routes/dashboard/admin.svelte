<script>
    import Card from "../../components/Card";
    import Button from "../../components/Button";
    import Title from "../../components/Title";
    import Select from "../../components/Select/Select.svelte";
    import {onMount} from "svelte";

    let users = [];
    let selectedUser;

    function loadUsers() {
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
                }
            })
    }

    onMount(() => {
        loadUsers()
    })

    function setUserGroup(enabled) {
        fetch("http://localhost:8080/admin/user/groups", {
            method: enabled ? "PUT" : "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: selectedUser["id"],
                group: "core.ENABLED"
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) {
                    alert(data.data.message)
                } else {
                    loadUsers()
                }
            })
    }

    function getUserEmail(option, filterText) {
        return option["email"];
    }
</script>

<main>
    <Title>
        <div slot="header">Admin</div>
    </Title>

    <Card title="Users">
        <Select bind:value={selectedUser} isSearchable items={users} label="User" selectProps={{labelIdentifier: 'email', optionIdentifier: 'email', getOptionLabel: getUserEmail, getSelectionLabel: getUserEmail}}/>

        {#if selectedUser}
            <p>Groups:</p>
            <ul style="margin-left: 30px; margin-bottom: 15px">
                {#if selectedUser["groups"].length === 0}
                    <li>No groups</li>
                {/if}
                {#each selectedUser["groups"] as group}
                    <li>{group}</li>
                {/each}
            </ul>

            <div class="button-group">
<!--                <Button icon="person" variant="secondary">Impersonate</Button>-->
                <Button
                        variant="secondary"
                        icon={selectedUser["groups"].includes("core.ENABLED") ? "hide_source" : "task_alt"}
                        on:click={() => setUserGroup(!selectedUser["groups"].includes("core.ENABLED"))}
                >
                    {selectedUser["groups"].includes("core.ENABLED") ? "Disable" : "Enable"}
                </Button>
            </div>
        {/if}
    </Card>
</main>

<style>
    .button-group {
        display: flex;
        align-items: center;
    }
</style>
