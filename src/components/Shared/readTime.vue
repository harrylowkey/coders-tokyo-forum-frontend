<template>
  <v-card-subtitle :style="customize || ''">
    {{ text | readTime }} min read
  </v-card-subtitle>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    customize: {
      type: String,
    },
  },
};
</script>
