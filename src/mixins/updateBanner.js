/* eslint-disable no-console */
export const updateBanner = {
  methods: {
    // eslint-disable-next-line no-unused-vars
    cropSuccess(imgDataUrl, field) {
      this.dataUpate.coverImage = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log(`field: ${field}`);
    },
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------');
      console.log(status);
      console.log(`field: ${field}`);
    },
    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
  },
};
