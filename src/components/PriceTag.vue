<template>
  <p @animationend="resetAnimation" class="price-tag" ref="price">₽ {{ price }}</p>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
    },
  },

  computed: {
    exchangeRate() {
      return this.$store.getters.exchangeRate;
    },

    lastExchangeRate() {
      return this.$store.getters.lastExchangeRate;
    },
  },

  methods: {
    triggerAnimation() {
      const priceEl = this.$refs.price;
      const highlightClass = this.lastExchangeRate < this.exchangeRate ? 'highlight-red' : 'highlight-green';
      if (priceEl) priceEl.classList.add(highlightClass);
    },

    resetAnimation() {
      const priceEl = this.$refs.price;
      if (priceEl) priceEl.classList.remove('highlight-red', 'highlight-green');
    },
  },

  watch: {
    exchangeRate() {
      this.triggerAnimation();
    },
  },
};
</script>

<style scoped>
.price-tag {
  min-width: 80px;
  padding: 1px 3px;
  color: #00000090;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  background-color: #f6f6f6;
  border: 1px solid #dedede;
  border-radius: 4px;
}

.highlight-red {
  animation: highlightRed 1s ease-in-out forwards;
}

.highlight-green {
  animation: highlightGreen 1s ease-in-out forwards;
}

@keyframes highlightGreen {
  0% {
    background-color: #f6f6f6;
  }
  50% {
    background-color: #ccffdc;
  }
  100% {
    background-color: #f6f6f6;
  }
}

@keyframes highlightRed {
  0% {
    background-color: #f6f6f6;
  }
  50% {
    background-color: #ffcccc;
  }
  100% {
    background-color: #f6f6f6;
  }
}
</style>
