import { mapActions } from 'vuex';

export const uploadBanner = {
  methods: {
    ...mapActions('user', ['signOut']),
    cropUploadSuccess(res) {
      this.data.cover = res.data;
    },
    cropUploadFail(status) {
      if (status === 401) {
        this.signOut();
        this.$router.push({ path: '/signin' });
      }
      this.$notify({
        type: 'error',
        title: 'Upload banner failed',
      });
    },
  },
};
