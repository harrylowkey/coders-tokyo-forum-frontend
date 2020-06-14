<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" class="pt-0">
        <div v-if="!isLoadingGetPosts">
          <book
            class="mb-10"
            v-for="item in bookReviews"
            :key="item._id"
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
            :book="item.book"
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

import Book from '@/components/Post/Review/Book/Book';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    Book,
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
    ...mapState('userSavedBookReviews', ['bookReviews', 'metadata']),
  },
  methods: {
    ...mapActions('userSavedBookReviews', [
      'getBookReviews',
      'loadMoreBookReviews',
    ]),
    async loadMore() {
      if (!this.metadata.page) return;
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMorebookReviews({
        userId: this.user._id,
        typeQuery: 'book',
        options: { limit: 5, page: this.metadata.page + 1 },
      });
    },
    handleLikedPost({ postId, user }) {
      const book = this.bookReviews.find(book => book._id === postId);
      book.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const book = this.bookReviews.find(book => book._id === postId);
      book.likes = book.likes.filter(_user => _user._id !== user._id);
    },
  },
  async created() {
    await this.getBookReviews({
      userId: this.user._id,
      typeQuery: 'book',
      options: { limit: 5, page: 1 },
    });
  },
};
</script>
