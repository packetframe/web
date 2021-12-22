<script>
    import TextArea from "./TextArea.svelte";

    function render(blink) {
        let eye = blink ? "()" : "<>"
        return `            .-"""-.
           '       \\
          |,.  ,-.  |
          |()   ` + eye + `| |
          |,'  \`".| |
          |.___.',| \`
         .' \`--"' \`  \`.
        / '        '   \\
       / /          \`   \`.
      / /            \`    .
     / /              '   |
    . ,               |   |
    ,"\`.             .|   |
 _.'   \`\`.          | \`..-'
|       \`.\`,        |      \`.
|         \`.    __.,         )
|__        |--""___|      ,-'
   \`"--...,+""""   \`._,.-'`
    }

    let blink = true;
    setInterval(() => {
        blink = !blink
    }, 700)
</script>

<main>
    <TextArea rows="18" cols="30" content={render(blink)}/>
</main>
