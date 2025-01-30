<template>
  <div class="dropdown-list">
    <div
      v-for="(product, productId) in products || []"
      :key="productId"
      class="dropdown-list__item"
    >
      <div
        @click="!isProductEmpty(product) ? toggleDropdown(productId) : ''"
        class="dropdown-list__item-header"
        :class="{ 'dropdown-list__item-header--disabled': isProductEmpty(product) }"
      >
        <svg class="dropdown-list__item-header-arrow" :class="{'dropdown-list__item-header-arrow--active': isDropdownOpen(productId)}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          <g id="SVGRepo_iconCarrier">
            <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#0F0F0F"/>
          </g>
        </svg>
        <h4 class="dropdown-list__item-header-name">{{ product.G }}</h4>
      </div>

      <div v-if="isDropdownOpen(productId)" class="dropdown-list__item-menu">
        <div
          v-for="(dataItem, dataItemId) in data?.Value?.Goods || []"
          :key="dataItemId"
          class="dropdown-list__item-menu-child"
        >
          <div v-if="product.B[dataItem.T]" class="dropdown-list__item-menu-child-valid" :style="getBorderStyle(data.Value.Goods, product, dataItem)">
            <h5 class="dropdown-list__item-menu-child-valid-header">{{ product.B[dataItem.T].N }} ({{ dataItem.P }})</h5>
            <div class="dropdown-list__item-menu-child-valid-buttons">
              <PriceTag :price="getPriceInCurrentCurrency(dataItem.C)" />
              <span class="dropdown-list__item-menu-child-valid-buttons-breakline">|</span>
              <button @click="addItemToCart(dataItem.T, product.G, product.B[dataItem.T].N, dataItem.C)" class="dropdown-list__item-menu-child-valid-buttons-purchace">
                <img
                  src="@/assets/svg/cart-shopping.svg"
                  class="dropdown-list__item-menu-child-valid-buttons-purchace-icon"
                  alt="cart"
                />
                <span>Купить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PriceTag from "./PriceTag.vue";

export default {
  data() {
    return {
      openedDropdowns: ['1'],
    };
  },

  components: {
    PriceTag,
  },

  props: {
    products: Object,
    data: Object,
  },

  computed: {
    exchangeRate() {
      return this.$store.getters.exchangeRate;
    },
  },

  methods: {
    toggleDropdown(productId) {
      const index = this.openedDropdowns.indexOf(productId);
      if (index === -1) this.openedDropdowns.push(productId);
      else this.openedDropdowns.splice(index, 1);
    },

    isDropdownOpen(productId) {
      return this.openedDropdowns.includes(productId);
    },

    getBorderStyle(goods, product, dataItem) {
      const filteredGoods = goods.filter(item => product.B[item.T]);
      const currentIndex = filteredGoods.findIndex(item => item === dataItem);
      const isLastItem = currentIndex === filteredGoods.length - 1;

      return {
        borderBottom: isLastItem ? 'none' : '1px solid #dedede',
      };
    },

    addItemToCart(id, groupName, productName, price) {
      const product = {
        id,
        groupName,
        productName,
        quantity: 1,
        price,
      };

      this.$store.dispatch('addToCart', product);
    },

    getPriceInCurrentCurrency(priceInDollar) {
      return parseFloat((priceInDollar * this.exchangeRate).toFixed(2));
    },

    isProductEmpty(product) {
      return this.data?.Value?.Goods.every(item => !product.B[item.T]);
    },
  },
};
</script>

<style scoped>
.dropdown-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #dedede;
}

.dropdown-list__item {
  width: 100%;
}

.dropdown-list__item-header {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f6f6f6;
  cursor: pointer;
}

.dropdown-list__item-header--disabled {
  color: #00000030;
  cursor: not-allowed;
}

.dropdown-list__item-header--disabled > svg > g > path {
  fill: #8d8d8d;
}

.dropdown-list__item:not(:last-child) .dropdown-list__item-header,
.dropdown-list__item:not(:last-child) .dropdown-list__item-menu {
  border-bottom: 2px solid #dedede;
}

.dropdown-list__item:last-child .dropdown-list__item-menu {
  border-top: 2px solid #dedede;
}

.dropdown-list__item-header-arrow {
  width: 14px;
  transform: rotate(-90deg);
  transition: all 0.1s;
}

.dropdown-list__item-header-arrow--active {
  transform: rotate(0deg);
  transition: all 0.1s;
}

.dropdown-list__item-header-name {
  font-size: 14px;
  font-weight: 500;
}

.dropdown-list__item-menu {
  padding: 0 10px;
}

.dropdown-list__item-menu-child {
  color: #00000090;
}

.dropdown-list__item-menu-child-valid {
  display: flex;
  width: 100%;
}

.dropdown-list__item-menu-child-valid-header {
  width: 60%;
  font-weight: 500;
  margin: 0;
  padding: 15px;
}

.dropdown-list__item-menu-child-valid-buttons {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  width: 40%;
  font-size: 12px;
}

.dropdown-list__item-menu-child-valid-buttons-breakline {
  color: #00000030;
}

.dropdown-list__item-menu-child-valid-buttons-purchace {
  min-width: 76px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 8px;
  color: white;
  background-color: #3e8ffe;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-list__item-menu-child-valid-buttons-purchace-icon {
  width: 12px;
}

@media (max-width: 992px) {
  .dropdown-list__item-menu-child-valid-header {
    padding: 15px 5px;
  }

  .dropdown-list__item-menu-child-valid-buttons-breakline {
    display: none;
  }
}

@media (max-width: 576px) {
  .dropdown-list__item-menu-child-valid-buttons {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>