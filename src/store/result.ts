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
  private addResultList(result: ResultType) {
    this.resultList.push(result);
  }

  @Mutation
  private incrementCount() {
    this.count += 1;
  }

  @Mutation
  private initResultList() {
    this.resultList = [];
  }

  @Action
  public addResultAction(message: string) {
    this.incrementCount();
    const data = {
      id: this.count,
      message,
    };
    this.addResultList(data);
  }

  @Action
  public initResultListAction() {
    this.initResultList();
  }
}

export const resultModule = getModule(Result);
