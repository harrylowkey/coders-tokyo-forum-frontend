<template>
  <div>
    <div class="mb-3">
      <v-avatar size="30" style="cursor: pointer;" class="mr-2">
        <img
          @click="showAvatar = !showAvatar"
          :src="user.avatar.secureURL"
          alt="Avatar"
        />
      </v-avatar>
      <span>{{ user.username }}</span>
      <span
        style="font-size: 13px !important; color: grey"
        class="caption ml-1"
      >
        posted a track
      </span>
    </div>
    <v-hover v-slot:default="{ hover }" style="transition: 0.3s; height: 205px">
      <v-card id="song" class="mx-auto pb-0 mb-0" :elevation="hover ? 10 : 3">
        <aplayer  @click="linkToSong" loop="none" :audio="audioFormat" :lrcType="0" />

        <v-list-item
          three-line
          style="padding: 0 15px 0 15px"
          class="d-flex flex-wrap align-center"
        >
          <v-card-actions class="pb-1 pl-0 pt-md-0 pt-sm-5">
            <v-container class="pt-0 pl-0 pr-0 d-flex justify-space-around">
              <like-btn :likes="likes.length" class="mr-10" />
              <comment-btn :comments="comments.length" />
            </v-container>
          </v-card-actions>
          <v-spacer />
          <v-card-actions class="d-flex">
            <tag
              style="margin-top: 6px;"
              :tagName="tag.tagName"
              v-for="(tag, i) in slicedTags"
              :key="i"
              postType="song"
            />
          </v-card-actions>
          <v-card-text
            class="font-italic font-weight-light pt-0 pl-0 pr-0"
            style="font-size: 13px; width: 85px; height: 30px; margin-top: 0px !important; margin-left: 20px"
          >
            <span class="mt-2">{{ createdAt | date }}</span>
          </v-card-text>
        </v-list-item>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import Tag from '@/components/Shared/Tag';
import LikeBtn from '@/components/Shared/LikeButton';
import CommentBtn from '@/components/Shared/CommentButton';
import UserAvatar from '@/components/Shared/UserAvatar';
import { userSocialLinks } from '@/mixins/userSocialLinks';

export default {
  mixins: [userSocialLinks],
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
    user: {
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
      maxTags: 3,
      // eslint-disable-next-line no-underscore-dangle
      audioLink: `/songs/${this._id}?type=${this.type}`,
      audioFormat: {}
    };
  },
  created() {
    this.audio.theme = '#4A148C';

    const audio = this.audio;
    const artists = this.authors.filter(person => person.type === 'artist');
    this.audioFormat = {
      name: audio.fileName,
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
  },
  mounted() {
    const songTitle = document.querySelector('.aplayer-title');
    songTitle.addEventListener('click', () =>
      // eslint-disable-next-line no-underscore-dangle
      window.open(`/songs/${this._id}?type=${this.type}`),
    );
    const songComposer = document.querySelector('.aplayer-author');
    songComposer.addEventListener('click', () =>
      window.open(`/posts?artist=${this.audio.artist}&type=${this.type}`),
    );
  },
  components: {
    Tag,
    LikeBtn,
    CommentBtn,
    // eslint-disable-next-line vue/no-unused-components
    UserAvatar,
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
        cursor: pointer;
      }
      .aplayer-author {
        font-size: 0.85rem !important;
        cursor: pointer;
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
