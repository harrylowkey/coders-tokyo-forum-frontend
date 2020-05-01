<template>
  <v-container>
    <h1 v-if="showTitlePage" class="mt-5 ml-10">#songs</h1>
    <v-row>
      <v-col class="pt-1" id="songs-wrapper">
        <song
          class="song"
          v-for="item in songs"
          :key="item._id"
          :_id="item._id"
          :tags="item.tags"
          :comments="item.comments"
          :authors="item.authors"
          :likes="item.likes"
          :savedBy="item.savedBy"
          :userId="item.userId"
          :topic="item.topic"
          :content="item.content"
          :description="item.description"
          :type="item.type"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
          :media="item.media"
          :metadata="item.metadata"
          :audio="item.audio"
        ></song>
        <v-container class="mt-5 d-flex justify-center" v-if="showViewMoreBtn">
          <v-btn class="primary" to="/stream/songs">View more</v-btn>
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
import Audio from "./Song";
export default {
  components: {
    song: Audio,
    SideCard
  },
  data() {
    return {
      showTitlePage: false,
      showViewMoreBtn: true,
      songs: [
        {
          _id: "5e9920603c513c2611a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "lovesong"
            },
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "rockbalad"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "chillies"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_song_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_song_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          audio: {
            name: "Memories place",
            artist: "Chillies",
            url:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // prettier-ignore
            lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e992603c513c2611a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "aucoustic"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "tinh ca"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_song_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_song_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          audio: {
            name: "Memories place",
            artist: "Chillies",
            url:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // prettier-ignore
            lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e920603c513c2611a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "aucoustic"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "tinh ca"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_song_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_song_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          audio: {
            name: "Memories place",
            artist: "Chillies",
            url:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // prettier-ignore
            lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9920603c513c261a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "aucoustic"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "tinh ca"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_song_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_song_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          audio: {
            name: "Memories place",
            artist: "Chillies",
            url:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // prettier-ignore
            lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e992060313c2611a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "aucoustic"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "tinh ca"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_song_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_song_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          audio: {
            name: "Memories place",
            artist: "Chillies",
            url:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // prettier-ignore
            lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e903c513c2611a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "aucoustic"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "tinh ca"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_song_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_song_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          audio: {
            name: "Memories place",
            artist: "Chillies",
            url:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung%20Ky%20Uc%20-%20Chillies_1587093614.mp3",
            cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // prettier-ignore
            lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
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
    if (this.$route.path === "/stream/songs") {
      this.showTitlePage = true;
      this.showViewMoreBtn = false;
      this.sideBarStyle.paddingTop = "5px";
      this.showTopBloggers = false;
    }

    if (this.$route.path === "/stream" || this.$route.path === "/") {
      this.mostViewBlogs.title = "Top 5 songs";
      let sliceMostViews = this.mostViewBlogs.data.slice(5);
      this.mostViewBlogs.data = sliceMostViews;
    }
  }
};
</script>

<style>
#songs-wrapper {
  flex-wrap: wrap;
  justify-content: center;
}

.song {
  margin: 20px;
  flex: 45%;
}
</style>