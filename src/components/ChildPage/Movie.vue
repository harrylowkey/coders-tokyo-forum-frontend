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
                  class="cover-movie"
                ></v-img>
              </v-col>
              <v-col
                class="pa-0"
                cols="12"
                sm="12"
                md="12"
                lg="5"
                xl="4"
                style="position: relative"
              >
                <div class="d-md-none d-lg-flex">
                  <v-container class="ml-1 pl-3 movie-detail">
                    <v-card-text class="pb-2 pt-2">
                      <p class="title text--primary mb-0 pt-1">{{ post.topic }}</p>
                      <v-container class="d-flex pl-1 pb-0 pt-2">
                        <p class="key mb-0 mr-3">Status:</p>
                        <p class="value mb-0" :style="calMovieStatusColor">{{ movie.status }}</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Director:</p>
                        <p class="value mb-0" v-if="director">{{ director.name }}</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">IMDb:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          style="border: 1px solid #FBC02D !important; background-color: #fdd835 !important"
                        >{{ movie.imdb }}</v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Nation:</p>
                        <p class="value mb-0">{{ movie.country }}</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Year:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          :style="calMovieYearColor"
                        >{{ movie.year }}</v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Release Date:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          style="border: 1px solid #90d2a3 !important; background-color: #C5E1A5 !important"
                        >{{ movie.releaseDate }}</v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Time:</p>
                        <p class="value mb-0">{{ movie.time }} minutes</p>
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
                  <v-container class="ml-1 movie-detail pt-1 pb-0">
                    <v-card-text class="pb-6 pt-0 d-flex justify-space-around">
                      <div>
                        <v-container class="d-flex pl-1 pb-0 pt-2">
                          <p class="key mb-0 mr-3">Status:</p>
                          <p class="value mb-0" :style="calMovieStatusColor">{{ movie.status }}</p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0" v-if="director">
                          <p class="key mb-0 mr-3">Director:</p>
                          <p class="value mb-0">{{ director.name }}</p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">IMDb:</p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            style="border: 1px solid #FBC02D !important; background-color: #fdd835 !important"
                          >{{ movie.imdb }}</v-chip>
                        </v-container>
                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Nation:</p>
                          <p class="value mb-0">{{ movie.country }}</p>
                        </v-container>
                      </div>

                      <div>
                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Year:</p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            :style="calMovieYearColor"
                          >{{ movie.year }}</v-chip>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Release Date:</p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            style="border: 1px solid #90d2a3 !important; background-color: #C5E1A5 !important"
                          >{{ movie.releaseDate }}</v-chip>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Time:</p>
                          <p class="value mb-0">{{ movie.time }} minutes</p>
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
                  <read-time class="pl-0" :text="post.content"></read-time>
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
            <div v-html="$options.filters.markdown(post.content)"></div>
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

    <v-row id="other-posts-of-author" v-if="otherMovieReviewsOfAuthor.length" class="mb-10">
      <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0"></v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <v-divider></v-divider>
        <h1 class="mt-8 mb-3">Other movie reviews of author</h1>
        <other-posts-of-author :posts="otherMovieReviewsOfAuthor"></other-posts-of-author>
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
import { movieDescription } from "@/mixins/movieDescription";
import { userSocialLinks } from "@/mixins/userSocialLinks";
import ReadTime from "@/components/Shared/readTime";

