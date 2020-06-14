<template>
  <v-card-text
    class="font-italic font-weight-light pt-0 pb-0"
    style="font-size: small"
  >
    {{ $d(new Date(createdAt), 'short', 'vi-VN') }}
  </v-card-text>
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
