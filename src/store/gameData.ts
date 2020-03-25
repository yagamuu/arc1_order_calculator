import {
  VuexModule, getModule, Module,
} from 'vuex-module-decorators';
import store from '@/store';
import { mapList, mapListData } from '../assets/game_data/mapList';
import { unitDefaultParamList, unitDefaultParamListData } from '../assets/game_data/unitDefaultParamList';
import { MapUnitList, mapUnitListData } from '../assets/game_data/mapUnitList';
import { accessoryList, accessoryListData } from '../assets/game_data/accessoryList';

// state's interface
export interface GameDataState {
   mapList: mapList;
   unitDefaultParamList: unitDefaultParamList;
   mapUnitList: MapUnitList;
   accessoryList: accessoryList;
}

@Module({
  dynamic: true, store, name: 'gameData', namespaced: true,
})
class GameData extends VuexModule implements GameDataState {
  // state
  mapList = mapListData;

  unitDefaultParamList = unitDefaultParamListData;

  mapUnitList = mapUnitListData;

  accessoryList = accessoryListData;
}

export const gameDataModule = getModule(GameData);
