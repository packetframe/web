<script>
    export let content, rows, cols;
</script>

<main>
    <textarea cols={cols} disabled rows={rows}>{content}</textarea>
</main>

<style>
    textarea {
        color: white;
        letter-spacing: 0;
        line-height: 1.2;
        white-space: pre;
        font-size: 8pt;
        font-family: monospace, monospace;
        overflow: hidden;
        resize: none;
        background-color: black;
        border: none;
    }
</style>
