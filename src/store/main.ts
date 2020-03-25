import {
  VuexModule, getModule, Module, Mutation, Action,
} from 'vuex-module-decorators';
import store from '@/store';
import clone from 'clone';
import { resultModule } from '@/store/result';
import { gameDataModule } from '@/store/gameData';
import { UnitParam } from '@/assets/game_data/mapUnitList';

const initUnit: UnitParam = {
  id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
};

export type Unit = { id: number; unit: UnitParam };
export type UnitListType = Array<Unit>;

// state's interface
export interface MainState {
  unitList: UnitListType;
  count: number;
  lastActionId: number;
}

const makeInitUnitList = (): UnitListType => [{ id: 0, unit: clone(initUnit) }];

@Module({
  dynamic: true, store, name: 'main', namespaced: true,
})
class Main extends VuexModule implements MainState {
  // state
  count = 0;

  unitList: UnitListType = makeInitUnitList();

  lastActionId = 0;

  @Mutation
  private setCount(data: number) {
    this.count = data;
  }

  @Mutation
  private setUnitList(data: UnitListType) {
    this.unitList = data;
  }

  @Mutation
  private setUnitActionParam({ data, index }: {data: number; index: number }) {
    this.unitList[index].unit.action = data;
  }

  @Mutation
  private pushUnitList(data: Unit) {
    this.unitList.push(data);
  }

  @Mutation
  private setLastActionId(data: number) {
    this.lastActionId = data;
  }

  @Mutation
  private removeUnitList(id: number) {
    for (let i = 0; i < this.unitList.length; i += 1) {
      if (id === this.unitList[i].id) {
        this.unitList.splice(i, 1);
      }
    }
  }

  @Action
  public initAllAction() {
    this.setUnitList(makeInitUnitList());
    this.setCount(0);
    this.setLastActionId(0);
    resultModule.initResultListAction();
  }

  @Action
  public addUnitAction() {
    this.setCount(this.count + 1);
    const data = {
      id: this.count,
      unit: clone(initUnit),
    };
    this.pushUnitList(data);
  }

  @Action
  public initActionParamAction(id: number) {
    for (let i = 0; i < this.unitList.length; i += 1) {
      if (id === this.unitList[i].unit.id) {
        const unitData = this.unitList[i].unit;

        // 対象キャラのアクセ効果量取得
        const acsPow = gameDataModule.accessoryList.filter((acs) => acs.id === unitData.acs)[0].pow;
        // 対象キャラのアクセ効果量取得
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
        this.setUnitActionParam({ data: 100 - unitSpeedResult, index: i });
      }
    }
  }

  @Action
  public removeUnitListAction(id: number) {
    if (this.unitList.length === 1) {
      alert('これ以上削除出来ません');
      return;
    }
    this.removeUnitList(id);
  }

  @Action({ rawError: true })
  public moveUnitAction() {
    // 最も行動値が低いユニット検索
    let minActionValue = 100;
    this.unitList.forEach((unit) => {
      minActionValue = unit.unit.action < minActionValue ? unit.unit.action : minActionValue;
    });
    minActionValue = minActionValue < 1 ? 1 : minActionValue;

    // ループ数削減のために全ユニットの行動値を最小にまで減少
    this.unitList.forEach((unit, index) => {
      const actionParam = this.unitList[index].unit.action - (minActionValue - 1);
      this.setUnitActionParam({ data: actionParam, index });
    });

    let actionloopFlag = true;
    while (actionloopFlag) {
      // 最後に行動したユニットから1ずつ行動値を減少し、0になったユニットが行動
      const { length } = this.unitList;
      while (this.lastActionId < length) {
        const actionParam = this.unitList[this.lastActionId].unit.action;
        this.setUnitActionParam({ data: actionParam - 1, index: this.lastActionId });
        if (this.unitList[this.lastActionId].unit.action <= 0) {
          const unitData = this.unitList[this.lastActionId].unit;
          this.initActionParamAction(unitData.id);
          this.setLastActionId(this.lastActionId + 1);
          const actionUnitName = gameDataModule.unitDefaultParamList.filter(
            (status) => status.id === unitData.id,
          )[0].name;
          resultModule.addResultAction(actionUnitName);
          actionloopFlag = false;
          break;
        }
        this.setLastActionId(this.lastActionId + 1);
      }
      this.setLastActionId(actionloopFlag ? 0 : this.lastActionId);
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
    // マップのユニットを取得
    const { unitList } = gameDataModule.mapUnitList.filter((mapUnit) => mapUnit.id === id)[0];
    this.setUnitList(clone(unitList));
  }
}

export const mainModule = getModule(Main);
