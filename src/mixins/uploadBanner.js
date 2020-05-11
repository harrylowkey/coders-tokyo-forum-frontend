import { mapActions } from 'vuex'
export const uploadBanner = {
  methods: {
    ...mapActions('user', ['signOut']),
    cropUploadSuccess(res, field) {
      this.data.banner = res.data;
    },
    cropUploadFail(status, field) {
      if (status === 401) {
        this.signOut()
        this.$router.push({ path: '/signin' })
      }
      this.$notify({
        group: "upload",
        type: "error",
        title: "Upload banner failed"
      });
    }
  }
}