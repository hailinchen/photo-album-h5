import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/iconfont/iconfont.css';
import {
  Style,
  TabBar,
  Scroll,
  Loading
} from 'cube-ui';

Vue.use(TabBar)
Vue.use(Scroll)
Vue.use(Loading)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
