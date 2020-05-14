<template>
  <div
    class="mx-auto wrapper"
    elevation="8"
    max-width="1520px"
    max-height="200px"
  >
    <v-slide-group class="px-4" show-arrows center-active>
      <v-slide-item v-for="(item, i) in audioList" :key="i">
        <v-row class="mr-10">
          <v-col :key="i" cols="12" md="12">
            <Audio
              :cover="item.cover.secureURL"
              :title="item.media.fileName"
              :authors="item.authors"
              :link="item.media.secureURL"
              :index="i"
              :playAnotherSong="playAnotherSong"
              @handlePlayPause="handlePlayPause"
            ></Audio>
          </v-col>
        </v-row>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Audio from './Audio.vue';

export default {
  props: ['audioList', 'playAnotherSong'],

  data() {
    return {};
  },
  components: {
    Audio
  },
  methods: {
    handlePlayPause({ isPlay, index }) {
      this.$emit('handlePlayPause', { isPlay, index });
    }
  },
  computed: {
    ...mapState('utils', ['isLoading'])
  }
};
</script>

<style scoped>
.wrapper {
  background-color: #fff;
}
</style>
