<template>
  <div class="comments-wrapper">
    <div>
      <v-card class="comment mb-5 pt-3 pr-5" style="position: relation">
        <v-list-item-content class>
          <v-row>
            <v-col
              class="pl-9 pr-0 pb-0 d-flex flex-column"
              cols="5"
              sm="3"
              md="4"
              lg="4"
              xl="4"
            >
              <div class="d-flex">
                <v-avatar size="60" style="cursor: pointer" dark>
                  <img
                    :src="comment.user.avatar.secureURL"
                    alt="Avatar"
                    @click="onClickAvatar"
                  />
                </v-avatar>
                <div class="pl-4">
                  <p class="title mb-0 mt-1">
                    <a
                      style="text-decoration: none; color: #000; font-size: 15px !important"
                      :href="linkToUser(comment.user.username)"
                    >
                      {{ comment.user.username }}
                    </a>
                  </p>
                  <p
                    style="font-size: 13px; color: grey"
                    class="font-italic mb-0"
                  >
                    {{ comment.user.job }}
                  </p>
                </div>
              </div>
              <div class="d-flex flex-column pt-3">
                <p
                  style="font-size: 13px; color: grey"
                  class="font-italic mb-2"
                >
                  <v-icon class="mr-1" size="18">mdi-reply-outline</v-icon>
                  <a
                    style="text-decoration: none"
                    :href="linkToUser(author.username)"
                  >
                    @{{ author.username }}
                  </a>
                </p>
                <p
                  style="font-size: 13px; color: grey"
                  class="font-italic mb-0 pt-2"
                >
                  {{ $d(new Date(comment.createdAt), 'long', 'vi-VN') }}
                </p>
              </div>
            </v-col>
            <v-col
              style="font-size: 15px; line-height: 1.5"
              class="pr-0 pb-0 pl-0"
              cols="7"
              sm="6"
              md="7"
              lg="7"
              xl="8"
            >
              <p
                v-html="$options.filters.markdown(comment.content)"
                class="comment-content markdown-content"
              />
            </v-col>
          </v-row>
          <v-container class="pl-0 py-0 pr-1 d-flex justify-end">
            <v-icon
              class="reply-icon"
              @click="isReplyComment = !isReplyComment"
              size="18"
            >
              mdi-reply-outline
            </v-icon>
            <span
              v-if="comment.childComments.length"
              style="font-size: 13px; color: green; margin-top: 2px"
              class="font-italic mb-0 ml-1"
            >
              {{ comment.childComments.length }}
              {{
                comment.childComments.length > 1 ? $t('replies') : $t('reply')
              }}
            </span>
          </v-container>
        </v-list-item-content>
        <v-card-actions class="edit-delete-btn">
          <div v-if="isAuthorComment">
            <v-icon
              @click="onClickDeleteComment"
              class="delete-comment-icon"
              size="15"
            >
              mdi-window-close
            </v-icon>
          </div>
        </v-card-actions>
      </v-card>
      <write-reply-comment
        type="replyComment"
        v-if="isReplyComment"
        :rows="3"
        :placeholder="$t('Reply to') + ` ${comment.user.username}`"
        :postId="postId"
        :commentId="comment._id"
        :autofocus="true"
        @handleWriteComment="handleWriteComment"
      />
    </div>

    <div
      v-if="comment.childComments.length"
      style="margin-left: 80px"
      class="mb-5"
    >
      <transition-group name="list">
        <div
          v-for="childComment in showingChildComments"
          :key="childComment._id"
        >
          <v-card class="comment mb-5 pt-3 pr-5">
            <v-list-item-content>
              <v-row>
                <v-col
                  class="pl-9 pr-0 pb-0 d-flex flex-column"
                  cols="5"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="3"
                >
                  <div class="d-flex">
                    <v-avatar size="60" style="cursor: pointer" dark>
                      <img
                        :src="childComment.user.avatar.secureURL"
                        alt="Avatar"
                      />
                    </v-avatar>
                    <div class="pl-4">
                      <p
                        style="font-size: 15px !important"
                        class="title mb-1 mt-1"
                      >
                        {{ childComment.user.username }}
                      </p>
                      <p
                        style="font-size: 13px; color: grey"
                        class="font-italic mb-0"
                      >
                        {{ childComment.user.job }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-column pt-3">
                    <p
                      style="font-size: 13px; color: grey"
                      class="font-italic mb-2"
                    >
                      <v-icon size="18">mdi-reply-outline</v-icon>
                      <a
                        style="text-decoration: none"
                        :href="
                          linkToUser(childComment.replyToComment.user.username)
                        "
                      >
                        @{{ childComment.replyToComment.user.username }}
                      </a>
                    </p>
                    <p
                      style="font-size: 13px; color: grey"
                      class="font-italic mb-0 pt-2"
                    >
                      {{
                        $d(new Date(childComment.createdAt), 'long', 'vi-VN')
                      }}
                    </p>
                  </div>
                </v-col>
                <v-col
                  style="font-size: 15px; line-height: 1.5;"
                  class="pr-0 pb-0 pl-4 mt-5"
                  cols="7"
                  sm="7"
                  md="7"
                  lg="7"
                  xl="8"
                >
                  <p
                    v-html="$options.filters.markdown(childComment.content)"
                    class="comment-content"
                  />
                </v-col>
              </v-row>
              <v-container class="pl-0 py-0 pr-1 d-flex justify-end">
                <v-icon
                  @click="
                    isReplyChildComments[
                      childComment._id
                    ] = !isReplyChildComments[childComment._id]
                  "
                  size="18"
                  class="reply-icon"
                >
                  mdi-reply-outline
                </v-icon>
                <span
                  v-if="comment.childComments.length"
                  style="font-size: 13px; color: green"
                  class="font-italic mb-0"
                />
              </v-container>
            </v-list-item-content>
            <v-card-actions class="edit-delete-btn">
              <div v-if="isAuthorChildComment(childComment)">
                <v-icon
                  @click="
                    onClickDeleteReplyComment(childComment._id, comment._id)
                  "
                  class="delete-comment-icon"
                  size="15"
                >
                  mdi-window-close
                </v-icon>
              </div>
            </v-card-actions>
          </v-card>
          <write-reply-comment
            type="threadReplyComment"
            v-if="isReplyChildComments[childComment._id]"
            :rows="3"
            :placeholder="$t('Reply to') + ` ${childComment.user.username}`"
            :postId="postId"
            :commentId="childComment._id"
            :parentId="comment._id"
            :autofocus="true"
            @handleWriteComment="handleWriteComment"
          />
        </div>
      </transition-group>
    </div>
    <div class="d-flex justify-center mb-3" v-if="leftLoadMores() > 0">
      <span
        @click="handleClickLoadmoreChildComments"
        class="font-italic load-more"
      >
        {{ $t('View more replies') }} ({{ leftChildCommentsNotShow.length }})
      </span>
    </div>
  </div>
</template>

<script>
import WriteReplyComment from '@/components/Comment/WriteComment';
import { ROUTES } from '@/mixins/routes';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      childCommentPerLoad: 2,
      loadMoreCounter: 1,
      showingChildComments: [],
      leftChildCommentsNotShow: [],
      isPreviewing: false,
      isReplyComment: false,
      isReplyChildComments: {},
    };
  },
  created() {
    this.calShowingChildComments();
    this.calLeftChildCommentsNotShow();
    this.leftLoadMores();
    this.initIsReplyChildComments();
  },
  methods: {
    handleWriteComment() {
      this.childCommentPerLoad = this.comment.childComments.length;
      this.handleClickLoadmoreChildComments();
    },
    linkToUser(username) {
      return ROUTES.USER_PROFILE({ username: username });
    },
    onClickAvatar() {
      this.$router.push({
        path: ROUTES.USER_PROFILE({ username: this.user.username }),
      });
    },
    handleClickLoadmoreChildComments() {
      ++this.loadMoreCounter;
      this.showingChildComments = [
        ...this.showingChildComments,
        ...this.leftChildCommentsNotShow.slice(0, this.childCommentPerLoad),
      ];
      this.leftChildCommentsNotShow = this.leftChildCommentsNotShow.slice(
        this.childCommentPerLoad,
        this.leftChildCommentsNotShow.length,
      );
      this.leftLoadMores();
    },
    onClickDeleteComment() {
      this.$emit('handleDeleteComment', {
        commentId: this.comment._id,
        type: 'comment',
      });
    },
    onClickDeleteReplyComment(commentId, parentId) {
      this.$emit('handleDeleteComment', {
        commentId,
        parentId,
        type: 'replyComment',
      });
    },
    calShowingChildComments() {
      if (this.totalChildComments) {
        const showingChildCommentList = this.comment.childComments.slice(
          0,
          this.childCommentPerLoad,
        );
        this.showingChildComments = showingChildCommentList;
      } else {
        return [];
      }
    },
    calLeftChildCommentsNotShow() {
      if (this.totalChildComments) {
        const leftChildCommentsNotShowList = this.comment.childComments.slice(
          this.childCommentPerLoad,
          this.totalChildComments.length,
        );
        this.leftChildCommentsNotShow = leftChildCommentsNotShowList;
      } else {
        return [];
      }
    },
    leftLoadMores() {
      return Math.ceil(
        this.leftChildCommentsNotShow.length / this.childCommentPerLoad,
      );
    },
    initIsReplyChildComments() {
      const childComments = this.comment.childComments;
      if (!childComments.length) return {};
      const initReplyChildComments = {};
      childComments.map(childComment => {
        initReplyChildComments[childComment._id] = false;
        return initReplyChildComments;
      });

      this.isReplyChildComments = initReplyChildComments;
    },
    isAuthorChildComment(childComment) {
      return childComment.user._id === this.user._id;
    },
  },
  components: {
    WriteReplyComment,
  },
  computed: {
    isAuthorComment() {
      if (!this.user) return false;
      return this.comment.user._id === this.user._id;
    },
    totalChildComments() {
      return this.comment.childComments.length;
    },
  },
  watch: {
    totalChildComments() {
      ++this.childCommentPerLoad;
      this.calShowingChildComments();
      this.calLeftChildCommentsNotShow();
      this.leftLoadMores();
      this.initIsReplyChildComments();
    },
  },
};
</script>

<style scoped>
.load-more {
  font-size: 13px;
  cursor: pointer;
}

.load-more:hover {
  color: green;
}

.comment-content {
  font-size: 16px !important;
}

.comment-content >>> img {
  width: 100% !important;
}

.edit-delete-btn {
  position: absolute;
  top: 0px;
  right: 4px;
}

.delete-comment-icon {
  cursor: pointer;
}

.delete-comment-icon:hover {
  color: red;
}

.reply-icon:hover {
  color: green;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}

.markdown-content >>> img {
  width: 50% !important;
}

::v-deep pre code:before {
  content: '' !important;
}

.markdown-content {
  line-height: 1.6;
}

::v-deep code:before {
  content: '' !important;
}

::v-deep code:after {
  content: '' !important;
}

::v-deep code {
  font-size: 13.5px !important;
  box-shadow: none;
  background-color: #fff;
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
