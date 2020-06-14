<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
        <div v-if="isLoading">
          <v-skeleton-loader
            class="mt-5"
            type="card-avatar, list-item-three-line"
            v-for="(loader, i) in 5"
            :key="i"
          />
        </div>
        <food
          v-else
          v-for="item in foodReviews"
          :key="item._id"
          :url="item.url"
          :_id="item._id"
          :topic="item.topic"
          :description="item.description"
          :content="item.content"
          :tags="item.tags"
          :cover="item.cover"
          :author="item.user"
          :type="item.type"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          :metadata="item.metadata"
          :food="item.food"
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

import Food from './Food';

export default {
  components: {
    Food,
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
        title: 'Top Food Reviews',
        dataType: 'posts',
        type: 2,
        data: [],
      },
    };
  },
  computed: {
    ...mapState('utils', ['isLoading', 'isLoadmore']),
    ...mapState('foodReviews', ['foodReviews', 'metadata']),
    ...mapState('stream', ['topFoodReviews', 'topTags']),
  },
  methods: {
    ...mapActions('foodReviews', ['getFoodReviews', 'loadMoreFoodReviews']),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMoreFoodReviews({ page: this.metadata.page + 1 });
    },
    handleLikedPost({ postId, user }) {
      const foodReview = this.foodReviews.find(
        foodReview => foodReview._id === postId,
      );
      foodReview.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const foodReview = this.foodReviews.find(
        foodReview => foodReview._id === postId,
      );
      foodReview.likes = foodReview.likes.filter(
        _user => _user._id !== user._id,
      );
    },
  },
  async created() {
    await this.getFoodReviews();
    this.topTagDatas.data = this.topTags.slice(0, 5);
    this.topPostLikes.data = this.topFoodReviews;
  },
};
</script>
