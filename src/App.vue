<template>
  <div class="app">
    <div class="app__header">
      <ExchangeRateInput v-model="exchangeRate" />
      <UpdateTimer @timer-reset="updatePrices" />
    </div>
    <div class="app__body">
      <ShopDropdowns :data="data" :products="products" />
      <ShoppingCart />
    </div>
  </div>
</template>

<script>
import ShopDropdowns from "@/components/ShopDropdowns.vue";
import ExchangeRateInput from "@/components/ExchangeRateInput.vue";
import UpdateTimer from "@/components/UpdateTimer.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";

import products from "@/data/names.json";

import { fetchData } from "@/utils/utils.js";

export default {
  name: 'App',
  components: {
    ShopDropdowns,
    ExchangeRateInput,
    UpdateTimer,
    ShoppingCart,
  },

  data() {
    return {
      products,
      data: null,
      exchangeRate: 75,
    }
  },

  mounted() {
    this.updatePrices();
  },

  methods: {
    async updatePrices() {
      this.data = await fetchData();
      this.$store.dispatch('setExchangeRate', this.exchangeRate);
    },
  },
}
</script>

<style scoped>
.app {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
}

.app__header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
}

.app__body {  
  width: 100%;
  display: flex;
  gap: 15px;
}

@media (max-width: 768px) {
  .app__body {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
