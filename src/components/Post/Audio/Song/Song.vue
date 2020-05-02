<template>
  <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
    <v-card id="song" class="mx-auto pb-4 mb-8" :elevation="hover ? 10 : 3">
      <aplayer @click="linkToSong" loop="none" :audio="audio" :lrcType="3" />

      <v-list-item
        three-line
        style="padding: 0 15px 0 15px"
        class="d-flex flex-wrap justify-center"
      >
        <user-social-links
          :socialLinks="socialLinks"
          :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
          :username="'chau_chau'"
        ></user-social-links>
        <v-card-actions style="margin-right: 25px; height: 30px" class="pb-1 pl-0">
          <v-card-text
            class="font-italic font-weight-light pt-0 pl-0 pr-0"
            style="font-size: 13px; width: 150px; height: 30px; margin-top: 16px !important; margin-right: 20px"
          >
            <span class="mt-2">{{ createdAt | date }}</span>
          </v-card-text>
          <v-container class="pt-4 pl-0 pr-0 d-flex justify-space-around">
            <like-btn :likes="4"></like-btn>
            <comment-btn :comments="9"></comment-btn>
          </v-container>
        </v-card-actions>
        <v-card-actions style="padding: 0;" class="d-flex">
          <v-spacer></v-spacer>
          <tag
            style="margin-top: 6px"
            :tagName="tag.tagName"
            v-for="(tag, i) in slicedTags"
            :key="i"
            postType="song"
          ></tag>
        </v-card-actions>
      </v-list-item>
    </v-card>
  </v-hover>
</template>

<script>
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
      maxTags: 3,
      audioLink: "",
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
      }
    };
  },
  created() {
    this.audio.theme = "#4A148C";
  },
  computed: {
    slicedTags() {
      return this.tags.slice(0, this.maxTags);
    }
  },
  methods: {
    linkToSong() {
      this.$router.push({ path: this.audioLink });
    }
  },
  created() {
    this.audioLink = `/songs/${this._id}`;
  },
  mounted() {
    let songTitle = document.querySelector(".aplayer-title");
  },
  components: {
    Tag,
    LikeBtn,
    CommentBtn,
    UserSocialLinks
  }
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
    min-height: 79px;
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
  padding: 16px 15px 8px 15px;
}
</style>