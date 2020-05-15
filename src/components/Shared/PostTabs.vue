<template>
  <v-container v-if="!isLoading" style="padding: 0 !important">
    <v-card
      color="basil"
      :style="type === 'writePost' ? 'width: 100%' : 'width: 67%'"
    >
      <v-toolbar dense>
        <v-tabs grow v-model="preSelectedPage">
          <v-tab key="discussions" @click="setActivePage('discussions')">
            Discussions
          </v-tab>
          <v-divider vertical inset></v-divider>
          <v-tab key="blogs" @click="setActivePage('blogs')">Blogs</v-tab>
          <v-divider vertical inset>A</v-divider>
          <v-menu key="reviews" offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-tab ref="reviewPage" v-on="on">Reviews</v-tab>
            </template>
            <v-list>
              <v-list-item
                v-for="item in reviewMenus"
                :key="item.category"
                @click="setActivePage(item.category)"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon color="primary" size="20" left>
                    {{ item.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.menu }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-divider vertical inset>A</v-divider>
          <v-menu key="audios" offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-tab ref="audioPage" v-on="on">Audios</v-tab>
            </template>
            <v-list>
              <v-list-item
                v-for="item in audioMenus"
                :key="item.category"
                @click="setActivePage(item.category)"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon color="primary" size="20">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.menu }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-divider vertical inset>A</v-divider>
        </v-tabs>
      </v-toolbar>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    selectedPage: {
      type: String,
      default: 'discussions',
    },
  },
  data() {
    return {
      preSelectedPage: null,
      pages: ['Discussions', 'Blogs', 'Reviews', 'Audios'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      reviewMenus: [
        { menu: 'Book Reviews', category: 'bookReviews', icon: 'menu_book' },
        {
          menu: 'Movie Reviews',
          category: 'movieReviews',
          icon: 'movie_filter',
        },
        { menu: 'Food Reviews', category: 'foodReviews', icon: 'fastfood' },
      ],
      audioMenus: [
        { menu: 'Songs', category: 'songs', icon: 'library_music' },
        { menu: 'Podcast', category: 'podcasts', icon: 'hearing' },
      ],
    };
  },
  methods: {
    setActivePage(page) {
      if (page === 'songs' || page === 'podcasts') {
        this.$refs.audioPage.$refs.link.click();
      } else if (
        page === 'bookReviews' ||
        page === 'movieReviews' ||
        page === 'foodReviews'
      ) {
        this.$refs.reviewPage.$refs.link.click();
      }

      this.$emit('setActivePage', { page });

      if (this.type === 'writePost') {
        const currentPage = this.$route.path + this.$route.hash;
        const targetPage = `/writePost#${page.slice(0, page.length - 1)}`;
        if (currentPage === targetPage) return;
        this.$router.replace({ path: targetPage });
      }
      if (this.type === 'stream') {
        const currentPage = this.$route.path + this.$route.hash;
        const targetPage = `/stream#${page}`;
        if (currentPage === targetPage) return;
        this.$router.replace({ path: targetPage });
      }
    },
  },
  computed: {
    ...mapState('utils', ['isLoading']),
  },
  mounted() {
    let selectedPage = this.selectedPage;
    if (selectedPage === 'songs' || selectedPage === 'podcasts') {
      selectedPage = 'audios';
    }
    if (
      selectedPage === 'bookReviews' ||
      selectedPage === 'movieReviews' ||
      selectedPage === 'foodReviews'
    ) {
      selectedPage = 'reviews';
    }

    this.preSelectedPage = selectedPage;
  },
};
</script>

<style scoped>
.basil {
  background-color: #fffbe6 !important;
}

.basil--text {
  color: #356859 !important;
}
</style>
