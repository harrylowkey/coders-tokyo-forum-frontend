<template>
  <div class="text-center">
    <v-list-item-avatar tile size="70" style="margin: 16px 0 0 0">
      <v-img @click="onClickAvatar" :src="src" style="cursor: pointer; border-radius: 50%" ></v-img>
    </v-list-item-avatar>
    <v-list-item-content class="pt-md-1.5 pt-lg-1 pb-lg-1">
      <v-list-item-title class="caption text-center">
        <a class="username-link" :href="link">{{ username }}</a>
      </v-list-item-title>
    </v-list-item-content>
  </div>
</template>

<script>
export default {
  props: ["src", "username"],
  data() {
    return {
      link: `/users/${this.username}`
    };
  },
  methods: {
    onClickAvatar() {
      this.$router.push({ path: this.link });
    }
  }
};
</script>

<style>
.username-link {
  text-decoration: none;
  color: #000 !important;
}
</style>