<template>
  <v-container class="profile-details pl-0">
    <v-card class="px-7 pb-3" elevation="15">
      <v-list-item-content class="pb-0">
        <v-row style="height: 80px;">
          <v-col sm="4" md="3">
            <v-avatar size="60" style="cursor: pointer" dark>
              <img
                :src="author.avatar.secureURL"
                alt="Avatar"
                @click="onClickAvatar"
              />
            </v-avatar>
          </v-col>
          <v-col sm="12" md="8">
            <p class="title mb-1 mt-1">
              <a style="color: #000; text-decoration: none" :href="link">
                {{ author.username }}
              </a>
            </p>
            <p style="font-size: 13px; color: green" class="font-italic">
              {{ author.job }}
            </p>
          </v-col>
        </v-row>
      </v-list-item-content>
      <div class="mb-4" v-if="!isAuthor && !isFollowing">
        <v-btn
          small
          class="mt-3"
          @click="onClickFollow"
          dark
          color="green"
          width="100%"
        >
          {{ $t('Follow') }}
        </v-btn>
      </div>
      <div class="mb-4" v-if="!isAuthor && isFollowing">
        <v-btn
          small
          class="mt-3"
          @click="onClickUnFollow"
          dark
          color="red"
          width="100%"
        >
          {{ $t('Unfollow') }}
        </v-btn>
      </div>

      <v-card-subtitle class="pa-0 pb-3 mt-6" v-if="author.description">
        {{ author.description }}
      </v-card-subtitle>
      <p style="font-size: 13px;" class="pl-0 mb-1 mt-1" v-if="author.sex">
        <span>{{ $t('Sex') }}: {{ $t(author.sex) }}</span>
      </p>
      <p style="font-size: 13px;" class="pl-0 mb-0">
        <span>
          {{ $t('Date join') }}:
          {{ $d(new Date(author.createdAt), 'short', 'vi-VN') }}
        </span>
      </p>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import { ROUTES } from '@/mixins/routes';

export default {
  props: {
    isFollowing: {
      type: Boolean,
      required: true,
    },
    isAuthor: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      link: ROUTES.USER_PROFILE({ username: this.author.username }),
    };
  },
  methods: {
    ...mapActions('user', ['follow', 'unfollow']),
    onClickAvatar() {
      this.$router.push({ path: this.link });
    },
    onClickFollow() {
      this.$emit('handleFollow');
    },
    onClickUnFollow() {
      this.$emit('handleUnFollow');
    },
  },
  components: {},
  created() {},
};
</script>
