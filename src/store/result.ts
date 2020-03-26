import {
  VuexModule, getModule, Module, Mutation, Action,
} from 'vuex-module-decorators';
import store from '@/store';

export type ResultType = { id: number; message: string };
export type ResultListType = Array<ResultType>;

// state's interface
export interface ResultState {
  resultList: ResultListType;
  count: number;
}

@Module({
  dynamic: true, store, name: 'result', namespaced: true,
})
class Result extends VuexModule implements ResultState {
  // state
  resultList: ResultListType = [];

  count = 0;

  @Mutation
  private ADD_RESULT_LIST(result: ResultType) {
    this.resultList.push(result);
  }

  @Mutation
  private INCREMENT_COUNT() {
    this.count += 1;
  }

  @Mutation
  private INIT_RESULT_LIST() {
    this.resultList = [];
  }

  @Action
  public addResultAction(message: string) {
    this.INCREMENT_COUNT();
    const data = {
      id: this.count,
      message,
    };
    this.ADD_RESULT_LIST(data);
  }

  @Action
  public initResultListAction() {
    this.INIT_RESULT_LIST();
  }
}

export const resultModule = getModule(Result);
