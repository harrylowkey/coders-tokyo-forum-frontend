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
          :user="item.user"
          :type="item.type"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          :metadata="item.metadata"
          :food="item.food"
          :comments="item.comments"
          :likes="item.likes"
        />

        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isLoadmore"
          infinite-scroll-distance="10"
        />
        <v-text-field color="primary" v-if="isLoadmore" loading disabled />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" xl="4" :style="sideBarStyle">
        <side-card
          class="fix-sidebar top-blogger"
          :title="topBloggers.title"
          :type="topBloggers.type"
          :data="topBloggers.data"
          v-if="showTopBloggers"
        />

        <side-card
          class="fix-sidebar most-view-posts"
          :title="mostViewBlogs.title"
          :type="mostViewBlogs.type"
          :data="mostViewBlogs.data"
        />

        <side-card
          class="fix-sidebar"
          :title="tags.title"
          :type="tags.type"
          :data="tags.data"
        />

        <side-card
          class="fix-sidebar member-online"
          :title="membersOnline.title"
          :type="membersOnline.type"
          :data="membersOnline.data"
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
      showViewMoreBtn: true,
      topBloggers: {
        title: 'Top Bloggers',
        type: 1,
        data: [
          {
            _id: '1',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1587030274/Draw-io-trophies/--02-128_kotkpp.png',
            text: 'chau_chau',
          },
          {
            _id: '2',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1587030285/Draw-io-trophies/advantage_quality-128_hxdkdz.png',
            text: 'nhat_anh',
          },
          {
            _id: '3',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1587030256/Draw-io-trophies/movie-10-128_yf3ng3.png',
            text: 'thanh_ton',
          },
        ],
      },
      tags: {
        title: 'Tags',
        type: 2,
        data: [
          {
            _id: '1',
            text: 'javascript',
            counter: 153,
          },
          {
            _id: '2',
            text: 'discussion',
            counter: 153,
          },
          {
            _id: '3',
            text: 'nodejs',
            counter: 153,
          },
          {
            _id: '4',
            text: 'html',
            counter: 153,
          },
        ],
      },
      mostViewBlogs: {
        title: 'Most Views',
        type: 2,
        data: [
          {
            _id: '1',
            text: 'Javascript the best parts',
            counter: 153,
          },
          {
            _id: '2',
            text: 'Top 5 nodejs frameworks',
            counter: 100,
          },
          {
            _id: '3',
            text: 'HTML for dummies',
            counter: 99,
          },
          {
            _id: '4',
            text: 'Testing issues',
            counter: 80,
          },
          {
            _id: '5',
            text: 'Setting Mongo local',
            counter: 79,
          },
          {
            _id: '6',
            text: 'Javascript the best parts',
            counter: 153,
          },
          {
            _id: '7',
            text: 'Top 5 nodejs frameworks',
            counter: 100,
          },
          {
            _id: '8',
            text: 'HTML for dummies',
            counter: 99,
          },
          {
            _id: '9',
            text: 'Testing issues',
            counter: 80,
          },
          {
            _id: '10',
            text: 'Setting Mongo local',
            counter: 79,
          },
        ],
      },
      membersOnline: {
        title: 'Members Online',
        type: 1,
        data: [
          {
            _id: '1',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1586965772/Draw-io-avatars/12_avatar-128_hvhfyk.png',
            text: 'ngo_minh',
          },
          {
            _id: '2',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1586965680/Draw-io-avatars/4_avatar-128_rk2yxz.png',
            text: 'nhat_anh',
          },
          {
            _id: '3',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1586965594/Draw-io-avatars/avatar-128_s94fqh.png',
            text: 'thanh_ton',
          },
        ],
      },
      showTopBloggers: true,
      showTags: true,
      showMostViewBlogs: true,
      showMembersOnline: true,
      sideBarStyle: {
        paddingTop: '12px',
      },
    };
  },
  computed: {
    ...mapState('utils', ['errorMes', 'isLoading', 'isLoadmore']),
    ...mapState('foodReviews', ['foodReviews', 'metadata']),
  },
  methods: {
    ...mapActions('foodReviews', ['getFoodReviews', 'loadMoreFoodReviews']),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMoreFoodReviews({ page: this.metadata.page + 1 });
    },
  },
  async created() {
    if (this.$route.path === '/stream' || this.$route.path === '/') {
      this.mostViewBlogs.title = 'Top 5 Discussions';
      const sliceMostViews = this.mostViewBlogs.data.slice(5);
      this.mostViewBlogs.data = sliceMostViews;
    }

    await this.getFoodReviews();
  },
};
</script>
