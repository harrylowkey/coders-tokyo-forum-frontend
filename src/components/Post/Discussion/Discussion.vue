<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto mt-6" :elevation="hover ? 10 : 3">
      <v-list-item three-line style="padding: 0 25px 0 20px">
        <v-list-item-content class="pr-10 pt-lg-0 pb-lg-0">
          <v-list-item-title class="headline mb-0">{{ topic }}</v-list-item-title>
          <v-list-item-subtitle style="line-height: 1.4;" class="mt-lg-n9">{{ content }}</v-list-item-subtitle>
        </v-list-item-content>

        <div class="user text-center">
          <v-list-item-avatar tile size="70" style="margin: 16px 0 0 0">
            <v-img
              src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
              style="cursor: pointer"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="pt-md-1.5 pt-lg-1 pb-lg-1">
            <v-list-item-title class="caption text-center">{{userId.username}}</v-list-item-title>
          </v-list-item-content>
        </div>
      </v-list-item>

      <v-card-actions style="padding: 0 25px 0 6px" class="pb-1 pb-lg-2">
        <v-card-text
          class="font-italic font-weight-light pt-0"
          style="font-size: small"
        >{{ createdAt | date }}</v-card-text>
        <v-spacer></v-spacer>
        <v-container>
          <v-row>
            <v-col class="pa-lg-0" cols="3" offset-sm="4" md="4" offset-md="2" lg="3" offset-lg="4" xl="2" offset-xl="5">
              <like-btn :likes="200" ></like-btn>
          
            </v-col>
            <v-col class="pa-lg-0">
              <comment-btn :comments="500"></comment-btn>
            </v-col>
          </v-row>
        </v-container>
        <tag :tagName="tags[0].tagName"></tag>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import LikeBtn from '@/components/Shared/LikeButton'
import CommentBtn from '@/components/Shared/CommentButton'
import Tag from '@/components/Shared/Tag'
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
    likes: {
      type: Array,
      default: () => []
    },
    savedBy: {
      type: Array,
      default: () => []
    },
    userId: {
      type: Object,
      default: () => ({})
    },
    topic: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
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
  components: {
    tag: Tag,
    likeBtn: LikeBtn,
    commentBtn: CommentBtn
  }
};
</script>

<style scoped>
.like-icon,
.comment-icon {
  position: relative;
}

.like-icon-content {
  position: absolute !important;
  top: 10px;
  left: 22px;
  font-size: 12px;
}

.comment-icon-content {
  position: absolute !important;
  top: 10px;
  left: 22px;
  font-size: 12px;
}
</style>