<template>
  <div>
    <v-row id="post">
      <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0 wrapper-icon d-sm-none d-md-flex">
        <post-reactions
          :likes="post.metadata.likes"
          :saves="post.metadata.saves"
          :flowers="123"
          :postId="post._id"
        ></post-reactions>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <v-card class="mx-auto mt-6 pb-2">
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
                  @handleEditPost="handleEditPost"
                  @handleDeletePost="handleDeletePost"
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
          <v-divider></v-divider>
          <v-row id="comments">
            <div id="comments" class="mt-5">
              <h1 class="mb-3 mt-8">Comments</h1>

              <write-comment></write-comment>

              <div v-if="post.comments.length">
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
            <h1 class="mt-8 mb-3">Other discussions</h1>
            <other-posts-of-author postType="discussions" :posts="otherDiscussionsOfAuthor"></other-posts-of-author>
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
        <author-follow-card class="author-follow" :user="user" :description="user.description"></author-follow-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import marked from "marked";
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

export default {
  mixins: [userSocialLinks],
  data() {
    return {
      post: {
        _id: "5e9494fe935dfb5ed3043975",
        tags: [
          {
            _id: "5e931565701c6a1f851074ec",
            tagName: "javascript"
          },
          {
            _id: "5e931565701c6a1f851074ec",
            tagName: "javascript"
          }
        ],
        comments: [
          {
            _id: "5ea04ece861ec016ab4e7280",
            childComments: [
              {
                _id: "5ea08f6d14328169d8422a42",
                content:
                  "#reply thread \n\nWhy Markdown?\n [Marked] lets you convert [Markdown] into HTML\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea04ece861ec016ab4e7280",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "nhat_anh"
                  }
                },
                createdAt: "2020-04-22T18:39:41.982Z"
              },
              {
                _id: "5ea08f6073749769b53fd952",
                content: "reply thread",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea04ece861ec016ab4e7280",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "nhat_anh"
                  }
                },
                createdAt: "2020-04-22T18:39:28.963Z"
              },
              {
                _id: "5ea08f0a467cac6969fe223f",
                content: "replycomment",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "thanh_ton",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08f6073749769b53fd952",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:38:02.161Z"
              },
              {
                _id: "5ea08efc467cac6969fe223e",
                content: "replycomment",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08ee8467cac6969fe223d",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:37:48.322Z"
              },
              {
                _id: "5ea08f6d14328169d8422a42",
                content: "reply thread",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "dev"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08f0a467cac6969fe223f",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:39:41.982Z"
              },
              {
                _id: "5ea08f6073749769b53fd952",
                content: "reply thread",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08f0a467cac6969fe223f",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:39:28.963Z"
              },
              {
                _id: "5ea08f0a467cac6969fe223f",
                content: "replycomment",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08ee8467cac6969fe223d",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:38:02.161Z"
              },
              {
                _id: "5ea08efc467cac6969fe223e",
                content: "replycomment",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08ee8467cac6969fe223d",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:37:48.322Z"
              }
            ],
            postId: "5e9ecbe865e89626b7a4fd27",
            content:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A eveniet nisi atque suscipit, magni quia placeat eaque, quisquam eos dolores voluptatibus, quasi pariatur expedita minima quidem quibusdam odio. Iure, esse.",
            user: {
              _id: "5e8b577f1a2dde32298795f4",
              username: "nhat_anh",
              job: "Developer"
            },
            parentId: null,
            createdAt: "2020-04-22T14:03:58.083Z",
            updatedAt: "2020-04-22T14:21:50.493Z"
          },
          {
            _id: "5ea04eca861ec016ab4e727f",
            childComments: [],
            postId: "5e9ecbe865e89626b7a4fd27",
            content: "comment2",
            user: {
              _id: "5e8b577f1a2dde32298795f4",
              username: "thanh_ton",
              job: "Developer"
            },
            parentId: null,
            createdAt: "2020-04-22T14:03:54.429Z",
            updatedAt: "2020-04-22T14:03:54.429Z"
          },
          {
            _id: "5ea04ec4861ec016ab4e727e",
            childComments: [],
            postId: "5e9ecbe865e89626b7a4fd27",
            content: "comment1",
            user: {
              _id: "5e8b577f1a2dde32298795f4",
              username: "thanh_ton",
              job: "Developer"
            },
            parentId: null,
            createdAt: "2020-04-22T14:03:48.372Z",
            updatedAt: "2020-04-22T14:03:48.372Z"
          }
        ],
        likes: [],
        savedBy: ["5e8b577f1a2dde32298795f4"],
        user: {
          _id: "5e8b577f1a2dde32298795f4",
          username: "kenviruss"
        },
        topic: "How can I remove an image in a folder on cloudinary in Nodejs?",
        content:
          "I have tried this way but the result still the same, anyone help me with this problem? Here is my code. I have tried this way but the result still the same, anyone help me with this problem? Here is my code...I have tried this way but the result still the same, anyone help me with this problem? Here is my code...",
        type: "discussion",
        createdAt: "2020-04-13T16:36:14.767Z",
        updatedAt: "2020-04-13T16:46:02.835Z",
        metadata: {
          _id: "5e9494fe935dfb5ed3043971",
          comments: 256,
          likes: 500,
          saves: 1
        }
      },
      user: {
        _id: "5e8b577f1a2dde32298795f4",
        hobbies: ["music, reading book"],
        username: "hongquang",
        password: "hell0aA@",
        email: "quang.dang@homa.company",
        socialLinks: [
          {
            _id: "5e8f536b0416274996f69e75",
            type: "Github",
            url: "https://github.com/hongquangraem"
          },
          {
            _id: "5e8f536b0416274996f69e76",
            type: "Facebook",
            url: "https://facebook.com/spaceraem"
          }
        ],
        createdAt: "2020-04-06T16:23:27.385Z",
        updatedAt: "2020-04-13T14:43:32.772Z",
        job: "Developer",
        sex: "Male",
        avatar: {
          secureURL:
            "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
        },
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A eveniet nisi atque suscipit, magni quia placeat eaque, quisquam eos dolores voluptatibus, quasi pariatur expedita minima quidem quibusdam odio. Iure, esse. ipsum dolor sit amet consectetur adipisicing elit. Eius vel eveniet eligendi sapiente earum nam omnis praesentium quidem. Iusto laboriosam ducimus quis tenetur earum alias sint perferendis commodi fugit sed?"
      },
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
          type: "discussion",
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
          type: "discussion",
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
      }
    };
  },
  watch: {
    comment() {
      this.markdownComment = this.$options.filters.markdown(this.comment);
    }
  },
  computed: {},
  methods: {},
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
    OtherPostsOfAuthor
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
</style>