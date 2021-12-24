<script lang="ts">
    export let reverse = false;
    export let title = "";
</script>

<main style="--flexNormal:{reverse ? 'row-reverse' : 'row'}">
    <div>
        <slot/>
    </div>
    <div class="text">
        <h2>{title}</h2>
        <slot name="text"></slot>
    </div>
</main>

<style>
    main {
        width: auto;
        display: flex;
        flex-direction: var(--flexNormal);
        align-items: center;
        justify-content: center;
        max-width: 900px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    @media (max-width: 768px) {
        main {
            flex-direction: column-reverse;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        width: 50%;
        justify-content: center;
        align-items: center;
    }

    div.text {
        align-items: flex-start !important;
    }

    h2 {
        margin: 1rem 0;
        background: #D53BAB;
        background: -webkit-linear-gradient(to right, #D53BAB 0%, #AB2AFF 100%);
        background: -moz-linear-gradient(to right, #D53BAB 0%, #AB2AFF 100%);
        background: linear-gradient(to right, #D53BAB 0%, #AB2AFF 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
