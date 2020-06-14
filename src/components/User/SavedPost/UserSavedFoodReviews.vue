<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" class="pt-0">
        <div v-if="!isLoadingGetPosts">
          <food
            class="mb-10"
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

import Food from '@/components/Post/Review/Food/Food';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    Food,
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
    ...mapState('userSavedFoodReviews', ['foodReviews', 'metadata']),
  },
  methods: {
    ...mapActions('userSavedFoodReviews', [
      'getFoodReviews',
      'loadMoreFoodReviews',
    ]),
    async loadMore() {
      if (!this.metadata.page) return;
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }
      await this.loadMoreFoodReviews({
        userId: this.user._id,
        typeQuery: 'food',
        options: { limit: 5, page: this.metadata.page + 1 },
      });
    },
    handleLikedPost({ postId, user }) {
      const food = this.foodReviews.find(food => food._id === postId);
      food.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const food = this.foodReviews.find(food => food._id === postId);
      food.likes = food.likes.filter(_user => _user._id !== user._id);
    },
  },
  async created() {
    await this.getFoodReviews({
      userId: this.user._id,
      typeQuery: 'food',
      options: { limit: 5, page: 1 },
    });
  },
};
</script>
