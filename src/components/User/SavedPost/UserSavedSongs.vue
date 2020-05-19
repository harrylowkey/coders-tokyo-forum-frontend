<template>
  <v-container>
    <v-row>
      <v-col class="pt-1">
        <div v-if="!isLoadingGetPosts">
          <song
            class="song mb-12"
            v-for="item in songs"
            :key="item._id"
            :_id="item._id"
            :tags="item.tags"
            :comments="item.comments"
            :likes="item.likes"
            :authors="item.authors"
            :savedBy="item.savedBy"
            :author="item.user"
            :topic="item.topic"
            :content="item.content"
            :description="item.description"
            :type="item.type"
            :createdAt="item.createdAt"
            :updatedAt="item.updatedAt"
            :media="item.media"
            :metadata="item.metadata"
            :audio="item.media"
            :cover="item.cover"
            @likedPost="handleLikedPost"
            @unlikedPost="handleUnlikedPost"
          />
        </div>
        <div
          v-if="!isLoading && !isLoadingAPI"
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

import Audio from '@/components/Post/Audio/Song/Song';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    song: Audio,
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
    ...mapState('userSavedSongs', ['songs', 'metadata']),
  },
  methods: {
    ...mapActions('userSavedSongs', ['getSongs', 'loadMoreSongs']),
    async loadMore() {
      if (!this.metadata.page) return;
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }
      await this.loadMoreSongs({
        userId: this.user._id,
        typeQuery: 'song',
        options: { limit: 6, page: this.metadata.page + 1 },
      });
    },
    handleLikedPost({ postId, user }) {
      const song = this.songs.find(song => song._id === postId);
      song.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const song = this.songs.find(song => song._id === postId);
      song.likes = song.likes.filter(_user => _user._id !== user._id);
    },
  },
  async created() {
    await this.getSongs({
      userId: this.user._id,
      typeQuery: 'song',
      options: { limit: 6, page: 1 },
    });
  },
};
</script>

<style>
#songs-wrapper {
  flex-wrap: wrap;
  justify-content: center;
}

#songs-wrapper-loaders {
  flex-wrap: wrap;
  justify-content: center;
}

.song {
  margin: 20px;
  flex: 45%;
}
</style>
