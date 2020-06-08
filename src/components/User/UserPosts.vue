<template>
  <v-container
    class="d-flex pt-0 flex-wrap justify-center mb-3 pt-4"
    id="wrapper"
  >
    <post-tabs
      :selectedPage="activePage"
      class="d-none d-sm-flex"
      @setActivePage="handleSetActivePage"
      type="profile"
    />
    <user-discussions :user="user" v-if="activePage === 'discussions'" />
    <user-blogs :user="user" v-if="activePage === 'blogs'" />
    <user-podcasts :user="user" v-if="activePage === 'podcasts'" />
    <user-songs :user="user" v-if="activePage === 'songs'" />
    <user-movieReviews :user="user" v-if="activePage === 'movieReviews'" />
    <user-bookReviews :user="user" v-if="activePage === 'bookReviews'" />
    <user-foodReviews :user="user" v-if="activePage === 'foodReviews'" />
  </v-container>
</template>

<script>
import PostTabs from '@/components/Shared/PostTabs';

import UserSongs from './Post/UserSongs';
import UserPodcasts from './Post/UserPodcasts';
import UserBookReviews from './Post/UserBookReviews';
import UserFoodReviews from './Post/UserFoodReviews';
import UserMovieReviews from './Post/UserMovieReviews';
import UserBlogs from './Post/UserBlogs';
import UserDiscussions from './Post/UserDiscussions';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    PostTabs,
    UserSongs,
    UserPodcasts,
    UserBookReviews,
    UserFoodReviews,
    UserMovieReviews,
    UserBlogs,
    UserDiscussions,
  },
  data() {
    return {
      activePage: 'discussions',
    };
  },
  methods: {
    calWidth(type) {
      if (type === 'song') return { width: '40% !important' };
      return { width: '100%' };
    },
    handleSetActivePage({ page }) {
      return (this.activePage = page);
    },
  },
};
</script>
