<template>
  <div id="audio">
    <audio
      style="display: none"
      @timeupdate="calProgressBar"
      ref="player"
      controls
      :src="audio.url"
      preload="metadata"
    ></audio>
    <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
      <v-card :elevation="hover ? 10 : 3" :class="{ 'on-hover': hover }" id="audio-card">
        <v-img
          :class="coverClasses"
          src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
          <v-card-title class="title white--text d-flex flex-column align-start pb-0">
            <router-link class="title-link" :to="podcastLink">
              <p style="color: #fff" class="mt-2 mb-0 font-italic subheading text-left">{{ topic }}</p>
            </router-link>
            <p class="mb-2">
              <span
                style="font-size: 13px; cursor: pointer"
                v-for="(singer, i) in singers"
                :key="i"
                @click="searchPodcastBySinger(singer.name)"
              >
                {{ singer.name }}
                <span style="font-size: 12px">{{ isAddFt(i, singers.length) }}</span>
              </span>
            </p>
          </v-card-title>

          <div class="align-self-center d-flex justify-center">
            <v-icon style="color: #fff" size="50"  @click="togglePlayPause">{{ togglePlayPauseIcon }}</v-icon>
          </div>

          <div class="audio-btns" :class="{ 'show-btns': hover }">
            <div class="player-controls scrubber">
              <span id="seekObjContainer">
                <progress
                  @click="onClickProgressbar($event)"
                  id="progressbar"
                  :value="progressBar.value"
                  :max="progressBar.max"
                ></progress>
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
              ></v-slider>
            </div>
          </div>
        </v-img>

        <v-list-item three-line style="padding: 0 25px 0 15px">
          <user-social-links
            :socialLinks="socialLinks"
            :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
            :username="'chau_chau'"
          ></user-social-links>
          <v-card-actions style="padding: 0px 25px 0 0px; " class="d-flex flex-column">
            <v-spacer></v-spacer>
            <tag
              style="margin-top: 6px"
              :tagName="tag.tagName"
              v-for="(tag, i) in slicedTags"
              :key="i"
              postType="audio"
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
          <v-container class="pt-4 pl-6 pr-0 d-flex justify-space-around">
            <like-btn :likes="4"></like-btn>
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
import { userSocialLinks } from "@/mixins/userSocialLinks";
export default {
  mixins: [userSocialLinks],
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
      coverClasses: ['cover'],
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
      user: {
        _id: "5e8b577f1a2dde32298795f4",
        hobbies: ["music, reading book"],
        username: "hongquang",
        password: "hell0aA@",
        email: "quang.dang@homa.company",
        socialLinks: [
          {
            _id: "5e8f536b0416274996f69e75",
            type: "Github",
            url: "https://github.com/hongquangraem"
          },
          {
            _id: "5e8f536b0416274996f69e76",
            type: "Facebook",
            url: "https://facebook.com/spaceraem"
          }
        ],
        createdAt: "2020-04-06T16:23:27.385Z",
        updatedAt: "2020-04-13T14:43:32.772Z",
        job: "Developer",
        sex: "Male",
        avatar: {
          secureURL:
            "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
        },
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vel eveniet eligendi sapiente earum nam omnis praesentium quidem. Iusto laboriosam ducimus quis tenetur earum alias sint perferendis commodi fugit sed? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vel eveniet eligendi sapiente earum nam omnis praesentium quidem. Iusto laboriosam ducimus quis tenetur earum alias sint perferendis commodi fugit sed?"
      },
      composers: []
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
      if (newValue === 1) this.volumeIcon = "mdi-volume-off";
      if (newValue !== 1) this.volumeIcon = "mdi-volume-high";
      return (this.$refs.player.volume = newValue / 100);
    }
  },
  computed: {
    slicedTags() {
      return this.tags.slice(0, this.maxTags);
    }
  },
  methods: {
    isAddFt(index, dataLength) {
      return index + 1 < dataLength ? "ft" : "";
    },
    searchPodcastBySinger(singer) {
      this.$router.push({
        path: `/posts?singer=${singer}&type=podcast`
      });
    },
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
      //TODO: Cannot pause anoter audio if playing when playing audio
      if (this.togglePlayPauseIcon === "mdi-play-circle-outline") {
        this.togglePlayPauseIcon = "mdi-pause-circle-outline";
        this.coverClasses.push('none-boder-cover-radius')
        return this.$refs.player.play();
      } else {
        this.coverClasses.pop()
        this.togglePlayPauseIcon = "mdi-play-circle-outline";
        return this.$refs.player.pause();
      }
    },
    toggleMutedVolume() {
      if (this.volumeIcon === "mdi-volume-high") {
        this.volumeIcon = "mdi-volume-off";
        this.currentVolume = 0;
        return (this.$refs.player.volume = this.minVolume);
      } else {
        this.volumeIcon = "mdi-volume-high";
        this.currentVolume = 50;
        return (this.$refs.player.volume = this.maxVolume / 2);
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
    onClickProgressbar(evt) {
      const percent = evt.offsetX / (this.$el.offsetWidth - 81);
      this.$refs.player.currentTime = percent * this.$refs.player.duration;
      this.progressBar.value = percent / 100;
    },
    linkToPodcast() {
      this.$router.push({ path: this.podcastLink });
    }
  },
  created() {
    this.podcastLink = `/podcasts/${this._id}`;
    let singers = this.authors.filter(person => person.type === 'singer')
    this.singers = singers.slice(0, 4)
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
</style>