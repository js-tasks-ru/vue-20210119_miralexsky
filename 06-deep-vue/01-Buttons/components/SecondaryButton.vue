<template>
  <BaseButton class="button_secondary" v-bind="$attrs" @click="$emit('click')"><slot></slot></BaseButton>
</template>

<script>
import BaseButton from "./BaseButton";

export default {
  name: 'SecondaryButton',
  components: { BaseButton },
};
</script>

<style scoped>
.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}
</style>
