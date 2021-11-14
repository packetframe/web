<script>
    import Input from "../../components/Input";
    import Card from "../../components/Card";
    import Button from "../../components/Button";
    import Title from "../../components/Title";

    function deleteUser() {
        if (!confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            return
        }

        fetch("http://localhost:8080/user/delete", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    window.location = "/"
                } else {
                    alert(data.message)
                }
            })
    }
</script>

<main>
    <Title>
        <div slot="header">Account</div>
    </Title>
    <Card title="Change Password">
        <Input fixErrorHeight={false} label="Current password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
        <Input fixErrorHeight={false} label="New password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
        <Input fixErrorHeight={false} label="Repeat new password" placeholder="Enter password..." type="password"/>
        <Button style="margin-top: 18px" variant="secondary">Save</Button>
    </Card>
    <Card title="Delete Account">
        <p>Deleting your account is <b>permanent</b> and cannot be undone.</p>
        <Button style="margin-top: 18px" variant="filled" danger on:click={deleteUser}>Delete Account</Button>
    </Card>
</main>
