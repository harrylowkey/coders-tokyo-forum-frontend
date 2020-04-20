<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6 mt-3">
      <h1 class="font-weight-bold display-3 basil--text">{{ username }}</h1>
    </v-card-title>

    <v-tabs background-color="transparent" color="basil" grow>
      <v-tab @click="setActiveTab(tab)" v-for="tab in profileTabs" :key="tab">{{ tab }}</v-tab>
    </v-tabs>

    <v-tabs-items>
      <user-posts v-if="tab === 'Your Legacies'"></user-posts>
      <saved-posts v-if="tab === 'Saved Posts'"></saved-posts>
    </v-tabs-items>
  </v-card>
</template>
<script>
import Discussions from '@/components/Post/Discussion/Discussions'
import UserPosts from './UserPosts'
import SavedPosts from './SavedPosts'
export default {
  data() {
    return {
      tab: 'Your Legacies',
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint sunt totam unde voluptatem qui ab praesentium velit magni? Officia molestiae porro ab dolor nulla animi praesentium fuga perspiciatis quam autem.",
      username: "hongquangraem",
      profileTabs: ["Your Legacies", "Saved Posts"],
      savedPostMenus: [
        { menu: "Discussions", category: "Discussions", icon: "menu_book" },
        { menu: "Blogs", category: "Blogs", icon: "fastfood" },
        { menu: "Book Reviews", category: "Books", icon: "menu_book" },
        { menu: "Movie Reviews", category: "Movies", icon: "movie_filter" },
        { menu: "Food Reviews", category: "Food", icon: "fastfood" },
        { menu: "Songs", category: "Movies", icon: "movie_filter" },
        { menu: "Podcasts", category: "Podcasts", icon: "movie_filter" }
      ]
    };
  },
  methods: {
    setActiveTab(tabName) {
      return this.tab = tabName
    }
  },
  components: {
    Discussions,
    UserPosts,
    SavedPosts
  },

};
</script>

<style scoped>
.basil {
  background-color: lightgreen !important;
}
.basil--text {
  color: #EF5350 !important;
}
</style>