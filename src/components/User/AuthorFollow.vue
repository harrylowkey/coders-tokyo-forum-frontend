<template>
  <v-container class="profile-details pl-0">
    <v-card class="px-7 pb-3" elevation="15">
      <v-list-item-content class="pb-0">
        <v-row style="height: 80px;">
          <v-col sm="4" md="3">
            <v-avatar size="60" style="cursor: pointer" dark>
              <img
                src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                alt="Avatar"
                @click="onClickAvatar"
              />
            </v-avatar>
          </v-col>
          <v-col sm="12" md="8">
            <p class="title mb-1 mt-1"><a style="color: #000; text-decoration: none" :href="link">{{ user.username }}</a></p>
            <p style="font-size: 13px; color: grey" class="font-italic">{{ user.job }}</p>
          </v-col>
        </v-row>
      </v-list-item-content>
      <v-btn @click="isFollowing = !isFollowing" v-if="isFollowing" dark color="green" class="mb-5" width="100%">Follow</v-btn>
      <v-btn @click="isFollowing = !isFollowing" v-else dark color="red" class="mb-5" width="100%">Unfollow</v-btn>
      <v-card-subtitle class="pa-0 pb-3" v-if="user.description">
        {{ description }}
      </v-card-subtitle>
      <p style="font-size: 13px;" class=" pl-0 mb-1" v-if="user.sex">
        <span >Sex: {{ user.sex }}</span> 
      </p>
      <p style="font-size: 13px;" class=" pl-0 mb-0">
        <span >Joined: {{ user.createdAt | date }}</span> 
      </p>
    </v-card>
  </v-container>
</template>

<script>
import UserSocialLinks from "@/components/Shared/UserSocialLinks";
export default {
  props: {
    description: {
      type: String
    },
    user: {
      type: Object
    }
  },
  data() {
    return {
      isFollowing: true,
      link: ""
    };
  },
  components: {
    UserSocialLinks
  },
  methods: {
    onClickAvatar() {
      this.$router.push({ path: this.link });
    }
  },
  created() {
    this.link = `/users/${this.user.username}`
  }
};
</script>

<style>
</style>