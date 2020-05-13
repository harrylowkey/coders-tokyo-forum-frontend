<template>
  <v-container class="d-flex align-center justify-center flex-column">
    <v-card
      style="cursor: pointer"
      @click="togglePlayPause"
      :class="isAudioPlaying"
    >
      <v-img :src="cover" height="160px" width="160px" class="audio-cover">
        <v-card-title class="title white--text px-4 pt-3">
          <v-row class="fill-height flex-column" justify="space-between">
            <span
              style="font-size: 16px !important; overflow: hidden; height: 30px"
              class="mt-2 ml-1 mb-0 text-left"
            >
              {{ title }}
            </span>
            <div class="mx-1 mt-n2 text-center">
              <span
                v-for="(artist, i) in slicedArtists"
                :key="i"
                class="caption font-weight-medium font-italic"
              >
                {{ artist }}
                <span style="font-size: 12px" class="mx-1 font-italic">
                  {{ isAddFt(i, slicedArtists.length) }}
                </span>
              </span>
            </div>
          </v-row>
        </v-card-title>
        <v-icon class="play-icon" size="20">{{ togglePlayPauseIcon }}</v-icon>
      </v-img>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: Array,
      default: () => [],
    },
    link: {
      type: String,
      required: true,
    },
    playAnotherSong: {
      type: Object,
      default: false,
    },
  },
  data() {
    return {
      isPlaying: false,
      togglePlayPauseIcon: 'mdi-play-circle-outline',
    };
  },
  methods: {
    togglePlayPause() {
      if (this.togglePlayPauseIcon === 'mdi-play-circle-outline') {
        this.togglePlayPauseIcon = 'mdi-pause-circle-outline';
      } else {
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
      }
      this.isPlaying = !this.isPlaying;
      this.$emit('handlePlayPause', {
        isPlay: this.isPlaying,
        index: this.index,
      });
    },
    isAddFt(index, dataLength) {
      return index + 1 < dataLength ? 'ft' : '';
    },
  },
  watch: {
    playAnotherSong(newVal) {
      // when play another song, the others pause
      if (newVal.isPlay === true && newVal.index !== this.index) {
        this.isPlaying = false;
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
      }

      // when play song from dashboard, trigger play song in list
      if (newVal.isPlay === true && newVal.index === this.index) {
        this.isPlaying = true;
        this.togglePlayPauseIcon = 'mdi-pause-circle-outline';
      }

      // when pause song from dashboard, trigger stop song in list
      if (newVal.isPlay === false && newVal.index === this.index) {
        this.isPlaying = false;
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
      }
    },
  },
  computed: {
    isAudioPlaying() {
      return this.isPlaying ? 'opacity1' : 'opacityBlur';
    },
    slicedArtists() {
      const authors = this.authors.map(person => person.name);
      return authors.slice(0, 2);
    },
  },
};
</script>

<style scoped lang="scss">
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.opacityBlur {
  opacity: 0.775;
}

.v-card:hover {
  opacity: 1;
}

.opacity1 {
  opacity: 1;
}

.audio-cover {
  position: relative;

  .play-icon {
    position: absolute;
    color: #fff;
    transition: ease 0.3s;
    bottom: 2%;
    right: 2%;
  }
}
</style>
