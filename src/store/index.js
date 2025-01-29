import Vue from 'vue';
import Vuex from 'vuex';

import exchangeRateStore from './exchangeRate';
import cartStore from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    exchangeRate: exchangeRateStore,
    cart: cartStore,
  },
});
