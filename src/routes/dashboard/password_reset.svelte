<script lang="ts">
    import Title from "../../components/Title";
    import Card from "../../components/Card/Card.svelte";
    import Input from "../../components/Input/Input.svelte";
    import Button from "../../components/Button/Button.svelte";
    import {onMount} from "svelte";
    import Spinner from "../../components/Spinner/Spinner.svelte";

    let mode = "request";

    let loading = false;
    let token;
    let email;
    let password;
    let repeatPassword;

    let emailError = "";
    let passwordError = "";
    let repeatPasswordError = "";

    onMount(() => {
        loading = false;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("token")) {
            token = urlParams.get("token")
            email = urlParams.get("email")
            mode = "confirm"
        }
    })

    function handleClick() {
        // Clear errors
        emailError = "";
        passwordError = "";
        repeatPasswordError = "";

        let errored = false
        if (!email) {
            emailError = "This is a required field"
            errored = true
        }

        if (mode === "confirm") {
            if (!password) {
                passwordError = "This is a required field"
                errored = true
            }
            if (!repeatPassword) {
                repeatPasswordError = "This is a required field"
                errored = true
            }
            if (password !== repeatPassword) {
                repeatPasswordError = "Passwords must match"
                errored = true
            }
        }

        if (!errored) {
            if (mode === "request") {
                loading = true
                fetch("/api/user/request_password_reset", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "email": email,
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        loading = false
                        if (data.success) {
                            alert(data.message)
                            window.location.pathname = "/dashboard/dns"
                        } else {
                            if (data.data && data.data.reason[0].FailedField === "Email") {
                                emailError = "Invalid email address"
                            } else {
                                alert(data.message)
                            }
                        }
                    })
            } else { // confirm
                loading = true
                fetch("/api/user/confirm_password_reset", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password,
                        "token": token
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        loading = false
                        if (data.success) {
                            alert(data.message)
                            window.location.pathname = "/dashboard/login"
                        } else {
                            if (data.data) {
                                for (const reason of data.data.reason) {
                                    if (reason.FailedField === "User.Email") {
                                        emailError = "Invalid email address"
                                    } else if (reason.FailedField === "User.Password") {
                                        if (reason.Tag === "min") {
                                            passwordError = `Password must be at least ${reason.Value} characters`
                                        } else if (reason.Tag === "max") {
                                            passwordError = `Password must be less than ${reason.Value + 1} characters`
                                        }
                                    }
                                }
                            } else {
                                alert(data.message)
                            }
                        }
                    })
            }
        }
    }
</script>

<main>
    <Title>
        <div slot="header">Reset Password</div>
    </Title>

    <Card>
        <form on:submit|preventDefault={handleClick}>
            <Input bind:error={emailError} bind:value={email} fixErrorHeight={false} label="Email" placeholder="Enter email..." style="margin-bottom: 10px" type="text"/>
            {#if mode === "confirm"}
                <Input bind:error={passwordError} bind:value={password} fixErrorHeight={false} label="Password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
                <Input fixErrorHeight={false} bind:error={repeatPasswordError} bind:value={repeatPassword} label="Repeat password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
            {/if}
            <p>
                Already have an account?
                <a href="/dashboard/login">Login</a>
            </p>
            {#if loading}
                <Spinner/>
            {:else}
                <Button
                        style="margin-top: 18px"
                        type="submit"
                        variant="secondary"
                >
                    Submit
                </Button>
            {/if}
        </form>
    </Card>
</main>

<style>
    main {
        max-width: 500px;
        padding-top: 15px;
        padding-left: 15px;
        padding-right: 15px;
        margin: auto;
    }

    p {
        margin-top: 15px;
    }
</style>
