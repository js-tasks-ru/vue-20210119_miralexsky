<template>
  <div>
    <TheHeader/>
    <div class="page">
      <router-view />
    </div>
    <TheFooter/>
  </div>
</template>

<script>
import TheFooter from './TheFooter';
import TheHeader from './TheHeader';
export default {
  name: 'BaseLayout',
  components: {
    TheFooter,
    TheHeader
  }
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}

.page >>> .page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}

.page >>> .page_meetup-forms {
  padding: 70px 0;
}

</style>
