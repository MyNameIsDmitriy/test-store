const exchangeRateStore = {
  state: {
    lastRate: null,
    rate: 75,
  },

  mutations: {
    setExchangeRate(state, newRate) {
      state.lastRate = state.rate;
      state.rate = newRate;
    },
  },

  actions: {
    setExchangeRate({ commit }, newRate) {
      commit('setExchangeRate', newRate);
    },
  },

  getters: {
    exchangeRate: (state) => state.rate,
    lastExchangeRate: (state) => state.lastRate,
  },
};

export default exchangeRateStore;
