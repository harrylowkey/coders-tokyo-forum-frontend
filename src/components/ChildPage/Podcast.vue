<template>
  <div>
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
          :likes="post && post.metadata ? post.metadata.likes : 0"
          :saves="post && post.metadata ? post.metadata.saves : 0"
          :flowers="0"
          :postId="post._id"
        />
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
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
        <v-card v-else id="podcast" class="mx-auto pa-0 pa-8">
          <v-row>
            <v-col cols="3" sm="3" md="4" lg="3" xl="3">
              <v-container class="d-flex pb-7 pt-0 pr-0 pl-4">
                <v-img
                  :class="coverClasses"
                  class="cover"
                  :src="post.cover.secureURL"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  min-height="160px"
                  max-height="160px"
                  min-width="160px"
                  max-width="160px"
                  style="cursor: pointer"
                  @click="togglePlayPause"
                >
                  <div
                    class="align-self-center d-flex justify-center wrapper-play-pause-icon"
                  >
                    <v-icon v-if="!isPlaying" class="play-pause-icon" size="50">
                      {{ togglePlayPauseIcon }}
                    </v-icon>
                  </div>
                </v-img>
                <av-circle
                  ref="player"
                  @click="togglePlayPause"
                  :canv-width="210"
                  :canv-height="150"
                  :class="playerClasses"
                  :cors-anonym="corsAnonym"
                  :outline-width="1"
                  :bar-width="1"
                  :bar-length="30"
                  :progress-width="5"
                  :outline-meter-space="5"
                  :playtime="true"
                  :radius="60"
                  playtime-font="18px Monaco"
                  :audio-src="post.media.secureURL"
                />
                <span
                  style="font-size: 13px; color: grey"
                  :class="totalLengthClasses"
                >
                  {{ totalLength }}
                </span>

                <v-icon
                  @click="togglePlayPause"
                  v-if="isPlaying"
                  :class="pauseIconClasses"
                  size="28"
                  color="#0000FF"
                >
                  mdi-pause-circle-outline
                </v-icon>
                <div :class="volumeClasses" v-if="isPlaying">
                  <v-icon @click="toggleMutedVolume" class="volume-icon">
                    {{ volumeIcon }}
                  </v-icon>
                  <v-slider
                    color="#0000FF"
                    class="volume-bar"
                    v-model="currentVolume"
                    max="100"
                    min="1"
                    track-color="grey"
                  />
                </div>
              </v-container>
            </v-col>

            <v-col cols="9" sm="9" md="7" lg="9" xl="9">
              <v-card-text class="podcast-description pl-0 pt-0">
                <v-card-title
                  style="cursor: pointer"
                  class="ml-5 headline pt-0"
                >
                  {{ post.media.fileName }}
                </v-card-title>
                <v-card-subtitle class="pt-1 ml-8 pl-1 pb-0">
                  <span
                    style="font-size: 13px"
                    v-for="(author, i) in post.authors"
                    :key="author._id"
                  >
                    <a
                      target="_blank"
                      style="text-decoration: none; color: #000"
                      :href="`/posts?artist=${author.name}&type=podcast`"
                    >
                      {{ author.name }}
                    </a>
                    <span style="font-size: 12px" class="mx-1 font-italic">
                      {{ isAddFt(i, post.authors.length) }}
                    </span>
                  </span>
                </v-card-subtitle>

                <div class="pr-3 pt-5">
                  <v-card-actions class="d-flex ml-5 pt-0">
                    <tag
                      :tagName="tag.tagName"
                      v-for="(tag, i) in post.tags"
                      :key="i"
                      postType="podcast"
                    />
                  </v-card-actions>
                  <v-spacer />
                </div>
              </v-card-text>
            </v-col>
          </v-row>

          <v-divider />
          <v-container>
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
                  :user="user"
                  :isAuthor="isAuthor"
                />
              </v-col>

              <v-col class="lyric" cols="9" sm="8" md="8" lg="9" xl="9">
                <div :class="lyricClasses">
                  <p v-html="$options.filters.markdown(post.content)" />
                </div>
                <span
                  v-if="!isShowMore"
                  @click="toggleShowLyrics"
                  style="font-size: 13px; color: grey; cursor: pointer"
                  class="font-italic mb-0 show-more"
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
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <div class="mt-5">
          <v-divider />
          <h1 class="mb-3 mt-8">Comments</h1>

          <v-boilerplate style="width: 100%" v-if="isLoading" type="image" />
          <write-comment v-if="!isLoading" />

          <div v-if="post ? post.comments.length : false">
            <comment
              v-for="comment in post.comments"
              :key="comment._id"
              :comment="comment"
              :author="post.user"
              :postId="post._id"
            />
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
          style="width: 100%; padding: 5px 10px; background: #fff; margin-top: 30px !important"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />
        <author-follow-card
          v-if="!isLoading"
          class="author-follow"
          :isAuthor="isAuthor"
          :author="post.user"
          :userId="user._id"
        />

        <div
          v-if="!isLoading"
          class="d-flex flex-column justify-center align-center mt-2"
        >
          <v-hover
            v-slot:default="{ hover }"
            style="transition: 0.3s"
            v-for="podcast in otherPodcastsOfAuthor"
            :key="podcast._id"
          >
            <v-card
              :elevation="hover ? 10 : 3"
              :class="{ 'on-hover': hover }"
              id="audio-card"
            >
              <v-img
                src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="100px"
                style="cursor: pointer"
                @click="hanldePlayAnotherpodcast(podcast._id)"
              >
                <v-card-title
                  class="title white--text d-flex flex-column align-start pb-0 pt-2"
                >
                  <p class="mt-0 mb-0 font-italic subheading text-left">
                    {{ podcast.topic }}
                  </p>
                  <p class="caption font-weight-medium font-italic text-left">
                    {{ podcast.authors[0].name }}
                  </p>
                </v-card-title>

                <div
                  class="align-self-center d-flex justify-center mb-2 wrapper-icon"
                >
                  <v-icon class="play-icon" style="color: #fff" size="50">
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
                  <span class="mt-2">{{ podcast.createdAt | date }}</span>
                </v-card-text>
                <v-spacer />
                <v-container class="pt-4 pl-6 pr-0 d-flex justify-space-around">
                  <like-btn :likes="4" />
                  <comment-btn :comments="9" />
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

