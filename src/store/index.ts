import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export interface ActionContextBasic {
  commit: Commit;
  dispatch: Dispatch;
}

export default new Vuex.Store({
  actions,
  getters,
});
