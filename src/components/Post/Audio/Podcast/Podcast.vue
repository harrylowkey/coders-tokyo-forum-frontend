<template>
  <div id="audio">
    <audio
      style="display: none"
      @timeupdate="calProgressBar"
      ref="player"
      controls
      :src="audio.secureURL"
      preload="metadata"
    />
    <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
      <v-card
        :elevation="hover ? 10 : 3"
        :class="{ 'on-hover': hover }"
        id="audio-card"
      >
        <v-img
          :class="coverClasses"
          :src="cover.secureURL"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
          <v-card-title
            class="title white--text d-flex flex-column align-start pb-0"
          >
            <a
              style="text-decoration: none"
              :href="podcastLink"
              target="_blank"
            >
              <p
                style="color: #fff"
                class="mt-2 mb-0 font-italic subheading text-left"
              >
                {{ topic }}
              </p>
            </a>
            <p class="mb-2">
              <span
                style="font-size: 13px; cursor: pointer"
                v-for="(artist, i) in slicedArtists"
                :key="i"
              >
                {{ artist }}
                <span style="font-size: 12px">
                  {{ isAddFt(i, slicedArtists.length) }}
                </span>
              </span>
            </p>
          </v-card-title>

          <div class="align-self-center d-flex justify-center">
            <v-icon style="color: #fff" size="50" @click="togglePlayPause">
              {{ togglePlayPauseIcon }}
            </v-icon>
          </div>

          <!-- <div class="audio-btns" :class="{ 'show-btns': hover }">
            <div class="player-controls scrubber">
              <span id="seekObjContainer">
                <progress
                  @click="onClickProgressbar($event)"
                  id="progressbar"
                  :value="progressBar.value"
                  :max="progressBar.max"
                />
              </span>
              <br />
              <small v-if="currentTime !== 0" class="start-time">{{ currentTime }}</small>
              <small v-if="currentTime !== 0" class="end-time">{{ totalLength }}</small>
            </div>

            <div class="wrapper-volume">
              <v-icon @click="toggleMutedVolume" class="volume-icon" color="#fff">{{ volumeIcon }}</v-icon>
              <v-slider
                dark
                class="volume-bar"
                v-model="currentVolume"
                max="100"
                min="1"
                color="#fff"
                vertical
              />
            </div>
          </div>-->
        </v-img>

        <v-list-item three-line style="padding: 0 25px 0 15px">
          <div class="d-flex flex-column justify-center">
            <v-container class="d-flex justify-center pr-0 pl-0">
              <div class="user text-center d-flex">
                <v-list-item-avatar tile size="60" style="margin: 16px 0 0 0">
                  <v-img
                    :src="author.avatar.secureURL"
                    style="cursor: pointer; border-radius: 50%"
                    @click="onClickAvatar"
                  />
                </v-list-item-avatar>
                <v-container class="pb-0 pr-0">
                  <v-list-item-icon class="mb-0" style="width: 100%">
                    <div v-if="socialLinks.length" class="d-flex">
                      <v-icon
                        v-for="link in socialLinks"
                        :key="link.icon"
                        :color="link.color"
                        size="20"
                        class="pr-1"
                        style="cursor: pointer"
                        @click="handleClickLink(link.url)"
                      >
                        {{ link.icon }}
                      </v-icon>
                    </div>
                    <div v-else style="height: 17px" />
                  </v-list-item-icon>
                  <v-list-item-content class="pt-0 pb-0">
                    <v-list-item-title
                      class="caption text-start"
                      style="padding-top: 0px"
                    >
                      <a
                        class="username-link ml-1"
                        target="_blank"
                        :href="`/users/profile/${author.username}`"
                      >
                        {{ author.username }}
                      </a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-container>
              </div>
            </v-container>
          </div>
          <v-card-actions
            style="padding: 0px 25px 0 0px; "
            class="d-flex flex-column"
          >
            <v-spacer />
            <tag
              style="margin-top: 6px"
              :tagName="tag.tagName"
              v-for="(tag, i) in slicedTags"
              :key="i"
              postType="audio"
            />
          </v-card-actions>
        </v-list-item>

        <v-card-actions
          style="padding: 0px 25px 0 15px; height: 30px"
          class="pb-1"
        >
          <v-card-text
            class="font-italic font-weight-light pt-0"
            style="font-size: 13px; height: 30px; margin-top: 16px !important"
          >
            <span class="mt-2">{{ createdAt | date }}</span>
          </v-card-text>
          <v-spacer />
          <v-container class="pt-4 pl-6 pr-0 d-flex justify-space-around">
            <like-btn
              @handleLikePost="onClickLikePost"
              @handleUnlikePost="onClickUnlikePost"
              :isUserLiked="isUserLiked"
              :likes="likes.length"
              :postId="_id"
            />
          </v-container>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script scoped>
