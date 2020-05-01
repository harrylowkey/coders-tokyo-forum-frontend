<template>
  <v-chip 
    class="ma-2" 
    color="#e57373" 
    label text-color="white"
    @click="onClickRemove"
    >{{ tagName }}
  </v-chip>
</template>

<script>
export default {
  props: ["tagName"],
  methods: {
    onClickRemove() {
      this.$emit('handleRemoveTag')
    }
  }
};
</script>

<style>
</style>