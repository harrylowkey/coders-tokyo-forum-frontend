<template>
  <v-container v-if="!isLoadingGetPosts">
    <v-row>
      <v-col cols="12" id="podcast-wrapper" class="d-flex pt-0">
        <podcast
          v-for="item in podcasts"
          :key="item._id"
          class="mb-12 podcast"
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
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Audio from '@/components/Post/Audio/Podcast/Podcast';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    podcast: Audio,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('utils', [
      'isLoading',
      'isLoadingAPI',
      'isLoadmore',
      'isLoadingGetPosts',
    ]),
    ...mapState('userPodcasts', ['podcasts', 'metadata']),
  },
  methods: {
    ...mapActions('userPodcasts', ['getPodcasts', 'loadMorePodcasts']),
    ...mapActions('player', [
      'updatePlaying',
      'toggleShowPlayer',
      'switchAudio',
    ]),
    async loadMore() {
      if (!this.metadata.page) return;
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }
      await this.loadMorePodcasts({
        userId: this.user._id,
        typeQuery: 'podcast',
        options: { limit: 6, page: this.metadata.page + 1 },
      });
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
    await this.getPodcasts({
      userId: this.user._id,
      typeQuery: 'podcast',
      options: { limit: 6, page: 1 },
    });
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
  flex: 35%;
}
</style>
