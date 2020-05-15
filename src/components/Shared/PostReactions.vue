<template>
  <div
    class="icon-container d-flex flex-column align-center justify-space-around"
  >
    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587892953/love_fhkw0q.svg"
        class="react-icon like-icon"
        @click="toggleLike"
      />
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587893696/planet_peappv.svg"
        :class="upHeartCLasses"
      />
      <span class="counter likes-counter">{{ likes }}</span>
    </div>

    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587910069/flower_1_vg1nyk.svg"
        class="react-icon give-flower-icon"
        @click="handleGiveFlower"
      />
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587909641/sunflower_2_w5ndbg.svg"
        :class="upFlowerCLasses"
      />
      <span class="counter flowers-counter">{{ flowers }}</span>
    </div>

    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587887572/save_al3idk.svg"
        class="react-icon save-icon"
        @click="toggleSave"
      />
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587914483/tick_1_k2ofpd.svg"
        :class="upSaveIconClasses"
      />
      <span class="counter saves-counter">{{ saves }}</span>
    </div>

    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587888559/save_1_g5tpak.svg"
        class="react-icon donate-icon"
        @click="handleClickDonate"
      />
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587912245/coin_dkmx69.svg"
        :class="donateCoinClasses"
      />
    </div>

    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587889292/blog_obzs2l.svg"
        class="react-icon write-comment-icon"
        @click="onClickComment"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['likes', 'saves', 'flowers', 'postId'],
  data() {
    return {
      upHeartCLasses: ['up-heart'],
      upFlowerCLasses: ['up-flower'],
      donateCoinClasses: ['up-coin'],
      upSaveIconClasses: ['up-save'],
      isDonating: false,
    };
  },
  methods: {
    toggleLike() {
      if (this.upHeartCLasses.length === 2) {
        --this.likes;
        return this.upHeartCLasses.pop();
      } else {
        ++this.likes;
        return this.upHeartCLasses.push('show-up-heart');
      }
    },
    handleGiveFlower() {
      this.flowers++;
      this.upFlowerCLasses.push('show-up-flower');
      setTimeout(() => {
        this.upFlowerCLasses = this.upFlowerCLasses.filter(
          _class => _class !== 'show-up-flower',
        );
      }, 700);
    },
    handleClickDonate() {
      this.donateCoinClasses.push('rotate-upcoin');
      setTimeout(() => {
        this.donateCoinClasses = this.donateCoinClasses.filter(
          _class => _class !== 'rotate-upcoin',
        );
      }, 1000);
    },
    toggleSave() {
      if (this.upSaveIconClasses.length === 2) {
        return this.upSaveIconClasses.pop();
      } else {
        return this.upSaveIconClasses.push('show-up-save');
      }
    },
    onClickComment() {
      this.$emit('hanldeClickCommentBtn');
    },
  },
};
</script>

<style>
.wrapper-icon {
  margin-bottom: 33px;
  position: relative;
}

.up-heart {
  width: 18px;
  position: absolute;
  top: -16px;
  right: -17px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
}

.show-up-heart {
  opacity: 1;
}

.up-save {
  width: 20px;
  position: absolute;
  top: -5px;
  right: -11px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
}

.show-up-save {
  opacity: 1;
}

.up-flower {
  width: 18px;
  position: absolute;
  top: -5px;
  right: -11px;
  opacity: 0;
}

.show-up-flower {
  animation: boom 0.3s, translate 0.3s;
}

@keyframes boom {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes translate {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(6px, -6px);
  }
  100% {
    transform: translate(10px, -10px);
  }
}

.up-coin {
  width: 18px;
  position: absolute;
  top: -5px;
  right: -11px;
  transition: transform 0.5s ease-in-out;
}

.rotate-upcoin {
  animation: rotate 1s;
  transition: transform 0.5s ease-in-out;
}

@keyframes rotate {
  0% {
    transform: rotateY(0) translateY(-6px);
  }
  50% {
    transform: rotateY(360deg) translateY(-6px);
  }
  100% {
    transform: rotateY(720deg) translateY(-6px);
  }
}

.icon-container {
  position: fixed;
  top: 150px;
  left: 55px;
  padding: 20px 10px;
  height: 300px;
}

.counter {
  position: absolute;
  top: 28px;
  right: -25px;
  width: 24px;
  font-size: 0.8rem;
  transition: transform 0.5s ease-in-out;
}

.likes-counter {
  color: #c2185b;
}

.saves-counter {
  color: #0d47a1;
}

.flowers-counter {
  color: #ffb300;
}

.react-icon {
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
}

.react-icon:hover {
  transform: translateY(-6px);
}

.react-icon:hover ~ .counter {
  transform: translateY(-6px);
}

.react-icon:hover ~ .up-heart {
  transform: translateY(-6px);
}

.react-icon:hover ~ .up-coin {
  transform: translateY(-6px);
}

.react-icon:hover ~ .up-save {
  transform: translateY(-6px);
}

.save-icon {
  width: 35px;
}

.donate-icon {
  width: 45px;
}

.write-comment-icon {
  width: 40px;
}

.give-flower-icon {
  width: 40px;
}

.like-icon {
  width: 40px;
}
</style>
