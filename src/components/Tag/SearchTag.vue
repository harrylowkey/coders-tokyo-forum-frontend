<template>
  <v-container fluid style="padding: 0 !important" class="mt-12">
    <app-banner />
    <v-divider />
    <v-divider inset />
    <v-divider />
    <v-container class="pt-0">
      <v-row>
        <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
          <v-skeleton-loader
            class="mt-5 mb-5"
            v-if="isLoading"
            type="list-item-avatar-three-line, list-item-three-line"
          />

          <v-skeleton-loader
            class="mt-5"
            v-if="isLoading"
            type="card-avatar, list-item-three-line"
          />

          <v-skeleton-loader
            class="mt-5 mb-5"
            v-if="isLoading"
            type="list-item-avatar-three-line, list-item-three-line"
          />
          <div
            class="mb-2"
            style="opacity: 0; position: absolute; top: 305px;"
            id="tags-wrapper"
          >
            Scroll to top
          </div>
          <div class="mt-3 d-flex">
            <div>
              <span
                id="tag"
                v-for="(tag, i) in tagNames"
                :key="i"
                class="display-3"
                style="font-size: 35px !important"
              >
                #{{ tag }}
              </span>
            </div>
            <span
              v-if="metadata.totalRecords"
              style="color: green; font-size: 15px!important"
              class="font-italic ml-3 caption"
            >
              ({{ metadata.totalRecords }})
            </span>
            <v-spacer />
            <div class="d-flex flex-end mt-3 ml-5" style="width: 100%">
              <v-text-field
                @keyup.enter="searchTags"
                class="pt-0"
                v-model="tagsSearch"
                hide-details
                single-line
              />
              <v-btn
                text
                class="mt-3 px-0 search-icon"
                color="green"
                @click="searchTags"
              >
                <v-icon size="30">search</v-icon>
              </v-btn>
            </div>
          </div>

          <div class="d-flex pt-0" id="wrapper" v-if="!isLoading">
            <v-container
              class="pt-0"
              v-for="post in posts"
              :key="post._id"
              :style="calWidth(post.type)"
            >
              <discussion
                style="width: 100%"
                v-if="post.type === 'discussion'"
                :key="post._id"
                :_id="post._id"
                :tags="post.tags"
                :comments="post.comments"
                :likes="post.likes"
                :savedBy="post.savedBy"
                :author="post.user"
                :topic="post.topic"
                :content="post.content"
                :type="post.type"
                :createdAt="post.createdAt"
                :updatedAt="post.updatedAt"
                :metadata="post.metadata"
                @likedPost="handleLikedPost"
                @unlikedPost="handleUnlikedPost"
              />

              <blog
                v-if="post.type === 'blog'"
                :key="post._id"
                :_id="post._id"
                :topic="post.topic"
                :description="post.description"
                :content="post.content"
                :tags="post.tags"
                :cover="post.cover"
                :author="post.user"
                :type="post.type"
                :createdAt="post.createdAt"
                :updatedAt="post.updatedAt"
                :metadata="post.metadata"
                @likedPost="handleLikedPost"
                @unlikedPost="handleUnlikedPost"
                :comments="post.comments"
                :likes="post.likes"
              />

              <movie
                v-if="post.type === 'movie'"
                :key="post._id"
                :_id="post._id"
                :topic="post.topic"
                :description="post.description"
                :content="post.content"
                :tags="post.tags"
                :cover="post.cover"
                :author="post.user"
                :url="post.url"
                :type="post.type"
                :createdAt="post.createdAt"
                :updatedAt="post.updatedAt"
                :metadata="post.metadata"
                @likedPost="handleLikedPost"
                @unlikedPost="handleUnlikedPost"
                :movie="post.movie"
                :authors="post.authors"
                :comments="post.comments"
                :likes="post.likes"
              />

              <book
                v-if="post.type === 'book'"
                :key="post._id"
                :_id="post._id"
                :topic="post.topic"
                :description="post.description"
                :content="post.content"
                :tags="post.tags"
                :cover="post.cover"
                :author="post.user"
                :type="post.type"
                :createdAt="post.createdAt"
                :updatedAt="post.updatedAt"
                :metadata="post.metadata"
                @likedPost="handleLikedPost"
                @unlikedPost="handleUnlikedPost"
                :book="post.book"
                :authors="post.authors"
                :comments="post.comments"
                :likes="post.likes"
              />

              <food
                v-if="post.type === 'food'"
                :key="post._id"
                :url="post.url"
                :_id="post._id"
                :topic="post.topic"
                :description="post.description"
                :content="post.content"
                :tags="post.tags"
                :cover="post.cover"
                :author="post.user"
                :type="post.type"
                :createdAt="post.createdAt"
                :updatedAt="post.updatedAt"
                :metadata="post.metadata"
                @likedPost="handleLikedPost"
                @unlikedPost="handleUnlikedPost"
                :food="post.food"
                :comments="post.comments"
                :likes="post.likes"
              />

              <song
                style="width: 100%"
                class="song"
                v-if="post.type === 'song'"
                :key="post._id"
                :_id="post._id"
                :tags="post.tags"
                :comments="post.comments"
                :likes="post.likes"
                :authors="post.authors"
                :savedBy="post.savedBy"
                :author="post.user"
                :topic="post.topic"
                :content="post.content"
                :description="post.description"
                :type="post.type"
                :createdAt="post.createdAt"
                :updatedAt="post.updatedAt"
                :media="post.media"
                :metadata="post.metadata"
                @likedPost="handleLikedPost"
                @unlikedPost="handleUnlikedPost"
                :audio="post.media"
                :cover="post.cover"
              />

              <podcast
                style="width: 100%"
                class="podcast pt-3"
                v-if="post.type === 'podcast'"
                :key="post._id"
                :_id="post._id"
                :tags="post.tags"
                :comments="post.comments"
                :authors="post.authors"
                :likes="post.likes"
                :savedBy="post.savedBy"
                :author="post.user"
                :topic="post.topic"
                :content="post.content"
                :description="post.description"
                :type="post.type"
                :createdAt="post.createdAt"
                :updatedAt="post.updatedAt"
                :metadata="post.metadata"
                :audio="post.media"
                :cover="post.cover"
                :customize="{}"
                @likedPost="handleLikedPost"
                @unlikedPost="handleUnlikedPost"
                @handlePlayPause="handlePlayPause"
                @handleSwitchAudio="handleSwitchAudio"
              />
            </v-container>
          </div>

          <div
            v-if="!isLoading && metadata.totalPage >= 2"
            class="text-center mt-12"
          >
            <v-pagination
              v-scroll-to="'#tags-wrapper'"
              v-model="page"
              :length="metadata.totalPage"
              :total-visible="7"
            />
          </div>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="pt-3">
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
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Song from '@/components/Post/Audio/Song/Song';
import Podcast from '@/components/Post/Audio/Podcast/Podcast';
import Discussion from '@/components/Post/Discussion/Discussion';
import Blog from '@/components/Post/Blog/Blog';
import Movie from '@/components/Post/Review/Movie/Movie';
import Food from '@/components/Post/Review/Food/Food';
import Book from '@/components/Post/Review/Book/Book';
import SideCard from '@/components/Shared/SideCard';

