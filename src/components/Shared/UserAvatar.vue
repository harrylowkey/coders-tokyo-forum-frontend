<template>
  <div class="text-center">
    <v-list-item-avatar tile size="70" style="margin: 16px 0 0 0">
      <v-img
        @click="handleNavUserProfile"
        :src="src"
        style="cursor: pointer; border-radius: 50%"
      />
    </v-list-item-avatar>
    <v-list-item-content class="pt-md-1.5 pt-lg-1 pb-lg-1">
      <v-list-item-title class="caption text-center">
        <a target="_blank" class="username-link" @click="handleNavUserProfile">
          {{ username }}
        </a>
      </v-list-item-title>
    </v-list-item-content>
  </div>
</template>

<script>
import { ROUTES } from '@/mixins/routes.js';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      link: ROUTES.USER_PROFILE({ username: this.username }),
    };
  },
  methods: {
    handleNavUserProfile() {
      if (this.$route.fullPath !== this.link) {
        this.$router.push({ path: this.link });
      }
    },
  },
};
</script>

<style>
.username-link {
  text-decoration: none;
  color: #000 !important;
}
</style>
