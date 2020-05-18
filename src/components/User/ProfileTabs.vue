<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6 mt-3">
      <h1 class="font-weight-bold display-3 basil--text">
        {{ user.username }}
      </h1>
    </v-card-title>

    <v-tabs background-color="transparent" color="basil" grow>
      <v-tab @click="setActiveTab(tab)" v-for="tab in profileTabs" :key="tab">
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items>
      <user-posts :user="user" v-if="tab === 'Legacies'" />
      <saved-posts v-if="tab === 'Saved Posts'" />
    </v-tabs-items>
  </v-card>
</template>
<script>
import UserPosts from './UserPosts';
import SavedPosts from './SavedPosts';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint sunt totam unde voluptatem qui ab praesentium velit magni? Officia molestiae porro ab dolor nulla animi praesentium fuga perspiciatis quam autem.',
      savedPostMenus: [
        { menu: 'Discussions', category: 'Discussions', icon: 'menu_book' },
        { menu: 'Blogs', category: 'Blogs', icon: 'fastfood' },
        { menu: 'Book Reviews', category: 'Books', icon: 'menu_book' },
        { menu: 'Movie Reviews', category: 'Movies', icon: 'movie_filter' },
        { menu: 'Food Reviews', category: 'Food', icon: 'fastfood' },
        { menu: 'Songs', category: 'Movies', icon: 'movie_filter' },
        { menu: 'Podcasts', category: 'Podcasts', icon: 'movie_filter' },
      ],
    };
  },
  methods: {
    setActiveTab(tabName) {
      return (this.tab = tabName);
    },
  },
  components: {
    UserPosts,
    SavedPosts,
  },
  created() {
    this.tab = 'Legacies';
    if (!this.isOwner) {
      this.profileTabs = ['Legacies'];
    } else {
      this.profileTabs = ['Legacies', 'Saved Posts'];
    }
  },
};
</script>

<style scoped>
.basil {
  background-color: lightgreen !important;
}
.basil--text {
  color: #ef5350 !important;
}
</style>
