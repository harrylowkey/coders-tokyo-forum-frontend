<template>
  <div
    class="mx-auto wrapper"
    elevation="8"
    max-width="1520px"
    max-height="200px"
  >
    <v-slide-group class="px-4" show-arrows center-active>
      <v-slide-item v-for="(item, i) in trendingAudios" :key="i">
        <v-row class="mr-10">
          <v-col :key="i" cols="12" md="12">
            <Audio
              :cover="item.cover[0].secureURL"
              :name="item.topic"
              :authors="item.authors"
              :link="item.media[0].secureURL"
              :index="i"
              :_id="item._id"
              @handlePlayPause="handlePlayPause"
              @handleSwitchAudio="handleSwitchAudio"
            />
          </v-col>
        </v-row>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Audio from './Audio.vue';

export default {
  data() {
    return {};
  },
  components: {
    Audio,
  },
  methods: {
    ...mapActions('player', [
      'updatePlaying',
      'toggleShowPlayer',
      'switchAudio',
    ]),
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
    ...mapState('utils', ['isLoading']),
    ...mapState('stream', ['trendingAudios']),
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #fff;
}
</style>
