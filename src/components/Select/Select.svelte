<script>
  import Select from "svelte-select";

  export let items;
  export let label = "";
  export let showIndicator = true;
  export let isClearable = false;
  export let icon = null;
  export let value = null;
  export let isDisabled = false;
  export let isSearchable = false;

  export let selectProps = {};

  import Icon from "./Icon.svelte";
</script>

<style lang="scss" src="./Select.scss" global>
</style>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="pf-select" style="{label === '' ? '': 'padding-bottom: 19px;'}" class:icon>
  <div class="pf-select__label">{label}</div>
  <Select Icon={icon ? Icon : null} iconProps={icon ? {icon} : null} {isSearchable} {items} {isClearable} {isDisabled} showIndicator={showIndicator && !isDisabled} bind:value={value} on:select {$$restProps} {...selectProps} />
</label>
