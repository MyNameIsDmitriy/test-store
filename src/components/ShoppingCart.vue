<template>
  <div class="container">
    <h2 v-if="!cart.length" class="container__message-empty">Выберите товар</h2>
    <div class="container__cart-list">
      <div v-for="product, productId in cart" :key="productId" class="container__cart-list__item">
        <div class="container__cart-list__item-main">
          <span class="container__cart-list__item-main-group-name">{{ product.groupName }}</span>
          <span class="container__cart-list__item-main-product-name">{{ product.productName }}</span>
        </div>
        <div class="container__cart-list__item-additional">
          <input v-model.number="product.quantity" @change="updateQuantity(product.id, product.quantity)" class="container__cart-list__item-additional-input" type="text">
          <span>|</span>
          <PriceTag :price="getProductPrice(product.price, product.quantity)" />
          <span>|</span>
          <img @click="removeFromCart(product.id)" class="container__cart-list__item-additional-delete-icon" src="@/assets/svg/trashcan.svg" alt="trashcan">
        </div>
      </div>
    </div>
    <div class="container__total">
      <span>Общая стоимость:</span>
      <p>₽ {{ totalPrice }}</p>
    </div>
  </div>
</template>

<script>
import PriceTag from "./PriceTag.vue";

export default {
  components: {
    PriceTag,
  },

  computed: {
    cart() {
      return this.$store.getters.cartItems;
    },

    exchangeRate() {
      return this.$store.getters.exchangeRate;
    },

    totalPrice() {
      return (this.cart.reduce((total, item) => total + item.price * item.quantity, 0) * this.exchangeRate).toFixed(2);
    },
  },

  methods: {
    removeFromCart(id) {
      this.$store.dispatch('removeFromCart', id);
    },

    updateQuantity(id, quantity) {
      this.$store.dispatch('updateQuantity', id, quantity);
    },
    
    getProductPrice(price, quantity) {
      return parseFloat((price * this.exchangeRate * quantity).toFixed(2));
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  font-size: 14px;
}

.container__message-empty {
  padding: 30px 0;
  font-size: 21px;
  font-weight: 500;
  text-align: center;
}

.container__cart-list__item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 15px 0;
}

.container__cart-list__item-main {
  max-width: 70%;
  display: flex;
  align-items: center;
  gap: 30px;
}

.container__cart-list__item:not(:last-child) {
  border-bottom: 1px solid #dedede;
}

.container__cart-list__item-main-group-name {
  padding: 3px 5px;
  color: #f98c1e;
  background-color: #fef7e4;
  border: 1px solid #fbdfa8;
  border-radius: 4px;
}

.container__cart-list__item-additional {
  display: flex;
  align-items: center;
  gap: 8px;
}

.container__cart-list__item-additional > span {
  font-size: 12px;
  color: #00000030;
}

.container__cart-list__item-additional-input {
  width: 50px;
  padding: 5px;
  color: #00000090;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
  text-align: center;
}

/* .container__cart-list__item-additional-price {
  min-width: 80px;
  padding: 1px 3px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  background-color: #f6f6f6;
  border: 1px solid #dedede;
  border-radius: 4px;
} */

.container__cart-list__item-additional-delete-icon {
  width: 28px;
  padding: 5px;
  background-color: #f8494d;
  border-radius: 4px;
  cursor: pointer;
}

.container__total {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.container__total > span {
  color: #00000090;
}

.container__total > p {
  font-size: 20px;
}

.container__total > p > span{
  font-size: 14px;
}
</style>