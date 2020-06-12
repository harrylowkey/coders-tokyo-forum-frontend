<template>
  <div class="mt-12">
    <v-row id="post">
      <v-col
        cols="12"
        sm="12"
        md="1"
        lg="1"
        xl="1"
        class="pr-0 wrapper-icon d-sm-none d-md-flex"
      >
        <post-reactions
          v-if="!isLoading"
          @hanldeClickCommentBtn="hanldeClickCommentBtn"
          @likedPost="handleLikedPost"
          @unlikedPost="handleUnlikedPost"
          @savedPost="handleSavedPost"
          @unsavedPost="handleUnsavedPost"
          :postId="post._id"
          :likes="post.likes"
          :saves="post.savedBy"
          :flowers="0"
          :isUserLiked="isUserLiked"
          :isUserSaved="isUserSaved"
        />
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <a
          id="trigger-scroll-comments"
          style="display: none"
          href="#"
          v-scroll-to="'#comments'"
        >
          Scroll to #comment
        </a>
        <v-skeleton-loader />
        <v-boilerplate
          class="mx-auto mt-6"
          v-if="isLoading"
          type="image, card-avatar, article"
        />
        <v-card class="mx-auto mt-6" v-else id="blog-card" elevation="6">
          <v-container class="pa-0">
            <v-img
              :src="post.cover.secureURL"
              height="450px"
              style
              class="cover-blog"
            />
          </v-container>
          <v-container v-if="!isLoading" style="padding: 15px 50px 20px 50px;">
            <v-list-item three-line style="padding: 10px 25px 25px 0px">
              <v-list-item-content class="pr-10 pt-lg-0">
                <v-list-item-title class="blog-title mb-0">
                  <h1 class="blog-title">{{ post.topic }}</h1>
                </v-list-item-title>
                <v-card-actions class="pl-0">
                  <v-avatar size="40" dark>
                    <img :src="post.user.avatar.secureURL" alt="Avatar" />
                  </v-avatar>
                  <v-card-subtitle style="font-size: 16px" class="ml-n1 pr-0">
                    <a
                      style="text-decoration: none; color: #000"
                      :href="authorProfileLink"
                    >
                      {{ post.user.username }}
                    </a>
                  </v-card-subtitle>
                  <v-list-item-icon class="mb-0 ml-3">
                    <v-icon
                      v-for="link in socialLinks"
                      :key="link.icon"
                      :color="link.color"
                      size="20"
                      class="pr-1"
                      style="cursor: pointer"
                      @click="handleClickLink(link.url)"
                    >
                      {{ link.icon }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-card-subtitle class="pl-1">
                    {{ post.createdAt | date }}
                  </v-card-subtitle>
                  <read-time class="pl-0" :text="post.content" />
                  <edit-delete-btns
                    v-if="isAuthor"
                    @handleDeletePost="handleDeletePost"
                    :postId="post._id"
                    :postType="post.type"
                  />
                </v-card-actions>
                <v-card-text
                  v-if="post.tags.length"
                  style="margin-left: -25px"
                  class="pt-3"
                >
                  <tag
                    v-for="(tag, i) in post.tags"
                    :key="i"
                    class="ml-2"
                    :tagName="tag.tagName"
                    :style="tagStyle"
                    postType="blog"
                  />
                </v-card-text>
              </v-list-item-content>
            </v-list-item>
            <div
              class="markdown-content"
              v-html="$options.filters.markdown(post.content)"
            />
            <div class="d-flex justify-end">
              <span class="signature">{{ post.user.username }}</span>
            </div>
          </v-container>
        </v-card>
        <v-container>
          <v-row id="comments">
            <div style="width: 100%" id="comments" class="mt-5">
              <h1 class="mb-3 mt-8">Comments</h1>

              <v-boilerplate
                style="width: 100%"
                v-if="isLoading"
                type="image"
              />
              <write-comment
                v-if="!isLoading"
                :postId="post._id"
                type="comment"
              />

              <div v-if="!isLoading && post.comments.length">
                <transition-group name="list">
                  <comment
                    transition="slide-y-transition"
                    v-for="comment in post.comments"
                    :key="comment._id"
                    :comment="comment"
                    :author="post.user"
                    :postId="post._id"
                    :user="user"
                    @handleDeleteComment="handleDeleteComment"
                  />
                </transition-group>
              </div>
              <div class="loadmore-comment-wrapper" v-if="!isLoading">
                <div
                  class="d-flex justify-center mb-3"
                  v-if="commentMetadata.page < commentMetadata.totalPage"
                >
                  <span
                    @click="handleLoadmoreComments"
                    class="font-italic load-more"
                  >
                    ... Load more comments ...
                  </span>
                </div>
                <v-text-field
                  color="primary"
                  v-if="isLoadmore"
                  loading
                  disabled
                />
              </div>
            </div>
          </v-row>
          <v-divider />
          <div v-if="!isLoadingAPI">
            <v-row
              id="other-posts-of-author"
              v-if="otherPostsOfAuthor.length"
              class="mb-10"
            >
              <h1 class="mt-8 mb-3">Other Blogs</h1>
              <div style="width: 100%" class="d-flex" v-if="isLoading">
                <v-boilerplate
                  class="other-post"
                  style="width: 100%"
                  type="article"
                />
                <v-boilerplate
                  class="other-post"
                  style="width: 100%"
                  type="article"
                />
              </div>
              <other-posts-of-author
                v-if="!isLoading"
                typeParam="blogs"
                typeQuery="blog"
                :posts="otherPostsOfAuthor.slice(0, 2)"
              />
            </v-row>
          </div>
        </v-container>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
        class="wrapper-author-follow d-sm-none d-md-flex"
      >
        <v-boilerplate
          class="author-follow"
          style="width: 100%; padding: 5px 10px; background: #fff"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />
        <author-follow-card
          v-if="!isLoading"
          class="author-follow"
          :author="post.user"
          @handleFollow="handleFollow"
          @handleUnFollow="handleUnFollow"
          :isFollowing="isFollowing"
          :isAuthor="isAuthor"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { crudPost } from '@/mixins/crudPost';

export default {
  mixins: [crudPost],
  methods: {
    handleLikedPost({ user }) {
      this.post.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ user }) {
      this.post.likes = this.post.likes.filter(_user => _user._id !== user._id);
    },
    handleSavedPost({ user }) {
      this.post.savedBy.push({ username: user.username, _id: user._id });
    },
    handleUnsavedPost({ user }) {
      this.post.savedBy = this.post.savedBy.filter(
        _user => _user._id !== user._id,
      );
    },
  },
  computed: {},
  created() {},
  components: {},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

#blog-card {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.signature {
  font-family: 'Great Vibes', cursive;
  font-size: 28px;
}

