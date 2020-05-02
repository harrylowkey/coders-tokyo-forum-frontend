<template>
<v-hover v-slot="{ hover }">
  <v-chip 
    :color="hover ? '#e57373' : 'red'"
    class="ma-2 tag" 
    label text-color="white"
    @click="onClickRemove"
    >{{ tagName }}
  </v-chip>
  </v-hover>
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