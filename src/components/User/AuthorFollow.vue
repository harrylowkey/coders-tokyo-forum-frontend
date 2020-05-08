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
            <p class="title mb-1 mt-1">
              <a style="color: #000; text-decoration: none" :href="link">{{ author.username }}</a>
            </p>
            <p style="font-size: 13px; color: grey" class="font-italic">{{ author.job }}</p>
          </v-col>
        </v-row>
      </v-list-item-content>
      <div v-if="!isAuthor && !isFollowing">
        <v-btn class="mt-3" @click="onClickFollow" dark color="green" width="100%">Follow</v-btn>
      </div>
      <div v-if="!isAuthor && isFollowing">
        <v-btn class="mt-3" @click="onClickUnFollow" dark color="red" width="100%">Unfollow</v-btn>
      </div>

      <v-card-subtitle class="pa-0 pb-3 mt-6" v-if="author.description">{{ author.description }}</v-card-subtitle>
      <p style="font-size: 13px;" class="pl-0 mb-1" v-if="author.sex">
        <span>Sex: {{ author.sex }}</span>
      </p>
      <p style="font-size: 13px;" class="pl-0 mb-0">
        <span>Joined: {{ author.createdAt | date }}</span>
      </p>
    </v-card>
  </v-container>
</template>

<script>
import UserSocialLinks from "@/components/Shared/UserSocialLinks";
import { mapActions } from "vuex";
export default {
  props: {
    author: {
      type: Object
    },
    isAuthor: {
      type: Boolean
    },
    userId: {
      type: String
    }
  },
  data() {
    return {
      link: `/users/${this.author.username}`,
      followers: [...this.author.followers]
    };
  },

  computed: {
    isFollowing() {
      return this.followers.includes(this.userId);
    }
  },
  methods: {
    ...mapActions("user", ["follow", "unfollow"]),
    onClickAvatar() {
      this.$router.push({ path: this.link });
    },
    async onClickFollow() {
      const response = await this.follow(this.author._id);
      if (response.status === 200) {
        this.followers.push(this.userId);
        this.$notify({
          type: "success",
          title: response.data.message
        });
      }
      if (response.status === 400) {
        this.$notify({
          type: "error",
          title: response.message
        });
      }
    },
    async onClickUnFollow() {
      const response = await this.unfollow(this.author._id);
      if (response.status === 200) {
        this.followers = this.followers.filter(
          followerId => followerId !== this.userId
        );
        this.$notify({
          type: "success",
          title: response.data.message
        });
        console.log(this.followers)
      }
      if (response.status === 400) {
        this.$notify({
          type: "error",
          title: response.message
        });
      }
    }
  },
  components: {
    UserSocialLinks
  },
  created() {}
};
</script>

<style>
</style>