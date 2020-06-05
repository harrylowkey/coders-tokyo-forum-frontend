<template>
  <v-container fluid style="padding: 0 !important" class="mt-12">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark">
      <v-row>
        <v-col
          cols="12"
          sm="8"
          md="8"
          lg="8"
          xl="8"
          offset-sm="1"
          offset-md="1"
          offset-lg="1"
          offset-xl="1"
          class="pt-0"
        >
          <post-tabs
            type="writePost"
            class="d-none d-sm-flex"
            @setActivePage="handleSetActivePage"
          />
          <div class="pt-6">
            <create-discussion v-if="activePage === 'discussions'" />
            <create-blog v-if="activePage === 'blogs'" />
            <create-audio type="podcasts" v-if="activePage === 'podcasts'" />
            <create-audio type="songs" v-if="activePage === 'songs'" />
            <create-movie v-if="activePage === 'movieReviews'" />
            <create-book v-if="activePage === 'bookReviews'" />
            <create-food v-if="activePage === 'foodReviews'" />
          </div>
        </v-col>
        <v-col
          sm="3"
          md="3"
          lg="3"
          xl="3"
          class="mt-12"
          style="position: relative"
        >
          <tips />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Tips from '@/components/Shared/Tips';

import PostTabs from '../Shared/PostTabs';

import CreateBlog from './Blog/CreateBlog';
import CreateDiscussion from './Discussion/CreateDiscussion';
import CreateAudio from './Audio/CreateAudio';
import CreateMovie from './Review/Movie/CreateMovie';
import CreateBook from './Review/Book/CreateBook';
import CreateFood from './Review/Food/CreateFood';

export default {
  components: {
    Tips,
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
<style scoped></style>
