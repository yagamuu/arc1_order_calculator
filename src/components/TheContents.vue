<template>
  <v-container>
    <v-row>
      <v-col cols="10" xs="12">
        <the-setting />
      </v-col>
      <v-col cols="2" xs="12">
        <the-output />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import TheSetting from './TheSetting.vue';
import TheOutput from './TheOutput.vue';

export default Vue.extend({
  name: 'Contents',

  components: {
    TheSetting,
    TheOutput,
  },

  data: () => ({
  }),
});
</script>
