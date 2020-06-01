<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" class="pt-0">
        <div v-if="!isLoadingGetPosts">
          <blog
            class="mb-10"
            v-for="item in blogs"
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

import Blog from '@/components/Post/Blog/Blog';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    Blog,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('utils', [
      'errorMes',
      'isLoading',
      'isLoadingAPI',
      'isLoadmore',
      'isLoadingGetPosts',
    ]),
    ...mapState('userSavedBlogs', ['blogs', 'metadata']),
  },
  methods: {
    ...mapActions('userSavedBlogs', ['getBlogs', 'loadMoreBlogs']),
    async loadMore() {
      if (!this.metadata.page) return;
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }
      await this.loadMoreBlogs({
        userId: this.user._id,
        typeQuery: 'blog',
        options: { limit: 5, page: this.metadata.page + 1 },
      });
    },
    handleLikedPost({ postId, user }) {
      const blog = this.blogs.find(blog => blog._id === postId);
      blog.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const blog = this.blogs.find(blog => blog._id === postId);
      blog.likes = blog.likes.filter(_user => _user._id !== user._id);
    },
  },
  async created() {
    await this.getBlogs({
      userId: this.user._id,
      typeQuery: 'blog',
      options: { limit: 5, page: 1 },
    });
  },
  errorMes(newVal) {
    if (newVal.length) {
      this.$notify({
        type: 'error',
        title: 'Error!',
        text: newVal,
      });
    }
  },
};
</script>
