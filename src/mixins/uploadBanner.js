export const isUploadBanner = {
  methods: {
    cropUploadSuccess(res, field) {
      this.data.banner = res.data;
    },
    cropUploadFail(status, field) {
      this.$notify({
        group: "upload",
        type: "error",
        title: "Upload banner failed"
      });
    }
  }
}