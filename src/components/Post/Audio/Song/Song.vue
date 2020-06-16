<template>
  <div>
    <div class="mb-3" v-if="isShowTitle">
      <v-avatar size="30" style="cursor: pointer;" class="mr-2">
        <img
          @click="onClickAvatar"
          :src="author.avatar.secureURL"
          alt="Avatar"
        />
      </v-avatar>
      <a
        style="text-decoration: none; color: #000"
        :href="`/users/profile/${this.author.username}`"
      >
        <span>{{ author.username }}</span>
      </a>
      <span
        style="font-size: 13px !important; color: grey"
        class="caption ml-1"
      >
        {{ $t('posted a') }}
        <a
          :href="`/songs/${_id}?type=song`"
          style="text-decoration: none; color: #444; font-style: italic"
        >
          <span>track</span>
        </a>
      </span>
    </div>
    <v-hover v-slot:default="{ hover }" style="transition: 0.3s; height: 205px">
      <v-card id="song" class="mx-auto pb-0 mb-0" :elevation="hover ? 10 : 3">
        <aplayer
          @click="linkToSong"
          loop="none"
          :audio="audioFormat"
          :lrcType="0"
        />

        <v-list-item
          three-line
          style="padding: 0 15px 0 15px"
          class="d-flex flex-wrap align-center"
        >
          <v-card-actions class="pb-1 pl-0 pt-md-0 pt-sm-5">
            <v-container class="pt-0 pl-0 pr-0 d-flex justify-space-around">
              <like-btn
                class="mr-10"
                @handleLikePost="onClickLikePost"
                @handleUnlikePost="onClickUnlikePost"
                :isUserLiked="isUserLiked"
                :likes="likes.length"
                :postId="_id"
              />
            </v-container>
          </v-card-actions>
          <v-spacer />
          <v-card-actions class="d-flex">
            <tag
              class="mb-2"
              :tagName="tag.tagName"
              v-for="(tag, i) in slicedTags"
              :key="i"
              postType="song"
            />
          </v-card-actions>
          <v-card-text
            class="font-italic font-weight-light pt-0 pl-0 pr-0"
            style="font-size: 13px; width: 110px; height: 30px; margin-top: 0px !important; margin-left: 20px"
          >
            <span class="mt-2">
              {{ $d(new Date(createdAt), 'short', 'vi-VN') }}
            </span>
          </v-card-text>
        </v-list-item>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
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
    media: {
      type: Object,
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
    isShowTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maxTags: 3,
      audioLink: ROUTES.SONG(this._id),
      audioFormat: {},
    };
  },
  created() {
    this.audio.theme = '#4A148C';

    const audio = this.audio;
    const artists = this.authors.filter(person => person.type === 'artist');
    this.audioFormat = {
      name: this.topic,
      artist: artists.map(person => person.name).toString(),
      url: audio.secureURL,
      cover: this.cover.secureURL,
    };
  },
  computed: {
    slicedTags() {
      return this.tags.slice(0, this.maxTags);
    },
  },
  methods: {
    linkToSong() {
      this.$router.push({ path: this.audioLink });
    },
    onClickAvatar() {
      this.$router.push({
        path: ROUTES.USER_PROFILE({ username: this.author.username }),
      });
    },
  },
  mounted() {
    const songTitle = document.getElementsByClassName('aplayer-title')[1];
    songTitle.style.cursor = 'pointer';
    songTitle.addEventListener('click', () =>
      this.$router.push({ path: ROUTES.SONG(this._id) }),
    );
  },
  components: {
    Tag,
    LikeBtn,
  },
};
</script>

<style lang="scss">
.title-link {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}
.aplayer {
  -webkit-box-shadow: none;
  box-shadow: none;
  margin-bottom: 0;

  .aplayer-icon {
    width: 18px;
    height: 18px;
  }

  .aplayer-pic {
    min-height: 115px;
    min-width: 136px;
  }

  .aplayer-info {
    margin-left: 140px !important;

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
      .aplayer-title {
        font-size: 1.05rem !important;
        // cursor: pointer;
      }
      .aplayer-author {
        font-size: 0.85rem !important;
        // cursor: pointer;
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

#song {
  padding: 16px 15px 0px 15px;
}
</style>
