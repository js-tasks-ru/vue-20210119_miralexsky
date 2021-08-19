<template>
  <div class="page_onboarding">
    <h2>
    {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  props: {
    title: {
      require: true,
    }
  }
};
</script>

<style scoped></style>
