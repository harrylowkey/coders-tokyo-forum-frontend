<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
        <h1 v-if="showTitlePage" class="mt-5">#Movie Reviews</h1>
        <movie
          v-for="item in movies"
          :key="item._id"
          :_id="item._id"
          :topic="item.topic"
          :description="item.description"
          :content="item.content"
          :tags="item.tags"
          :cover="item.cover"
          :userId="item.userId"
          :url="item.url"
          :type="item.type"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          :metadata="item.metadata"
          :movie="item.movie"
          :authors="item.authors"
        ></movie>
        <v-container class="mt-5 d-flex justify-center" v-if="showViewMoreBtn">
          <v-btn class="primary" to="/stream/movies">View more</v-btn>
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
import Movie from "./Movie";
import SideCard from "@/components/Shared/SideCard";
export default {
  components: {
    Movie,
    SideCard
  },
  data() {
    return {
      showTitlePage: false,
      showViewMoreBtn: true,
      movies: [
        {
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
            genres: ['Action'],
            imdb: 5.2,
            country: "England",
            link: 'facebook.com',
            releaseDate: "22/11/2019",
            time: 91,
            stars: 4
          },
          createdAt: "2020-04-18T13:47:33.708Z",
          updatedAt: "2020-04-18T13:47:33.708Z"
        },
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
        },
        {
          _id: "5e9b0f5d1f1da5baece2ff5",
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
    if (this.$route.path === "/stream/movies") {
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