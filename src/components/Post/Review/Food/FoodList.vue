<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
        <h1 v-if="showTitlePage" class="mt-5">#Food Reviews</h1>
        <food
          v-for="item in foodList"
          :key="item._id"
          :url="item.url"
          :_id="item._id"
          :topic="item.topic"
          :description="item.description"
          :content="item.content"
          :tags="item.tags"
          :cover="item.cover"
          :userId="item.userId"
          :type="item.type"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          :metadata="item.metadata"
          :food="item.food"
        ></food>
        <v-container class="mt-5 d-flex justify-center" v-if="showViewMoreBtn">
          <v-btn class="primary" to="/stream/food">View more</v-btn>
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
import Food from "./Food";
import SideCard from "@/components/Shared/SideCard";
export default {
  components: {
    Food,
    SideCard
  },
  data() {
    return {
      showTitlePage: false,
      showViewMoreBtn: true,
      foodList: [
        {
          _id: "5e9c6ce7830bd646939c7624",
          tags: [
            {
              _id: "5e8de2fcad60773238e94f1c",
              tagName: "seafood"
            },
            {
              _id: "5e8de2fcad60773238e94f1d",
              tagName: "street"
            }
          ],
          comments: [],
          likes: [],
          url: "facebook.com",
          savedBy: [],
          foodPhotos: [
            {
              secureURL:
                "https://res.cloudinary.com/hongquangraem/image/upload/v1586676116/Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg.jpg",
              publicId:
                "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
              fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
              sizeBytes: 112398
            },
            {
              secureURL:
                "https://res.cloudinary.com/hongquangraem/image/upload/v1587350197/Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png.png",
              publicId:
                "Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png",
              fileName: "89025324_2760328297369108_3874548065679441920_n.png",
              sizeBytes: 184898
            }
          ],
          food: {
            foodName: "sushi",
            priceAverage: "200000 - 250000",
            priceUnit: "VND",
            address: "Let’s Sushi 13B Quốc Tử Giám",
            stars: 5,
            restaurant: "Let's sushi",
            quality: 7.8,
            price: 8,
            service: 10,
            space: 8,
            openTime: "10:00 - 22:00"
          },
          topic: "Sushi",
          description:
            'Originally, sushi was fermented fish with rice preserved in salt, and this was a staple dish in Japan for a thousand years until the Edo Period (1603 to 1868) when contemporary sushi was developed. The word "sushi" means "it\'s sour," which reflects back to sushi\'s origins of being preserved in salt',
          content:
            'Originally, sushi was fermented fish with rice preserved in salt, and this was a staple dish in Japan for a thousand years until the Edo Period (1603 to 1868) when contemporary sushi was developed. The word "sushi" means "it\'s sour," which reflects back to sushi\'s origins of being preserved in salt',
          type: "food",
          cover: {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
            fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
            sizeBytes: 112398
          },
          createdAt: "2020-04-19T15:23:19.975Z",
          updatedAt: "2020-04-19T15:23:19.975Z",
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        }
      ],
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
  created() {
    if (this.$route.path === "/stream/food") {
      this.showTitlePage = true;
      this.showViewMoreBtn = false;
      this.sideBarStyle.paddingTop = "78px";
      this.showTopBloggers = false;
    }

    if (this.$route.path === "/stream" || this.$route.path === "/") {
      this.mostViewBlogs.title = "Top 5 Discussions";
      let sliceMostViews = this.mostViewBlogs.data.slice(5);
      this.mostViewBlogs.data = sliceMostViews;
    }
  }
};
</script>

<style>
</style>
