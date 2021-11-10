<script lang="ts">
    export let header = [];
    export let rows = [];
</script>

<main>
    <table class="pf-record-table">
        <tr class="pf-record-table__tr">
            {#each header as head}
                <th class="pf-record-table__header">{head}</th>
            {/each}
        </tr>
        <tr class="pf-record-table__spacer"></tr>
        {#each rows as row, i}
            <tr>
                {#each row as elem}
                    <td>{elem}</td>
                {/each}
            </tr>
        {/each}
    </table>
</main>

<style lang="scss">
  @import "./RecordTable/variables";

  .pf-record-table {
    border: none;
    font-size: 14px; // TODO: Decide on font-size system based on sizes...
    width: calc(100% - 8px); // TODO: make this responsive properly
    border-collapse: separate;
    border-spacing: 0px;
    padding-bottom: 20px;

    border-radius: $record-table-border-radius;
    background: $record-table-background;
    color: $record-table-color;
    margin: $spacer;

    .pf-record-table__tr {
      color: $record-table-color;
      text-align: left;

      .pf-record-table__header {
        padding-left: $spacer * 2;
        border-bottom: 1px solid $header-border-color;
        padding-bottom: $spacer * 2;
      }
    }

    .pf-record-table__spacer {
      height: $spacer;
    }
  }

  td {
    padding-left: 7px;
  }
</style>
