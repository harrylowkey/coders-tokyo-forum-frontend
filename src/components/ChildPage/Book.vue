<template>
  <div>
    <v-row id="post">
      <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0 wrapper-icon d-sm-none d-md-flex">
        <post-reactions
          :likes="post.metadata.likes"
          :saves="post.metadata.saves"
          :postId="post._id"
        ></post-reactions>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <v-card class="mx-auto mt-6" id="blog-card" elevation="6">
          <v-container class="pa-0">
            <v-row style="margin-right: 0">
              <v-col class="pt-0 pr-0" cols="12" sm="12" md="12" lg="7" xl="8">
                <v-img
                  src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                  height="360px"
                  style
                  class="cover-book"
                ></v-img>
              </v-col>
              <v-col class="pa-0" cols="12" sm="12" md="12" lg="5" xl="4" style="position: relative">
                <div class="d-md-none d-lg-flex">
                  <v-container class="ml-1 pl-3 book-detail">
                    <v-card-text class="pb-2 pt-2">
                      <p class="title text--primary mb-0 pt-1">{{ post.topic }}</p>
                      <v-container class="d-flex pl-1 pb-0 pt-2">
                        <p class="key mb-0 mr-3">Status:</p>
                        <p class="value mb-0" :style="calBookStatusColor">{{ book.status }}</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Author:</p>
                        <p class="value mb-0" v-if="slicedAuthors">
                          <span
                            v-for="(author, i) in slicedAuthors"
                            :key="author._id"
                          >{{ author.name }}{{ isAddComma(i, slicedAuthors.length) }}</span>
                        </p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Nation:</p>
                        <p class="value mb-0">{{ book.country }}</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Year:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          :style="calBookYearColor"
                        >{{ book.year }}</v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Length:</p>
                        <p class="value mb-0">{{ book.length }} pages</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Genre:</p>
                        <span v-if="slicedGenres">
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            style="border: 1px solid #FBC02D !important; background-color: #fdd835 !important"
                            v-for="genre in slicedGenres"
                            :key="genre._id"
                            class="mr-1"
                          >{{ genre }}</v-chip>
                        </span>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Suggested by:</p>
                        <p class="value mb-0" v-if="slicedSuggestedBy">
                          <span
                            v-for="(person, i) in slicedSuggestedBy"
                            :key="i"
                          >{{ person }}{{ isAddComma(i, slicedSuggestedBy.length) }}</span>
                        </p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-4">Stars:</p>
                        <v-icon
                          v-for="(start, i) in 5"
                          :key="i"
                          size="20"
                          :color="isStar(i + 1)"
                          style="width: 25px"
                        >start</v-icon>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="ml-1 pt-0">
                      <v-spacer></v-spacer>
                      <v-btn class="pl-1" color="primary" depressed small text>Read more...</v-btn>
                    </v-card-actions>
                  </v-container>
                </div>
                <div class="d-none d-md-flex d-lg-none">
                  <v-container class="ml-1 book-detail pt-1 pb-0">
                    <v-card-text class="pb-6 pt-0 d-flex justify-space-around">
                      <div>
                        <v-container class="d-flex pl-1 pb-0 pt-2">
                          <p class="key mb-0 mr-3">Status:</p>
                          <p class="value mb-0" :style="calBookStatusColor">{{ book.status }}</p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Author:</p>
                          <p class="value mb-0" v-if="slicedAuthors">
                            <span
                              v-for="(author, i) in slicedAuthors"
                              :key="author._id"
                            >{{ author.name }}{{ isAddComma(i, slicedAuthors.length) }}</span>
                          </p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Nation:</p>
                          <p class="value mb-0">{{ book.country }}</p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Year:</p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            :style="calBookYearColor"
                          >{{ book.year }}</v-chip>
                        </v-container>
                      </div>

                      <div>
                        <v-container class="d-flex pl-1 pb-0 pt-2">
                          <p class="key mb-0 mr-3">Length:</p>
                          <p class="value mb-0">{{ book.length }} pages</p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Genre:</p>
                          <span v-if="slicedGenres">
                            <v-chip
                              label
                              text-color="black"
                              outlined
                              small
                              style="border: 1px solid #FBC02D !important; background-color: #fdd835 !important"
                              v-for="genre in slicedGenres"
                              :key="genre._id"
                              class="mr-1"
                            >{{ genre }}</v-chip>
                          </span>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Suggested by:</p>
                          <p class="value mb-0" v-if="slicedSuggestedBy">
                            <span
                              v-for="(person, i) in slicedSuggestedBy"
                              :key="i"
                            >{{ person }}{{ isAddComma(i, slicedSuggestedBy.length) }}</span>
                          </p>
                        </v-container>
                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-4">Stars:</p>
                          <v-icon
                            v-for="(start, i) in 5"
                            :key="i"
                            size="20"
                            :color="isStar(i + 1)"
                            style="width: 25px"
                          >start</v-icon>
                        </v-container>
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                  </v-container>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container style="padding: 15px 50px 20px 50px">
            <v-list-item three-line style="padding: 10px 25px 25px 0px">
              <v-list-item-content class="pr-10 pt-lg-0">
                <v-list-item-title class="blog-title mb-0">
                  <h1 class="blog-title">{{ post.topic }}</h1>
                </v-list-item-title>
                <v-card-actions class="pl-0">
                  <v-avatar size="40" style="cursor: pointer" dark>
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                      alt="Avatar"
                    />
                  </v-avatar>
                  <v-card-subtitle style="font-size: 16px" class="ml-n1 pr-0">
                    <a style="text-decoration: none; color: #000" href>{{ post.user.username }}</a>
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
                    >{{ link.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-card-subtitle class="pl-1">{{ post.createdAt | date }}</v-card-subtitle>
                  <v-card-subtitle class="pl-0">{{ post.content | readTime }} min read</v-card-subtitle>
                </v-card-actions>
                <v-card-text style="margin-left: -25px" class="pt-3">
                  <tag
                    v-for="tag in post.tags"
                    :key="tag._id"
                    class="ml-2"
                    :tagName="tag.tagName"
                    :style="tagStyle"
                  ></tag>
                </v-card-text>
              </v-list-item-content>
            </v-list-item>
            <div v-html="contentMarkDown"></div>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
        class="wrapper-author-follow d-sm-none d-md-flex"
      >
        <author-follow-card
          class="author-follow"
          :githubLink="userGithub.url"
          :facebookLink="userFacebook.url"
          :linkedinLink="userLinkedin.url"
          :user="user"
          :description="user.description"
        ></author-follow-card>
      </v-col>
    </v-row>

    <v-row id="comments">
      <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0"></v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <div v-if="post.comments.length">
          <v-divider></v-divider>
          <h1 class="mb-3 mt-8">Comments</h1>
          <comment
            v-for="comment in post.comments"
            :key="comment._id"
            :comment="comment"
            :author="post.user"
            :postId="post._id"
          ></comment>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3"></v-col>
    </v-row>

    <v-row id="other-posts-of-author" v-if="otherBooksOfAuthor.length" class="mb-10">
      <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0"></v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <v-divider></v-divider>
        <h1 class="mt-8 mb-3">Other blogs of author</h1>
        <other-posts-of-author :posts="otherBooksOfAuthor"></other-posts-of-author>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3"></v-col>
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
import { bookDescription } from "@/mixins/bookDescription";
import { userSocialLinks } from "@/mixins/userSocialLinks"

export default {
  mixins: [bookDescription, userSocialLinks],
  data() {
    return {
      post: {
        _id: "5e9c33a20ea604201558edfa",
        tags: [
          {
            _id: "5e9c33a20ea604201558edfc",
            tagName: "kientran"
          },
          {
            _id: "5e9c33a20ea604201558edfd",
            tagName: "laptrinhquydaocuocdoi"
          }
        ],
        comments: [
          {
            _id: "5ea04ece861ec016ab4e7280",
            childComments: [
              {
                _id: "5ea08f6d14328169d8422a42",
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
        authors: [
          {
            _id: "5e9c33a20ea604201558edfe",
            name: "Kiên Trần"
          }
        ],
        user: {
          _id: "5e8b577f1a2dde322987924",
          username: "nhat_anh"
        },
        likes: [],
        savedBy: [],
        topic: "Lập trình qũy đạo cuộc đời",
        description:
          "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
        content:
          "[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\nHow To Use The Demo\n-------------------\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n",
        type: "book",
        cover: {
          _id: "5e9c33a20ea604201558edfb",
          secureURL:
            "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
          publicId: "Coders-Tokyo-Forum/posts/a.jpg",
          fileName: "a.jpg",
          sizeBytes: 107648,
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          postId: "5e9c33a20ea604201558edfa",
          resourceType: "image",
          createdAt: "2020-04-19T11:18:58.228Z",
          updatedAt: "2020-04-19T11:18:58.228Z",
          __v: 0
        },
        createdAt: "2020-04-19T11:18:58.251Z",
        updatedAt: "2020-04-19T11:18:58.251Z",
        metadata: {
          _id: "5e9494fe935dfb5ed30435",
          comments: 123,
          likes: 69,
          saves: 1
        },
        book: {
          status: "Finished",
          country: "Vietnam",
          year: 2019,
          length: 200,
          genres: ["Literary", "Action"],
          suggestedBy: ["Trần Tôn"],
          stars: 5
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
      otherBooksOfAuthor: [
        {
          _id: "5e9ab00f0591fb40fc87faa2",
          tags: [
            {
              _id: "5e8ddf319ac8ee2dd68b1cd7",
              tagName: "coercion"
            },
            {
              _id: "5e8cb5562ded8236f29fc885",
              tagName: "nhatanh"
            }
          ],
          comments: [],
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          topic: "Bạn chưa hiểu JavaScript đâu kỳ 2 - Coercion",
          description:
            "Tại sao mọi người lại  thích rời khỏi nhà và vác ba lô đi khắp thế giới đến như vậy ? Lý do thì muôn trùng không thể đếm xuể. Đôi khi lý do cũng rất khác biệt. Nhưng hãy xem 10 lý do mà tôi liệt kê dưới đây,để xem cái nào đúng nhất với bạn nhé.",
          content:
            'Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.\n\nNếu bạn chưa đọc bài Bạn chưa hiểu JavaScript đâu kỳ 1 - Scopes và Hoisting viết về bộ ba quyền lực trong JavaScript thì mình khuyên các bạn nên đọc nó trước tại đây.\n\nNhắc lại về kiểu dữ liệu trong JavaScript\nPrimitive Data Types\nKiểu dữ liệu được gọi là Primitive là kiểu dữ liệu không phải object và không có methods. Có 7 primitive types bao gồm:\n\nNumber\nString\nBoolean\nNull\nUndefined\nSymbol\nBigInt: một built-in object được tạo để biểu diễn whole numbers (số nguyên dương và số 0) có giá trị lớn hơn 2^53.\nBạn có thể đọc thêm về primitive types ở MDN documentation.\n\nNon-primitive Data Types\nĐọc tên thì cũng biết là đây là tập hợp kiểu dữ liệu nằm ngoài 7 kiểu ở trên.\n\nObject\nLưu ý: Array và Function được coi là subtype của Object (nhóm con), chứ nó không được coi như type của JavaScript. (Thắc mắc thì coi lại MDN documentation.)\n\nCoercion là gì?\nCoercion dịch từ anh ra việt nghĩa là sự ép buộc, bắt buộc làm gì đó.\n\nCoercion meaning\n\nTrong JavaScript, coercion (hay còn gọi là type conversion) được hiểu là việc biến đổi (convert) từ kiểu dữ liệu này sang kiểu dữ liệu khác trong quá trình thực hiện chương trình.\n\nTrong ví dụ dưới, ở vế trước, string “10” được đổi kiểu dữ liệu từ string thành number, rồi JavaScript Engine mới thực hiện so sánh giá trị hai vế với nhau.\n\n"10" == 10; // true => String bằng được Number. Lạ nhỉ???\nLưu ý, trong quá trình dịch, mình dùng từ đổi kiểu dữ liệu thay vì từ ép kiểu dữ liệu như số đông. Chỉ là thay đổi ngôn từ để các bạn dễ hiểu thay vì dịch kiểu Google translate và lạm dùng từ hán việt hại não các bạn.\n\nCoercion hoạt động như thế nào?\nĐây là thứ tự chạy của Engine trong == (cho phép coercion):\n\nĐổi sang Primitive Form nếu không phải Primitive Type.\nCheck xem cùng kiểu dữ liệu chưa? Nếu chưa, Engine thì sẽ ưu tiên đổi 2 vế thành Number (nếu có thể). Nếu rồi, nhảy qua bước 3.\nSo sánh giá trị.\nTrả về kết quả bằng true hoặc false.\nXét đoạn chương trình sau:\n\nvar codersX1 = 10;\nvar codersX2 = [10];\n\nif (codersX1 == codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == codersX2)\n\n * if (10 == [10]) => thực hiện ToPrimitive([10]), biến [10] thành "10"\n\n * if (10 == "10") => Vế trái có type là Number, nên vế phải sẽ được ưu tiên đổi sang Number, \n * "10" biến thành 10\n\n * if (10 === 10) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n\n * if (true) => giá trị bằng nhau nên trả về true\n */\nNhầm lẫn giữa == và ===\nMình xin phép giải thích thuật ngữ trước khi phân tích tiếp.\n\nThe ECMAScript specification (gọi tắt là ECMAScript hay ngắn gọn hơn nữa là specification - đây cũng là từ mình dùng trong bài này) là bộ tiêu chuẩn chung, hiểu đại khái như pháp luật của nước JavaScript, buộc mọi công dân trong lãnh thổ JavaScript phải tuân theo, phá luật, gặp bugs là tèo.\n\nCheck type và không check type?\nNhiều người vì không hiểu bản chất của JavaScript (có thể do lười đọc specification) mà nhầm rằng sự khác nhau giữa == và === là:\n\n== không check kiểu dữ liệu, chỉ so sánh giá trị, trong khi === check kiểu dữ liệu rồi mới so sánh giá trị.\n\nMình xin khẳng định lại một lần nữa là KHÔNG PHẢI nhé. Mà phải là:\n\n== cho phép coercion (đổi kiểu dữ liệu).\n=== không cho phép coercion (đổi kiểu dữ liệu).\nNói có sách mách có chứng\n\nMình đã đọc đi đọc lại vài lượt specification của JavaScript rồi nên mình mạnh mồm lắm.\n\nOK, giờ bạn hãy nhìn vào mục 1 của specification về ==.\n\nAbstract Equality Comparison\n\nIf Type(x) is the same as Type(y), then Return the result of performing Strict Equality Comparison x === y.\nTạm dịch là Nếu hai thằng x và y có cùng type thì chuyển sang so sánh “===”. Còn lại thì xuống mục 2 check tiếp.\n\nƠ, nó cũng check type kìa anh em.\n\nNhìn tiếp vào mục 1 của specification về ===.\n\nStrict Equality Comparison\n\nIf Type(x) is different from Type(y), return false.\nTạm dịch là Nếu hai thằng x và y khác type thì trả về false. Còn lại thì xuống mục 2 check tiếp.\n\nOooh, vậy là cả hai thằng này đều check type hết chỉ có behaviors (hành vi) của chúng nó khác nhau sau khi check type thôi.\n\nTránh == nhiều nhất có thể?\nThứ nhất, đầy là một nhận định sai lầm lại do lười đọc specification của JavaScript. Như hướng dẫn của specification thì nếu x và y có cùng kiểu dữ liệu thì dù là == hay === đều như nhau hết.\n\nThứ hai, tại sao lại phải dùng === (có thể tốn thời gian thêm bước type conversion) mà không dùng luôn == với những thứ bạn đã biết rõ kiểu dữ liệu?\n\nThứ ba, việc dùng bừa bãi == và === chứng tỏ bạn không hiểu mình đang code cái gì. Bằng chứng là bạn đâu có nắm rõ được kiểu dữ liệu của biến trong chương trình.\n\nSau đây là quy tắc dùng == và ===:\n\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh.\n// Ví dụ 1\nvar x = {};\n\nif (x === null && x === undefined) {\n  // Do something ...\n}\n// Ví dụ 2\nvar x = {};\n\nif (x == null) {\n  // Do something ...\n}\n\n/**\n * Với `==`, null == underfined và ngược lại.\n * Cho nên, nếu giá trị của x bằng null hoặc undefined\n * thì việc so sánh là như nhau,\n * chương trình trông sáng sủa hơn.\n */\nCác trường hợp còn lại dùng ===\nJavaScript lạ chưa! @_@\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself)\n[] == ![]; // true ??? - so sánh với giá trị phụ định\n[] != []; // true\nvar codersX1 = [];\nvar codersX2 = [];\n\nif (codersX1 == !codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == !codersX2)\n * if ([] == ![]) => Thực hiện biến đổi ![] thành `false`\n * if ([] == false) => Thực hiện biến đổi [] thành ""\n * if ("" == false) => Thực hiện biến đổi "" thành 0 và `false` thành 0\n * if (0 === 0) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n * if (true) => giá trị bằng nhau nên trả về `true`\n */\n\nif (codersX1 != codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 != codersX2)\n * if (!(codersX1 == codersX2)) => `codersX1 == codersX2` trả về `false`\n * if (!(false))\n * if (true)\n */\nTổng kết\nCác kiểu dữ liệu trong JavaScript bao gồm Primitive Types (number, string, boolean, null, undefined, symbol, bigInt) và Non-Primitive Types (object).\nArray và Function được coi là subtype của Object (nhóm con).\n== cho phép coercion (đổi kiểu dữ liệu) trong khi === không cho phép coercion (đổi kiểu dữ liệu).\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh. Các trường hợp còn lại dùng ===\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself).\nBài tập cho bạn\nYêu cầu: Đọc đề bài ở file README. Sau đó, mở file index.js làm bài. Cuối cùng, xem đáp án ở file index.fixed.js. Có phần test ở cuối bài.\n\nEm Linh đây: https://repl.it/@Nhat_AnhAnh/CoercionExercises\n\nNếu tất cả là true thì là đúng hết. Làm được bài này các bạn sẽ học được rất nhiều thứ nên nếu ngồi cả ngày mà làm chưa đúng hết thì cứ làm tiếp nhé.\n\nTài liệu tham khảo\nKhóa Deep JS Foundations V3 của Kyle Simpson\nTập 4 Types and Grammar - You don’t know JS của Kyle Simpson\nAbstract Equality Comparison: ECMA-262, 9th edition, June 2018\nStrict Equality Comparison: ECMA-262, 9th edition, June 2018\nType conversion: ECMA-262, 9th edition, June 2018\nMDN documentation về Data Types\nNếu bạn có phần nào chưa rõ hay muốn trao đổi thêm với mình, đừng ngần ngại inbox mình nhé. Chúc các bạn đọc vui.\n\nNếu bạn muốn có nhiều cơ hội trải nghiệm hơn, hãy tham gia cộng đồng học lập trình miễn phí CodersX với chúng mình. Together, we change the world.',
          type: "blog",
          createdAt: "2020-04-18T07:45:19.846Z",
          updatedAt: "2020-04-18T07:45:19.846Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9b00f0591fb40fc87faa2",
          tags: [
            {
              _id: "5e8ddf319ac8ee2dd68b1cd7",
              tagName: "coercion"
            },
            {
              _id: "5e8cb5562ded8236f29fc885",
              tagName: "nhatanh"
            }
          ],
          comments: [],
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          topic: "Bạn chưa hiểu JavaScript đâu kỳ 2 - Coercion",
          description:
            "Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.",
          content:
            'Search Google với từ khóa coercion trong javascript rồi dạo một lượt tầm hơn chục bài tiếng việt nằm trên top mà mình tá hoảng khi chỉ có duy nhất 2 bài là nội dung tạm được và có trích dẫn nguồn. Còn lại đều mắc rất nhiều lỗi về cả nội dung lẫn dịch thuật. Vì vậy, để giúp các bạn có cái nhìn chính xác từ gốc tới ngọn, thay vì tung bài về this theo kế hoạch, mình đã quyết định viết thêm bài về Coercion. Và chắc bạn cũng đoán được chủ đề của Series Bạn chưa hiểu JavaScript đâu kỳ này là gì rồi nhỉ? Một, hai, ba, tẩy não thôi.\n\nNếu bạn chưa đọc bài Bạn chưa hiểu JavaScript đâu kỳ 1 - Scopes và Hoisting viết về bộ ba quyền lực trong JavaScript thì mình khuyên các bạn nên đọc nó trước tại đây.\n\nNhắc lại về kiểu dữ liệu trong JavaScript\nPrimitive Data Types\nKiểu dữ liệu được gọi là Primitive là kiểu dữ liệu không phải object và không có methods. Có 7 primitive types bao gồm:\n\nNumber\nString\nBoolean\nNull\nUndefined\nSymbol\nBigInt: một built-in object được tạo để biểu diễn whole numbers (số nguyên dương và số 0) có giá trị lớn hơn 2^53.\nBạn có thể đọc thêm về primitive types ở MDN documentation.\n\nNon-primitive Data Types\nĐọc tên thì cũng biết là đây là tập hợp kiểu dữ liệu nằm ngoài 7 kiểu ở trên.\n\nObject\nLưu ý: Array và Function được coi là subtype của Object (nhóm con), chứ nó không được coi như type của JavaScript. (Thắc mắc thì coi lại MDN documentation.)\n\nCoercion là gì?\nCoercion dịch từ anh ra việt nghĩa là sự ép buộc, bắt buộc làm gì đó.\n\nCoercion meaning\n\nTrong JavaScript, coercion (hay còn gọi là type conversion) được hiểu là việc biến đổi (convert) từ kiểu dữ liệu này sang kiểu dữ liệu khác trong quá trình thực hiện chương trình.\n\nTrong ví dụ dưới, ở vế trước, string “10” được đổi kiểu dữ liệu từ string thành number, rồi JavaScript Engine mới thực hiện so sánh giá trị hai vế với nhau.\n\n"10" == 10; // true => String bằng được Number. Lạ nhỉ???\nLưu ý, trong quá trình dịch, mình dùng từ đổi kiểu dữ liệu thay vì từ ép kiểu dữ liệu như số đông. Chỉ là thay đổi ngôn từ để các bạn dễ hiểu thay vì dịch kiểu Google translate và lạm dùng từ hán việt hại não các bạn.\n\nCoercion hoạt động như thế nào?\nĐây là thứ tự chạy của Engine trong == (cho phép coercion):\n\nĐổi sang Primitive Form nếu không phải Primitive Type.\nCheck xem cùng kiểu dữ liệu chưa? Nếu chưa, Engine thì sẽ ưu tiên đổi 2 vế thành Number (nếu có thể). Nếu rồi, nhảy qua bước 3.\nSo sánh giá trị.\nTrả về kết quả bằng true hoặc false.\nXét đoạn chương trình sau:\n\nvar codersX1 = 10;\nvar codersX2 = [10];\n\nif (codersX1 == codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == codersX2)\n\n * if (10 == [10]) => thực hiện ToPrimitive([10]), biến [10] thành "10"\n\n * if (10 == "10") => Vế trái có type là Number, nên vế phải sẽ được ưu tiên đổi sang Number, \n * "10" biến thành 10\n\n * if (10 === 10) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n\n * if (true) => giá trị bằng nhau nên trả về true\n */\nNhầm lẫn giữa == và ===\nMình xin phép giải thích thuật ngữ trước khi phân tích tiếp.\n\nThe ECMAScript specification (gọi tắt là ECMAScript hay ngắn gọn hơn nữa là specification - đây cũng là từ mình dùng trong bài này) là bộ tiêu chuẩn chung, hiểu đại khái như pháp luật của nước JavaScript, buộc mọi công dân trong lãnh thổ JavaScript phải tuân theo, phá luật, gặp bugs là tèo.\n\nCheck type và không check type?\nNhiều người vì không hiểu bản chất của JavaScript (có thể do lười đọc specification) mà nhầm rằng sự khác nhau giữa == và === là:\n\n== không check kiểu dữ liệu, chỉ so sánh giá trị, trong khi === check kiểu dữ liệu rồi mới so sánh giá trị.\n\nMình xin khẳng định lại một lần nữa là KHÔNG PHẢI nhé. Mà phải là:\n\n== cho phép coercion (đổi kiểu dữ liệu).\n=== không cho phép coercion (đổi kiểu dữ liệu).\nNói có sách mách có chứng\n\nMình đã đọc đi đọc lại vài lượt specification của JavaScript rồi nên mình mạnh mồm lắm.\n\nOK, giờ bạn hãy nhìn vào mục 1 của specification về ==.\n\nAbstract Equality Comparison\n\nIf Type(x) is the same as Type(y), then Return the result of performing Strict Equality Comparison x === y.\nTạm dịch là Nếu hai thằng x và y có cùng type thì chuyển sang so sánh “===”. Còn lại thì xuống mục 2 check tiếp.\n\nƠ, nó cũng check type kìa anh em.\n\nNhìn tiếp vào mục 1 của specification về ===.\n\nStrict Equality Comparison\n\nIf Type(x) is different from Type(y), return false.\nTạm dịch là Nếu hai thằng x và y khác type thì trả về false. Còn lại thì xuống mục 2 check tiếp.\n\nOooh, vậy là cả hai thằng này đều check type hết chỉ có behaviors (hành vi) của chúng nó khác nhau sau khi check type thôi.\n\nTránh == nhiều nhất có thể?\nThứ nhất, đầy là một nhận định sai lầm lại do lười đọc specification của JavaScript. Như hướng dẫn của specification thì nếu x và y có cùng kiểu dữ liệu thì dù là == hay === đều như nhau hết.\n\nThứ hai, tại sao lại phải dùng === (có thể tốn thời gian thêm bước type conversion) mà không dùng luôn == với những thứ bạn đã biết rõ kiểu dữ liệu?\n\nThứ ba, việc dùng bừa bãi == và === chứng tỏ bạn không hiểu mình đang code cái gì. Bằng chứng là bạn đâu có nắm rõ được kiểu dữ liệu của biến trong chương trình.\n\nSau đây là quy tắc dùng == và ===:\n\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh.\n// Ví dụ 1\nvar x = {};\n\nif (x === null && x === undefined) {\n  // Do something ...\n}\n// Ví dụ 2\nvar x = {};\n\nif (x == null) {\n  // Do something ...\n}\n\n/**\n * Với `==`, null == underfined và ngược lại.\n * Cho nên, nếu giá trị của x bằng null hoặc undefined\n * thì việc so sánh là như nhau,\n * chương trình trông sáng sủa hơn.\n */\nCác trường hợp còn lại dùng ===\nJavaScript lạ chưa! @_@\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself)\n[] == ![]; // true ??? - so sánh với giá trị phụ định\n[] != []; // true\nvar codersX1 = [];\nvar codersX2 = [];\n\nif (codersX1 == !codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 == !codersX2)\n * if ([] == ![]) => Thực hiện biến đổi ![] thành `false`\n * if ([] == false) => Thực hiện biến đổi [] thành ""\n * if ("" == false) => Thực hiện biến đổi "" thành 0 và `false` thành 0\n * if (0 === 0) => Aha, giờ 2 vế có cùng type rồi, mình chuyển qua so sánh `===`\n * if (true) => giá trị bằng nhau nên trả về `true`\n */\n\nif (codersX1 != codersX2) {\n  // true ???\n  // do something ...\n}\n\n/**\n * if (codersX1 != codersX2)\n * if (!(codersX1 == codersX2)) => `codersX1 == codersX2` trả về `false`\n * if (!(false))\n * if (true)\n */\nTổng kết\nCác kiểu dữ liệu trong JavaScript bao gồm Primitive Types (number, string, boolean, null, undefined, symbol, bigInt) và Non-Primitive Types (object).\nArray và Function được coi là subtype của Object (nhóm con).\n== cho phép coercion (đổi kiểu dữ liệu) trong khi === không cho phép coercion (đổi kiểu dữ liệu).\nDùng == khi bạn đã biết rõ kiểu dữ liệu trong phép so sánh. Các trường hợp còn lại dùng ===\nĐừng bao giờ so sánh với giá trị phủ định của chính nó (the negation of itself).\nBài tập cho bạn\nYêu cầu: Đọc đề bài ở file README. Sau đó, mở file index.js làm bài. Cuối cùng, xem đáp án ở file index.fixed.js. Có phần test ở cuối bài.\n\nEm Linh đây: https://repl.it/@Nhat_AnhAnh/CoercionExercises\n\nNếu tất cả là true thì là đúng hết. Làm được bài này các bạn sẽ học được rất nhiều thứ nên nếu ngồi cả ngày mà làm chưa đúng hết thì cứ làm tiếp nhé.\n\nTài liệu tham khảo\nKhóa Deep JS Foundations V3 của Kyle Simpson\nTập 4 Types and Grammar - You don’t know JS của Kyle Simpson\nAbstract Equality Comparison: ECMA-262, 9th edition, June 2018\nStrict Equality Comparison: ECMA-262, 9th edition, June 2018\nType conversion: ECMA-262, 9th edition, June 2018\nMDN documentation về Data Types\nNếu bạn có phần nào chưa rõ hay muốn trao đổi thêm với mình, đừng ngần ngại inbox mình nhé. Chúc các bạn đọc vui.\n\nNếu bạn muốn có nhiều cơ hội trải nghiệm hơn, hãy tham gia cộng đồng học lập trình miễn phí CodersX với chúng mình. Together, we change the world.',
          type: "blog",
          cover: {
            _id: "5e9ab00f0591fb40fc87faa3",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png",
            publicId: "Coders-Tokyo-Forum/posts/javascript.png",
            fileName: "javascript.png",
            sizeBytes: 316358,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9ab00f0591fb40fc87faa2",
            resourceType: "image",
            createdAt: "2020-04-18T07:45:19.838Z",
            updatedAt: "2020-04-18T07:45:19.838Z",
            __v: 0
          },
          createdAt: "2020-04-18T07:45:19.846Z",
          updatedAt: "2020-04-18T07:45:19.846Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        }
      ],
      tagStyle: {
        fontSize: "0.975em !important",
        fontWeight: 300,
        padding: "5px 5px",
        height: "35px",
        letterSpacing: "0.0111333333em !important",
        marginLeft: "12px !important",
        borderRadius: "4px"
      },
      book: {},
      authors: []
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
  },
  components: {
    Tag,
    UserSocialLinks,
    LikeBtn,
    CommentBtn,
    UserAvatar,
    FacebookBtn,
    ViewsBtn,
    Comment,
    AuthorProfile,
    AuthorFollowCard,
    PostReactions,
    OtherPostsOfAuthor
  }
};
</script>

<style>
#blog-card {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
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

.icon-container {
  position: fixed;
  top: 85px;
  left: 55px;
  padding: 20px 10px;
  height: 300px;
}

.counter {
  position: absolute;
  top: 40px;
  right: -8px;
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