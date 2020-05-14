<template>
  <div>
    <v-icon size="35" color="primary">mdi-facebook</v-icon>
    <span class="like-icon-content" :style="calStyleCounter">
      {{ facebookShares }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    customize: {
      type: Object,
      default: () => ({}),
    },
    facebookShares: Number,
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
  computed: {},
  created() {
    this.iconSize = this.customize.size || 20;
  },
};
</script>

<style scoped>
div {
  position: relative;
}

span {
}
</style>
