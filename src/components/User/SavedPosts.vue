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
    <user-saved-discussions :user="user" v-if="activePage === 'discussions'" />
    <user-saved-blogs :user="user" v-if="activePage === 'blogs'" />
    <user-saved-podcasts :user="user" v-if="activePage === 'podcasts'" />
    <user-saved-songs :user="user" v-if="activePage === 'songs'" />
    <user-saved-movieReviews
      :user="user"
      v-if="activePage === 'movieReviews'"
    />
    <user-saved-bookReviews :user="user" v-if="activePage === 'bookReviews'" />
    <user-saved-foodReviews :user="user" v-if="activePage === 'foodReviews'" />
  </v-container>
</template>

<script>
import PostTabs from '@/components/Shared/PostTabs';

import UserSavedSongs from './SavedPost/UserSavedSongs';
import UserSavedPodcasts from './SavedPost/UserSavedPodcasts';
import UserSavedBookReviews from './SavedPost/UserSavedBookReviews';
import UserSavedFoodReviews from './SavedPost/UserSavedFoodReviews';
import UserSavedMovieReviews from './SavedPost/UserSavedMovieReviews';
import UserSavedBlogs from './SavedPost/UserSavedBlogs';
import UserSavedDiscussions from './SavedPost/UserSavedDiscussions';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    PostTabs,
    UserSavedSongs,
    UserSavedPodcasts,
    UserSavedBookReviews,
    UserSavedFoodReviews,
    UserSavedMovieReviews,
    UserSavedBlogs,
    UserSavedDiscussions,
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
