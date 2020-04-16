<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto mt-6" :elevation="hover ? 10 : 3">
      <v-list-item three-line style="padding: 0 25px 0 20px">
        <v-list-item-content class="pr-10">
          <v-list-item-title class="headline mb-1">{{ topic }}</v-list-item-title>
          <v-list-item-subtitle style="line-height: 1.4">{{ content }}</v-list-item-subtitle>
        </v-list-item-content>

        <div class="user text-center">
          <v-list-item-avatar tile size="70" style="margin: 16px 0 0 0">
            <v-img
              src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
              style="cursor: pointer"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="pt-1.5">
            <v-list-item-title class="caption text-center">{{userId.username}}</v-list-item-title>
          </v-list-item-content>
        </div>
      </v-list-item>

      <v-card-actions style="padding: 0 25px 0 6px" class="pb-1">
        <v-card-text
          class="font-italic font-weight-light pt-0"
          style="font-size: small"
        >{{ createdAt | date-time }}</v-card-text>
        <v-spacer></v-spacer>
        <v-container class="pt-0 d-flex justify-center">
          <div style="padding-right: 60px" class="like-icon">
            <v-icon color="#64B5F6">thumb_up_alt</v-icon>
            <span class="like-icon-content">{{ metadata.likes }}</span>
          </div>
          <div class="comment-icon">
            <v-icon color="#64B5F6">mode_comment</v-icon>
            <span class="comment-icon-content">{{ metadata.comments }}</span>
          </div>
        </v-container>
        <span class="caption text-center" style="background-color: #EF9A9A">#{{ tags[0].tagName }}</span>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
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
  }
};
</script>

<style scoped>
  .like-icon, .comment-icon  {
    position: relative;
  }

  .like-icon-content {
    position: absolute !important; 
    top: 10px; 
    left: 30px;
    font-size: small;
  }

  .comment-icon-content {
    position: absolute !important; 
    top: 10px; 
    left: 30px;
    font-size: small;
  }
</style>