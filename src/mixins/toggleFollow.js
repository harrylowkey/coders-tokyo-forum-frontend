import { mapActions } from 'vuex';

import { ROUTES } from '@/mixins/routes';

export const toggleFollow = {
  methods: {
    ...mapActions('user', ['follow', 'unfollow']),
    async handleFollow() {
      const response = await this.follow(this.post.user._id);
      if (!response) {
        return this.$router.push({ path: ROUTES.LOGIN });
      }
      if (response.status === 200) {
        this.post.user.followers.push(this.user._id);
      }
      if (response.status === 400) {
        this.$notify({
          type: 'error',
          title: response.message,
        });
      }

      if (response.status === 401) {
        this.$router.push({ path: ROUTES.LOGIN });
      }
    },
    async handleUnFollow() {
      const response = await this.unfollow(this.post.user._id);
      if (!response) {
        return this.$router.push({ path: ROUTES.LOGIN });
      }
      if (response.status === 200) {
        this.post.user.followers = this.post.user.followers.filter(
          userId => userId !== this.user._id,
        );
      }
      if (response.status === 400) {
        this.$notify({
          type: 'error',
          title: response.message,
        });
      }
    },
  },
  computed: {
    isFollowing() {
      return this.post.user.followers.includes(this.user._id);
    },
  },
};
