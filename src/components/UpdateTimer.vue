<template>
  <div class="container">
    <span class="container-message">Обновление через:</span>
    <span class="container-timer">{{ formattedTime }}</span>
    <img class="container-rotate-icon" src="@/assets/svg/rotate.svg" alt="update">
  </div>
</template>

<script>
export default {
  data() {
    return {
      seconds: 15,
      milliseconds: 0,
      intervalId: null,
    };
  },

  computed: {
    formattedTime() {
      const formattedSeconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
      const formattedMilliseconds = this.milliseconds < 10 ? '0' + this.milliseconds : this.milliseconds;

      return `${formattedSeconds}:${formattedMilliseconds}`;
    },
  },

  mounted() {
    this.startTimer();
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  methods: {
    startTimer() {
      this.intervalId = setInterval(() => {
        if (this.milliseconds === 0) {
          if (this.seconds === 0) {
            this.resetTimer();
            this.$emit('timer-reset');
          } else {
            this.seconds--;
            this.milliseconds = 99;
          }
        } else {
          this.milliseconds--;
        }
      }, 10);
    },

    resetTimer() {
      this.seconds = 15;
      this.milliseconds = 0;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.container-message {
  font-size: 14px;
  color: #00000080;
}

.container-timer {
  font-size: 18px;
  font-weight: 500;
}

.container-rotate-icon {
  width: 17px;
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>