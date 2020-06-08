<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="11" class="pt-0 ml-8">
        <div v-if="!isLoadingGetPosts">
          <discussion
            v-for="item in savedDiscussions"
            :key="item._id"
            :_id="item._id"
            :tags="item.tags"
            :comments="item.comments"
            :likes="item.likes"
            :savedBy="item.savedBy"
            :author="item.user"
            :topic="item.topic"
            :content="item.content"
            :type="item.type"
            :createdAt="item.createdAt"
            :updatedAt="item.updatedAt"
            :metadata="item.metadata"
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

import Discussion from '@/components/Post/Discussion/Discussion';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    Discussion,
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
    ...mapState('userSavedDiscussions', ['savedDiscussions', 'metadata']),
  },
  methods: {
    ...mapActions('userSavedDiscussions', [
      'getDiscussions',
      'loadMoreDiscussions',
    ]),
    async loadMore() {
      if (!this.metadata.page) return;
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }
      await this.loadMoreDiscussions({
        userId: this.user._id,
        typeQuery: 'discussion',
        options: { limit: 10, page: this.metadata.page + 1 },
      });
    },
    handleLikedPost({ postId, user }) {
      const discussion = this.savedDiscussions.find(
        discussion => discussion._id === postId,
      );
      discussion.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const discussion = this.savedDiscussions.find(
        discussion => discussion._id === postId,
      );
      discussion.likes = discussion.likes.filter(
        _user => _user._id !== user._id,
      );
    },
  },
  async created() {
    await this.getDiscussions({
      userId: this.user._id,
      typeQuery: 'discussion',
      options: { limit: 10, page: 1 },
    });
  },
  watch: {
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          type: 'error',
          title: 'Error!',
          text: newVal,
        });
      }
    },
  },
};
</script>
