<template>
  <div class="container">
    <label>Курс:</label>
    <div class="container-input">
      <span class="container-input-icon">₽</span>
      <input v-model.number="rate"  type="number" min="20" max="80" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 75,
    },
  },

  computed: {
    rate: {
      get() {
        return this.value;
      },
      set(newValue) {
        if (newValue < 20) {
          this.$emit('input', 20);
        } else if (newValue > 80) {
          this.$emit('input', 80);
        } else {
          this.$emit('input', newValue);
        }
      },
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #00000090;
}

.container-input {
  position: relative;
}

.container-input input {
  width: 100px;
  padding: 5px 5px 5px 20px;
  color: #00000090;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
}

.container-input input:focus {
  border: 1px solid #7bc3fe;
  box-shadow: 0 0 3px 1px #7bc3fe;
}

.container-input-icon {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 500;
}
</style>