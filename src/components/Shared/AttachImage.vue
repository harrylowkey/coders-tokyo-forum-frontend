<template>
  <v-card max-width="700" max-height="700" class="pt-10 pb-6 pl-12">
    <div class="d-flex justify-center flex-column" style="width: 400px;">
      <form action id="form-upload-image">
        <picture-input
          @change="onChange"
          :hideChangeButton="true"
          style="height: 300px; width: 300px"
          :changeOnClick="!isLoading"
          ref="pictureInput"
          width="600"
          height="600"
          margin="10"
          accept="image/jpeg, image/png"
          size="10"
          buttonClass="btn"
          :customStrings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Drag a photo to here or choose ',
          }"
        />
        <div v-show="attachImage">
          <v-text-field color="success" v-if="isLoading" loading disabled />
          <div class="d-flex justify-center mb-0">
            <v-btn
              text
              color="green"
              @click="onClickUploadImage"
              v-if="attachImage && !isLoading"
            >
              Upload
            </v-btn>
          </div>
        </div>
      </form>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    attachImage: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickUploadImage() {
      this.$emit('handleUploadImage');
    },
    onChange(image) {
      this.$emit('handleOnChange', { image });
    },
  },
};
</script>
