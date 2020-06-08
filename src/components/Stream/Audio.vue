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
              {{ name }}
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
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    _id: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    name: {
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
  },
  data() {
    return {
      togglePlayPauseIcon: 'mdi-play-circle-outline',
    };
  },
  methods: {
    ...mapActions('player', ['getAudioState']),
    async togglePlayPause() {
      if (this.togglePlayPauseIcon === 'mdi-play-circle-outline') {
        this.togglePlayPauseIcon = 'mdi-pause-circle-outline';
      } else {
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
      }

      if (!this.currentAudioPlaying._id) {
        const isPlaying = await this.getAudioState(this._id);
        this.$emit('handlePlayPause', {
          isPlay: !isPlaying,
          audio: {
            name: this.name,
            _id: this._id,
            artist: this.artists.join(', '),
            url: this.link,
            cover: this.cover,
            isPlaying: !isPlaying,
          },
        });
        return;
      }

      const isSwitch = this._id !== this.currentAudioPlaying._id;
      if (this.currentAudioPlaying._id) {
        const isPlaying = await this.getAudioState(this._id);
        if (!isSwitch) {
          this.$emit('handlePlayPause', {
            isPlay: !isPlaying,
            audio: {
              name: this.name,
              _id: this._id,
              artist: this.artists.join(', '),
              url: this.link,
              cover: this.cover,
              isPlaying: !isPlaying,
            },
          });
          return;
        }

        if (isSwitch) {
          this.$emit('handleSwitchAudio', {
            status: true,
            audio: {
              name: this.name,
              _id: this._id,
              artist: this.artists.join(', '),
              url: this.link,
              cover: this.cover,
              isPlaying: !isPlaying,
            },
          });
        }
      }
    },
    isAddFt(index, dataLength) {
      return index + 1 < dataLength ? 'ft' : '';
    },
  },
  watch: {
    isPlaying(newVal) {
      if (newVal === true) {
        this.togglePlayPauseIcon = 'mdi-pause-circle-outline';
      }

      if (newVal === false) {
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
      }
    },
  },
  computed: {
    ...mapState('player', ['currentAudioPlaying']),
    isAudioPlaying() {
      return this.isPlaying ? 'opacity1' : 'opacityBlur';
    },
    artists() {
      let artists = this.authors.filter(person => person.type === 'artist');
      artists = artists.map(person => person.name);
      return artists;
    },
    slicedArtists() {
      return this.artists.slice(0, 2);
    },
    isPlaying() {
      const isAudioPlaying = this.currentAudioPlaying._id === this._id;
      if (isAudioPlaying) return this.currentAudioPlaying.isPlaying;
      return false;
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
