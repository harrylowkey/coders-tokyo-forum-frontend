<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
        <h1 v-if="showTitlePage" class="mt-5">#Book Reviews</h1>
        <book
          v-for="item in books"
          :key="item._id"
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
          :book="item.book"
          :authors="item.authors"
        ></book>
        <v-container class="mt-5 d-flex justify-center" v-if="showViewMoreBtn">
          <v-btn class="primary" to="/stream/books">View more</v-btn>
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
import Book from "./Book";
import SideCard from "@/components/Shared/SideCard";
export default {
  components: {
    Book,
    SideCard
  },
  data() {
    return {
      showTitlePage: false,
      showViewMoreBtn: true,
      books: [
        {
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
          comments: [],
          authors: [
            {
              _id: "5e9c33a20ea604201558edfe",
              name: "Kiên Trần"
            }
          ],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          topic: "Lập trình qũy đạo cuộc đời",
          description:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
          content:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
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
            name: 'Lập trình quỹ đạo cuộc đời',
            status: "Finished",
            country: "Vietnam",
            year: 2019,
            length: 200,
            genres: ["Literary", "Action"],
            suggestedBy: ["Trần Tôn", "Trần Tôn", "Trần Tôn"],
            stars: 5
          }
        },
        {
          _id: "59c3a20ea604201558edfa",
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
          comments: [],
          authors: [
            {
              _id: "5e9c33a20ea604201558edfe",
              name: "Kiên Trần"
            }
          ],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          topic: "Lập trình qũy đạo cuộc đời",
          description:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
          content:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
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
            suggestedBy: ["Trần Tôn", "Trần Tôn", "Trần Tôn"],
            stars: 5
          }
        },
        {
          _id: "5e9c3a20ea604201558edfa",
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
          comments: [],
          authors: [
            {
              _id: "5e9c33a20ea604201558edfe",
              name: "Kiên Trần"
            }
          ],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          topic: "Lập trình qũy đạo cuộc đời",
          description:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
          content:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
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
            suggestedBy: ["Trần Tôn", "Trần Tôn", "Trần Tôn"],
            stars: 5
          }
        },
        {
          _id: "5e9c33a20ea604201558dfa",
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
          comments: [],
          authors: [
            {
              _id: "5e9c33a20ea604201558edfe",
              name: "Kiên Trần"
            }
          ],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          topic: "Lập trình qũy đạo cuộc đời",
          description:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
          content:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
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
            suggestedBy: ["Trần Tôn", "Trần Tôn", "Trần Tôn"],
            stars: 5
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
    if (this.$route.path === "/stream/books") {
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
