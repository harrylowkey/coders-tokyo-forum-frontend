<template>
  <div class="text-center">
    <v-list-item-avatar tile size="70" style="margin: 16px 0 0 0">
      <v-img
        :src="src"
        style="cursor: pointer"
      ></v-img>
    </v-list-item-avatar>
    <v-list-item-content class="pt-md-1.5 pt-lg-1 pb-lg-1">
      <v-list-item-title class="caption text-center">{{ username }}</v-list-item-title>
    </v-list-item-content>
  </div>
</template>

<script>
export default {
  props: ['src', 'username']
};
</script>

<style>
</style>