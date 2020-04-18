<template>
  <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
    <v-card
      :elevation="hover ? 10 : 3"
      :class="{ 'on-hover': hover }"
      id="audio-card"
      style="max-width: 285px; height: 335px;"
    >
      <v-img
        src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title class="title white--text d-flex flex-column align-start pb-0">
          <p class="mt-2 mb-0 font-italic subheading text-left">{{ topic }}</p>
          <p class="caption font-weight-medium font-italic text-left">{{ authors[0].name }}</p>
        </v-card-title>

        <div class="align-self-center d-flex justify-center" st>
          <v-btn
            v-for="(icon, index) in icons"
            :key="index"
            :class="{ 'show-btns': hover }"
            color="transparent"
            icon
          >
            <v-icon size="35" :class="{ 'show-btns': hover }">{{ icon }}</v-icon>
          </v-btn>
        </div>
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
          <tag style="margin-top: 6px" :tagName="tag.tagName" v-for="tag in slicedTags" :key="tag._id"></tag>
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
      icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"]
    };
  },
  components: {
    tag: Tag,
    likeBtn: LikeBtn,
    commentBtn: CommentBtn,
    userSocialLinks: UserSocialLinks
  },
  computed: {
    slicedTags() {
      let cloneTags = [...this.tags];
      const sliceIndex =
        this.maxTags < cloneTags.length ? this.maxTags : cloneTags.length - 2;
      return cloneTags.splice(sliceIndex);
    }
  }
};
</script>

<style>
#audio-card {
  max-width: 320px;
  border-radius: 35px;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>