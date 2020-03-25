<template>
  <base-panel headerTitle="各種設定">
    <v-card-actions>
      <v-btn @click="initAll">初期化</v-btn>
      <v-btn color="primary" @click="addUnit">ユニット追加</v-btn>
      <v-btn color="info" @click="moveUnitAction">次のユニットの行動出力</v-btn>
      <v-btn color="success" @click="repeatMoveUnit10">10回行動出力</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-select
        item-text="name"
        item-value="id"
        :items="mapList"
        label="マップ"
        v-model="mapId"
        @change="setMapUnit(mapId)"
        dense
        outlined
      ></v-select>
    </v-card-actions>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ユニット</th>
            <th class="text-left">Lv</th>
            <th class="text-left">パロの実</th>
            <th class="text-left">アクセサリー</th>
            <th class="text-left">敏捷上昇</th>
            <th class="text-left">行動値</th>
            <th class="text-left">初期化</th>
            <th class="text-left">削除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unitData in unitList" :key="unitData.id">
            <td>
              <v-select
                item-text="name"
                item-value="id"
                :items="unitDefaultParamList"
                v-model="unitData.unit.id"
              ></v-select>
            </td>
            <td>
              <v-select
                :items="lvList"
                v-model="unitData.unit.lv"
              ></v-select>
            </td>
            <td>
              <v-select
                :items="paroList"
                v-model="unitData.unit.paro"
              ></v-select>
            </td>
            <td>
              <v-select
                item-text="name"
                item-value="id"
                :items="accessoryList"
                v-model="unitData.unit.acs"
              ></v-select>
            </td>
            <td>
              <v-checkbox
                v-model="unitData.unit.speedUp"
              ></v-checkbox></td>
            <td>{{ unitData.unit.action }}</td>
            <td><v-btn color="warning" @click="initActionParam(unitData.unit.id)">R</v-btn></td>
            <td><v-btn color="error" @click="removeUnit(unitData.id)">☓</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </base-panel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mainModule } from '@/store/main';
import { gameDataModule } from '@/store/gameData';
import BasePanel from './BasePanel.vue';

@Component({
  components: {
    BasePanel,
  },
})

export default class Setting extends Vue {
  mapId = 0;

  get unitList() {
    return mainModule.unitList;
  }

  get unitDefaultParamList() {
    return gameDataModule.unitDefaultParamList;
  }

  get mapList() {
    return gameDataModule.mapList;
  }

  get lvList(): Array<number> {
    return [...Array(60).keys()].map((i = 1) => i + 1);
  }

  get paroList(): Array<number> {
    return [...Array(13).keys()];
  }

  get accessoryList() {
    return gameDataModule.accessoryList;
  }

  addUnit() {
    mainModule.addUnitAction();
  }

  initAll() {
    mainModule.initAllAction();
  }

  initActionParam(id: number) {
    mainModule.initActionParamAction(id);
  }

  moveUnitAction() {
    mainModule.moveUnitAction();
  }

  repeatMoveUnit10() {
    mainModule.repeatMoveUnitAction(10);
  }

  removeUnit(id: number) {
    mainModule.removeUnitListAction(id);
  }

  setMapUnit(id: number) {
    mainModule.setMapUnitAction(id);
  }
}

</script>
