<template>
  <button @click="increment">{{ count }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      require: true,
      default: 0,
    }
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    increment() {
      this.$emit('increment', this.count + 1);
    }
  }
};
</script>

<style>
button {
  width: 100px;
  height: 100px;
}
</style>
