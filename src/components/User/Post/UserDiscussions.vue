<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="10" offset-sm="1" class="pt-0">
        <v-skeleton-loader
          class="mt-5 mb-5"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />

        <v-skeleton-loader
          class="mt-5 mb-5"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />

        <div v-if="!isLoading">
          <discussion
            v-for="item in discussions"
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
          v-if="!isLoadingAPI && !isLoadingAPI"
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
    ]),
  },
  methods: {
    ...mapActions('user', ['getUserPosts', 'loadmoreUserPosts']),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }
      await this.loadmoreUserPosts({
        userId: this.user._id,
        typeQuery: 'discussion',
        options: { limit: 2, page: this.metadata.page + 1 },
      }).then(res => {
        this.discussions.push(...res.data);
        this.metadata = res.metadata;
      });
    },
    handleLikedPost({ postId, user }) {
      const discussion = this.discussions.find(
        discussion => discussion._id === postId,
      );
      discussion.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const discussion = this.discussions.find(
        discussion => discussion._id === postId,
      );
      discussion.likes = discussion.likes.filter(
        _user => _user._id !== user._id,
      );
    },
    async fetchPost(dataQuery) {
      this.getUserPosts(dataQuery).then(res => {
        this.discussions = res.data;
        this.metadata = res.metadata;
      });
    },
  },
  async created() {
    await this.fetchPost({
      userId: this.user._id,
      typeQuery: 'discussion',
      options: { limit: 2, page: 1 },
    });
  },
  errorMes(newVal) {
    if (newVal.length) {
      this.$notify({
        type: 'error',
        title: 'Update failed',
        text: newVal,
      });
    }
  },
};
</script>
