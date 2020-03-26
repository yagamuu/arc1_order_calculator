import {
  VuexModule, getModule, Module, Mutation, Action,
} from 'vuex-module-decorators';
import store from '@/store';
import clone from 'clone';
import { resultModule } from '@/store/result';
import { gameDataModule } from '@/store/gameData';
import { UnitParam, unit, unitList } from '@/assets/game_data/mapUnitList';

const initUnit: UnitParam = {
  id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
};

// state's interface
export interface MainState {
  unitList: unitList;
  count: number;
  lastActionId: number;
}

const makeInitUnitList = (): unitList => [{ id: 0, unit: clone(initUnit) }];

@Module({
  dynamic: true, store, name: 'main', namespaced: true,
})
class Main extends VuexModule implements MainState {
  // state
  count = 0;

  unitList: unitList = makeInitUnitList();

  lastActionId = 0;

  @Mutation
  private SET_COUNT(data: number) {
    this.count = data;
  }

  @Mutation
  private SET_UNIT_LIST(data: unitList) {
    this.unitList = data;
  }

  @Mutation
  private SET_UNIT_ACTION_PARAM({ data, index }: {data: number; index: number }) {
    this.unitList[index].unit.action = data;
  }

  @Mutation
  private PUSH_UNIT_LIST(data: unit) {
    this.unitList.push(data);
  }

  @Mutation
  private SET_LAST_ACTION_ID(data: number) {
    this.lastActionId = data;
  }

  @Mutation
  private REMOVE_UNIT_LIST(id: number) {
    for (let i = 0; i < this.unitList.length; i += 1) {
      if (id === this.unitList[i].id) {
        this.unitList.splice(i, 1);
      }
    }
  }

  @Action
  public initAllAction() {
    this.SET_UNIT_LIST(makeInitUnitList());
    this.SET_COUNT(0);
    this.SET_LAST_ACTION_ID(0);
    resultModule.initResultListAction();
  }

  @Action
  public addUnitAction() {
    this.SET_COUNT(this.count + 1);
    const data = {
      id: this.count,
      unit: clone(initUnit),
    };
    this.PUSH_UNIT_LIST(data);
  }

  @Action
  public initActionParamAction(id: number) {
    for (let i = 0; i < this.unitList.length; i += 1) {
      if (id === this.unitList[i].unit.id) {
        const unitData = this.unitList[i].unit;

        // 対象キャラのアクセサリー効果量取得
        const acsPow = gameDataModule.accessoryList.filter((acs) => acs.id === unitData.acs)[0].pow;
        // 対象キャラのアクセサリー効果量取得
        const unitDefaultSpeed = gameDataModule.unitDefaultParamList.filter(
          (status) => status.id === unitData.id,
        )[0].speed;

        // 対象キャラの各種補正無し敏捷値算出(初期値+Lv上昇量+パロの実)
        const unitSpeed = unitDefaultSpeed + (unitData.lv - 1) + unitData.paro;
        // 対象キャラのアクセサリーによる補正値算出
        const unitSpeedAcsFix = Math.floor(unitSpeed * (acsPow - 1));
        // 対象キャラの敏捷上昇効果による補正値算出
        const unitSpeedEffectFix = Math.floor(unitSpeed * (unitData.speedUp ? 0.2 : 0));
        // 補正値込みの敏捷度算出
        const unitSpeedTotal = unitSpeed + unitSpeedAcsFix + unitSpeedEffectFix;
        // 敏捷度は最大100
        const unitSpeedResult = unitSpeedTotal > 100 ? 100 : unitSpeedTotal;
        this.SET_UNIT_ACTION_PARAM({ data: 100 - unitSpeedResult, index: i });
      }
    }
  }

  @Action
  public removeUnitListAction(id: number) {
    if (this.unitList.length === 1) {
      alert('これ以上削除出来ません');
      return;
    }
    this.REMOVE_UNIT_LIST(id);
  }

  @Action
  public moveUnitAction() {
    // 最も行動値が低いユニット検索
    let minActionValue = 100;
    this.unitList.forEach((unitData) => {
      minActionValue = unitData.unit.action < minActionValue
        ? unitData.unit.action : minActionValue;
    });
    minActionValue = minActionValue < 1 ? 1 : minActionValue;

    // ループ数削減のために全ユニットの行動値を最小にまで減少
    this.unitList.forEach((unitData, index) => {
      const actionParam = this.unitList[index].unit.action - (minActionValue - 1);
      this.SET_UNIT_ACTION_PARAM({ data: actionParam, index });
    });

    let actionloopFlag = true;
    while (actionloopFlag) {
      // 最後に行動したユニットから1ずつ行動値を減少し、0になったユニットが行動
      const { length } = this.unitList;
      while (this.lastActionId < length) {
        const actionParam = this.unitList[this.lastActionId].unit.action;
        this.SET_UNIT_ACTION_PARAM({ data: actionParam - 1, index: this.lastActionId });
        if (this.unitList[this.lastActionId].unit.action <= 0) {
          const unitData = this.unitList[this.lastActionId].unit;
          this.initActionParamAction(unitData.id);
          this.SET_LAST_ACTION_ID(this.lastActionId + 1);
          const actionUnitName = gameDataModule.unitDefaultParamList.filter(
            (status) => status.id === unitData.id,
          )[0].name;
          resultModule.addResultAction(actionUnitName);
          actionloopFlag = false;
          break;
        }
        this.SET_LAST_ACTION_ID(this.lastActionId + 1);
      }
      this.SET_LAST_ACTION_ID(actionloopFlag ? 0 : this.lastActionId);
    }
  }

  @Action
  public repeatMoveUnitAction(count: number) {
    for (let i = 0; i < count; i += 1) {
      this.moveUnitAction();
    }
  }

  @Action
  public setMapUnitAction(id: number) {
    // マップのユニットを設定
    const unitListData = gameDataModule.mapUnitList.filter(
      (mapUnit) => mapUnit.id === id,
    )[0].unitList;
    this.SET_UNIT_LIST(clone(unitListData));
  }
}

export const mainModule = getModule(Main);
