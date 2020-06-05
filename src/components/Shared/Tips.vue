<template>
  <v-card
    min-width="380"
    max-width="450"
    class="mx-auto pb-5 tips"
    shaped
    :elevation="hover ? 15 : 5"
  >
    <v-card-title class="text-center pl-4 pt-3 pb-2">Tips</v-card-title>
    <v-divider />
    <v-card-text class="pb-0">
      Line break: Place "2 spaces" or "\" in the end of line
    </v-card-text>
    <v-card-text class="pb-0">Block code: ```code```</v-card-text>
    <v-card-text class="pb-0">Attach image: ![Image name](path)</v-card-text>
    <v-card-text class="pb-0">Link: [Link name](path)</v-card-text>
    <v-card-text class="pb-0">
      <a target="_blank" href="https://www.markdownguide.org/basic-syntax/">
        Read more
      </a>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
.tips >>> p {
  margin-bottom: 0px;
}

.tips {
  position: sticky;
  z-index: 0;
  top: 400px;
}
</style>
