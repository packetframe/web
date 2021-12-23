<script>
    import TextArea from "./Pre.svelte";

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

<TextArea content={render(blink)}/>
