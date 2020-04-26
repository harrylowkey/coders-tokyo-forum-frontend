<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner></app-banner>
    <v-divider></v-divider>
    <v-divider inset></v-divider>
    <audio-playlist class="d-none d-sm-flex"></audio-playlist>
    <v-divider></v-divider>
    <br />
    <v-container color="dark">
      <v-row>
        <post-tabs class="d-none d-sm-flex" @setActivePage="handleSetActivePage"></post-tabs>
        <discussion-page v-if="activePage === 'Discussions'"></discussion-page>
        <blog-page v-if="activePage === 'Blogs'"></blog-page>
        <video-page v-if="activePage === 'Videos'"></video-page>
        <review-page v-if="activePage === 'Reviews'"></review-page>
        <podcast-page v-if="activePage === 'Podcasts'"></podcast-page>
        <song-page v-if="activePage === 'Songs'"></song-page>
        <movie-page v-if="activePage === 'Movies'"></movie-page>
        <book-page v-if="activePage === 'Books'"></book-page>
        <food-page v-if="activePage === 'Food'"></food-page>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import AudioPlaylist from "./AudioPlaylist";
import SideCard from "../Shared/SideCard";
import PostTabs from "../Shared/PostTabs";
import BlogPage from "../Post/Blog/BlogList";
import DiscussionPage from "../Post/Discussion/Discussions";
import ReviewPage from "../Post/Review/Review";
import VideoPage from "../Post/Video/Video";
import PodcastPage from "../Post/Audio/Podcast/PodcastList";
import SongPage from "../Post/Audio/Song/SongList";
import MoviePage from "../Post/Review/Movie/MovieList";
import BookPage from "../Post/Review/Book/BookList";
import FoodPage from "../Post/Review/Food/FoodList";

export default {
  components: {
    AudioPlaylist,
    SideCard,
    PostTabs,
    BlogPage,
    DiscussionPage,
    ReviewPage,
    VideoPage,
    PodcastPage,
    SongPage,
    MoviePage,
    BookPage,
    FoodPage
  },
  data() {
    return {
      changeLayout: false,
      activePage: "Discussions"
    };
  },
  methods: {
    handleSetActivePage({ page }) {
      return (this.activePage = page);
    }
  },
  beforeOuteLeave(to, from, next) {
    if (to.path !== "/stream") this.changeLayout = true;
    next();
  }
};
</script>

<style>
</style>