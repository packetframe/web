<script lang="ts">
    import Title from "./Title";
    import Card from "./Card/Card.svelte";
    import Input from "./Input/Input.svelte";
    import Button from "./Button/Button.svelte";

    type Options = "signup" | "login";
    export let mode: Options = undefined;

    let email;
    let password;
    let repeatPassword;
    let howDidYouHearAboutUs;

    let emailError = "";
    let passwordError = "";
    let repeatPasswordError = "";
    let howDidYouHearAboutUsError = "";

    function handleClick() {
        // Clear errors
        emailError = "";
        passwordError = "";
        repeatPasswordError = "";
        howDidYouHearAboutUsError = "";

        let errored = false
        if (!email) {
            emailError = "This is a required field"
            errored = true
        }
        if (!password) {
            passwordError = "This is a required field"
            errored = true
        }
        if (mode === "signup") {
            if (!repeatPassword) {
                repeatPasswordError = "This is a required field"
                errored = true
            }
            if (!howDidYouHearAboutUs) {
                howDidYouHearAboutUsError = "This is a required field"
                errored = true
            }
            if (password !== repeatPassword) {
                repeatPasswordError = "Passwords must match"
                errored = true
            }
            if (!errored) {
                fetch("http://localhost:8080/user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password,
                        "refer": howDidYouHearAboutUs
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            alert("Account created successfully. Please log in.")
                            window.location = "/dashboard/login"
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
        } else if (!errored) {
            fetch("http://localhost:8080/user/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        window.location = "/dashboard/dns"
                    } else {
                        emailError = "Invalid username or password"
                        passwordError = emailError
                    }
                })
        }
    }
</script>

<main>
    <Title>
        <div slot="header">{mode === "login" ? "Login" : "Signup"}</div>
    </Title>

    <Card>
        <Input bind:error={emailError} bind:value={email} fixErrorHeight={false} label="Email" placeholder="Enter email..." style="margin-bottom: 10px" type="text"/>
        <Input bind:error={passwordError} bind:value={password} fixErrorHeight={false} label="Password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
        {#if mode === "signup"}
            <Input fixErrorHeight={false} bind:error={repeatPasswordError} bind:value={repeatPassword} label="Repeat password" placeholder="Enter password..." style="margin-bottom: 10px" type="password"/>
            <Input fixErrorHeight={false} bind:error={howDidYouHearAboutUsError} bind:value={howDidYouHearAboutUs} label="How did you hear about Packetframe?" placeholder="I heard about Packetframe from..." type="text"/>
        {/if}
        <p>
            {mode === "signup" ? "Already have an account?" : "Need an account?"}
            <a href={mode === "signup" ? "/dashboard/login" : "/dashboard/signup"}>
                {mode === "signup" ? "Login" : "Signup"}
            </a>
        </p>
        <Button
                on:click={handleClick}
                style="margin-top: 18px"
                variant="secondary"
        >
            {mode === "login" ? "Login" : "Signup"}
        </Button>
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
