<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner></app-banner>
    <v-divider></v-divider>
    <v-divider inset></v-divider>
    <audio-playlist
      v-if="!isLoading"
      class="d-none d-sm-flex"
      id="audio-playlist"
    ></audio-playlist>
    <div class="d-flex justify-center">
      <v-skeleton-loader
        class="song mb-6"
        style="margin-top: 30px; margin-right: 54px; display: inline-block; width: 300px"
        max-width="160"
        max-height="160"
        v-if="isLoading"
        type="image, date-picker-options"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="song mb-6"
        style="margin-top: 30px; margin-right: 54px; display: inline-block; width: 300px"
        max-width="160"
        max-height="160"
        v-if="isLoading"
        type="image, date-picker-options"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="song mb-6"
        style="margin-top: 30px; margin-right: 54px; display: inline-block; width: 300px"
        max-width="160"
        max-height="160"
        v-if="isLoading"
        type="image, date-picker-options"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="song mb-6"
        style="margin-top: 30px; margin-right: 54px; display: inline-block; width: 300px"
        max-width="160"
        max-height="160"
        v-if="isLoading"
        type="image, date-picker-options"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="song mb-6"
        style="margin-top: 30px; margin-right: 54px; display: inline-block; width: 300px"
        max-width="160"
        max-height="160"
        v-if="isLoading"
        type="image, date-picker-options"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="song mb-6"
        style="margin-top: 30px; margin-right: 54px; display: inline-block; width: 300px"
        max-width="160"
        max-height="160"
        v-if="isLoading"
        type="image, date-picker-options"
      ></v-skeleton-loader>
    </div>
    <v-divider></v-divider>
    <br />
    <v-container color="dark">
      <v-row>
        <post-tabs
          type="stream"
          v-if="!isLoading"
          :selectedPage="activePage"
          class="d-none d-sm-flex"
          @setActivePage="handleSetActivePage"
        ></post-tabs>
        <discussion-page v-if="activePage === 'discussions'"></discussion-page>
        <blog-page v-if="activePage === 'blogs'"></blog-page>
        <podcast-page v-if="activePage === 'podcasts'"></podcast-page>
        <song-page v-if="activePage === 'songs'"></song-page>
        <movie-page v-if="activePage === 'movieReviews'"></movie-page>
        <book-page v-if="activePage === 'bookReviews'"></book-page>
        <food-page v-if="activePage === 'foodReviews'"></food-page>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import PostTabs from '../Shared/PostTabs';
import BlogPage from '../Post/Blog/BlogList';
import DiscussionPage from '../Post/Discussion/Discussions';
import PodcastPage from '../Post/Audio/Podcast/PodcastList';
import SongPage from '../Post/Audio/Song/SongList';
import MoviePage from '../Post/Review/Movie/MovieList';
import BookPage from '../Post/Review/Book/BookList';
import FoodPage from '../Post/Review/Food/FoodList';

import AudioPlaylist from './AudioPlaylist';

export default {
  components: {
    AudioPlaylist,
    PostTabs,
    BlogPage,
    DiscussionPage,
    PodcastPage,
    SongPage,
    MoviePage,
    BookPage,
    FoodPage,
  },
  data() {
    return {
      isWelcomeLogin: false,
      activePage: '',
    };
  },
  methods: {
    ...mapActions('stream', ['getStream']),
    handleSetActivePage({ page }) {
      return (this.activePage = page);
    },
  },

  beforeRouteEnter(to, from, next) {
    if (from.path === '/signin') {
      return next(vm => (vm.isWelcomeLogin = true));
    }
    next();
  },
  mounted() {
    if (this.isWelcomeLogin) {
      this.$notify({
        type: 'success',
        title: 'Login success',
      });
    }
  },
  computed: {
    ...mapState('utils', ['isLoading']),
    // ...mapState('stream', ['audioTrending'])
  },
  async created() {
    const response = await this.getStream();
    const selectPage = this.$route.hash.slice(1);
    if (response.status === 200 && selectPage === '') {
      this.activePage = 'discussions';
    }

    if (response.status === 200 && selectPage !== '') {
      this.activePage = selectPage;
    }
  },
};
</script>

<style scroped lang="scss"></style>
