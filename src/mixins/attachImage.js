export const attachImage = {
  data() {
    return {
      isUploadBanner: false,
      isAttachImage: false,
      isAttachImageSuccess: false,
      imageURL: '',
      attachImage: '',
    };
  },
  methods: {
    b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    onChange({ image }) {
      this.attachImage = image;
    },
    onCopy: function () {
      this.isAttachImageSuccess = false;
      this.attachImage = '';
    },
    onError: function () {
      this.$notify({
        type: 'error',
        title: 'Copy failed',
      });
    },
    async uploadImage() {
      const form = document.getElementById('form-upload-image');
      const block = this.attachImage.split(';');
      const contentType = block[0].split(':')[1]; // In this case "image/gif"
      const realData = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."
      const blob = this.b64toBlob(realData, contentType);
      const formDataToUpload = new FormData(form);
      formDataToUpload.append('photo', blob);
      const response = await this.uploadFile({ formData: formDataToUpload, fileType: 'photo' });
      if (response.status === 200) {
        this.isAttachImageSuccess = true;
        this.isAttachImage = false;
        this.imageURL = response.data.secureURL;
      }

      if (response.status === 400) {
        this.$notify({
          type: 'error',
          title: 'Upload failed',
        });
      }
    },
  },
};
