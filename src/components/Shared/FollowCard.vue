<template>
  <v-card class="pb-1">
    <v-container class="pb-0">
      <p class="headline mb-2 mt-0 ml-4">
        {{ $t(type) }}
        <span style="font-size: 16px">({{ list.length }})</span>
      </p>
    </v-container>
    <v-divider />
    <div v-if="list.length">
      <v-container style="min-height: 200px">
        <div class="d-flex" v-for="user in list" :key="user._id">
          <span class="py-4 pl-4" style="padding-right: 80px">
            <a class="username-link">{{ user.username }}</a>
          </span>
          <v-spacer />
          <v-list-item-avatar tile size="40">
            <v-img
              :src="user.avatar.secureURL"
              style="cursor: pointer; border-radius: 50%"
            />
          </v-list-item-avatar>
          <v-container
            style="width: 30%;"
            class="d-flex justify-center pt-5 px-0"
          >
            <v-btn
              @click="onClickFollow(user)"
              v-if="!isFollowing(user._id)"
              dark
              color="green"
              x-small
            >
              {{ $t('Follow') }}
            </v-btn>
            <v-btn
              @click="onClickUnfollow(user)"
              v-if="isFollowing(user._id)"
              dark
              color="red"
              x-small
            >
              {{ $t('Unfollow') }}
            </v-btn>
          </v-container>
        </div>
      </v-container>
    </div>
    <v-container v-else style="height: 200px" />
  </v-card>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'Followers',
    },
    userFollowing: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    isFollowing(userId) {
      return this.userFollowing.find(user => user._id === userId);
    },
    onClickFollow(user) {
      this.$emit('handleFollow', { user });
    },
    onClickUnfollow(user) {
      this.$emit('handleUnfollow', { user });
    },
  },
};
</script>
