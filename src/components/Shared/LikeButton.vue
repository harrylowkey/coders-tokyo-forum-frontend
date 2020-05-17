<template>
  <div class="like-icon">
    <v-img
      v-if="isUserLiked"
      src="https://res.cloudinary.com/hongquangraem/image/upload/v1587893696/planet_peappv.svg"
      class="react-icon like-icon"
      @click="onClickUnlike"
      style="margin-bottom: -1px"
    />
    <v-img
      v-else
      src="https://res.cloudinary.com/hongquangraem/image/upload/v1589682245/interface_ecygwf.png"
      class="react-icon not-like-icon mt-1"
      @click="onClickLike"
    />
    <span v-if="isUserLiked" class="like-icon-content">{{ likes }}</span>
    <span v-else class="notlike-icon-content">{{ likes }}</span>
  </div>
</template>

<script>
export default {
  props: {
    isUserLiked: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onClickLike() {
      this.$emit('handleLikePost');
    },
    onClickUnlike() {
      this.$emit('handleUnlikePost');
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

.not-like-icon {
  width: 18px;
}

div {
  position: relative;
}

.like-icon-content {
  position: absolute !important;
  top: 13px;
  left: 25px;
  font-size: 12px;
}

.notlike-icon-content {
  position: absolute !important;
  top: 9px;
  left: 23px;
  font-size: 12px;
}
</style>
