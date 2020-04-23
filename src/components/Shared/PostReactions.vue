<template>
  <div class="icon-container d-flex flex-column align-center justify-space-around">
    <div class="wrapper-icon">
      <v-icon fab size="50" color="#F44336" class="icon heart-icon">mdi-heart-circle</v-icon>
      <span class="counter">{{ likes }}</span>
    </div>
    <div class="wrapper-icon">
      <v-icon fab size="50" color="#0288D1" class="icon saved-icon">mdi-content-save</v-icon>
      <span class="counter">{{ saves }}</span>
    </div>
    <div>
      <v-icon fab size="50" color="#66BB6A" class="icon coin-icon">mdi-bitcoin</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['likes', 'saves', 'postId']
};
</script>

<style>
</style>