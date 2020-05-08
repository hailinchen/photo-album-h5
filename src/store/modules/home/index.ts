import { feedList } from '../../../api/common';
import * as types from '../../mutation-types';
import { FeedList, ActionContextBasic } from '../../index';

export interface FeedListPayload {
  Code: number;
  Msg: string;
  Data: FeedList[];
}

export interface State {
  feedList: FeedList[];
}

const initState = {
  feedList: [],
};

const actions = {
  async getFeedList(context: ActionContextBasic, opts: object) {
    const result = await feedList(opts);
    if (result) {
      context.commit(types.SET_FEED_LIST, result);
    }
  },
};

const mutations = {
  [types.SET_FEED_LIST](state: State, payload: FeedListPayload) {
    if (payload.Code === 0 && payload.Data.length) {
      const newList = payload.Data.filter((item) => item.value !== null);
      state.feedList = state.feedList.concat(newList);
    }
  },
};

const getters = {
  feedList: (state: State) => state.feedList,
};

export default {
  // namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
