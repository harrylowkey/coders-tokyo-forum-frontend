<template>
  <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
    <v-card class="mx-auto mt-6" :elevation="hover ? 10 : 3">
      <v-list-item three-line style="padding: 0px 25px 0 20px">
        <v-list-item-content class="pr-10 pt-lg-0 pb-lg-0">
          <a
            style="width: 80%;overflow: hidden;text-decoration: none; color: rgba(0, 0, 0, 0.87) !important"
            :href="discussionLink"
          >
            <v-list-item-title class="headline discuss-title mb-0 pt-3">
              {{ topic }}
            </v-list-item-title>
          </a>
          <v-list-item-subtitle
            style="line-height: 1.4;"
            class="mt-lg-n9 pt-lg-10"
          >
            {{ content }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <user-avatar
          :src="author.avatar.secureURL"
          :username="author.username"
        />
      </v-list-item>

      <v-card-actions style="padding: 0 25px 0 6px" class="pb-1 pb-lg-2">
        <v-card-text
          class="font-italic font-weight-light pt-0 pb-0"
          style="font-size: small"
        >
          {{ createdAt | date }}
        </v-card-text>
        <v-spacer />
        <v-container>
          <v-row>
            <v-col
              class="pa-lg-0"
              cols="5"
              sm="5"
              md="4"
              offset-md="2"
              lg="3"
              offset-lg="4"
              xl="2"
              offset-xl="5"
            >
              <like-btn
                @handleLikePost="onClickLikePost"
                @handleUnlikePost="onClickUnlikePost"
                :isUserLiked="isUserLiked"
                :likes="likes.length"
                :postId="_id"
              />
            </v-col>
            <v-col class="pa-lg-0">
              <comment-btn
                :type="type"
                :postId="_id"
                :comments="totalComments"
              />
            </v-col>
          </v-row>
        </v-container>
        <tag v-if="tags.length" :tagName="tags[0].tagName" :postType="type" />
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import LikeBtn from '@/components/Shared/LikeButton';
import CommentBtn from '@/components/Shared/CommentButton';
import Tag from '@/components/Shared/Tag';
import UserAvatar from '@/components/Shared/UserAvatar';
import { ROUTES } from '@/mixins/routes';
import { toggleLike } from '@/mixins/toggleLike';

export default {
  mixins: [toggleLike],
  props: {
    _id: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    likes: {
      type: Array,
      default: () => [],
    },
    comments: {
      type: Array,
      default: () => [],
    },
    savedBy: {
      type: Array,
      default: () => [],
    },
    author: {
      type: Object,
      default: () => ({}),
    },
    topic: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
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
  },
  data() {
    return {
      discussionLink: ROUTES.DISCUSSION(this._id),
    };
  },
  components: {
    Tag,
    LikeBtn,
    CommentBtn,
    UserAvatar,
  },
  computed: {
    totalComments() {
      let counter = 0;
      counter += this.comments.length;
      this.comments.map(comment => {
        counter += comment.childComments.length;
        return counter;
      });
      return counter;
    },
  },
};
</script>

<style scoped>
.discuss-title {
  text-align: left;
  white-space: initial;
  line-height: 1.1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.title-link {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}

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
