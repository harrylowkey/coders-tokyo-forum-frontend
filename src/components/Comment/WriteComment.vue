<template>
  <v-form class="mb-5">
    <v-textarea
      v-if="!isPreviewing"
      name="input-7-1"
      auto-grow
      :rows="rows"
      solo
      :placeholder="placeholder || 'Add comment...'"
      class="mb-n3"
      v-model="comment"
    />
    <v-card
      v-else
      class="preview px-10 pt-8 pb-5 mb-4"
      style="min-height: 130px"
    >
      <p style="line-height: 1.5" v-html="this.markdownComment"></p>
    </v-card>
    <div class="d-flex justify-end">
      <v-btn
        v-if="!isPreviewing"
        dark
        color="primary"
        @click="togglePreviewComment"
      >
        Preview
      </v-btn>
      <v-btn v-else dark color="primary" @click="togglePreviewComment">
        Continue writing comment
      </v-btn>

      <v-btn dark color="green" class="ml-3">Submit</v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  props: ['rows', 'placeholder'],
  data() {
    return {
      isPreviewing: false,
      comment: '',
      markdownComment: '',
    };
  },
  methods: {
    togglePreviewComment() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.comment !== '') {
        return (this.isPreviewing = true);
      }
    },
  },
};
</script>

<style></style>
