<template>
  <div class="like-icon">
     <v-icon size="20px" color="#64B5F6">mdi-comment-text-multiple</v-icon>
      <span class="comment-icon-content"> {{ comments }} </span>
  </div>
</template>

<script>
export default {
  props: ['comments']
};
</script>

<style scoped>
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