export default {
  mixins: [crudPost],
  data() {
    return {
      totalLengthClasses: ['total-length', 'font-italic', 'mb-0'],
      pauseIconClasses: ['pause-icon'],
      volumeClasses: ['volume'],
      playerClasses: ['player'],
      coverClasses: ['cover'],
      corsAnonym: Boolean(true),
      lyricClasses: ['lyric-wrapper'],
      isShowMore: false,
      isPlaying: false,
      togglePlayPauseIcon: 'mdi-play-circle-outline',
      volumeIcon: 'mdi-volume-high',
      currentVolume: 100,
      maxVolume: 1.0,
      minVolume: 0.0,
      isFollowing: false,
      otherPodcastsOfAuthor: [
        {
          _id: '5e992603c513c2611a9df88',
          tags: [
            {
              _id: '5e8c5f27abf7df7d3be426db',
              tagName: 'aucoustic',
            },
            {
              _id: '5e8c5f27abf7df7d3be426dc',
              tagName: 'tinh ca',
            },
          ],
          comments: [],
          authors: [
            {
              _id: '5e9920603c513c2611a9df89',
              type: 'artist',
              name: 'Chillies',
            },
          ],
          likes: [],
          savedBy: [],
          userId: '5e8b577f1a2dde32298795f4',
          topic: ' Memories place',
          description: 'Rock Ballad',
          content: 'lyric',
          type: 'podcast',
          media: {
            _id: '5e99206e3c513c2611a9df8a',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614',
            fileName: 'hongquang_podcast_Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            userId: '5e8b577f1a2dde32298795f4',
            postId: '5e9920603c513c2611a9df88',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: 'b1cd21b54d3ac48aab7b3097fe59957cb525e614',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-04-17T03:20:14.881Z',
            updatedAt: '2020-04-17T03:20:14.881Z',
            __v: 0,
          },
          audio: {
            name: '东西（Cover：林俊呈）',
            artist: '纳豆',
            url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
            cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
            lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
          },
          createdAt: '2020-04-17T03:20:14.886Z',
          updatedAt: '2020-04-17T03:20:14.886Z',
          metadata: {
            _id: '5e9494fe935dfb5ed30435',
            comments: 123,
            likes: 69,
            saves: 1,
          },
        },
        {
          _id: '5e9202c3c513c2611a9df86',
          tags: [
            {
              _id: '5e8c5f27abf7df7d3be426db',
              tagName: 'rock',
            },
            {
              _id: '5e8c5f27abf7df7d3be426dc',
              tagName: 'rockballad',
            },
          ],
          comments: [],
          authors: [
            {
              _id: '5e8c5f27abf7df7d3be426dd',
              type: 'artist',
              name: 'Sweettie',
            },
            {
              _id: '5e8c5f27abf7df7d3be426de',
              type: 'composer',
              name: 'Sweettie',
            },
          ],
          likes: [],
          savedBy: [],
          userId: '5e8b577f1a2dde32298795f4',
          topic: 'The last time',
          description: 'A good podcast',
          content: 'lyric',
          type: 'podcast',
          media: {
            _id: '5e9920363c513c2611a9df87',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1587093557/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558',
            fileName: 'hongquang_podcast_Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            userId: '5e8b577f1a2dde32298795f4',
            postId: '5e99202c3c513c2611a9df86',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '1f824197f0826b949e90ed5a78544ba7c268d52a',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-04-17T03:19:18.857Z',
            updatedAt: '2020-04-17T03:19:18.857Z',
            __v: 0,
          },
          audio: {
            name: '东西（Cover：林俊呈）',
            artist: '纳豆',
            url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
            cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
            lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
          },
          createdAt: '2020-04-17T03:19:18.881Z',
          updatedAt: '2020-04-17T03:19:18.881Z',
          metadata: {
            _id: '5e9494fe935dfb5ed30435',
            comments: 123,
            likes: 69,
            saves: 1,
          },
        },
      ],
    };
  },
  methods: {
    slicedTags(tags) {
      return tags.slice(0, this.maxTags);
    },
    hanldePlayAnotherpodcast(podcastId) {
      // eslint-disable-next-line no-console
      this.$router.push({ path: `/podcasts/${podcastId}` });
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
        this.playerClasses.push('show-player');
        this.coverClasses.push('hide-cover');
        this.pauseIconClasses.push('show-opacity');
        this.volumeClasses.push('show-opacity');
        this.totalLengthClasses.push('show-opacity');
        this.isPlaying = true;
        return this.$refs.player.audio.play();
      } else {
        this.isPlaying = false;
        this.togglePlayPauseIcon = 'mdi-play-circle-outline';
        this.playerClasses.pop();
        this.coverClasses.pop();
        this.pauseIconClasses.pop();
        this.volumeClasses.pop();
        this.totalLengthClasses.pop();
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
      // eslint-disable-next-line no-unused-vars
      const current_hour = parseInt(currentTime / 3600) % 24;
      const current_minute = parseInt(currentTime / 60) % 60;
      const current_seconds_long = currentTime % 60;
      const current_seconds = current_seconds_long.toFixed();
      const current_time = `${
        current_minute < 10 ? `0${current_minute}` : current_minute
      }:${current_seconds < 10 ? `0${current_seconds}` : current_seconds}`;

      return current_time;
    },
  },
  watch: {
    currentVolume(newValue) {
      if (newValue === 1) this.volumeIcon = 'mdi-volume-off';
      if (newValue !== 1) this.volumeIcon = 'mdi-volume-high';
      return (this.$refs.player.audio.volume = newValue / 100);
    },
  },
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
};
</script>