export default {
  components: {
    SideCard,
    Song,
    Podcast,
    Discussion,
    Blog,
    Movie,
    Food,
    Book,
  },
  data() {
    return {
      page: 1,
      limit: 5,
      activePage: '',
      tagsSearch: '',
      topTagDatas: {
        title: 'Top Tags',
        dataType: 'tags',
        type: 2,
        data: [],
      },
    };
  },
  methods: {
    ...mapActions('stream', ['getStream']),
    ...mapActions('searchTag', ['searchPostsByTags', 'loadMorePosts']),
    ...mapActions('player', [
      'updatePlaying',
      'toggleShowPlayer',
      'switchAudio',
    ]),
    handleSetActivePage({ page }) {
      return (this.activePage = page);
    },
    calWidth(type) {
      if (type === 'podcast') return { width: '40% !important' };
      return { width: '100%' };
    },
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMorePosts({
        tagNames: this.tagNames,
        options: { limit: this.limit, page: this.metadata.page + 1 },
      });
    },
    searchTags() {
      const tagsToSearch = this.tagsSearch.replace(/\s/g, '').split(',');
      const tagNameQueries = tagsToSearch.reduce(
        (tagNameQueries, tagName) => [...tagNameQueries, `tag=${tagName}`],
        [],
      );
      this.$router.push(`/posts/tags?${tagNameQueries.join('&')}`);
    },
    async handleTagsParams() {
      // tagNames = { tag: 'tagName' } || [ 'tagName' ]
      const tagNameQuery = this.$route.query;
      let tagNames = [];
      if (tagNameQuery.tag instanceof Array === false) {
        tagNames = [tagNameQuery.tag];
      } else {
        tagNames = tagNameQuery.tag;
      }
      this.tagNames = tagNames;
      await this.searchPostsByTags({
        tagNames,
        options: { limit: this.limit, page: 1 },
      });
    },
    handleLikedPost({ postId, user }) {
      const post = this.posts.find(post => post._id === postId);
      post.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const post = this.posts.find(post => post._id === postId);
      post.likes = post.likes.filter(_user => _user._id !== user._id);
    },
    handlePlayPause({ isPlay, audio }) {
      if (isPlay) {
        this.updatePlaying({ status: true, audio });
        this.toggleShowPlayer(true);
      }

      if (!isPlay) {
        this.updatePlaying({ status: false, audio });
      }
    },
    handleSwitchAudio({ status, audio }) {
      if (status === true) {
        this.switchAudio({ status, audio });
      }
    },
  },
  computed: {
    ...mapState('utils', [
      'errorMes',
      'isLoading',
      'isLoadmore',
      'isLoadingAPI',
    ]),
    ...mapState('searchTag', ['postsMatchedTags', 'metadata']),
    ...mapState('stream', ['topTags']),
    posts() {
      const slicedPosts = this.postsMatchedTags.slice(
        (this.page - 1) * this.limit,
        (this.page - 1) * this.limit + this.limit,
      );
      return slicedPosts;
    },
  },
  async created() {
    await this.handleTagsParams();
    await this.getStream({ limitTopTags: 20 });
    this.topTagDatas.data = this.topTags;
  },
  watch: {
    async page(newVal, oldVal) {
      if (newVal < oldVal) return;
      if (newVal > oldVal) {
        if (this.metadata.page >= this.metadata.totalPage) {
          return;
        }
        await this.loadMorePosts({
          tagNames: this.tagNames,
          options: { limit: this.limit, page: newVal },
        });
      }
    },
    $route() {
      this.handleTagsParams();
    },
  },
  mounted() {
    window.scrollTo(0, 300);
  },
};
</script>

<style scroped lang="scss">
#tag {
  background-color: #ef9a9a;
  padding: 0 3px 0 3px;
  margin-left: 7px;
  border-radius: 4px;
}
#wrapper {
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}

.podcast {
  flex: 45%;
}
</style>
