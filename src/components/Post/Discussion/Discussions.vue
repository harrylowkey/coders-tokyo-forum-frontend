<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
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
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isLoadmore"
          infinite-scroll-distance="10"
        />
        <v-text-field color="primary" v-if="isLoadmore" loading disabled />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" xl="4" style="padding-top: 12px">
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

import Discussion from './Discussion';

export default {
  components: {
    Discussion,
    SideCard,
  },
  data() {
    return {
      topTagDatas: {
        title: 'Top Tags',
        dataType: 'tags',
        type: 2,
        data: [],
      },
      topPostLikes: {
        title: 'Top Discussions',
        dataType: 'posts',
        type: 2,
        data: [],
      },
    };
  },
  computed: {
    ...mapState('utils', ['errorMes', 'isLoading', 'isLoadmore']),
    ...mapState('discussions', ['discussions', 'metadata']),
    ...mapState('stream', ['topDiscussions', 'topTags']),
  },
  methods: {
    ...mapActions('discussions', ['getDiscussions', 'loadMoreDiscussions']),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMoreDiscussions({
        limit: 10,
        page: this.metadata.page + 1,
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
  },
  async created() {
    await this.getDiscussions();
    this.topTagDatas.data = this.topTags.slice(0, 5);
    this.topPostLikes.data = this.topDiscussions;
  },
};
</script>
