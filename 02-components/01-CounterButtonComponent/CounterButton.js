export const CounterButton = {
  inheritAttrs: false,
  template: `<button @click="increment">{{ count }}</button>`,

  props: {
    'count': { 
      type: Number,
      require: true,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  methods: {
    increment() {
      return this.$emit('increment', this.count + 1);
    }
  }
};
