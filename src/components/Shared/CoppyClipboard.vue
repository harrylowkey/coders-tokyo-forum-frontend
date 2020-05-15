<template>
  <v-dialog
    :persistent="!isCopied"
    v-model="isAttachImageSuccess"
    max-width="650"
  >
    <v-card>
      <v-card-title class="headline">Paste this link to your blog</v-card-title>
      <v-row class="ma-0">
        <v-col cols="2" sm="2" md="2" class="d-flex justify-center px-0">
          <span>URL</span>
        </v-col>
        <v-col cols="10" sm="10" md="10" class="py-0 pl-0">
          <div class="container d-flex pt-0 pb-0">
            <v-text-field class="pt-0" readonly :value="imageURL" />
            <v-btn
              class="mt-5 ml-5"
              x-small
              dark
              color="green"
              v-clipboard:copy="imageURL"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              Copy
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isCopied: false,
    };
  },
  props: {
    isAttachImageSuccess: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  methods: {
    onCopy() {
      this.isCopied = !this.isCopied;
      this.$emit('handleOnCopy');
    },
    onError() {
      this.$emit('handleErrorCopy');
    },
  },
};
</script>

<style></style>
