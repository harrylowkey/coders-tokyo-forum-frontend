<template>
  <v-container style="padding: 0 !important">
    <v-card color="basil">
      <v-toolbar dense>
        <v-tabs grow>
          <v-tab @click="setActivePage('Discussions')">Discussions</v-tab>
          <v-divider vertical inset></v-divider>
          <v-tab @click="setActivePage('Blogs')" v-on="on">Blogs</v-tab>
          <v-divider vertical inset>A</v-divider>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-tab ref="reviewPage" v-on="on">Reviews</v-tab>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in reviewMenus"
                :key="index"
                @click="setActivePage(item.category)"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon color="primary" size="20" left>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.menu }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-divider vertical inset>A</v-divider>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-tab ref="audioPage" v-on="on">Audios</v-tab>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in audioMenus"
                :key="index"
                @click="setActivePage(item.category)"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon color="primary" size="20">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.menu }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-divider vertical inset>A</v-divider>
          <v-tab @click="setActivePage('Videos')">Videos</v-tab>
        </v-tabs>
      </v-toolbar>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      pages: ["Discussions", "Blogs", "Reviews", "Audios", "Videos"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      reviewMenus: [
        { menu: "Book Reviews", category: "Books", icon: "menu_book" },
        { menu: "Movie Reviews", category: "Movies", icon: "movie_filter" },
        { menu: "Food Reviews", category: "Food", icon: "fastfood" }
      ],
      audioMenus: [
        { menu: "Songs", category: "Songs", icon: "library_music" },
        { menu: "Podcast", category: "Podcasts", icon: "hearing" }
      ]
    };
  },
  methods: {
    setActivePage(page) {
      if (page === "Songs" || page === "Podcasts") {
        this.$refs.audioPage.$refs.link.click();
      }
      if (page === "Books" || page === "Movies" || page === "Food") {
        this.$refs.reviewPage.$refs.link.click();
      }
      return this.$emit("setActivePage", { page });
    },
    doNothing() {
      return;
    }
  }
};
</script>

<style scoped>
.basil {
  background-color: #fffbe6 !important;
}

.basil--text {
  color: #356859 !important;
}
</style>