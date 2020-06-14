<template>
  <v-card max-width="700" max-height="700" class="pt-10 pb-6 pl-12">
    <div class="d-flex justify-center flex-column" style="width: 400px;">
      <form action id="form-upload-image">
        <picture-input
          @change="onChange"
          :hideChangeButton="true"
          style="height: 300px; width: 300px;"
          :changeOnClick="!isLoadingUpload"
          ref="pictureInput"
          width="600"
          height="600"
          margin="10"
          accept="image/jpeg, image/png"
          size="10"
          buttonClass="btn"
          :customStrings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Nhấp hoặc kéo ảnh vào đây để tải chọn',
          }"
        />
        <div v-show="attachImage">
          <v-text-field
            class="mt-0 pt-0"
            color="success"
            v-if="isLoadingUpload"
            loading
            disabled
          />
          <div class="d-flex justify-center mb-0">
            <v-btn
              text
              color="green"
              @click="onClickUploadImage"
              v-if="attachImage && !isLoadingUpload"
            >
              {{ $t('Upload') }}
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
    isLoadingUpload: {
      type: Boolean,
      default: false,
    },
    attachImage: {
      type: String,
      required: true,
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
