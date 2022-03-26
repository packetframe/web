<!--suppress JSUnresolvedLibraryURL -->
<svelte:head>
    <link rel="stylesheet" href="/codemirror.css">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.css' rel='stylesheet'>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/javascript/javascript.js'></script>
</svelte:head>

<script>
    import {onMount} from "svelte";

    let defaultScript = `async function handleQuery(query) {
    return {
        "authoritative": true,
        "rrs": [
            {
                name: query.name,
                ttl: 86400,
                type: "TXT",
                value: "Hello World"
            }
        ]
    }
}
`

    onMount(() => {
        let editorContainer = document.querySelector('.container')
        CodeMirror(editorContainer, {
            lineNumbers: true,
            mode: 'javascript',
            value: defaultScript
        })
    })
</script>

<main>
    <div class="container"></div>
</main>
