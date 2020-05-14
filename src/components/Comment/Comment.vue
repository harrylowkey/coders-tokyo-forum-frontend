<template>
  <div class="comments-wrapper">
    <div>
      <v-card class="comment mb-5">
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
                    src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                    alt="Avatar"
                    @click="onClickAvatar"
                  />
                </v-avatar>
                <div class="pl-4">
                  <p class="title mb-1 mt-1">
                    <a style="text-decoration: none; color: #000" :href="link">
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
                  <v-icon size="18">mdi-reply-outline</v-icon>
                  <a style="text-decoration: none" :href="link">
                    @{{ author.username }}
                  </a>
                </p>
                <p style="font-size: 13px; color: grey" class="font-italic">
                  {{ comment.createdAt | dateTime }}
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
                class="comment-content"
              />
            </v-col>
          </v-row>
          <v-container class="pl-0 py-0 pr-5 d-flex justify-end">
            <v-icon @click="isReplyComment = !isReplyComment" size="18">
              mdi-reply-outline
            </v-icon>
            <span
              v-if="comment.childComments.length"
              style="font-size: 13px; color: green"
              class="font-italic mb-0"
            >
              {{ comment.childComments.length }}
              {{ comment.childComments.length > 1 ? 'replies' : 'reply' }}
            </span>
          </v-container>
        </v-list-item-content>
      </v-card>
      <write-reply-comment
        v-if="isReplyComment"
        :rows="3"
        :placeholder="`Reply ${comment.user.username}`"
      />
    </div>

    <div
      v-if="comment.childComments.length"
      style="margin-left: 80px"
      class="mb-5"
    >
      <div v-for="childComment in showingChildComments" :key="childComment._id">
        <v-card class="comment mb-5">
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
                      src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                      alt="Avatar"
                    />
                  </v-avatar>
                  <div class="pl-4">
                    <p class="title mb-1 mt-1">
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
                      :href="`/profile/${childComment.replyToComment.user._id}`"
                    >
                      @{{ childComment.replyToComment.user.username }}
                    </a>
                  </p>
                  <p style="font-size: 13px; color: grey" class="font-italic">
                    {{ childComment.createdAt | dateTime }}
                  </p>
                </div>
              </v-col>
              <v-col
                style="font-size: 15px; line-height: 1.5"
                class="pr-0 pb-0 pl-4"
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
            <v-container class="pl-0 py-0 pr-5 d-flex justify-end">
              <v-icon
                @click="
                  isReplyChildComments[
                    childComment._id
                  ] = !isReplyChildComments[childComment._id]
                "
                size="18"
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
        </v-card>
        <write-reply-comment
          v-if="isReplyChildComments[childComment._id]"
          :rows="3"
          :placeholder="`Reply ${childComment.user.username}`"
        />
      </div>
    </div>
    <div class="d-flex justify-center mb-3" v-if="leftLoadMores > 0">
      <span
        @click="handleClickLoadmoreChildComments"
        class="font-italic load-more"
      >
        ... Load more ... ({{ leftChildCommentsNotShow.length }})
      </span>
    </div>
  </div>
</template>

<script>
import WriteReplyComment from '@/components/Comment/WriteComment';

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
    },
  },
  data() {
    return {
      childCommentPerLoad: 3,
      totalChildComments: 0,
      loadMoreCounter: 1,
      leftLoadMores: 0,
      showingChildComments: [],
      leftChildCommentsNotShow: [],
      isPreviewing: false,
      isReplyComment: false,
      isReplyChildComments: {},
      link: '',
    };
  },
  created() {
    this.totalChildComments = this.comment.childComments.length;
    if (this.totalChildComments) {
      this.showingChildComments = this.comment.childComments.slice(0, 2);
      this.leftChildCommentsNotShow = this.comment.childComments.slice(
        2,
        this.totalChildComments.length,
      );
    }
    this.leftLoadMores = Math.ceil(
      this.leftChildCommentsNotShow.length / this.childCommentPerLoad,
    );

    const childComments = this.comment.childComments;
    if (!childComments.length) return {};
    const initReplyChildComments = {};
    childComments.map(childComment => {
      // eslint-disable-next-line no-underscore-dangle
      initReplyChildComments[childComment._id] = false;
      return initReplyChildComments;
    });

    this.isReplyChildComments = initReplyChildComments;
  },
  methods: {
    onClickAvatar() {
      this.$router.push({ path: this.link });
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
      this.leftLoadMores = Math.ceil(
        this.leftChildCommentsNotShow.length / this.childCommentPerLoad,
      );
    },
  },
  components: {
    WriteReplyComment,
  },
  computed: {},
  // eslint-disable-next-line no-dupe-keys
  created() {
    this.link = `/users/${this.author.username}`;
  },
};
</script>

<style>
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
</style>
