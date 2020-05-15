<template>
  <div class="like-icon">
    <!-- <v-icon size="20px" color="#64B5F6" >mdi-thumb-up</v-icon> -->
    <v-img
      src="https://res.cloudinary.com/hongquangraem/image/upload/v1587893696/planet_peappv.svg"
      class="react-icon like-icon"
      @click="toggleLike"
    />
    <span class="like-icon-content">{{ likes }}</span>
  </div>
</template>

<script>
export default {
  props: {
    likes: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isUserLiked: false,
    };
  },
  methods: {
    toggleLike() {
      if (this.isUserLiked) {
        --this.likes;
        this.isUserLiked = false;
      } else {
        ++this.likes;
        this.isUserLiked = true;
      }
    },
  },
};
</script>

<style scoped>
.react-icon {
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
}

.like-icon {
  width: 23px;
}

div {
  position: relative;
}

span {
  position: absolute !important;
  top: 13px;
  left: 25px;
  font-size: 12px;
}
</style>
