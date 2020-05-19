<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6 mt-3">
      <h1 class="font-weight-bold display-3 basil--text">
        {{ user.username }}
      </h1>
    </v-card-title>

    <v-tabs background-color="transparent" color="basil" grow>
      <v-tab
        @click="setActiveTab(tab.key)"
        v-for="tab in profileTabs"
        :key="tab.key"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items>
      <user-posts :user="user" v-if="tab === 'legacies'" />
      <saved-posts :user="user" v-if="tab === 'saved-posts'" />
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
      this.$router.push({
        path: `/users/profile/${this.user.username}#${tabName}`,
      });
      return (this.tab = tabName);
    },
  },
  components: {
    UserPosts,
    SavedPosts,
  },
  created() {
    if (!this.isOwner) {
      this.profileTabs = [{ name: 'Legacies', key: 'legacies' }];
    } else {
      this.profileTabs = [
        { name: 'Legacies', key: 'legacies' },
        { name: 'Saved Posts', key: 'saved-posts' },
      ];
    }

    if (!this.$route.hash) {
      this.tab = 'legacies';
    } else {
      const selectedTab = this.$route.hash.slice(1);
      this.tab = selectedTab;
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
