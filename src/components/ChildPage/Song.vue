<template>
  <div class="mt-12">
    <v-row id="post">
      <v-col
        cols="12"
        sm="12"
        md="1"
        lg="1"
        xl="1"
        class="pr-0 wrapper-icon d-sm-none d-md-flex"
      >
        <post-reactions
          v-if="!isLoading"
          @hanldeClickCommentBtn="hanldeClickCommentBtn"
          @likedPost="handleLikedPost"
          @unlikedPost="handleUnlikedPost"
          @savedPost="handleSavedPost"
          @unsavedPost="handleUnsavedPost"
          :postId="post._id"
          :likes="post.likes"
          :saves="post.savedBy"
          :flowers="0"
          :isUserLiked="isUserLiked"
          :isUserSaved="isUserSaved"
          :postUrl="audioLink"
        />
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <a
          id="trigger-scroll-comments"
          style="display: none"
          href="#"
          v-scroll-to="'#comments'"
        >
          Scroll to #comment
        </a>
        <v-skeleton-loader />
        <v-boilerplate class="mx-auto mt-6" v-if="isLoading" type="image" />
        <v-boilerplate
          max-width="200"
          class="mx-auto mt-6"
          v-if="isLoading"
          style="margin: 20px !important; display: inline-block; width: 200px"
          type="list-item-avatar-two-line"
        />
        <v-boilerplate
          v-if="isLoading"
          style="display: inline-block; width: 600px"
          height="500"
          max-wdith="200"
          class="mx-auto mt-6"
          type="article"
        />
        <v-card v-else id="song" class="mx-auto pa-0 pa-8">
          <v-container class="d-flex">
            <v-img
              class="cover"
              :src="post.cover.secureURL"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              min-height="210px"
              max-height="210px"
              min-width="210px"
              max-width="210px"
              style="cursor: pointer"
              @click="togglePlayPause"
            >
              <div :class="wrapperPlayPauseIconClasses">
                <v-icon :class="playPauseIconClasses" size="50">
                  {{ togglePlayPauseIcon }}
                </v-icon>
              </div>
            </v-img>

            <v-card-text class="song-description pl-0 pt-0">
              <v-card-title class="ml-5 headline pt-0">
                {{ post.topic }}
              </v-card-title>
              <v-card-subtitle class="pt-1 ml-8 pl-1 pb-0">
                <span
                  style="font-size: 13px"
                  v-for="(author, i) in post.authors"
                  :key="author._id"
                >
                  <span style="text-decoration: none; color: #000">
                    {{ author.name }}
                  </span>
                  <span style="font-size: 12px" class="mx-1 font-italic">
                    {{ isAddFt(i, post.authors.length) }}
                  </span>
                </span>
              </v-card-subtitle>

              <div class="ml-9">
                <av-waveform
                  style="cursor: pointer"
                  :cors-anonym="Boolean(true)"
                  class="mt-4"
                  ref="player"
                  :audio-src="post.media.secureURL"
                  :canv-width="550"
                  :canv-height="80"
                  :played-line-width="1.1"
                  played-line-color="rgb(183, 218, 255)"
                  :noplayed-line-width="0.5"
                  :noplayed-line-color="'grey'"
                  :playtime="false"
                  :playtime-with-ms="false"
                  playtime-font-color="#5e5b5b'"
                  :playtime-slider-width="2.5"
                  playtime-slider-color="rgb(183, 218, 255)"
                  :playtime-font-family="'Roboto' || 'sans-serif'"
                />
                <div class="d-flex pr-5 justify-end">
                  <span
                    style="font-size: 13px; color: grey"
                    class="font-italic mb-0"
                  >
                    {{ totalLength }}
                  </span>
                </div>
              </div>
              <div class="wrapper-volume pr-3 pt-0">
                <v-card-actions class="d-flex ml-5 pt-0">
                  <tag
                    :tagName="tag.tagName"
                    v-for="tag in post.tags"
                    :key="tag._id"
                  />
                </v-card-actions>
                <v-spacer />
                <div class="volume">
                  <v-icon @click="toggleMutedVolume" class="volume-icon">
                    {{ volumeIcon }}
                  </v-icon>
                  <v-slider
                    color="rgb(183, 218, 255)"
                    class="volume-bar"
                    v-model="currentVolume"
                    max="100"
                    min="1"
                    track-color="grey"
                    style="cursor: pointer"
                  />
                </div>
              </div>
            </v-card-text>
          </v-container>
          <v-divider />

          <div class="d-flex" />
          <v-container v-if="!isLoading">
            <v-row>
              <v-col
                class="pr-0 user-profile"
                cols="3"
                sm="4"
                md="4"
                lg="3"
                xl="3"
              >
                <user-social-links
                  :socialLinks="socialLinks"
                  :author="post.user"
                  :isAuthor="isAuthor"
                  @handleFollow="handleFollow"
                  @handleUnFollow="handleUnFollow"
                  :isFollowing="isFollowing"
                />
              </v-col>
              <v-col class="lyric" cols="9" sm="8" md="8" lg="9" xl="9">
                <div>
                  <div :class="lyricClasses" ref="lyricWrapper">
                    <p
                      class="markdown-content"
                      v-html="$options.filters.markdown(post.description)"
                    />
                  </div>
                  <span
                    v-if="!isShowMore && post.description.length > 100"
                    @click="toggleShowLyrics"
                    style="font-size: 13px; color: grey; cursor: pointer"
                    class="font-italic mb-0 show-more"
                    ref="showMore"
                  >
                    Show more
                  </span>
                  <span
                    v-if="isShowMore"
                    @click="toggleShowLyrics"
                    style="font-size: 13px; color: grey; cursor: pointer"
                    class="font-italic mb-0 show-more"
                  >
                    Show less
                  </span>
                  <div class="ml-9 mt-5 d-flex justify-end">
                    <edit-delete-btns
                      v-if="isAuthor"
                      @handleDeletePost="handleDeletePost"
                      :postId="post._id"
                      :postType="post.type"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <div class="mt-5" id="comments">
          <v-divider />
          <h1 class="mb-3 mt-8">{{ $t('Comments') }}</h1>

          <v-boilerplate style="width: 100%" v-if="isLoading" type="image" />
          <write-comment v-if="!isLoading" :postId="post._id" type="comment" />

          <div v-if="!isLoading && post.comments.length">
            <transition-group name="list">
              <comment
                transition="slide-y-transition"
                v-for="comment in post.comments"
                :key="comment._id"
                :comment="comment"
                :author="post.user"
                :postId="post._id"
                :user="user"
                @handleDeleteComment="handleDeleteComment"
              />
            </transition-group>
          </div>
          <div class="loadmore-comment-wrapper" v-if="!isLoading">
            <div
              class="d-flex justify-center mb-3"
              v-if="commentMetadata.page < commentMetadata.totalPage"
            >
              <span
                @click="handleLoadmoreComments"
                class="font-italic load-more"
              >
                ... Load more comments ...
              </span>
            </div>
            <v-text-field color="primary" v-if="isLoadmore" loading disabled />
          </div>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
        class="wrapper-author-follow d-sm-none d-md-flex flex-column"
      >
        <v-boilerplate
          class="author-follow"
          style="width: 100%; padding: 5px 10px; background: #fff; margin-top: 30px"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />
        <author-follow-card
          v-if="!isLoading"
          class="author-follow mt-10 ml-2"
          :author="post.user"
          @handleFollow="handleFollow"
          @handleUnFollow="handleUnFollow"
          :isFollowing="isFollowing"
          :isAuthor="isAuthor"
        />

        <div
          v-if="!isLoading"
          class="d-flex flex-column justify-center align-center mt-2"
        >
          <v-hover
            v-slot:default="{ hover }"
            style="transition: 0.3s"
            v-for="(song, i) in otherPostsOfAuthor.slice(0, 3)"
            :key="song._id"
          >
            <v-card
              :elevation="hover ? 10 : 3"
              :class="{ 'on-hover': hover }"
              id="audio-card"
            >
              <v-img
                class="cover"
                src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="100px"
                style="cursor: pointer"
                @click="hanldePlayAnotherSong(song._id)"
              >
                <v-card-title
                  class="title white--text d-flex flex-column align-start pb-0 pt-2"
                >
                  <p class="mt-0 mb-0 font-italic subheading text-left">
                    {{ song.topic }}
                  </p>
                  <p class="caption font-weight-medium font-italic text-left">
                    {{ post.authors[0].name }}
                  </p>
                </v-card-title>

                <div
                  class="align-self-center d-flex justify-center mb-2 wrapper-icon"
                >
                  <v-icon
                    class="play-icon"
                    style="color: #fff"
                    @click="hanldePlayAnotherSong(song._id)"
                    size="50"
                  >
                    mdi-music-circle-outline
                  </v-icon>
                </div>
              </v-img>

              <v-card-actions
                style="padding: 25px 25px 0 15px; height: 30px"
                class="pb-1"
              >
                <v-card-text
                  class="font-italic font-weight-light pt-0"
                  style="font-size: 13px; height: 30px; margin-top: 16px !important"
                >
                  <span class="mt-2">{{ song.createdAt | date }}</span>
                </v-card-text>
                <v-spacer />
                <v-container class="pt-4 pl-6 pr-0 d-flex justify-end">
                  <like-btn
                    @handleLikePost="onClickLikePost"
                    @handleUnlikePost="onClickUnlikePost"
                    :isUserLiked="isUserLikedAnotherPost(i)"
                    :likes="song.likes.length"
                    :postId="song._id"
                  />
                </v-container>
              </v-card-actions>
            </v-card>
          </v-hover>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { crudPost } from '@/mixins/crudPost';
