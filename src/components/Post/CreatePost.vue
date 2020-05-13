<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark">
      <v-row>
        <post-tabs
          type="writePost"
          class="d-none d-sm-flex"
          @setActivePage="handleSetActivePage"
        ></post-tabs>
        <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
          <div class="pt-6">
            <create-discussion
              v-if="activePage === 'discussions'"
            ></create-discussion>
            <create-blog v-if="activePage === 'blogs'"></create-blog>
            <create-audio
              type="podcasts"
              v-if="activePage === 'podcasts'"
            ></create-audio>
            <create-audio
              type="songs"
              v-if="activePage === 'songs'"
            ></create-audio>
            <create-movie v-if="activePage === 'movieReviews'"></create-movie>
            <create-book v-if="activePage === 'bookReviews'"></create-book>
            <create-food v-if="activePage === 'foodReviews'"></create-food>
          </div>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
          <side-card
            class="fix-sidebar top-blogger"
            :title="topBloggers.title"
            :type="topBloggers.type"
            :data="topBloggers.data"
          />

          <side-card
            class="fix-sidebar"
            :title="tags.title"
            :type="tags.type"
            :data="tags.data"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import SideCard from '../Shared/SideCard';
import PostTabs from '../Shared/PostTabs';

import CreateBlog from './Blog/CreateBlog';
import CreateDiscussion from './Discussion/CreateDiscussion';
import CreateAudio from './Audio/CreateAudio';
import CreateMovie from './Review/Movie/CreateMovie';
import CreateBook from './Review/Book/CreateBook';
import CreateFood from './Review/Food/CreateFood';

export default {
  components: {
    SideCard,
    CreateBlog,
    CreateMovie,
    CreateDiscussion,
    CreateAudio,
    CreateBook,
    PostTabs,
    CreateFood,
  },
  data() {
    return {
      changeLayout: false,
      activePage: 'Discussions',
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
        ],
      },
    };
  },
  methods: {
    handleSetActivePage({ page }) {
      return (this.activePage = page);
    },
  },
  beforeOuteLeave(to, from, next) {
    if (to.path !== '/stream') this.changeLayout = true;
    next();
  },
  created() {
    const selectPage = this.$route.hash.slice(1);
    if (selectPage === '') {
      this.activePage = 'discussions';
    }

    if (selectPage !== '') {
      this.activePage = `${selectPage}s`;
    }
  },
};
</script>

<style></style>