<style lang="scss">
.player {
  opacity: 0;
  position: absolute;
  top: -500px;
}

.hide-cover {
  opacity: 1;
  top: -500px;
  transition: opacity 1.8s ease-in;
}
.show-player {
  opacity: 1;
  top: 26px;
  left: 21px;
  transition: opacity 1s ease-in;
}

.lyric-wrapper {
  height: 270px;
  overflow: hidden;
}

.show-lyric-wrapper {
  height: auto;
}

.total-length {
  position: absolute;
  top: 170px;
  left: 197px;
  height: 25px;
  cursor: pointer;
  opacity: 0;
}

.pause-icon {
  position: absolute;
  top: 160px;
  left: -146px;
  height: 25px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 1.8s ease-in;
}

.volume {
  display: flex;
  width: 20%;
  position: absolute;
  top: 30%;
  left: 9%;
  width: 15%;
  display: flex;
  opacity: 0;
  transition: opacity 1.8s ease-in;

  .volume-icon {
    cursor: pointer;
    transition: opacity 1.8s ease-in;
  }
  .volume-bar {
    width: 163px;
    height: 20px;
    margin-bottom: 14px;
    color: #000;
    transition: opacity 1.8s ease-in;
  }
}

.show-opacity {
  opacity: 1;
  transition: opacity 1.8s ease-in;
}

.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 0 !important;
}

.cover {
  position: relative;
  opacity: 1;
  border-radius: 50%;
  cursor: pointer;

  .wrapper-play-pause-icon {
    position: absolute;
    top: 36%;
    left: 36%;

    .play-pause-icon {
      color: #fff;
    }
  }

  canvas {
    position: absolute;
    top: 36%;
    left: 36%;
  }
}

#podcast {
  padding: 16px 15px 8px 15px !important;
}

.aplayer {
  -webkit-box-shadow: none;
  box-shadow: none;
  margin: 0;

  .aplayer-icon {
    width: 18px;
    height: 18px;
  }

  .aplayer-pic {
    height: 250px !important;
    width: 280px !important;

    .aplayer-play {
      width: 56px;
      height: 56px;
      border: 2px solid #fff;
      bottom: 44%;
      right: 44%;
      margin: 0 -15px -15px 0;
    }

    .aplayer-play svg {
      position: absolute;
      top: 5px;
      left: 4px;
      height: 46px;
      width: 55px;
    }
  }

  .aplayer-info {
    margin-left: 290px !important;

    .aplayer-controller {
      .aplayer-bar-wrap {
        .aplayer-bar {
          .aplayer-played {
            height: 2px;
          }
        }
      }
    }

    .aplayer-music {
      margin-bottom: 35px;
      height: 40px;

      .aplayer-title {
        font-size: 1.65rem !important;
      }

      .aplayer-author {
        font-size: 1.05rem !important;
      }
    }
  }
}

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

audio {
  display: none;
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
</style>
