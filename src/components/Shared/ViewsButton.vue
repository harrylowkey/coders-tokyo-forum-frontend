<template>
  <div>
    <v-icon size="35" color="primary">mdi-eye-settings</v-icon>
    <span class="like-icon-content" :style="calStyleCounter">{{ views }}</span>
  </div>
</template>

<script>
export default {
  props: {
    customize: {
      type: Object,
      default: () => ({}),
    },
    views: Number,
  },
  data() {
    return {
      calStyleCounter: {
        position: 'absolute !important',
        top: '25px',
        left: '32px',
        fontSize: '16px',
      },
    };
  },
};
</script>

<style scoped>
div {
  position: relative;
}

span {
  position: absolute !important;
  top: 16px;
  left: 28px;
  font-size: 13px;
}
</style>
