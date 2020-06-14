<template>
  <v-container>
    <v-row>
      <v-col class="pt-1">
        <div id="songs-wrapper-loaders" style="max-width: 782px;">
          <div class="d-flex" v-if="isLoading">
            <v-skeleton-loader
              class="song mb-6 mr-0"
              style="margin-top: 30px; display: inline-block; width: 300px"
              max-width="150"
              max-height="140"
              v-if="isLoading"
              type="image"
            />

            <div style="width: 100%">
              <v-skeleton-loader
                class="song mb-0 ml-0 mb-0"
                style="margin-top: 30px;"
                v-if="isLoading"
                type="list-item-two-line"
              />
              <v-skeleton-loader
                class="song mb-6 ml-0 mt-0"
                v-if="isLoading"
                type="actions"
              />
            </div>
          </div>
          <div class="d-flex" v-if="isLoading">
            <v-skeleton-loader
              class="song mb-6 mr-0"
              style="margin-top: 30px; display: inline-block; width: 300px"
              max-width="150"
              max-height="140"
              v-if="isLoading"
              type="image"
            />

            <div style="width: 100%">
              <v-skeleton-loader
                class="song mb-0 ml-0 mb-0"
                style="margin-top: 30px;"
                v-if="isLoading"
                type="list-item-two-line"
              />
              <v-skeleton-loader
                class="song mb-6 ml-0 mt-0"
                v-if="isLoading"
                type="actions"
              />
            </div>
          </div>
          <div class="d-flex" v-if="isLoading">
            <v-skeleton-loader
              class="song mb-6 mr-0"
              style="margin-top: 30px; display: inline-block; width: 300px"
              max-width="150"
              max-height="140"
              v-if="isLoading"
              type="image"
            />

            <div style="width: 100%">
              <v-skeleton-loader
                class="song mb-0 ml-0 mb-0"
                style="margin-top: 30px;"
                v-if="isLoading"
                type="list-item-two-line"
              />
              <v-skeleton-loader
                class="song mb-6 ml-0 mt-0"
                v-if="isLoading"
                type="actions"
              />
            </div>
          </div>
          <div class="d-flex" v-if="isLoading">
            <v-skeleton-loader
              class="song mb-6 mr-0"
              style="margin-top: 30px; display: inline-block; width: 300px"
              max-width="150"
              max-height="140"
              v-if="isLoading"
              type="image"
            />

            <div style="width: 100%">
              <v-skeleton-loader
                class="song mb-0 ml-0 mb-0"
                style="margin-top: 30px;"
                v-if="isLoading"
                type="list-item-two-line"
              />
              <v-skeleton-loader
                class="song mb-6 ml-0 mt-0"
                v-if="isLoading"
                type="actions"
              />
            </div>
          </div>
          <div class="d-flex" v-if="isLoading">
            <v-skeleton-loader
              class="song mb-6 mr-0"
              style="margin-top: 30px; display: inline-block; width: 300px"
              max-width="150"
              max-height="140"
              v-if="isLoading"
              type="image"
            />

            <div style="width: 100%">
              <v-skeleton-loader
                class="song mb-0 ml-0 mb-0"
                style="margin-top: 30px;"
                v-if="isLoading"
                type="list-item-two-line"
              />
              <v-skeleton-loader
                class="song mb-6 ml-0 mt-0"
                v-if="isLoading"
                type="actions"
              />
            </div>
          </div>
        </div>
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
          :isShowTitle="true"
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

import Audio from './Song';

export default {
  components: {
    song: Audio,
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
        title: 'Top Songs',
        dataType: 'posts',
        type: 2,
        data: [],
      },
    };
  },
  computed: {
    ...mapState('utils', ['isLoading', 'isLoadmore']),
    ...mapState('songs', ['songs', 'metadata']),
    ...mapState('stream', ['topSongs', 'topTags']),
  },
  methods: {
    ...mapActions('songs', ['getSongs', 'loadMoreSongs']),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMoreSongs({ page: this.metadata.page + 1 });
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
    await this.getSongs();
    this.topTagDatas.data = this.topTags.slice(0, 5);
    this.topPostLikes.data = this.topSongs;
  },
};
</script>

<style scoped>
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