import { ROUTES } from '@/mixins/routes';

export default {
  mixins: [crudPost],
  data() {
    return {
      lyricClasses: ['lyric-wrapper'],
      playPauseIconClasses: ['play-pause-icon'],
      wrapperPlayPauseIconClasses: [
        'align-self-center',
        'd-flex',
        'justify-center',
        'wrapper-play-pause-icon',
      ],
      isShowMore: false,
      togglePlayPauseIcon: 'mdi-play-circle-outline',
      volumeIcon: 'mdi-volume-high',
      currentVolume: 100,
      maxVolume: 1.0,
      minVolume: 0.0,
      audioLink: ROUTES.SONG(this._id),
    };
  },
  methods: {
    playAnotherSong(songId) {
      this.$router.push({ path: `/songs/${songId}` });
    },
    slicedTags(tags) {
      return tags.slice(0, this.maxTags);
    },
    hanldePlayAnotherSong(songId) {
      this.$router.push({ path: ROUTES.SONG(songId) });
    },
    toggleShowLyrics() {
      if (this.isShowMore) {
        this.lyricClasses.pop();
      } else {
        this.lyricClasses.push('show-lyric-wrapper');
      }
      this.isShowMore = !this.isShowMore;
    },
    togglePlayPause() {
      if (this.togglePlayPauseIcon === 'mdi-play-circle-outline') {
        this.togglePlayPauseIcon = 'mdi-pause-circle-outline';
        this.wrapperPlayPauseIconClasses.push(
          'playing-wrapper-play-pause-icon',
        );
        this.playPauseIconClasses.push('playing-play-pause-icon');
        return this.$refs.player.audio.play();
      } else {
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
        this.wrapperPlayPauseIconClasses.pop();
        this.playPauseIconClasses.pop();
        return this.$refs.player.audio.pause();
      }
    },
    isAddFt(index, dataLength) {
      return index + 1 < dataLength ? 'ft' : '';
    },
    toggleMutedVolume() {
      if (this.volumeIcon === 'mdi-volume-high') {
        this.volumeIcon = 'mdi-volume-off';
        this.currentVolume = 0;
        return (this.$refs.player.audio.volume = this.minVolume);
      } else {
        this.volumeIcon = 'mdi-volume-high';
        this.currentVolume = 50;
        return (this.$refs.player.audio.volume = this.maxVolume / 2);
      }
    },
    calProgressBar() {
      const player = this.$refs.player.audio;
      const currentTime = player.currentTime;

      this.totalLength = this.calculateTotalValue(player.duration);

      // calculate current value time
      this.currentTime = this.calculateCurrentValue(currentTime);

      this.progressBar.value = player.currentTime / player.duration;

      if (player.currentTime === player.duration) {
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
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
    handleLikedPost({ user }) {
      this.post.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ user }) {
      this.post.likes = this.post.likes.filter(_user => _user._id !== user._id);
    },
    handleSavedPost({ user }) {
      this.post.savedBy.push({ username: user.username, _id: user._id });
    },
    handleUnsavedPost({ user }) {
      this.post.savedBy = this.post.savedBy.filter(
        _user => _user._id !== user._id,
      );
    },
  },
  watch: {
    currentVolume(newValue) {
      if (newValue === 1) this.volumeIcon = 'mdi-volume-off';
      if (newValue !== 1) this.volumeIcon = 'mdi-volume-high';
      return (this.$refs.player.audio.volume = newValue / 100);
    },
  },
  created() {},
  computed: {
    totalLength() {
      const duration = this.post.media.media.duration / 60;
      const splitRes = duration.toString().split('.');
      const minutes = Number(splitRes[0]);
      let seconds = Math.round(Number(splitRes[1]) * 0.6).toFixed(0);
      seconds = seconds.toString().split('.');
      seconds = seconds[0].slice(0, 2);
      return `${minutes}:${seconds}`;
    },
  },
  components: {},
  mounted() {},
};
</script>

<style lang="scss">
audio {
  display: none;
}
.lyric-wrapper {
  height: 40px;
  padding-bottom: 95px;
  overflow: hidden;
}

.v-slider__track-container {
  cursor: pointer;
}

.v-slider__thumb {
  cursor: pointer;
}

.show-lyric-wrapper {
  height: auto;
  padding-bottom: 0;
}

.song-description {
  // border: 1px solid grey;
  // border-left: none;
  // border-top-right-radius: 5px;
  // border-bottom-right-radius: 5px;
}
.cover {
  position: relative;

  .wrapper-play-pause-icon {
    position: absolute;
    top: 36%;
    left: 36%;
    transition: ease 0.3s;

    .play-pause-icon {
      color: #fff;
      transition: ease 0.3s;
      color: #fff;
    }

    .playing-play-pause-icon {
      font-size: 30px !important;
    }
  }

  .playing-wrapper-play-pause-icon {
    top: 83%;
    left: 83%;
  }
}

#song {
  margin-top: 24px;
  padding: 16px 15px 8px 15px !important;
}

