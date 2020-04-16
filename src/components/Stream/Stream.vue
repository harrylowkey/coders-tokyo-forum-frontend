<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner></app-banner>
    <audio-playlist></audio-playlist>
    <br />
    <v-container>
      <v-row>
        <v-col cols="12" sm="7" style="background-color: lightblue">Post</v-col>
        <v-col cols="12" sm="4" offset-sm="1">
          <side-card 
            :title="topBloggers.title"
            :type="topBloggers.type"
            :data="topBloggers.data"
          ></side-card>

          <side-card 
            :title="tags.title"
            :type="tags.type"
            :data="tags.data"
          ></side-card>

           <side-card 
            :title="mostViewBlogs.title"
            :type="mostViewBlogs.type"
            :data="mostViewBlogs.data"
          ></side-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import AudioPlaylist from "./AudioPlaylist";
import SideCard from "../Shared/SideCard";
export default {
  components: {
    audioPlaylist: AudioPlaylist,
    sideCard: SideCard
  },
  data() {
    return {
      topBloggers: {
        title: 'Top Bloggers',
        type: 1,
        data: [
          { 
            _id: '1',
            icon: 'https://res.cloudinary.com/hongquangraem/image/upload/v1587030274/Draw-io-trophies/--02-128_kotkpp.png',
            text: 'chau_chau',
          },
          { 
            _id: '2',
            icon: 'https://res.cloudinary.com/hongquangraem/image/upload/v1587030285/Draw-io-trophies/advantage_quality-128_hxdkdz.png',
            text: 'nhat_anh',
          },
          { 
            _id: '3',
            icon: 'https://res.cloudinary.com/hongquangraem/image/upload/v1587030256/Draw-io-trophies/movie-10-128_yf3ng3.png',
            text: 'thanh_ton',
          }
        ]
      },
      tags: {
        title: 'Tags',
        type: 2,
        data: [
          {
            _id: '1',
            text: 'javascript',
            counter: 153
          },
          {
            _id: '2',
            text: 'discussion',
            counter: 153
          },
          {
            _id: '3',
            text: 'nodejs',
            counter: 153
          },
          {
            _id: '4',
            text: 'html',
            counter: 153
          }
        ]
      },
      mostViewBlogs: {
        title: 'Most views',
        type: 2,
        data: [
          {
            _id: '1',
            text: 'Javascript the best parts',
            counter: 153
          },
          {
            _id: '2',
            text: 'Top 5 nodejs frameworks',
            counter: 100
          },
          {
            _id: '3',
            text: 'HTML for dummies',
            counter: 99
          },
          {
            _id: '4',
            text: 'Testing issues',
            counter: 80
          },
          {
            _id: '5',
            text: 'Setting Mongo local',
            counter: 79
          }
        ]
      }
    }
  }
};
</script>

<style>
</style>