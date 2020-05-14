<template>
  <div class="d-flex flex-column justify-center">
    <v-container class="d-flex justify-center">
      <div class="user text-center d-flex">
        <v-list-item-avatar
          tile
          :size="customize.avatarSize || 60"
          style="margin: 16px 0 0 0"
        >
          <v-img
            :src="author.avatar.secureURL"
            style="cursor: pointer; border-radius: 50%"
            @click="onClickAvatar"
          />
        </v-list-item-avatar>
        <v-container class="pb-0 pr-0">
          <v-list-item-icon class="mb-0" style="width: 100%">
            <div v-if="socialLinks.length" class="d-flex">
              <v-icon
                v-for="link in socialLinks"
                :key="link.icon"
                :color="link.color"
                :size="customize.iconSize || 20"
                class="pr-1"
                style="cursor: pointer"
                @click="handleClickLink(link.url)"
              >
                {{ link.icon }}
              </v-icon>
            </div>
            <div v-else style="height: 17px"></div>
          </v-list-item-icon>
          <v-list-item-content class="pt-0 pb-0">
            <v-list-item-title
              class="caption text-start"
              :style="usernameWrapper"
            >
              <a
                :style="customize.usernameStyle"
                class="username-link ml-1"
                :href="userProfileLink"
              >
                {{ author.username }}
              </a>
            </v-list-item-title>
          </v-list-item-content>
        </v-container>
      </div>
    </v-container>
    <v-container class="d-flex justify-center pt-1">
      <v-btn
        @click="onClickFollow"
        v-if="!isFollowing && !isAuthor"
        dark
        color="green"
        x-small
      >
        Follow
      </v-btn>
      <v-btn
        @click="onClickUnFollow"
        v-if="isFollowing && !isAuthor"
        dark
        color="red"
        x-small
      >
        Unfollow
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    customize: {
      type: Object,
      default: () => ({}),
    },
    socialLinks: {
      type: Array,
      default: () => [],
    },
    author: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    isAuthor: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      usernameWrapper: {
        paddingTop: this.customize ? '4px !important' : 0,
      },
      userProfileLink: `/users/${this.author.username}`,
    };
  },
  methods: {
    ...mapActions('user', ['follow', 'unfollow']),
    handleClickLink(url) {
      return window.open(url, '_blank');
    },
    onClickAvatar() {
      this.$router.push({ path: this.userProfileLink });
    },
    async onClickFollow() {
      // eslint-disable-next-line no-use-before-define
      if (!response) {
        return this.$router.push({ path: '/signin' });
      }
      // eslint-disable-next-line no-underscore-dangle
      const response = await this.follow(this.author._id);
      if (!response) {
        return this.$router.push({ path: '/signin' });
      }
      if (response.status === 200) {
        this.followers.push(this.userId);
        this.$notify({
          type: 'success',
          title: response.data.message,
        });
      }
      if (response.status === 400) {
        this.$notify({
          type: 'error',
          title: response.message,
        });
      }

      if (response.status === 401) {
        this.$router.push({ path: '/signin' });
      }
    },
    async onClickUnFollow() {
      // eslint-disable-next-line no-use-before-define
      if (!response) {
        this.$router.push({ path: '/signin' });
      }
      // eslint-disable-next-line no-underscore-dangle
      const response = await this.unfollow(this.author._id);
      if (response.status === 200) {
        this.followers = this.followers.filter(
          followerId => followerId !== this.userId,
        );
        this.$notify({
          type: 'success',
          title: response.data.message,
        });
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
      // eslint-disable-next-line no-underscore-dangle
      return this.author.followers.includes(this.user._id);
    },
  },
};
</script>

<style>
.username-link {
  text-decoration: none;
  color: #000 !important;
}

.author {
  width: 150px;
}
</style>
