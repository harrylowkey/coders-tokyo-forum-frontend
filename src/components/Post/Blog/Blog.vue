<template>
  <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
    <v-card class="mx-auto mt-6 blog-card" :elevation="hover ? 20 : 3">
      <v-img
        v-if="cover.secureURL"
        :src="cover.secureURL"
        height="350px"
        class="cover-blog"
        @click="linkToBlog"
      />

      <v-list-item three-line style="padding: 0 25px 0 20px">
        <v-list-item-content class="pr-10 pt-lg-0 pb-lg-0">
          <a
            @click="linkToBlog"
            style="width: 80%;overflow: hidden;text-decoration: none; color: rgba(0, 0, 0, 0.87) !important"
          >
            <v-list-item-title class="headline blog-title mb-0 mt-3">
              {{ topic }}
            </v-list-item-title>
          </a>
          <p class="description mb-0 pt-2">{{ description || content }}</p>
          <div class="d-flex justify-space-between mt-1" style="height: 20px">
            <span style="font-size: 0.775rem;" class="pt-1">
              <a @click="linkToBlog" style=" text-decoration: none">
                {{ $t('Read more') }}...
              </a>
            </span>
            <read-time
              class="pt-0"
              :text="content"
              :customize="'font-size: 0.775rem'"
            />
          </div>
        </v-list-item-content>
        <user-avatar
          :src="author.avatar.secureURL"
          :username="author.username"
          style="padding-bottom: 7px;"
        />
      </v-list-item>

      <v-card-actions style="padding: 2px 25px 0 6px" class="pb-1 pb-lg-2">
        <release-time-card :createdAt="createdAt" />
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
              offset-lg="5"
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
import ReleaseTimeCard from '@/components/Shared/ReleaseTimeCard';
import ReadTime from '@/components/Shared/readTime';
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
    description: {
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
    cover: {
      type: Object,
      default: () => ({}),
    },
    metadata: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Tag,
    LikeBtn,
    CommentBtn,
    UserAvatar,
    ReadTime,
    ReleaseTimeCard,
  },
  data() {
    return {
      blogLink: ROUTES.BLOG(this._id),
    };
  },
  methods: {
    linkToBlog() {
      this.$router.push({ path: this.blogLink });
    },
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

<style scoped lang="scss">
.blog-title {
  text-align: left;
  white-space: initial;
  line-height: 1.25;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  cursor: pointer;
}

.title-link {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}

.blog-card {
  border-radius: 7px !important;
}

.cover-blog {
  border-top-left-radius: 7px !important;
  cursor: pointer;
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

.description {
  overflow: hidden;
  position: relative;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  max-height: 1.4;
  text-align: justify;
  white-space: initial;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
</style>