// .aplayer {
//   -webkit-box-shadow: none;
//   box-shadow: none;
//   margin: 0;

//   .aplayer-icon {
//     width: 18px;
//     height: 18px;
//   }

//   .aplayer-pic {
//     height: 250px !important;
//     width: 280px !important;

//     .aplayer-play {
//       width: 56px;
//       height: 56px;
//       border: 2px solid #fff;
//       bottom: 44%;
//       right: 44%;
//       margin: 0 -15px -15px 0;
//     }

//     .aplayer-play svg {
//       position: absolute;
//       top: 5px;
//       left: 4px;
//       height: 46px;
//       width: 55px;
//     }
//   }

//   .aplayer-info {
//     margin-left: 290px !important;

//     .aplayer-controller {
//       .aplayer-bar-wrap {
//         .aplayer-bar {
//           .aplayer-played {
//             height: 2px;
//           }
//         }
//       }
//     }

//     .aplayer-music {
//       margin-bottom: 35px;
//       height: 40px;

//       .aplayer-title {
//         font-size: 1.65rem !important;
//       }

//       .aplayer-author {
//         font-size: 1.05rem !important;
//       }
//     }
//   }
// }

.aplayer
  .aplayer-info
  .aplayer-controller
  .aplayer-time
  .aplayer-icon.aplayer-icon-loop {
  display: none !important;
}

