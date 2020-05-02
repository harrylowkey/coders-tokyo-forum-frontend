<template>
  <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
    <v-card class="mx-auto mt-6 blog-card" :elevation="hover ? 20 : 3">
      <v-img
        v-if="cover.secureURL"
        src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        height="350px"
        class="cover-blog"
        @click="linkToBlog"
      ></v-img>

      <v-list-item three-line style="padding: 0 25px 0 20px">
        <v-list-item-content class="pr-10 pt-lg-0 pb-lg-0">
          <router-link class="title-link" :to="blogLink">
            <v-list-item-title class="headline blog-title mb-0 mt-3">{{ topic }}</v-list-item-title>
          </router-link>
          <p class="description mb-0 pt-2">{{ description || content }}</p>
          <div class="d-flex justify-space-between mt-1" style="height: 20px">
            <span style="font-size: 0.775rem;" class="pt-1">
              <a style=" text-decoration: none" :href="blogLink">Read more...</a>
            </span>
            <read-time class="pt-0" :text="content" :customize="'font-size: 0.775rem'"></read-time>
          </div>
        </v-list-item-content>
        <user-avatar
          :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
          :username="user.username"
          style="padding-bottom: 7px;"
        ></user-avatar>
      </v-list-item>

      <v-card-actions style="padding: 2px 25px 0 6px" class="pb-1 pb-lg-2">
        <v-card-text
          class="font-italic font-weight-light pt-0 pb-0"
          style="font-size: small"
        >{{ createdAt | date }}</v-card-text>
        <v-spacer></v-spacer>
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
              <like-btn :likes="200"></like-btn>
            </v-col>
            <v-col class="pa-lg-0">
              <comment-btn :comments="500"></comment-btn>
            </v-col>
          </v-row>
        </v-container>
        <tag :tagName="tags[0].tagName" :postType="'blog'"></tag>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import LikeBtn from "@/components/Shared/LikeButton";
import CommentBtn from "@/components/Shared/CommentButton";
import Tag from "@/components/Shared/Tag";
import UserAvatar from "@/components/Shared/UserAvatar";
import ReadTime from "@/components/Shared/readTime";

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
    user: {
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
    description: {
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
    cover: {
      type: Object,
      default: () => ({})
    },
    metadata: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Tag,
    LikeBtn,
    CommentBtn,
    UserAvatar,
    ReadTime
  },
  data() {
    return {
      blogLink: ""
    };
  },
  methods: {
    linkToBlog() {
      this.$router.push({ path: this.blogLink });
    }
  },
  created() {
    this.blogLink = `/blogs/${this._id}`;
  }
};
</script>

<style scoped lang="scss">
.blog-title {
  text-align: left;
  white-space: initial;
  line-height: 1.1;
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