<template>
  <div id="audio">
    <audio
      style="display:none"
      @timeupdate="calProgressBar"
      ref="player"
      controls
      :src="audio.url"
      preload="metadata"
    ></audio>
    <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
      <v-card :elevation="hover ? 10 : 3" :class="{ 'on-hover': hover }" id="audio-card">
        <v-img
        class="cover"
          src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
          <v-card-title class="title white--text d-flex flex-column align-start pb-0">
            <p class="mt-2 mb-0 font-italic subheading text-left">{{ topic }}</p>
            <p class="caption font-weight-medium font-italic text-left">{{ authors[0].name }}</p>
          </v-card-title>

          <div class="align-self-center d-flex justify-center" st>
            <v-icon style="color: #fff" @click="togglePlayPause" size="50">{{ togglePlayPauseIcon }}</v-icon>
          </div>

          <div class="audio-btns" :class="{ 'show-btns': hover }">
            <div class="player-controls scrubber">
              <span id="seekObjContainer" @click="seek">
                <progress id="progressbar" :value="progressBar.value" max="1"></progress>
              </span>
              <br />
              <small v-if="isPlaying" class="start-time">{{ currentTime }}</small>
              <small v-if="isPlaying" class="end-time">{{ totalLength }}</small>
            </div>

            <v-icon @click="toggleMutedVolume" class="volume-icon" color="#fff">{{ volumeIcon }}</v-icon>
          </div>
          <v-slider
            dark
            v-model="currentVolume"
            max="100"
            min="1"
            color="#fff"
            class="volume-bar"
            :style="show-volume-bar"
            vertical
          ></v-slider>
        </v-img>

        <v-list-item three-line style="padding: 0 25px 0 15px">
          <user-social-links
            :githubLink="'a'"
            :facebookLink="'b'"
            :linkedinLink="'c'"
            :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
            :username="'chau_chau'"
          ></user-social-links>
          <v-card-actions style="padding: 0px 25px 0 0px; " class="d-flex flex-column">
            <v-spacer></v-spacer>
            <tag
              style="margin-top: 6px"
              :tagName="tag.tagName"
              v-for="tag in slicedTags"
              :key="tag._id"
            ></tag>
          </v-card-actions>
        </v-list-item>

        <v-card-actions style="padding: 0px 25px 0 15px; height: 30px" class="pb-1">
          <v-card-text
            class="font-italic font-weight-light pt-0"
            style="font-size: 13px; height: 30px; margin-top: 16px !important"
          >
            <span class="mt-2">{{ createdAt | date }}</span>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-container class="pt-4 pl-6 pr-0 d-flex justify-center">
            <like-btn :likes="4" style="padding-right: 40px;"></like-btn>
            <comment-btn :comments="9"></comment-btn>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script scoped>
import Tag from "@/components/Shared/Tag";
import LikeBtn from "@/components/Shared/LikeButton";
import CommentBtn from "@/components/Shared/CommentButton";
import UserSocialLinks from "@/components/Shared/UserSocialLinks";

export default {
  props: {
    _id: {
      type: String,
      required: true
    },
    audio: {
      type: Object,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    },
    commments: {
      type: Array,
      default: () => []
    },
    authors: {
      type: Array,
      default: () => []
    },
    likes: {
      type: Array,
      default: () => []
    },
    savedBy: {
      type: Array,
      default: () => []
    },
    topic: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    media: {
      type: Object,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    updatedAt: {
      type: String,
      required: true
    },
    metadata: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      maxTags: 3,
      togglePlayPauseIcon: "mdi-play-circle-outline",
      volumeIcon: "mdi-volume-high",
      maxVolume: 1.0,
      minVolume: 0.0,
      currentVolume: 100,
      totalLength: 0,
      currentTime: 0,
      progressBar: {
        value: 0,
        max: 1
      },
      isPlaying: false
    };
  },
  components: {
    Tag,
    LikeBtn,
    CommentBtn,
    UserSocialLinks
  },
  watch: {
    currentVolume(newValue, oldValue) {
      this.$refs.player.volume = newValue / 100;
    }
  },
  computed: {
    slicedTags() {
      return this.tags.slice(0, this.maxTags);
    }
  },
  methods: {
    calProgressBar() {
      const player = this.$refs.player;
      const currentTime = player.currentTime;

      this.totalLength = this.calculateTotalValue(player.duration);

      // calculate current value time
      this.currentTime = this.calculateCurrentValue(currentTime);

      this.progressBar.value = player.currentTime / player.duration;

      if (player.currentTime == player.duration) {
        this.togglePlayPauseIcon = "mdi-play-circle-outline";
      }
    },
    togglePlayPause() {
      if (this.togglePlayPauseIcon === "mdi-play-circle-outline") {
        this.togglePlayPauseIcon = "mdi-pause-circle-outline";
        this.isPlaying = true;
        return this.$refs.player.play();
      } else {
        this.isPlaying = false;
        this.togglePlayPauseIcon = "mdi-play-circle-outline";
        return this.$refs.player.pause();
      }
    },
    toggleMutedVolume() {
      if (this.volumeIcon === "mdi-volume-high") {
        this.volumeIcon = "mdi-volume-off";
        return (this.$refs.player.volume = this.minVolume);
      } else {
        this.volumeIcon = "mdi-volume-high";
        return (this.$refs.player.volume = this.maxVolume);
      }
    },
    calculateTotalValue(length) {
      let minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ":" + seconds;

      return time;
    },
    calculateCurrentValue(currentTime) {
      let current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time =
          (current_minute < 10 ? "0" + current_minute : current_minute) +
          ":" +
          (current_seconds < 10 ? "0" + current_seconds : current_seconds);

      return current_time;
    },
    seek(evt) {
      const percent = evt.offsetX / this.$el.offsetWidth;
      this.$refs.player.currentTime = percent * this.$refs.player.duration;
      this.progressBar.value = percent / 100;
    }
  }
};
</script>

<style scoped lang="scss">
#audio {
  max-width: 285px;
}
#audio-card {
  height: 335px;
  border-radius: 35px;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.play-pause-icon {
  height: 35px;
}

.volume-bar {
  position: absolute;
  height: 50px;
  right: 25px;
  bottom: 22px;
  opacity: 0 !important;
}
.show-volume-bar {
  opacity: 1 !important;
}

.volume-icon {
  left: 248px;
  top: -21px;
  cursor: pointer;
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
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  margin-left: 30px;
  flex: 3;
  progress {
    width: 80%;
  }
  progress[value] {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    color: blue;
    height: 5px;
  }
  progress[value]::-webkit-progress-bar {
    background-color: white;
    border-radius: 2px;
    border: 1px solid lighten(#acacac, 20%);
    color: blue;
  }
  progress::-webkit-progress-value {
    background-color: blue;
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

.cover:not(.on-hover) {
  opacity: 0.8;
 }
.cover {
  transition: ease 0.5s;
}
 .cover:hover {
   opacity: 1;
 }
</style>