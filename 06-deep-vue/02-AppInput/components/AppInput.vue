<template>
  <div
    class="input-group" :class="imageClass"
  >
    <slot name="left-icon">
      <img class="icon"/>
    </slot>

    <component
      :is="multiline ? 'textarea' : 'input'"
      class="form-control"
      :class="inputClass"
      :value.prop="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      v-bind="$attrs"
    />

    <slot name="right-icon">
      <img class="icon"/>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,
  data() {
    return {

    };
  },
  computed: {
    inputClass() {
      return {
        'form-control_rounded': this.rounded,
        'form-control_sm': this.small,
      };
    },
    imageClass() {
      return {
        'input-group_icon': !!this.$slots["left-icon"] || !!this.$slots["right-icon"],
        'input-group_icon-left': !!this.$slots["left-icon"],
        'input-group_icon-right': !!this.$slots["right-icon"],
      };
    },
  },
  props: {
    small: {
      required: false,
      default: false,
      type: Boolean,
    },
    rounded: {
      required: false,
      default: false,
      type: Boolean,
    },
    multiline: {
      required: false,
      default: false,
      type: Boolean,
    },
    value: {
      required: false,
      default: '',
      type: String,
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>
