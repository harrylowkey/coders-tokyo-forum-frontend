<template>
  <div>
    <v-row id="post">
      <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0 wrapper-icon d-sm-none d-md-flex">
        <post-reactions
          v-if="post"
          :likes="(post && post.metadata) ? post.metadata.likes : 0"
          :saves="(post && post.metadata) ? post.metadata.saves : 0"
          :flowers="0"
          :postId="post._id"
        ></post-reactions>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <v-skeleton-loader class="mx-auto mt-6" v-if="isLoading" type="article, actions"></v-skeleton-loader>
        <v-card class="mx-auto mt-6 pb-2" v-if="!isLoading">
          <v-list-item style="padding: 0px 25px 0 20px">
            <v-list-item-content class="pr-10 pt-lg-0 pb-lg-0">
              <v-list-item-title class="headline discuss-title mb-0 py-3">{{ post.topic }}</v-list-item-title>
              <v-divider></v-divider>
              <div
                style="line-height: 1.4;"
                class="mt-lg-n9 pt-12"
                v-html="$options.filters.markdown(post.content)"
              ></div>
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
              >{{ post.createdAt | date }}</v-card-text>
              <div style="width: 200px">
                <edit-delete-btns
                  v-if="isAuthor"
                  @handleDeletePost="handleDeletePost"
                  :postId="post._id"
                  :postType="post.type"
                ></edit-delete-btns>
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
              ></tag>
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
                type="list-item-three-line, actions"
              ></v-boilerplate>
              <write-comment v-if="!isLoading"></write-comment>

              <div v-if="post ? post.comments.length : false">
                <comment
                  v-for="comment in post.comments"
                  :key="comment._id"
                  :comment="comment"
                  :author="post.user"
                  :postId="post._id"
                ></comment>
              </div>
            </div>
          </v-row>
          <v-divider></v-divider>
          <v-row id="other-posts-of-author" v-if="otherDiscussionsOfAuthor.length" class="mb-10">
            <h1 style="width: 100%" class="mt-8 mb-3">Other discussions</h1>
            <div style="width: 100%" class="d-flex" v-if="isLoading">
              <v-boilerplate class="other-post" style="width: 100%" type="article"></v-boilerplate>
              <v-boilerplate class="other-post" style="width: 100%" type="article"></v-boilerplate>
            </div>
            <other-posts-of-author
              v-if="!isLoading"
              postType="discussions"
              :posts="otherDiscussionsOfAuthor"
            ></other-posts-of-author>
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
          style="width: 100%"
          v-if="isLoading"
          type="list-item-avatar-three-line, divider, list-item-two-line"
        ></v-boilerplate>
        <author-follow-card
          v-if="!isLoading"
          class="author-follow"
          :isAuthor="isAuthor"
          :author="post.user"
          :userId="user._id"
        ></author-follow-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from "@/components/Shared/LikeButton";
import CommentBtn from "@/components/Shared/CommentButton";
import FacebookBtn from "@/components/Shared/FacebookButton";
import ViewsBtn from "@/components/Shared/ViewsButton";
import Tag from "@/components/Shared/Tag";
import UserAvatar from "@/components/Shared/UserAvatar";
import UserSocialLinks from "@/components/Shared/UserSocialLinks";
import AuthorProfile from "@/components/User/Profile";
import AuthorFollowCard from "@/components/User/AuthorFollow";
import Comment from "@/components/Comment/Comment";
import PostReactions from "@/components/Shared/PostReactions";
import OtherPostsOfAuthor from "@/components/Shared/OtherPostsOfAuthor";
import { userSocialLinks } from "@/mixins/userSocialLinks";
import ReadTime from "@/components/Shared/readTime";
import WriteComment from "@/components/Comment/WriteComment";
import EditDeleteBtns from "../Post/EditDeleteBtns";
import { mapActions, mapState } from "vuex";
export default {
  mixins: [userSocialLinks],
  data() {
    return {
      otherDiscussionsOfAuthor: [
        {
          _id: "5e9494fe935dfb5ed04975",
          tags: [
            {
              _id: "5e931565701c6a1f851074ec",
              tagName: "javascript"
            }
          ],
          comments: [],
          likes: [],
          savedBy: ["5e8b577f1a2dde32298795f4"],
          userId: {
            _id: "5e8b577f1a2dde32298795f4",
            username: "hongquang"
          },
          topic:
            "How can I remove an image in a folder on cloudinary in Nodejs?",
          content:
            "I have tried this way but the result still the same, anyone help me with this problem? Here is my code...",
          type: "post",
          createdAt: "2020-04-13T16:36:14.767Z",
          updatedAt: "2020-04-13T16:46:02.835Z",
          metadata: {
            _id: "5e9494fe935fb5ed3043975",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9494fe95dfb5ed3043975",
          tags: [
            {
              _id: "5e931565701c6a1f851074ec",
              tagName: "javascript"
            }
          ],
          comments: [],
          likes: [],
          savedBy: ["5e8b577f1a2dde32298795f4"],
          userId: {
            _id: "5e8b577f1a2dde32298795f4",
            username: "hongquang"
          },
          topic:
            "How can I remove an image in a folder on cloudinary in Nodejs?",
          content:
            "I have tried this way but the result still the same, anyone help me with this problem? Here is my code...",
          type: "post",
          createdAt: "2020-04-13T16:36:14.767Z",
          updatedAt: "2020-04-13T16:46:02.835Z",
          metadata: {
            _id: "5e9494fe935dfbed3043975",
            comments: 20,
            likes: 6,
            saves: 1
          }
        }
      ],
      tagStyle: {
        fontSize: "0.825em !important",
        fontWeight: 300,
        padding: "3px 4px",
        height: "25px",
        letterSpacing: "0.0111333333em !important",
        marginLeft: "12px !important",
        borderRadius: "4px"
      },
      comment: "",
      post: null
    };
  },
  methods: {
    ...mapActions("post", ["getPostById", "deletePostById"]),
    async handleDeletePost() {
      const response = await this.deletePostById({
        id: this.post._id,
        typeQuery: this.post.type
      });
      if (response.status === 200) {
        this.$notify({
          type: "success",
          title: response.data.message
        });
      }
      if (response.status === 400) {
        this.$notify({
          type: "error",
          title: response.message
        });
      }
      setTimeout(() => {
        return this.$router.push({ path: "/stream" });
      }, 1000);
    },
    async fetchPost() {
      this.getPostById({
        id: this.$route.params.id,
        typeQuery: this.$route.query.type
      }).then(data => (this.post = data));
    }
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("utils", ["isLoading", "errorMes"]),
    isAuthor() {
      return this.post ? this.user._id === this.post.user._id : false;
    }
  },
  async created() {
    this.post = await this.fetchPost();
  },
  components: {
    Tag,
    ReadTime,
    UserSocialLinks,
    LikeBtn,
    CommentBtn,
    EditDeleteBtns,
    UserAvatar,
    FacebookBtn,
    ViewsBtn,
    Comment,
    WriteComment,
    AuthorProfile,
    AuthorFollowCard,
    PostReactions,
    OtherPostsOfAuthor,
    VBoilerplate: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          "v-skeleton-loader",
          {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props
            }
          },
          children
        );
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");

#blog-card {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.signature {
  font-family: "Great Vibes", cursive;
  font-size: 28px;
}

.blog-title {
  text-align: left;
  white-space: initial;
  line-height: 1.3;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.wrapper-author-follow {
  position: relative;
  padding: 0 25px 0 20px;
}

.author-follow {
  position: fixed;
  max-width: 325px;
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
  line-height: 1.1;
  -webkit-line-clamp: 2;
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
</style>