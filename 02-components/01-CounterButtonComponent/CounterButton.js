export const CounterButton = {

  template: `<button @click="incrementHardCode">{{ fittedCount }}</button>`,

  props: {
    'count': { type: Number},
    'value': {type: Number}
  },

  computed: {
    vCount() {
      let localCount = this.count || this.value;
      return ++localCount || 1;
    },
    fittedCount() {
      return this.count || this.value || 0
    }
  },

  methods: {
    incrementHardCode() {
      this.$emit('increment', this.vCount);
      this.$emit('input', this.vCount);
    }
  }
};
