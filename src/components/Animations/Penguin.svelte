<script>
    function render(blink) {
        let eye = blink ? "()" : "<>"
        return `
            .-"""-.
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
    <textarea cols='32' disabled rows='19'>{render(blink)}</textarea>
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
    }
</style>