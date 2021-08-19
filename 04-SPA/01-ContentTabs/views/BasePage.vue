<template>
  <content-tabs :tabs="tabs">
    <transition>
      <router-view :prop="prop" />
    </transition>
  </content-tabs>
</template>

<script>
import ContentTabs from '../components/ContentTabs';

export default {
  name: 'BasePage',

  components: { ContentTabs },

  data() {
    return {
      tabs: [
        { to: '/a', text: 'Page A' },
        { to: { name: 'b' }, text: 'Page B' },
      ],
      prop: 'Prop Data',
    };
  },
};
</script>

<style scoped></style>
