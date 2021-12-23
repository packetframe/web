<script lang="ts">

    export let width = 55;
    export let height = 6;
    export let side: "left" | "right" = "left";

    let frames = [];
    let frame = 0;

    let middleLeft = "└" + "─".repeat(width) + "┐\n";
    let middleRight = "┌" + "─".repeat(width) + "┘\n";

    let middleForArrowLeft = "└" + "─".repeat(width - 1) + "┐\n";
    let middleForArrowRight = "┌" + "─".repeat(width - 1) + "┘\n";

    let left = `│${" ".repeat(width + 1)}\n`;
    let right = `${" ".repeat(width + 1)}│\n`;

    let leftArrow = `▼${" ".repeat(width)}\n`;
    let rightArrow = `${" ".repeat(width)} ▼\n`;

    function generateMiddle(side: "left" | "right", arrowIndex: number) {
        let isLeft = side === "left";
        if (arrowIndex < 0) {
            return isLeft ? middleLeft : middleRight;
        } else {
            return isLeft ? setCharAt(middleForArrowLeft, arrowIndex + 1, " ► ") : setCharAt(middleForArrowRight, middleRight.length - arrowIndex - 3, " ◄ ")
        }
    }

    function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index - 1) + chr + str.substring(index + 1);
    }

    function generateSide(side: "left" | "right", arrowIndex: number) {
        let isLeft = side === "left";
        if (arrowIndex < 0) {
            return isLeft ? left.repeat(height) : right.repeat(height);
        } else {
            if (isLeft) {
                return left.repeat(arrowIndex) + leftArrow + left.repeat(height - arrowIndex - 1);
            }
            return right.repeat(arrowIndex) + rightArrow + right.repeat(height - arrowIndex - 1);
        }
    }

    for (let i = 0; i < width + height * 2; i++) {
        let total = "";
        if (i < height) {
            total += generateSide(side, i);
            total += generateMiddle(side, -1);
            total += generateSide(side === "left" ? "right" : "left", -1);

        } else if (i < width + height - 2) {
            total += generateSide(side, -1);
            total += generateMiddle(side, i - height + 1);
            total += generateSide(side === "left" ? "right" : "left", -1);

        } else if (i > width + height) {
            total += generateSide(side, -1);
            total += generateMiddle(side, -1);
            total += generateSide(side === "left" ? "right" : "left", i - (width + height));
        } else {
            continue;
        }
        frames.push(total);
    }

    setInterval(() => {
        if (frame >= frames.length - 1) {
            frame = 0
        } else {
            frame++
        }
    }, 100)

</script>

<pre>{frames[frame]}</pre>

<style>
    pre {
        color: white;
        letter-spacing: 0;
        line-height: 1.2;
        white-space: pre;
        font-size: 10pt;
        font-family: monospace, monospace;
        overflow: hidden;
        resize: none;
        text-align: left;

        background: #D53BAB;
        background: -webkit-linear-gradient(to right, #D53BAB 0%, #8120c0 100%);
        background: -moz-linear-gradient(to right, #D53BAB 0%, #8120c0 100%);
        background: linear-gradient(to right, #D53BAB 0%, #8120c0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
