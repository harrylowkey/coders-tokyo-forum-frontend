<template>
  <v-hover v-slot:default="{ hover }">
    <v-card 
      :elevation="hover ? 10 : 3" 
      :class="{ 'on-hover': hover }" 
      id="audio-card"
    >
      <v-img
        src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
        class="mt-2"
      >
        <v-card-title class="title white--text d-flex flex-column align-start pb-0">
          <p class="mt-2 mb-0 font-italic subheading text-left">{{ topic }}</p>
          <p class="caption font-weight-medium font-italic text-left">{{ authors[0].name }}</p>
        </v-card-title>

        <div class="align-self-center d-flex justify-center">
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
      <v-list-item three-line style="padding: 0 25px 0 10px">
        <div class="user text-center d-flex">
          <v-list-item-avatar tile size="60" style="margin: 16px 0 0 0">
            <v-img
              src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
              style="cursor: pointer"
            ></v-img>
          </v-list-item-avatar>
          <v-container class="pb-0">
            <v-list-item-icon class="mb-0">
              <v-icon color="primary" size="20">mdi-github</v-icon>
              <v-icon color="primary" size="20" class="px-2">mdi-facebook</v-icon>
              <v-icon color="primary" size="20">mdi-linkedin</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="pt-1 pl-1">
              <v-list-item-title class="caption text-start">chau_chau</v-list-item-title>
            </v-list-item-content>
          </v-container>
        </div>
      </v-list-item>
      <v-card-actions style="padding: 0px 5px 0 20px" class="d-flex">
        <v-spacer></v-spacer>
        <tag 
          :tagName="tag.tagName"  
          v-for="tag in slicedTags"
          :key="tag._id"
        ></tag>
      </v-card-actions>
      <v-card-actions style="padding: 0px 25px 0 6px" class="pb-1">
        <v-card-text
          class="font-italic font-weight-light pt-0"
          style="font-size: 13px; height: 30px; margin-top: 16px !important"
        >
          <span class="mt-2">{{ createdAt | date }}</span>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-container class="pt-4 pl-6 pr-0 d-flex justify-center">
          <like-btn :likes="4" style="padding-right: 40px;" ></like-btn>
          <comment-btn :comments="9"></comment-btn>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script scoped>
import Tag from '@/components/Shared/Tag'
import LikeBtn from '@/components/Shared/LikeButton'
import CommentBtn from '@/components/Shared/CommentButton'

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
    commentBtn: CommentBtn
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
  border-radius: 40px;
  padding: 5px 15px 5px 15px;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>