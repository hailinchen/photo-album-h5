import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
import home, { State as HomeState } from './modules/home';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export interface ActionContextBasic {
  commit: Commit;
  dispatch: Dispatch;
}

export interface State {
  home: HomeState;
}

export interface FeedList {
  card_type: number;
  value: object;
}

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    home,
  },
});
