<template>
  <v-app>
    <v-content>
      <the-app-bar />
      <the-contents />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TheAppBar from './components/TheAppBar.vue';
import TheContents from './components/TheContents.vue';

export default Vue.extend({
  name: 'App',

  components: {
    TheAppBar,
    TheContents,
  },

  data: () => ({
    //
  }),
});
</script>
