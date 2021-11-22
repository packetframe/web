<script>
    import {onMount} from "svelte";

    onMount(() => {
        fetch("$apiServer/user/logout", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) {
                    alert(data.message)
                } else {
                    window.location.pathname = "/dashboard/login"
                }
            })
    })
</script>
