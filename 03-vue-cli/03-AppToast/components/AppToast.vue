<template>
  <div class="toasts" id="toasts">
    <div v-for="(toast, index) in toasts" :key="index" class="toast" :class="toast.getClass()">
      <app-icon :icon="toast.getImage()"/>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

class Toast {
  constructor(type, message) {

    this.classes = {
      success: 'toast_success',
      error: 'toast_error',
    };

    this.images = {
      success: 'check-circle',
      error: 'alert-circle',
    };

    this.type = type;
    this.message = message;
  }

  getClass() {
    return this.classes[this.type];
  }

  getImage() {
    return this.images[this.type];
  }

}

export default {
  name: 'AppToast',

  data() {
    return {
      toasts: [],
    };
  },

  components: {
    AppIcon,
  },

  methods: {
    error(message) {
      let toast = new Toast('error', message);
      this.toasts.push(toast);

      let _this = this;
      setTimeout(function() {
        _this.toasts.shift();
      }, DELAY);
    },

    success(message) {
      let toast = new Toast('success', message);
      this.toasts.push(toast);

      let _this = this;
      setTimeout(function() {
        _this.toasts.shift();
      }, DELAY);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
