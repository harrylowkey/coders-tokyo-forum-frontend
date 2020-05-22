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
        <v-skeleton-loader
          class="mx-auto mt-6"
          v-if="isLoading"
          type="article, actions"
        />
        <v-card class="mx-auto mt-6 pb-2" v-if="!isLoading">
          <v-list-item style="padding: 0px 25px 0 20px">
            <v-list-item-content class="pr-10 pt-lg-0 pb-lg-0">
              <v-list-item-title class="headline discussion-title mb-0 py-3">
                {{ post.topic }}
              </v-list-item-title>
              <v-divider />
              <div
                style="line-height: 1.4;"
                class="mt-lg-n9 pt-12"
                v-html="$options.filters.markdown(post.content)"
              />
            </v-list-item-content>
          </v-list-item>

          <v-card-actions
            style="padding: 0 25px 0px 6px"
            class="pb-1 pb-lg-2 d-flex justify-space-between"
          >
            <div class="d-flex">
              <v-card-text
                class="font-italic font-weight-light pt-0 pb-0"
                style="font-size: small"
              >
                {{ post.createdAt | date }}
              </v-card-text>
              <div style="width: 200px">
                <edit-delete-btns
                  v-if="isAuthor"
                  @handleDeletePost="handleDeletePost"
                  :postId="post._id"
                  :postType="post.type"
                />
              </div>
            </div>
            <div>
              <tag
                v-for="(tag, i) in post.tags"
                :key="i"
                class="ml-2"
                :tagName="tag.tagName"
                :style="tagStyle"
                postType="blog"
              />
            </div>
          </v-card-actions>
        </v-card>
        <v-container>
          <v-row id="comments">
            <div style="width: 100%" class="mt-5">
              <h1 class="mb-3 mt-8">Comments</h1>
              <v-boilerplate
                style="width: 100%"
                v-if="isLoading"
                type="image"
              />
              <write-comment
                @handleCommentPost="handleCommentPost"
                v-if="!isLoading"
                :postId="post._id"
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
                    ... Load more ...
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
          <v-row
            id="other-posts-of-author"
            v-if="otherDiscussionsOfAuthor.length"
            class="mb-10"
          >
            <h1 style="width: 100%" class="mt-8 mb-3">Other discussions</h1>
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
              postType="discussions"
              :posts="otherDiscussionsOfAuthor"
            />
          </v-row>
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
  data() {
    return {
      otherDiscussionsOfAuthor: [
        {
          _id: '5e9494fe935dfb5ed04975',
          tags: [
            {
              _id: '5e931565701c6a1f851074ec',
              tagName: 'javascript',
            },
          ],
          comments: [],
          likes: [],
          savedBy: ['5e8b577f1a2dde32298795f4'],
          userId: {
            _id: '5e8b577f1a2dde32298795f4',
            username: 'hongquang',
          },
          topic:
            'How can I remove an image in a folder on cloudinary in Nodejs?',
          content:
            'I have tried this way but the result still the same, anyone help me with this problem? Here is my code...',
          type: 'post',
          createdAt: '2020-04-13T16:36:14.767Z',
          updatedAt: '2020-04-13T16:46:02.835Z',
          metadata: {
            _id: '5e9494fe935fb5ed3043975',
            comments: 123,
            likes: 69,
            saves: 1,
          },
        },
        {
          _id: '5e9494fe95dfb5ed3043975',
          tags: [
            {
              _id: '5e931565701c6a1f851074ec',
              tagName: 'javascript',
            },
          ],
          comments: [],
          likes: [],
          savedBy: ['5e8b577f1a2dde32298795f4'],
          userId: {
            _id: '5e8b577f1a2dde32298795f4',
            username: 'hongquang',
          },
          topic:
            'How can I remove an image in a folder on cloudinary in Nodejs?',
          content:
            'I have tried this way but the result still the same, anyone help me with this problem? Here is my code...',
          type: 'post',
          createdAt: '2020-04-13T16:36:14.767Z',
          updatedAt: '2020-04-13T16:46:02.835Z',
          metadata: {
            _id: '5e9494fe935dfbed3043975',
            comments: 20,
            likes: 6,
            saves: 1,
          },
        },
      ],
    };
  },
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

.discussion-title {
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

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
