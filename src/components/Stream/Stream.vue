<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner></app-banner>
    <v-divider></v-divider>
    <v-divider inset></v-divider>
    <audio-playlist></audio-playlist>
    <v-divider></v-divider>
    <br />
    <v-container color="dark">
      <v-row>
        <v-col cols="12" sm="7" offset-md="1" md="7" lg="7">
          <post-tabs @setActivePage="handleSetActivePage"></post-tabs>
          <discussion-page v-if="activePage === 'Discussions'"></discussion-page>
          <blog-page v-if="activePage === 'Blogs'"></blog-page>
          <video-page v-if="activePage === 'Videos'"></video-page>
          <review-page v-if="activePage === 'Reviews'"></review-page>
          <audio-page v-if="activePage === 'Audios'"></audio-page>
        </v-col>
        <v-col cols="12" sm="4" offset-sm="1" md="3" lg="3" style="padding-top: 0px">
          <side-card :title="topBloggers.title" :type="topBloggers.type" :data="topBloggers.data"></side-card>

          <side-card :title="tags.title" :type="tags.type" :data="tags.data"></side-card>

          <side-card
            :title="mostViewBlogs.title"
            :type="mostViewBlogs.type"
            :data="mostViewBlogs.data"
          ></side-card>

          <side-card
            :title="membersOnline.title"
            :type="membersOnline.type"
            :data="membersOnline.data"
          ></side-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import AudioPlaylist from "./AudioPlaylist";
import SideCard from "../Shared/SideCard";
import PostTabs from "../Shared/PostTabs";
import BlogPage from '../Post/Blog/Blog'
import DiscussionPage from '../Post/Discussion/Discussions'
import ReviewPage from '../Post/Review/Review'
import VideoPage from '../Post/Video/Video'
import AudioPage from '../Post/Audio/Audio'

export default {
  components: {
    audioPlaylist: AudioPlaylist,
    sideCard: SideCard,
    postTabs: PostTabs,
    blogPage: BlogPage,
    discussionPage: DiscussionPage,
    reviewPage: ReviewPage,
    videoPage: VideoPage,
    audioPage: AudioPage
  },
  data() {
    return {
      topBloggers: {
        title: "Top Bloggers",
        type: 1,
        data: [
          {
            _id: "1",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587030274/Draw-io-trophies/--02-128_kotkpp.png",
            text: "chau_chau"
          },
          {
            _id: "2",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587030285/Draw-io-trophies/advantage_quality-128_hxdkdz.png",
            text: "nhat_anh"
          },
          {
            _id: "3",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587030256/Draw-io-trophies/movie-10-128_yf3ng3.png",
            text: "thanh_ton"
          }
        ]
      },
      tags: {
        title: "Tags",
        type: 2,
        data: [
          {
            _id: "1",
            text: "javascript",
            counter: 153
          },
          {
            _id: "2",
            text: "discussion",
            counter: 153
          },
          {
            _id: "3",
            text: "nodejs",
            counter: 153
          },
          {
            _id: "4",
            text: "html",
            counter: 153
          }
        ]
      },
      mostViewBlogs: {
        title: "Most Views",
        type: 2,
        data: [
          {
            _id: "1",
            text: "Javascript the best parts",
            counter: 153
          },
          {
            _id: "2",
            text: "Top 5 nodejs frameworks",
            counter: 100
          },
          {
            _id: "3",
            text: "HTML for dummies",
            counter: 99
          },
          {
            _id: "4",
            text: "Testing issues",
            counter: 80
          },
          {
            _id: "5",
            text: "Setting Mongo local",
            counter: 79
          }
        ]
      },
      membersOnline: {
        title: "Members Online",
        type: 1,
        data: [
          {
            _id: "1",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1586965772/Draw-io-avatars/12_avatar-128_hvhfyk.png",
            text: "ngo_minh"
          },
          {
            _id: "2",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1586965680/Draw-io-avatars/4_avatar-128_rk2yxz.png",
            text: "nhat_anh"
          },
          {
            _id: "3",
            icon:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1586965594/Draw-io-avatars/avatar-128_s94fqh.png",
            text: "thanh_ton"
          }
        ]
      },
      activePage: "Discussions"
    };
  },
  methods: {
    handleSetActivePage({ page }) {
      return this.activePage = page
    }
  }
};
</script>

<style>
</style>