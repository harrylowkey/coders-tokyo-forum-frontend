<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" class="pt-0">
        <div v-if="!isLoadingGetPosts">
          <movie
            class="mb-10"
            v-for="item in movieReviews"
            :key="item._id"
            :_id="item._id"
            :topic="item.topic"
            :description="item.description"
            :content="item.content"
            :tags="item.tags"
            :cover="item.cover"
            :author="item.user"
            :url="item.url"
            :type="item.type"
            :createdAt="item.createdAt"
            :updatedAt="item.updatedAt"
            :metadata="item.metadata"
            :movie="item.movie"
            :authors="item.authors"
            :comments="item.comments"
            :likes="item.likes"
            @likedPost="handleLikedPost"
            @unlikedPost="handleUnlikedPost"
          />
        </div>

        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isLoadmore"
          infinite-scroll-distance="10"
        />
        <v-text-field color="primary" v-if="isLoadmore" loading disabled />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Movie from '@/components/Post/Review/Movie/Movie';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    Movie,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('utils', [
      'isLoading',
      'isLoadingAPI',
      'isLoadmore',
      'isLoadingGetPosts',
    ]),
    ...mapState('userMovieReviews', ['movieReviews', 'metadata']),
  },
  methods: {
    ...mapActions('userMovieReviews', [
      'getMovieReviews',
      'loadMoreMovieReviews',
    ]),
    async loadMore() {
      if (!this.metadata.page) return;
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }
      await this.loadMoreMovieReviews({
        userId: this.user._id,
        typeQuery: 'movie',
        options: { limit: 5, page: this.metadata.page + 1 },
      });
    },
    handleLikedPost({ postId, user }) {
      const movie = this.movieReviews.find(movie => movie._id === postId);
      movie.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const movie = this.movieReviews.find(movie => movie._id === postId);
      movie.likes = movie.likes.filter(_user => _user._id !== user._id);
    },
  },
  async created() {
    await this.getMovieReviews({
      userId: this.user._id,
      typeQuery: 'movie',
      options: { limit: 5, page: 1 },
    });
  },
};
</script>