import { mapActions, mapState } from 'vuex';

import Tag from '@/components/Shared/Tag';
import LikeBtn from '@/components/Shared/LikeButton';
import { userSocialLinks } from '@/mixins/userSocialLinks';
import { ROUTES } from '@/mixins/routes';
import { toggleLike } from '@/mixins/toggleLike';

export default {
  mixins: [userSocialLinks, toggleLike],
  props: {
    _id: {
      type: String,
      required: true,
    },
    audio: {
      type: Object,
      required: true,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    comments: {
      type: Array,
      default: () => [],
    },
    authors: {
      type: Array,
      default: () => [],
    },
    likes: {
      type: Array,
      default: () => [],
    },
    savedBy: {
      type: Array,
      default: () => [],
    },
    topic: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      default: () => ({}),
    },
    author: {
      type: Object,
      required: true,
    },
    cover: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'song',
    },
  },
  data() {
    return {
      coverClasses: ['cover'],
      maxTags: 3,
      togglePlayPauseIcon: 'mdi-play-circle-outline',
      volumeIcon: 'mdi-volume-high',
      maxVolume: 1.0,
      minVolume: 0.0,
      currentVolume: 100,
      totalLength: 0,
      currentTime: 0,
      progressBar: {
        value: 0,
        max: 1,
      },
      composers: [],
      podcastLink: ROUTES.PODCAST(this._id),
    };
  },
  components: {
    Tag,
    LikeBtn,
  },
  created() {
    this.ROUTES = ROUTES;
  },
  watch: {
    currentVolume(newValue) {
      if (newValue === 1) this.volumeIcon = 'mdi-volume-off';
      if (newValue !== 1) this.volumeIcon = 'mdi-volume-high';
      return (this.$refs.player.volume = newValue / 100);
    },
    isPlaying(newVal) {
      if (newVal === true) {
        this.togglePlayPauseIcon = 'mdi-pause-circle-outline';
        this.coverClasses.push('none-boder-cover-radius ');
      }

      if (newVal === false) {
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
        this.coverClasses = ['cover'];
      }
    },
  },
  computed: {
    slicedTags() {
      return this.tags.slice(0, this.maxTags);
    },
    ...mapState('player', ['currentAudioPlaying']),
    isPlaying() {
      const isAudioPlaying = this.currentAudioPlaying._id === this._id;
      if (isAudioPlaying) return this.currentAudioPlaying.isPlaying;
      return false;
    },
    artists() {
      let artists = this.authors.filter(person => person.type === 'artist');
      artists = artists.map(person => person.name);
      return artists;
    },
    slicedArtists() {
      return this.artists.slice(0, 4);
    },
  },
  methods: {
    ...mapActions('player', ['getAudioState']),
    isAddFt(index, dataLength) {
      return index + 1 < dataLength ? 'ft' : '';
    },
    searchPodcastByArtist(artist) {
      return window.open(
        ROUTES.SEARCH_ARTIST({ name: artist, type: 'podcast' }),
      );
    },
    calProgressBar() {
      const player = this.$refs.player;
      const currentTime = player.currentTime;

      this.totalLength = this.calculateTotalValue(player.duration);

      // calculate current value time
      this.currentTime = this.calculateCurrentValue(currentTime);

      this.progressBar.value = player.currentTime / player.duration;

      if (player.currentTime === player.duration) {
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
      }
    },
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
            name: this.topic,
            _id: this._id,
            artist: this.artists.join(', '),
            url: this.audio.secureURL,
            cover: this.cover.secureURL,
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
              name: this.topic,
              _id: this._id,
              artist: this.artists.join(', '),
              url: this.audio.secureURL,
              cover: this.cover.secureURL,
              isPlaying: !isPlaying,
            },
          });
          return;
        }

        if (isSwitch) {
          this.$emit('handleSwitchAudio', {
            status: true,
            audio: {
              name: this.topic,
              _id: this._id,
              artist: this.artists.join(', '),
              url: this.audio.secureURL,
              cover: this.cover.secureURL,
              isPlaying: !isPlaying,
            },
          });
        }
      }
    },
    toggleMutedVolume() {
      if (this.volumeIcon === 'mdi-volume-high') {
        this.volumeIcon = 'mdi-volume-off';
        this.currentVolume = 0;
        return (this.$refs.player.volume = this.minVolume);
      } else {
        this.volumeIcon = 'mdi-volume-high';
        this.currentVolume = 50;
        return (this.$refs.player.volume = this.maxVolume / 2);
      }
    },
    calculateTotalValue(length) {
      const minutes = Math.floor(length / 60);
      const seconds_int = length - minutes * 60;
      const seconds_str = seconds_int.toString();
      const seconds = seconds_str.substr(0, 2);
      const time = `${minutes}:${seconds}`;

      return time;
    },
    calculateCurrentValue(currentTime) {
      const current_minute = parseInt(currentTime / 60) % 60;
      const current_seconds_long = currentTime % 60;
      const current_seconds = current_seconds_long.toFixed();
      const current_time = `${
        current_minute < 10 ? `0${current_minute}` : current_minute
      }:${current_seconds < 10 ? `0${current_seconds}` : current_seconds}`;

      return current_time;
    },
    onClickProgressbar(evt) {
      const percent = evt.offsetX / (this.$el.offsetWidth - 81);
      this.$refs.player.currentTime = percent * this.$refs.player.duration;
      this.progressBar.value = percent / 100;
    },
    linkToPodcast() {
      window.open(this.podcastLink, '_blank');
    },
    onClickAvatar() {
      window.open(
        ROUTES.USER_PROFILE({ username: this.author.username }),
        '_blank',
      );
    },
  },
};
</script>

