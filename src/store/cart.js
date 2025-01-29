import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/storage';

const cartStore = {
  state: {
    cart: loadFromLocalStorage('cart', []),
  },

  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) existingProduct.quantity += product.quantity;
      else state.cart.push(product);

      saveToLocalStorage('cart', state.cart);
    },

    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
      saveToLocalStorage('cart', state.cart);
    },

    updateQuantity(state, { productId, quantity }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) product.quantity = quantity;

      saveToLocalStorage('cart', state.cart);
    },
  },

  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    updateQuantity({ commit }, payload) {
      commit('updateQuantity', payload);
    },
  },

  getters: {
    cartItems: (state) => state.cart,
  },
};

export default cartStore;

