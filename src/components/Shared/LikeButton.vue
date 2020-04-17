<template>
  <div class="like-icon">
    <v-icon size="20px" color="#64B5F6" >mdi-thumb-up</v-icon>
    <span class="like-icon-content">{{ likes }}</span>
  </div>
</template>

<script>
export default {
  props: ['likes']
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