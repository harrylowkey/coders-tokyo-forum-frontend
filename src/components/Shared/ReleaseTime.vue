<template>
  <v-card-subtitle class="pl-1">
    {{ $d(new Date(createdAt), 'short', 'vi-VN') }}
  </v-card-subtitle>
</template>

<script>
export default {
  props: {
    createdAt: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
