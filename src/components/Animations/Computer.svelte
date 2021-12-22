<script>
    function renderBlink(showCursor) {
        let cursor = showCursor ? "█" : " "
        return `
┌───────────────────────────────┐
│                               │
│ ~ ▴ ` + cursor + `                         │
│                               │
│                               │
│                               │
│                               │
│                               │
└───────────────────────────────┘
             [____]
      ┌───────────────────┐
      │ [──]              │
      │ [──]              │
      └───────────────────┘`
    }

    function renderCommand(command) {
        return `
┌───────────────────────────────┐
│                               │
│ ~ ▴ ` + command + " ".repeat(26 - command.length) + `│
│                               │
│                               │
│                               │
│                               │
│                               │
└───────────────────────────────┘
             [____]
      ┌───────────────────┐
      │ [──]              │
      │ [──]              │
      └───────────────────┘`
    }

    let complete = `
┌───────────────────────────────┐
│                               │
│ ~ ▴ dig packetframe.com       │
│ ;; opcode: QUERY; status: OK  │
│                               │
│ ;; QUESTION SECTION:          │
│ ;; packetframe.com.  IN A     │
│                               │
└───────────────────────────────┘
             [____]
      ┌───────────────────┐
      │ [──]              │
      │ [──]              │
      └───────────────────┘`

    let frames = []

    for (let i = 0; i < 3; i++) {
        frames.push(renderBlink(true))
        frames.push(renderBlink(true))
        frames.push(renderBlink(true))
        frames.push(renderBlink(false))
        frames.push(renderBlink(false))
        frames.push(renderBlink(false))
    }
    let command = "dig packetframe.com"
    for (let i = 0; i < command.length + 1; i++) {
        frames.push(renderCommand(command.substring(0, i)))
    }
    for (let i = 0; i < 15; i++) {
        frames.push(complete)
    }

    let frame = 0;
    setInterval(() => {
        if (frame >= frames.length - 1) {
            frame = 0
        } else {
            frame++
        }
    }, 200)
</script>

<main>
    <textarea cols='33' disabled rows='16'>{frames[frame]}</textarea>
</main>

<style>
    textarea {
        color: white;
        letter-spacing: 0;
        line-height: 1.2;
        white-space: pre;
        font-size: 10pt;
        font-family: monospace, monospace;
        overflow: hidden;
        resize: none;
    }
</style>
