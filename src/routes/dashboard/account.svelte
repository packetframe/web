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

    function changePassword() {
        if (password !== passwordRepeat) {
            passwordRepeatError = "Passwords must match"
            return
        }
        passwordError = ""
        passwordRepeat = ""

        fetch("http://localhost:8080/user/password", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password: password})
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location = "/dashboard/login"
                }
                return response.json()
            })
            .then((data) => {
                if (data.success) {
                    alert("Password changed successfully. Please log in again.")
                    window.location = "/dashboard/login"
                } else {
                    if (data.data) {
                        for (const reason of data.data.reason) {
                            if (reason.Tag === "min") {
                                passwordError = `Password must be at least ${reason.Value} characters`
                            } else if (reason.Tag === "max") {
                                passwordError = `Password must be less than ${reason.Value + 1} characters`
                            }
                        }
                    } else {
                        alert(data.message)
                    }
                }
            })
    }

    let password;
    let passwordError;
    let passwordRepeat;
    let passwordRepeatError;
</script>

<main>
    <Title>
        <div slot="header">Account</div>
    </Title>
    <Card title="Change Password">
        <Input bind:error={passwordError} bind:value={password} fixErrorHeight={false} label="New password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
        <Input bind:error={passwordRepeatError} bind:value={passwordRepeat} fixErrorHeight={false} label="Repeat new password" placeholder="Enter password..." type="password"/>
        <Button on:click={changePassword} style="margin-top: 18px" variant="secondary">Save</Button>
    </Card>
    <Card title="Delete Account">
        <p>Deleting your account is <b>permanent</b> and cannot be undone.</p>
        <Button danger on:click={deleteUser} style="margin-top: 18px" variant="filled">Delete Account</Button>
    </Card>
</main>
