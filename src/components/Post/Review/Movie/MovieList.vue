<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
        <v-skeleton-loader
          class="mt-5"
          v-if="isLoading"
          type="card-avatar, list-item-three-line"
        />
        <v-skeleton-loader
          class="mt-5"
          v-if="isLoading"
          type="card-avatar, list-item-three-line"
        />
        <v-skeleton-loader
          class="mt-5"
          v-if="isLoading"
          type="card-avatar, list-item-three-line"
        />
        <v-skeleton-loader
          class="mt-5"
          v-if="isLoading"
          type="card-avatar, list-item-three-line"
        />
        <v-skeleton-loader
          class="mt-5"
          v-if="isLoading"
          type="card-avatar, list-item-three-line"
        />

        <movie
          v-else
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

        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isLoadmore"
          infinite-scroll-distance="10"
        />
        <v-text-field color="primary" v-if="isLoadmore" loading disabled />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" xl="4" style="padding-top: 12px">
        <side-card
          class="fix-sidebar most-view-posts"
          :title="topPostLikes.title"
          :type="topPostLikes.type"
          :data="topPostLikes.data"
          :dataType="topPostLikes.dataType"
        />

        <side-card
          class="fix-sidebar"
          :title="topTagDatas.title"
          :type="topTagDatas.type"
          :data="topTagDatas.data"
          :dataType="topTagDatas.dataType"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import SideCard from '@/components/Shared/SideCard';

import Movie from './Movie';

export default {
  components: {
    Movie,
    SideCard,
  },
  data() {
    return {
      topTagDatas: {
        title: 'Top Tags',
        dataType: 'tags',
        type: 2,
        data: [],
      },
      topPostLikes: {
        title: 'Top Movie Reviews',
        dataType: 'posts',
        type: 2,
        data: [],
      },
    };
  },

  computed: {
    ...mapState('utils', ['errorMes', 'isLoading', 'isLoadmore']),
    ...mapState('movieReviews', ['movieReviews', 'metadata']),
    ...mapState('stream', ['topMovieReviews', 'topTags']),
  },
  methods: {
    ...mapActions('movieReviews', ['getMovieReviews', 'loadMoreMovieReviews']),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMoreMovieReviews({ page: this.metadata.page + 1 });
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
    await this.getMovieReviews();
    this.topTagDatas.data = this.topTags.slice(0, 5);
    this.topPostLikes.data = this.topMovieReviews;
  },
};
</script>