.aplayer
  .aplayer-info
  .aplayer-controller
  .aplayer-volume-wrap
  .aplayer-volume-bar-wrap
  .aplayer-volume-bar {
  bottom: 4px !important;
  right: 12px !important;
}

.wrapper-volume {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .volume {
    display: flex;
    width: 20%;

    .volume-icon {
      cursor: pointer;
    }
    .volume-bar {
      width: 163px;
      height: 20px;
      margin-bottom: 14px;
      transition: ease 0.5s;
      color: #000;
    }
  }
}

#audio-card {
  height: 155px;
  width: 270px;
  margin-top: 30px;
  position: relative;

  .wrapper-icon {
    position: absolute;
    top: 70%;
    left: 6%;

    .play-icon {
      font-size: 21px !important;
    }
  }
}

.markdown-content >>> img {
  width: 100% !important;
}

::v-deep pre code:before {
  content: '' !important;
}

.markdown-content {
  line-height: 1.6;
}

::v-deep code:before {
  content: '' !important;
}

::v-deep code:after {
  content: '' !important;
}

::v-deep code {
  font-size: 13px !important;
  box-shadow: none;
  background-color: rgb(228, 224, 224, 0.8);
}

::v-deep pre code {
  display: block;
  overflow-x: auto;
  padding: 1em;
  color: #abb2bf;
  background: #282c34;
  margin: 15px 0px;
}
</style>
