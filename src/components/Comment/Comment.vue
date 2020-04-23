<template>
  <div>
    <v-card class="comment mb-5">
      <v-list-item-content class="">
        <v-row>
          <v-col class="pl-9 pr-0 pb-0 d-flex flex-column" cols="5" sm="3" md="4" lg="4" xl="3">
            <div class="d-flex">
              <v-avatar size="60" style="cursor: pointer" dark>
                <img
                  src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                  alt="Avatar"
                />
              </v-avatar>
              <div class="pl-4">
                <p class="title mb-1 mt-1">{{ comment.user.username }}</p>
                <p
                  style="font-size: 13px; color: grey"
                  class="font-italic mb-0"
                >{{ comment.user.job }}</p>
              </div>
            </div>
            <div class="d-flex flex-column pt-3">
              <p style="font-size: 13px; color: grey" class="font-italic mb-2">
                <v-icon size="18">mdi-reply-outline</v-icon>
                <a
                  style="text-decoration: none"
                  :href="`/profile/${author._id}`"
                >@{{ author.username}}</a>
              </p>
              <p
                style="font-size: 13px; color: grey"
                class="font-italic"
              >{{ comment.createdAt | date-time }}</p>
            </div>
          </v-col>
          <v-col
            style="font-size: 15px; line-height: 1.5"
            class="pr-0 pb-0 pl-0"
            cols="7"
            sm="7"
            md="7"
            lg="7"
            xl="8"
          >
            <p class="comment-content">{{ comment.content }}</p>
          </v-col>
        </v-row>
        <v-container class="pl-0 py-0 pr-5 d-flex justify-end">
          <span v-if="comment.childComments.length">
            <v-icon size="18">mdi-reply-outline</v-icon>
            <span style="font-size: 13px; color: green" class="font-italic mb-0">
              {{ comment.childComments.length}}
              {{ comment.childComments.length > 1 ? 'replies' : 'reply'}}
            </span>
          </span>
        </v-container>
      </v-list-item-content>
    </v-card>
    <div v-if="comment.childComments.length" style="margin-left: 80px" class="mb-5">
      <v-card
        v-for="childComment in showingChildComments"
        :key="childComment._id"
        class="comment mb-5"
      >
        <v-list-item-content class="pb-0">
          <v-row>
            <v-col class="pl-9 pr-0 d-flex flex-column " cols="5" sm="4" md="4" lg="4" xl="3">
              <div class="d-flex">
                <v-avatar size="60" style="cursor: pointer" dark>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                    alt="Avatar"
                  />
                </v-avatar>
                <div class="pl-4">
                  <p class="title mb-1 mt-1">{{ childComment.user.username }}</p>
                  <p
                    style="font-size: 13px; color: grey"
                    class="font-italic mb-0"
                  >{{ childComment.user.job }}</p>
                </div>
              </div>
              <div class="d-flex flex-column pt-3">
                <p style="font-size: 13px; color: grey" class="font-italic mb-2">
                  <v-icon size="18">mdi-reply-outline</v-icon>
                  <a
                    style="text-decoration: none"
                    :href="`/profile/${childComment.replyToComment.user._id}`"
                  >@{{ childComment.replyToComment.user.username }}</a>
                </p>
                <p
                  style="font-size: 13px; color: grey"
                  class="font-italic"
                >{{ childComment.createdAt | date-time }}</p>
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
              <p class="comment-content">{{ childComment.content }}</p>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-card>
      <div class="d-flex justify-center" v-if="leftLoadMores > 0">
        <span
          @click="handleClickLoadmoreChildComments"
          class="font-italic load-more"
        >... Load more ... ({{ leftChildCommentsNotShow.length }})</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    postId: {
      type: String
    }
  },
  data() {
    return {
      childCommentPerLoad: 3,
      totalChildComments: 0,
      loadMoreCounter: 1,
      leftLoadMores: 0,
      showingChildComments: [],
      leftChildCommentsNotShow: []
    };
  },
  created() {
    this.totalChildComments = this.comment.childComments.length;
    if (this.totalChildComments) {
      this.showingChildComments = this.comment.childComments.slice(0, 2);
      this.leftChildCommentsNotShow = this.comment.childComments.slice(
        2,
        this.totalChildComments.length
      );
    }
    this.leftLoadMores = Math.ceil(
      this.leftChildCommentsNotShow.length / this.childCommentPerLoad
    );
  },
  methods: {
    handleClickLoadmoreChildComments() {
      ++this.loadMoreCounter;
      this.showingChildComments = [
        ...this.showingChildComments,
        ...this.leftChildCommentsNotShow.slice(0, this.childCommentPerLoad)
      ];
      this.leftChildCommentsNotShow = this.leftChildCommentsNotShow.slice(
        this.childCommentPerLoad,
        this.leftChildCommentsNotShow.length
      );
      this.leftLoadMores = Math.ceil(
        this.leftChildCommentsNotShow.length / this.childCommentPerLoad
      );
    }
  }
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