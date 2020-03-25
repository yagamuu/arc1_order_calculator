<template>
  <v-card outlined tile>
    <v-toolbar dense color="grey lighten-3">
      <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
    </v-toolbar>
    <v-sheet tile>
      <v-card-text><slot></slot></v-card-text>
    </v-sheet>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BasePanel',

  data: () => ({
  }),

  props: [
    'headerTitle',
  ],
});
</script>
