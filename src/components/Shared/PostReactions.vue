<template>
  <div class="icon-container d-flex flex-column align-center justify-space-around">
    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587892953/love_fhkw0q.svg"
        class="react-icon like-icon"
        @click="toggleLike"
      ></v-img>
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587893696/planet_peappv.svg"
        :class="upHeartCLasses"
      ></v-img>
      <span class="counter likes-counter">{{ likes }}</span>
    </div>

    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587890246/sunflower_1_jjcpsn.svg"
        class="react-icon give-flower-icon"
      ></v-img>
      <span class="counter flowers-counter">{{ likes }}</span>
    </div>

    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587887572/save_al3idk.svg"
        class="react-icon save-icon"
      ></v-img>
      <span class="counter saves-counter">{{ saves }}</span>
    </div>

    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587888559/save_1_g5tpak.svg"
        class="react-icon donate-icon"
      ></v-img>
    </div>

    <div class="wrapper-icon">
      <v-img
        src="https://res.cloudinary.com/hongquangraem/image/upload/v1587890077/blog_1_z77mcj.svg"
        class="react-icon write-comment-icon"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: ["likes", "saves", "postId"],
  data() {
    return {
      upHeartCLasses: ["up-heart"]
    };
  },
  methods: {
    toggleLike() {
      if (this.upHeartCLasses.length === 2) {
        --this.likes;
        return this.upHeartCLasses.pop();
      } else {
        ++this.likes;
        return this.upHeartCLasses.push("show-up-heart");
      }
    }
  }
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

.icon-container {
  position: fixed;
  top: 150px;
  left: 55px;
  padding: 20px 10px;
  height: 300px;
}

.counter {
  position: absolute;
  top: 32px;
  right: -8px;
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
  transform: translateY(-8px);
}

.react-icon:hover ~ .counter {
  transform: translateY(-8px);
}

.react-icon:hover ~ .up-heart {
  transform: translateY(-8px);
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