<template>
  <div class="like-icon">
    <!-- <v-icon size="20px" color="#64B5F6" >mdi-thumb-up</v-icon> -->
    <v-img
      src="https://res.cloudinary.com/hongquangraem/image/upload/v1587892953/love_fhkw0q.svg"
      class="react-icon like-icon"
      @click="toggleLike"
    ></v-img>
    <span class="like-icon-content">{{ likes }}</span>
  </div>
</template>

<script>
export default {
  props: ["likes"],
  data() {
    return {
      isUserLiked: false
    }
  },
  methods: {
    toggleLike() {
      if (this.isUserLiked) {
        --this.likes;
        this.isUserLiked = false
      } else {
        ++this.likes;
        this.isUserLiked = true
      }
    }
  }
};
</script>

<style scoped>
.react-icon {
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
}

.like-icon {
  width: 20px;
}

div {
  position: relative;
}

span {
  position: absolute !important;
  top: 10px;
  left: 22px;
  font-size: 12px;
}
</style>