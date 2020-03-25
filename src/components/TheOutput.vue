<template>
  <base-panel headerTitle="出力結果">
    <span v-for="result in resultList" :key="result.id">
      {{result.message}}の行動<br>
    </span>
  </base-panel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { resultModule } from '@/store/result';
import BasePanel from './BasePanel.vue';

@Component({
  components: {
    BasePanel,
  },
})

export default class Setting extends Vue {
  get resultList() {
    return resultModule.resultList;
  }
}

</script>
