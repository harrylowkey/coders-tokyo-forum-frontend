<template>
  <v-container>
    <v-row>
      <v-col class="d-flex pt-0" id="podcast-wrapper">
        <div id="songs-wrapper-loaders" style="max-width: 782px;">
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          />
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          />
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          />
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          />
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          />
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          />
        </div>
        <podcast
          class="podcast"
          v-for="item in podcasts"
          :key="item._id"
          :_id="item._id"
          :tags="item.tags"
          :comments="item.comments"
          :authors="item.authors"
          :likes="item.likes"
          :savedBy="item.savedBy"
          :author="item.user"
          :topic="item.topic"
          :content="item.content"
          :description="item.description"
          :type="item.type"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          :metadata="item.metadata"
          :audio="item.media"
          :cover="item.cover"
          :customize="{}"
          @handlePlayPause="handlePlayPause"
          @handleSwitchAudio="handleSwitchAudio"
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

import Podcast from './Podcast';

export default {
  components: {
    Podcast,
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
        title: 'Top Podcasts',
        dataType: 'posts',
        type: 2,
        data: [],
      },
    };
  },
  computed: {
    ...mapState('utils', ['errorMes', 'isLoading', 'isLoadmore']),
    ...mapState('podcasts', ['podcasts', 'metadata']),
    ...mapState('stream', ['topPodcasts', 'topTags']),
  },
  methods: {
    ...mapActions('podcasts', ['getPodcasts', 'loadMorePodcasts']),
    ...mapActions('player', [
      'updatePlaying',
      'toggleShowPlayer',
      'switchAudio',
    ]),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMorePodcasts({ page: this.metadata.page + 1 });
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
    handleLikedPost({ postId, user }) {
      const podcast = this.podcasts.find(podcast => podcast._id === postId);
      podcast.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const podcast = this.podcasts.find(podcast => podcast._id === postId);
      podcast.likes = podcast.likes.filter(_user => _user._id !== user._id);
    },
  },
  async created() {
    await this.getPodcasts();
    this.topTagDatas.data = this.topTags.slice(0, 5);
    this.topPostLikes.data = this.topPodcasts;
  },
};
</script>

<style>
#podcast-wrapper {
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}

.podcast {
  margin: 20px;
  flex: 45%;
}
</style>
