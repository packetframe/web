<script>
    import {onMount} from "svelte";

    let content;
    onMount(() => {
        content = "info@packetframe.com"
    })
</script>

<span>{content}</span>
