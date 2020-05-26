<template>
  <div class="comment-icon">
    <v-img
      src="https://res.cloudinary.com/hongquangraem/image/upload/v1587889292/blog_obzs2l.svg"
      class="react-icon comment-icon"
      @click="onClick"
    />
    <span class="comment-icon-content">{{ comments }}</span>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Number,
      default: 0,
    },
    postId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClick() {
      const typeQuery = this.type;
      let typeParam = this.type;
      if (
        this.type === 'book' ||
        this.type === 'movie' ||
        this.type === 'food'
      ) {
        typeParam = `${this.type}Review`;
      }
      this.$router.push({
        path: `/${typeParam}s/${this.postId}?type=${typeQuery}#comment`,
      });
    },
  },
};
</script>

<style scoped>
.react-icon {
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
}

.comment-icon {
  width: 20px;
  margin-top: 1px;
}
div {
  position: relative;
}

span {
  position: absolute !important;
  top: 12px;
  left: 22px;
  font-size: 12px;
}
</style>
