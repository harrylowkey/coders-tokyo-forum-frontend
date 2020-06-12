<template>
  <v-form class="mb-5">
    <v-textarea
      v-if="!isPreviewing"
      name="input-7-1"
      auto-grow
      solo
      :rows="rows"
      :placeholder="placeholder"
      class="mb-n3"
      v-model="content"
      :autofocus="autofocus"
    />
    <v-card
      v-else
      class="preview px-10 pt-8 pb-5 mb-4"
      style="min-height: 130px"
    >
      <p
        style="line-height: 1.5"
        v-html="$options.filters.markdown(sanitizeContent(this.content))"
      />
    </v-card>
    <div class="d-flex justify-end">
      <v-btn
        small
        v-if="!isPreviewing"
        dark
        color="primary"
        @click="togglePreviewComment"
      >
        Preview
      </v-btn>
      <v-btn small v-else dark color="primary" @click="togglePreviewComment">
        Continue writing comment
      </v-btn>

      <v-btn small dark color="green" class="ml-3" @click="submit">
        Submit
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import DOMPurify from 'dompurify';

export default {
  props: {
    rows: {
      type: Number,
      default: 5,
    },
    placeholder: {
      typee: String,
      default: 'Add comment...',
    },
    postId: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      required: false,
    },
    parentId: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isPreviewing: false,
      content: '',
      markdownComment: '',
    };
  },
  methods: {
    ...mapActions('post', [
      'commentPost',
      'replyComment',
      'threadReplyComment',
    ]),
    togglePreviewComment() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.content.trim() !== '') {
        return (this.isPreviewing = true);
      }
    },
    sanitizeContent(text) {
      return DOMPurify.sanitize(text);
    },
    async submit() {
      if (this.content.trim() === '') return;
      this.content = this.sanitizeContent(this.content);
      if (this.type === 'comment') {
        const response = await this.commentPost({
          postId: this.postId,
          content: this.content,
        });
        if (response.status === 200) {
          this.content = '';
        }
      }

      if (this.type === 'replyComment') {
        const response = await this.replyComment({
          commentId: this.commentId,
          content: this.content,
        });
        if (response.status === 200) {
          this.content = '';
          this.$emit('handleWriteComment');
        }
      }

      if (this.type === 'threadReplyComment') {
        const response = await this.threadReplyComment({
          parentId: this.parentId,
          commentId: this.commentId,
          content: this.content,
        });
        if (response.status === 200) {
          this.content = '';
          this.$emit('handleWriteComment');
        }
      }
    },
  },
  watch: {
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          type: 'error',
          text: newVal,
        });
      }
    },
  },
};
</script>
