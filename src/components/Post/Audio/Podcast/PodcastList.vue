<template>
  <v-container>
    <v-row>
      <v-col class="d-flex pt-0" id="podcast-wrapper">
        <div id="songs-wrapper-loaders" style="max-width: 782px;">
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="song mb-6"
            style="margin-top: 30px; margin-right: 35px; display: inline-block; width: 300px"
            max-width="300"
            v-if="isLoading"
            type="image, table-tfoot"
          ></v-skeleton-loader>
        </div>
        <podcast
          class="podcast"
          v-for="item in podcasts"
          :key="item._id"
          :_id="item._id"
          :tags="item.tags"
          :comments="item.comments"
          :authors="item.authors"
          :likes="item.likes"
          :savedBy="item.savedBy"
          :user="item.user"
          :topic="item.topic"
          :content="item.content"
          :description="item.description"
          :type="item.type"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          :metadata="item.metadata"
          :audio="item.media"
          :cover="item.cover"
          :customize="{}"
        ></podcast>
        <v-container class="mt-5 d-flex justify-center" v-if="showViewMoreBtn">
          <v-btn class="primary" to="/stream/podcasts">View more</v-btn>
        </v-container>
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" xl="4" :style="sideBarStyle">
        <side-card
          class="fix-sidebar top-blogger"
          :title="topBloggers.title"
          :type="topBloggers.type"
          :data="topBloggers.data"
          v-if="showTopBloggers"
        ></side-card>

        <side-card
          class="fix-sidebar most-view-posts"
          :title="mostViewBlogs.title"
          :type="mostViewBlogs.type"
          :data="mostViewBlogs.data"
        ></side-card>

        <side-card class="fix-sidebar" :title="tags.title" :type="tags.type" :data="tags.data"></side-card>

        <side-card
          class="fix-sidebar member-online"
          :title="membersOnline.title"
          :type="membersOnline.type"
          :data="membersOnline.data"
        ></side-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideCard from "@/components/Shared/SideCard";
import Podcast from "./Podcast";

import { mapState, mapActions } from "vuex";
export default {
  components: {
    Podcast,
    SideCard
  },
  data() {
    return {
      showViewMoreBtn: true,
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
          },
          {
            _id: "6",
            text: "Javascript the best parts",
            counter: 153
          },
          {
            _id: "7",
            text: "Top 5 nodejs frameworks",
            counter: 100
          },
          {
            _id: "8",
            text: "HTML for dummies",
            counter: 99
          },
          {
            _id: "9",
            text: "Testing issues",
            counter: 80
          },
          {
            _id: "10",
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
      showTopBloggers: true,
      showTags: true,
      showMostViewBlogs: true,
      showMembersOnline: true,
      sideBarStyle: {
        paddingTop: "12px"
      }
    };
  },

  computed: {
    ...mapState("utils", ["errorMes", "isLoading"]),
    ...mapState("podcasts", ["podcasts"]),
    podcastList() {
      return this.newestPodcasts;
    }
  },
  methods: {
    ...mapActions("podcasts", ["getPodcasts"])
  },
  async created() {
    if (this.$route.path === "/stream" || this.$route.path === "/") {
      this.mostViewBlogs.title = "Top 5 Discussions";
      let sliceMostViews = this.mostViewBlogs.data.slice(5);
      this.mostViewBlogs.data = sliceMostViews;
    }

    await this.getPodcasts();
  },
  watch: {
    isLoading(newVal) {
      if (newVal === false) {
        setTimeout(() => {
          const aplayer = document.querySelector(".aplayer");
          aplayer.style.display = "none";
        }, 0);
      }
    }
  }
};
</script>

<style>
#podcast-wrapper {
  flex-wrap: wrap;
  justify-content: center;
}

.podcast {
  margin: 20px;
  flex: 45%;
}
</style>