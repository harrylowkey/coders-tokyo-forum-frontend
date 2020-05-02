<template>
  <div class="user text-center d-flex">
    <v-list-item-avatar tile :size="customize.avatarSize || 60" style="margin: 16px 0 0 0">
      <v-img
        src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
        style="cursor: pointer"
        @click="onClickAvatar"
      ></v-img>
    </v-list-item-avatar>
    <v-container class="pb-0 pr-0">
      <v-list-item-icon class="mb-0">
        <div v-if="socialLinks.length" class="d-flex">
          <v-icon
            v-for="link in socialLinks"
            :key="link.icon"
            :color="link.color"
            :size="customize.iconSize || 20"
            class="pr-1"
            style="cursor: pointer"
            @click="handleClickLink(link.url)"
          >{{ link.icon }}</v-icon>
        </div>
        <div v-else style="height: 17px"></div>
      </v-list-item-icon>
      <v-list-item-content class="pt-0 pb-0">
        <v-list-item-title class="caption text-start" :style="usernameWrapper">
          <a :style="customize.usernameStyle" class="username-link ml-1" :href="userProfileLink">{{ username }}</a>
        </v-list-item-title>
      </v-list-item-content>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    customize: {
      type: Object,
      default: () => ({})
    },
    socialLinks: {
      type: Array,
      default: () => []
    },
    src: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      usernameWrapper: {
        paddingTop: this.customize ? "4px !important" : 0
      },
      userProfileLink: ''
    };
  },
  methods: {
    handleClickLink(url) {
      return window.open(url, "_blank");
    },
    onClickAvatar() {
      this.$router.push({ path: this.userProfileLink });
    }
  },
  created() {
    this.userProfileLink = `/users/${this.username}`
  }
};
</script>

<style>
.username-link {
  text-decoration: none;
  color: #000 !important;
}

.user {
  width: 150px;
}
</style>