<style scoped lang="scss">
#audio {
  max-width: 285px;
  height: 350px;
}
#audio-card {
  height: 100%;
  border-radius: 35px;
}

#audio-card:hover .cover {
  opacity: 1;
  border-bottom-left-radius: 0%;
  border-bottom-right-radius: 0%;
}

.none-boder-cover-radius {
  border-bottom-left-radius: 0% !important;
  border-bottom-right-radius: 0% !important;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.play-pause-icon {
  height: 35px;
}

.volume-icon {
  left: 4px;
  top: 153px;
  cursor: pointer;
}

.volume-icon:hover ~ .volume-bar {
  opacity: 1 !important;
}

.v-slider__thumb {
  background-color: red !important;
}

.volume-bar {
  position: absolute;
  color: red;
  width: 20px;
  height: 163px;
  right: 5px;
  top: 0px;
  opacity: 0 !important;
  transition: ease 0.5s;
}

.wrapper-volume {
  position: relative;
  height: 173px;
  bottom: 175px;
  width: 30px;
  left: 240px;
  color: red;
}

.wrapper-volume:hover .volume-bar {
  opacity: 1;
}

.volume-bar:hover {
  opacity: 1 !important;
}

#progressbar {
  cursor: pointer;
}

.start-time {
  float: left;
  position: absolute;
  top: 156px;
  color: #fff;
  font-size: 70% !important;
}

.end-time {
  float: right;
  position: absolute;
  top: 156px;
  right: 64px;
  color: #fff;
  font-size: 70% !important;
}

.player-controls {
  margin-top: 25px;
  margin-left: 30px;
  progress {
    width: 80%;
  }
  progress[value] {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    color: #4a148c;
    height: 5px;
  }
  progress[value]::-webkit-progress-bar {
    background-color: white;
    border-radius: 2px;
    border: 1px solid lighten(#acacac, 20%);
    color: #4a148c;
  }
  progress::-webkit-progress-value {
    background-color: #4a148c;
  }
  p {
    font-size: 1.6rem;
  }
}

.audio-btns {
  opacity: 0;
  transition: opacity 0.5s;
}

.show-btns {
  opacity: 1;
}

.cover {
  transition: ease 0.5s;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  transition: border-radius 0.4s ease-in-out;
}

.username-link {
  text-decoration: none;
  color: #000 !important;
}

.author {
  width: 150px;
}
</style>
