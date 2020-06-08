<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner class="mt-12" />
    <v-divider />
    <v-divider inset />
    <audio-playlist
      v-if="!isLoading"
      class="d-none d-sm-flex"
      id="audio-playlist"
    />
    <div v-if="isLoading" class="d-flex justify-center">
      <v-skeleton-loader
        class="song mb-6"
        style="margin-top: 30px; margin-right: 54px; display: inline-block; width: 300px"
        max-width="160"
        max-height="160"
        type="image, date-picker-options"
        v-for="(loader, i) in 6"
        :key="i"
      />
    </div>
    <v-divider />
    <br />
    <v-container color="dark">
      <v-row>
        <v-col
          cols="11"
          sm="11"
          md="12"
          lg="12"
          xl="11"
          offset-xl="1"
          class="pt-0"
        >
          <post-tabs
            type="stream"
            :selectedPage="activePage"
            class="d-none d-sm-flex"
            @setActivePage="handleSetActivePage"
          />
        </v-col>
        <discussion-page v-if="activePage === 'discussions'" />
        <blog-page v-if="activePage === 'blogs'" />
        <podcast-page v-if="activePage === 'podcasts'" />
        <song-page v-if="activePage === 'songs'" />
        <movie-page v-if="activePage === 'movieReviews'" />
        <book-page v-if="activePage === 'bookReviews'" />
        <food-page v-if="activePage === 'foodReviews'" />
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
      activePage: '',
    };
  },
  methods: {
    ...mapActions('stream', ['getStream']),
    handleSetActivePage({ page }) {
      return (this.activePage = page);
    },
  },
  computed: {
    ...mapState('utils', ['isLoading']),
  },
  async created() {
    await this.getStream();
    const selectPage = this.$route.hash.slice(1);
    if (!this.isLoading && selectPage === '') {
      this.activePage = 'discussions';
    }

    if (!this.isLoading && selectPage !== '') {
      this.activePage = selectPage;
    }
  },
};
</script>

<style scroped lang="scss"></style>
