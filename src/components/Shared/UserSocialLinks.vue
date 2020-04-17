<template>
  <div class="user text-center d-flex">
    <v-list-item-avatar tile size="60" style="margin: 16px 0 0 0">
      <v-img
        src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
        style="cursor: pointer"
      ></v-img>
    </v-list-item-avatar>
    <v-container class="pb-0">
      <v-list-item-icon class="mb-0">
        <v-icon
          v-for="link in socialLinks"
          :key="link.icon"
          :color="link.color"
          size="20"
          class="pr-1"
          style="cursor: pointer"
          @click="handleClickLink(link.url)"
        >{{ link.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content class="pt-1 pl-1">
        <v-list-item-title class="caption text-start">{{ username }}</v-list-item-title>
      </v-list-item-content>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    githubLink: {
      type: String,
      default: ""
    },
    facebookLink: {
      type: String,
      default: ""
    },
    linkedinLink: {
      type: String,
      default: ""
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
    return {}
  },
  methods: {
    handleClickLink(url) {
      return window.open(url, '_blank')
    }
  },
  computed: {
    socialLinks() {
      let links = [];
      if (this.githubLink) links.push({ url: this.githubLink, icon: "mdi-github", color: 'black' });
      if (this.facebookLink) links.push({ url: this.facebookLink, icon: "mdi-facebook", color: 'primary' });
      if (this.linkedinLink) links.push({ url: this.linkedinLink, icon: "mdi-linkedin", color: '#006699' });
      return links;
    }
  }
};
</script>

<style>
</style>