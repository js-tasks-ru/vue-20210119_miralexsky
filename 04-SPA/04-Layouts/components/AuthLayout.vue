<template>
  <div class="page_onboarding">
    <h2>
      {{ title }}
    </h2>
    <slot>

    </slot>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  props: {
    title: {
      required: true,
    }
  }
};
</script>

<style scoped></style>