.wrapper-author-follow {
  position: relative;
  padding: 0 25px 0 20px;
}

.author-follow {
  position: fixed;
  max-width: 365px;
  z-index: 0;
  top: 100px;
}

.icon {
  font-size: 40px;
  cursor: pointer;
  border-radius: 50%;
  padding: 6px;
}

/* .heart-icon:hover {
  border: 1.5px solid #f44336;
}

.saved-icon:hover {
  border: 1.5px solid #0288d1;
}

.coin-icon:hover {
  border: 1.5px solid #66bb6a;
} */

.wrapper-icon {
  position: relative;
}

.other-blogs {
  flex: 30%;
  padding: 20px;
  justify-content: center;
  border-radius: 0px !important;
}

.blog-title {
  text-align: left;
  white-space: initial;
  line-height: 1.3;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.description {
  overflow: hidden;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  max-height: 1.4;
  white-space: initial;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.other-post {
  flex: 30%;
  margin: 20px;
  justify-content: center;
}

.markdown-content >>> img {
  width: 100% !important;
}

::v-deep pre code:before {
  content: '' !important;
}

::v-deep pre code {
  display: block;
  overflow-x: auto;
  padding: 1em;
  color: #abb2bf;
  background: #282c34;
  margin: 15px 0px; 
}
</style>
