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

        <book
          v-else
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

        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isLoadmore"
          infinite-scroll-distance="10"
        />
        <v-text-field color="primary" v-if="isLoadmore" loading disabled />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" xl="4" style="padding-top: 12px">
        <side-card
          class="fix-sidebar top-blogger"
          :title="topBloggers.title"
          :type="topBloggers.type"
          :data="topBloggers.data"
          :dataType="topBloggers.dataType"
        />

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

import Book from './Book';

export default {
  components: {
    Book,
    SideCard,
  },
  data() {
    return {
      showViewMoreBtn: true,
      topBloggers: {
        title: 'Top Bloggers',
        dataType: 'bloggers',
        type: 1,
        data: [
          {
            _id: '1',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1587030274/Draw-io-trophies/--02-128_kotkpp.png',
            text: 'ydobon',
          },
          {
            _id: '2',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1587030285/Draw-io-trophies/advantage_quality-128_hxdkdz.png',
            text: 'hongquangraem',
          },
          {
            _id: '3',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1587030256/Draw-io-trophies/movie-10-128_yf3ng3.png',
            text: 'quangdepzai_99',
          },
        ],
      },
      topTagDatas: {
        title: 'Top Tags',
        dataType: 'tags',
        type: 2,
        data: [],
      },
      topPostLikes: {
        title: 'Top Book Reviews',
        dataType: 'posts',
        type: 2,
        data: [],
      },
    };
  },

  computed: {
    ...mapState('utils', ['errorMes', 'isLoading', 'isLoadmore']),
    ...mapState('bookReviews', ['bookReviews', 'metadata']),
    ...mapState('stream', ['topBookReviews', 'topTags']),
  },
  methods: {
    ...mapActions('bookReviews', ['getBookReviews', 'loadMoreBookReviews']),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMoreBookReviews({ page: this.metadata.page + 1 });
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
    await this.getBookReviews();
    this.topTagDatas.data = this.topTags.slice(0, 5);
    this.topPostLikes.data = this.topBookReviews;
  },
};
</script>
