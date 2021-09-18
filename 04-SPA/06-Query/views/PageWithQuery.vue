<template>
  <div class="container">
    <meetups-view
      v-bind="{ ...defaultValues, ...$route.query }"
      @update:view="pushRouterParams($event, 'view')"
      @update:date="pushRouterParams($event, 'date')"
      @update:participation="pushRouterParams($event, 'participation')"
      @update:search="pushRouterParams($event, 'search')"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: {MeetupsView},
  data() {
    return {
      defaultValues: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: '',
      },
    }
  },
  methods: {
    getQuery(newQuery) {
      let resultQuery = {}
      let mergedQuery = {...this.$route.query, ...newQuery}

      console.log('getQuery', mergedQuery, Object.entries(mergedQuery));

      for (const [key, param] of Object.entries(mergedQuery)) {

        console.log(key, this.defaultValues[key])

        if (this.defaultValues[key] !== param) {
          resultQuery[key] = param
        }
      }

      console.log('final', resultQuery)

      return resultQuery
    },
    pushRouterParams($event, paramName) {
      let query = this.getQuery({ [paramName]: $event })

      if (JSON.stringify(query) !== JSON.stringify(this.$route.query)) {
        this.$router.push(
          {
            path: '/',
            query,
          });
      }
    }
  },
};
</script>

<style scoped></style>