export default {
  mixins: [movieDescription, userSocialLinks],
  data() {
    return {
      post: {
        _id: "5e9b04f5d1f1da5baece2ff5",
        tags: [
          {
            _id: "5e8c563eeda853638189e854",
            tagName: "action"
          },
          {
            _id: "5e9b047ef82e7d563b8e2c5a",
            tagName: "funny"
          }
        ],
        comments: [],
        user: {
          _id: "5e8b577f1a2dde3229879524",
          username: "nhat_anh"
        },
        authors: [
          {
            _id: "5e9b047ef82e7d563b8e2c5b",
            type: "actor",
            name: "Dave Bautista (JJ)"
          },
          {
            _id: "5e9b047ef82e7d563b8e2c5d",
            type: "actor",
            name: "Ken Jeong (Kim)"
          },
          {
            _id: "5e9b04f5d1f1da5baece2ff7",
            type: "director",
            name: "KristenSchall (Bobbi)"
          }
        ],
        likes: [],
        url: "http://www.phimmoi.net/phim/diep-vien-ti-hon-8928/",
        savedBy: [],
        topic: "My Spey (2019)",
        description:
          "Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta",
        content:
          "Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta",
        type: "movie",
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
        metadata: {
          _id: "5e9494fe935dfb5ed30435",
          comments: 123,
          likes: 69,
          saves: 1
        },
        movie: {
          status: "Finished",
          imdb: 5.2,
          country: "England",
          year: 2019,
          releaseDate: "22/11/2019",
          time: 91,
          stars: 4
        },
        createdAt: "2020-04-18T13:47:33.708Z",
        updatedAt: "2020-04-18T13:47:33.708Z"
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
      otherMovieReviewsOfAuthor: [
        {
          _id: "5e9b04f5d11da5baece2ff5",
          tags: [
            {
              _id: "5e8c563eeda853638189e854",
              tagName: "action"
            },
            {
              _id: "5e9b047ef82e7d563b8e2c5a",
              tagName: "funny"
            }
          ],
          comments: [],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          authors: [
            {
              _id: "5e9b047ef82e7d563b8e2c5b",
              type: "actor",
              name: "Dave Bautista (JJ)"
            },
            {
              _id: "5e9b047ef82e7d563b8e2c5d",
              type: "actor",
              name: "Ken Jeong (Kim)"
            },
            {
              _id: "5e9b04f5d1f1da5baece2ff7",
              type: "director",
              name: "KristenSchall (Bobbi)"
            }
          ],
          likes: [],
          url: "http://www.phimmoi.net/phim/diep-vien-ti-hon-8928/",
          savedBy: [],
          topic: "My Spey (2019)",
          description:
            "Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta",
          content:
            "Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta",
          type: "movie",
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
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          },
          movie: {
            status: "Finished",
            imdb: 5.2,
            country: "England",
            year: 2019,
            releaseDate: "22/11/2019",
            time: 91,
            stars: 4
          },
          createdAt: "2020-04-18T13:47:33.708Z",
          updatedAt: "2020-04-18T13:47:33.708Z"
        },
        {
          _id: "5e9b04f5d1f1dabaece2ff5",
          tags: [
            {
              _id: "5e8c563eeda853638189e854",
              tagName: "action"
            },
            {
              _id: "5e9b047ef82e7d563b8e2c5a",
              tagName: "funny"
            }
          ],
          comments: [],
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          authors: [
            {
              _id: "5e9b047ef82e7d563b8e2c5b",
              type: "actor",
              name: "Dave Bautista (JJ)"
            },
            {
              _id: "5e9b047ef82e7d563b8e2c5d",
              type: "actor",
              name: "Ken Jeong (Kim)"
            },
            {
              _id: "5e9b04f5d1f1da5baece2ff7",
              type: "director",
              name: "KristenSchall (Bobbi)"
            }
          ],
          likes: [],
          url: "http://www.phimmoi.net/phim/diep-vien-ti-hon-8928/",
          savedBy: [],
          topic: "My Spey (2019)",
          description:
            "Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta",
          content:
            "Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta",
          type: "movie",
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
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          },
          movie: {
            status: "Finished",
            imdb: 5.2,
            country: "England",
            year: 2019,
            releaseDate: "22/11/2019",
            time: 91,
            stars: 4
          },
          createdAt: "2020-04-18T13:47:33.708Z",
          updatedAt: "2020-04-18T13:47:33.708Z"
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
      movie: {},
      director: {}
    };
  },
  computed: {},
  created() {},
  methods: {},
  components: {
    Tag,
    ReadTime,
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