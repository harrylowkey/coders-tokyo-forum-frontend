<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner></app-banner>
    <v-divider></v-divider>
    <v-divider inset></v-divider>
    <audio-playlist
      @handlePlayPause="handlePlayPause"
      :audioList="audioList"
      :playAnotherSong="togglePlayAnotherSong"
      v-if="!isLoading"
      class="d-none d-sm-flex"
      id="audio-playlist"
    ></audio-playlist>
    <aplayer
      @playing="handlePlaying"
      @pause="handlePause"
      @play="handlePlay"
      ref="aplayer"
      v-if="!isLoading"
      :audio="audioFormat"
      :lrcType="0"
      fixed
    />
    <v-divider></v-divider>
    <br />
    <v-container color="dark">
      <v-row>
        <post-tabs
          v-if="!isLoading"
          :selectedPage="activePage"
          class="d-none d-sm-flex"
          @setActivePage="handleSetActivePage"
        ></post-tabs>
        <discussion-page v-if="activePage === 'discussions'"></discussion-page>
        <blog-page v-if="activePage === 'blogs'"></blog-page>
        <podcast-page v-if="activePage === 'podcasts'"></podcast-page>
        <song-page v-if="activePage === 'songs'"></song-page>
        <movie-page v-if="activePage === 'movieReviews'"></movie-page>
        <book-page v-if="activePage === 'bookReviews'"></book-page>
        <food-page v-if="activePage === 'foodReviews'"></food-page>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import { mapActions, mapState } from "vuex";

export default {
  components: {
    AudioPlaylist,
    // SideCard,
    PostTabs,
    BlogPage,
    DiscussionPage,
    ReviewPage,
    VideoPage,
    PodcastPage,
    SongPage,
    MoviePage,
    BookPage,
    FoodPage,
  },
  data() {
    return {
      changeLayout: false,
      isWelcomeLogin: false,
      activePage: "",
      audioList: [],
      audioFormat: [],
      isPlaying: false,
      togglePlayAnotherSong: {
        isPlay: false,
        index: -1
      }
    };
  },
  methods: {
    ...mapActions("stream", ["getStream"]),
    handleSetActivePage({ page }) {
      return (this.activePage = page);
    },
    handlePlayPause({ isPlay, index }) {
      if (isPlay) {
        if (this.currenSongPlayingIndex === index) {
          return this.$refs.aplayer.play();
        }
        this.currenSongPlayingIndex = index;
        this.$refs.aplayer.switch(index);
      } else {
        this.currenSongPlayingIndex = index;
        this.$refs.aplayer.pause();
      }
    },
    handlePause() {
      this.isPlaying = false;

      let isOpen = document.querySelector(".aplayer-arrow");
      if (!isOpen) {
        let playIcon = document.querySelector(".aplayer-play");
        playIcon.style.bottom = "50%";
        playIcon.style.right = "50%";
      }

      if (isOpen) {
        let playIcon = document.querySelector(".aplayer-play");
        playIcon.style.bottom = "67%";
        playIcon.style.right = "62%";
      }

      this.togglePlayAnotherSong = {
        isPlay: false,
        index: this.currenSongPlayingIndex
      };
    },
    handlePlaying() {
      this.isPlaying = true;

      let audioPlaylist = document.querySelector("#audio-playlist");
      audioPlaylist.style.display = "none";

      let isOpen = document.querySelector(".aplayer-arrow");

      if (isOpen) {
        let pauseIcon = document.querySelector(".aplayer-pause");
        pauseIcon.style.bottom = "60%";
        pauseIcon.style.right = "50%";
      }

      if (!isOpen) {
        let pauseIcon = document.querySelector(".aplayer-pause");
        pauseIcon.style.bottom = "3%";
        pauseIcon.style.right = "3%";
      }

      this.togglePlayAnotherSong = {
        isPlay: true,
        index: this.currenSongPlayingIndex
      };
    },
    handlePlay() {
      this.togglePlayAnotherSong = {
        isPlay: true,
        index: this.currenSongPlayingIndex
      };
    }
  },

  beforeRouteEnter(to, from, next) {
    if (from.path === "/signin") {
      return next(vm => (vm.isWelcomeLogin = true));
    }
    next();
  },
  mounted() {
    if (this.isWelcomeLogin) {
      this.$notify({
        type: 'success',
        title: 'Login success',
      });
    }
  },
  computed: {
    ...mapState("utils", ["isLoading"])
    // ...mapState('stream', ['audioTrending']),
  },
  async created() {
    const response = await this.getStream();
    const selectPage = this.$route.hash.slice(1);
    if (response.status === 200 && selectPage === "") {
      this.activePage = "discussions";
    }

    if (response.status === 200 && selectPage !== "") {
      this.activePage = selectPage;
    }

    let fakeAudioList = [
      {
        _id: "5ebb574e24f0d8118a7e9bd6",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eba0fec9964403c2853d108",
            type: "composer",
            name: "Eminem"
          },
          {
            _id: "5eba0fec9964403c2853d109",
            type: "artist",
            name: "Laydy Gaga"
          },

        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "fdasf",
        description: "",
        content: "bbbb",
        type: "song",
        cover: {
          _id: "5ebb574824f0d8118a7e9bd5",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589335879/Coders-Tokyo-Forum/posts/eq9kcoihzbh0lj4ihky2.jpg"
        },
        media: {
          _id: "5ebb573e24f0d8118a7e9bd4",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589335870/Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5ebb574e24f0d8118a7e9bd6",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "a17f3d8225e4efff90681e43041449b720a2d1ec",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-13T02:11:10.851Z",
          updatedAt: "2020-05-13T02:11:26.042Z",
          __v: 0
        },
        createdAt: "2020-05-13T02:11:26.063Z",
        updatedAt: "2020-05-13T02:11:26.063Z"
      },
      {
        _id: "5eba0fec9964403c2853d107",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eba0fec9964403c2853d108",
            type: "composer",
            name: "aa"
          },
          {
            _id: "5eba0fec9964403c2853d109",
            type: "artist",
            name: "bb"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "gsadg",
        description: "",
        content: "gfgf",
        type: "song",
        cover: {
          _id: "5eba0fe59964403c2853d106",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589252069/Coders-Tokyo-Forum/posts/dcs73cilryegrqfram1y.jpg"
        },
        media: {
          _id: "5eba0fdd9964403c2853d105",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589252060/Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5eba0fec9964403c2853d107",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "9b27b17a2ff936004dcd8c7d72d42539b2275285",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-12T02:54:21.267Z",
          updatedAt: "2020-05-12T02:54:36.463Z",
          __v: 0
        },
        createdAt: "2020-05-12T02:54:36.476Z",
        updatedAt: "2020-05-12T02:54:36.476Z"
      },
      {
        _id: "5eb97577d26469063033a912",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb97577d26469063033a913",
            type: "composer",
            name: "vxv"
          },
          {
            _id: "5eb97577d26469063033a914",
            type: "artist",
            name: "cxv"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "cx",
        description: "",
        content: "xcvxcv",
        type: "song",
        cover: {
          _id: "5eb97573d26469063033a911",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212530/Coders-Tokyo-Forum/posts/sy7ewydvcyrolwqqxrwn.jpg"
        },
        media: {
          _id: "5eb97571d26469063033a910",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212528/Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5eb97577d26469063033a912",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "05a093e10835b2eb31b99e9c034dcd06c39e8bf8",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:55:29.615Z",
          updatedAt: "2020-05-11T15:55:35.675Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:55:35.683Z",
        updatedAt: "2020-05-11T15:55:35.683Z"
      },
      {
        _id: "5eb97484bd177101de04d2c3",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb97484bd177101de04d2c5",
            type: "artist",
            name: "sdf"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "sdf",
        description: "",
        content: "sdfdsf",
        type: "song",
        cover: {
          _id: "5eb9747abd177101de04d2c1",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212281/Coders-Tokyo-Forum/posts/hxg4w01ofaonslelfpci.jpg"
        },
        media: {
          _id: "5eb97482bd177101de04d2c2",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212289/Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: null,
          resourceType: "video",
          media: {
            type: "upload",
            signature: "0f2f498a03da53735b7756314851ccd8199764fd",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:51:30.120Z",
          updatedAt: "2020-05-11T15:51:30.120Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:51:32.144Z",
        updatedAt: "2020-05-11T15:51:32.144Z"
      },
      {
        _id: "5eb9745c147da00177e0eca7",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb9745c147da00177e0eca8",
            type: "composer",
            name: "gdfgf"
          },
          {
            _id: "5eb9745c147da00177e0eca9",
            type: "artist",
            name: "dgfd"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "dfgfd",
        description: "",
        content: "fdgfd",
        type: "song",
        cover: {
          _id: "5eb97456147da00177e0eca6",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212246/Coders-Tokyo-Forum/posts/bwec3feuv6ue9fmj5at4.jpg"
        },
        media: {
          _id: "5eb97454147da00177e0eca5",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212243/Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: null,
          resourceType: "video",
          media: {
            type: "upload",
            signature: "a7ddd694ca1c8ac6faeff63d9c67bee68268d089",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:50:44.746Z",
          updatedAt: "2020-05-11T15:50:44.746Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:50:52.791Z",
        updatedAt: "2020-05-11T15:50:52.791Z"
      },
      {
        _id: "5ebb574e24f0d8118a7e9bd6",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eba0fec9964403c2853d108",
            type: "composer",
            name: "aa"
          },
          {
            _id: "5eba0fec9964403c2853d109",
            type: "artist",
            name: "bb"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "fdasf",
        description: "",
        content: "bbbb",
        type: "song",
        cover: {
          _id: "5ebb574824f0d8118a7e9bd5",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589335879/Coders-Tokyo-Forum/posts/eq9kcoihzbh0lj4ihky2.jpg"
        },
        media: {
          _id: "5ebb573e24f0d8118a7e9bd4",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589335870/Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5ebb574e24f0d8118a7e9bd6",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "a17f3d8225e4efff90681e43041449b720a2d1ec",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-13T02:11:10.851Z",
          updatedAt: "2020-05-13T02:11:26.042Z",
          __v: 0
        },
        createdAt: "2020-05-13T02:11:26.063Z",
        updatedAt: "2020-05-13T02:11:26.063Z"
      },
      {
        _id: "5eba0fec9964403c2853d107",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eba0fec9964403c2853d108",
            type: "composer",
            name: "aa"
          },
          {
            _id: "5eba0fec9964403c2853d109",
            type: "artist",
            name: "bb"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "gsadg",
        description: "",
        content: "gfgf",
        type: "song",
        cover: {
          _id: "5eba0fe59964403c2853d106",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589252069/Coders-Tokyo-Forum/posts/dcs73cilryegrqfram1y.jpg"
        },
        media: {
          _id: "5eba0fdd9964403c2853d105",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589252060/Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5eba0fec9964403c2853d107",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "9b27b17a2ff936004dcd8c7d72d42539b2275285",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-12T02:54:21.267Z",
          updatedAt: "2020-05-12T02:54:36.463Z",
          __v: 0
        },
        createdAt: "2020-05-12T02:54:36.476Z",
        updatedAt: "2020-05-12T02:54:36.476Z"
      },
      {
        _id: "5eb97577d26469063033a912",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb97577d26469063033a913",
            type: "composer",
            name: "vxv"
          },
          {
            _id: "5eb97577d26469063033a914",
            type: "artist",
            name: "cxv"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "cx",
        description: "",
        content: "xcvxcv",
        type: "song",
        cover: {
          _id: "5eb97573d26469063033a911",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212530/Coders-Tokyo-Forum/posts/sy7ewydvcyrolwqqxrwn.jpg"
        },
        media: {
          _id: "5eb97571d26469063033a910",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212528/Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5eb97577d26469063033a912",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "05a093e10835b2eb31b99e9c034dcd06c39e8bf8",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:55:29.615Z",
          updatedAt: "2020-05-11T15:55:35.675Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:55:35.683Z",
        updatedAt: "2020-05-11T15:55:35.683Z"
      },
      {
        _id: "5eb97484bd177101de04d2c3",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb97484bd177101de04d2c5",
            type: "artist",
            name: "sdf"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "sdf",
        description: "",
        content: "sdfdsf",
        type: "song",
        cover: {
          _id: "5eb9747abd177101de04d2c1",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212281/Coders-Tokyo-Forum/posts/hxg4w01ofaonslelfpci.jpg"
        },
        media: {
          _id: "5eb97482bd177101de04d2c2",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212289/Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: null,
          resourceType: "video",
          media: {
            type: "upload",
            signature: "0f2f498a03da53735b7756314851ccd8199764fd",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:51:30.120Z",
          updatedAt: "2020-05-11T15:51:30.120Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:51:32.144Z",
        updatedAt: "2020-05-11T15:51:32.144Z"
      },
      {
        _id: "5eb9745c147da00177e0eca7",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb9745c147da00177e0eca8",
            type: "composer",
            name: "gdfgf"
          },
          {
            _id: "5eb9745c147da00177e0eca9",
            type: "artist",
            name: "dgfd"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "dfgfd",
        description: "",
        content: "fdgfd",
        type: "song",
        cover: {
          _id: "5eb97456147da00177e0eca6",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212246/Coders-Tokyo-Forum/posts/bwec3feuv6ue9fmj5at4.jpg"
        },
        media: {
          _id: "5eb97454147da00177e0eca5",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212243/Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: null,
          resourceType: "video",
          media: {
            type: "upload",
            signature: "a7ddd694ca1c8ac6faeff63d9c67bee68268d089",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:50:44.746Z",
          updatedAt: "2020-05-11T15:50:44.746Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:50:52.791Z",
        updatedAt: "2020-05-11T15:50:52.791Z"
      },
      {
        _id: "5ebb574e24f0d8118a7e9bd6",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eba0fec9964403c2853d108",
            type: "composer",
            name: "aa"
          },
          {
            _id: "5eba0fec9964403c2853d109",
            type: "artist",
            name: "bb"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "fdasf",
        description: "",
        content: "bbbb",
        type: "song",
        cover: {
          _id: "5ebb574824f0d8118a7e9bd5",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589335879/Coders-Tokyo-Forum/posts/eq9kcoihzbh0lj4ihky2.jpg"
        },
        media: {
          _id: "5ebb573e24f0d8118a7e9bd4",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589335870/Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5ebb574e24f0d8118a7e9bd6",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "a17f3d8225e4efff90681e43041449b720a2d1ec",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-13T02:11:10.851Z",
          updatedAt: "2020-05-13T02:11:26.042Z",
          __v: 0
        },
        createdAt: "2020-05-13T02:11:26.063Z",
        updatedAt: "2020-05-13T02:11:26.063Z"
      },
      {
        _id: "5eba0fec9964403c2853d107",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eba0fec9964403c2853d108",
            type: "composer",
            name: "aa"
          },
          {
            _id: "5eba0fec9964403c2853d109",
            type: "artist",
            name: "bb"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "gsadg",
        description: "",
        content: "gfgf",
        type: "song",
        cover: {
          _id: "5eba0fe59964403c2853d106",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589252069/Coders-Tokyo-Forum/posts/dcs73cilryegrqfram1y.jpg"
        },
        media: {
          _id: "5eba0fdd9964403c2853d105",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589252060/Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5eba0fec9964403c2853d107",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "9b27b17a2ff936004dcd8c7d72d42539b2275285",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-12T02:54:21.267Z",
          updatedAt: "2020-05-12T02:54:36.463Z",
          __v: 0
        },
        createdAt: "2020-05-12T02:54:36.476Z",
        updatedAt: "2020-05-12T02:54:36.476Z"
      },
      {
        _id: "5eb97577d26469063033a912",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb97577d26469063033a913",
            type: "composer",
            name: "vxv"
          },
          {
            _id: "5eb97577d26469063033a914",
            type: "artist",
            name: "cxv"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "cx",
        description: "",
        content: "xcvxcv",
        type: "song",
        cover: {
          _id: "5eb97573d26469063033a911",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212530/Coders-Tokyo-Forum/posts/sy7ewydvcyrolwqqxrwn.jpg"
        },
        media: {
          _id: "5eb97571d26469063033a910",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212528/Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: "5eb97577d26469063033a912",
          resourceType: "video",
          media: {
            type: "upload",
            signature: "05a093e10835b2eb31b99e9c034dcd06c39e8bf8",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:55:29.615Z",
          updatedAt: "2020-05-11T15:55:35.675Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:55:35.683Z",
        updatedAt: "2020-05-11T15:55:35.683Z"
      },
      {
        _id: "5eb97484bd177101de04d2c3",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb97484bd177101de04d2c5",
            type: "artist",
            name: "sdf"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "sdf",
        description: "",
        content: "sdfdsf",
        type: "song",
        cover: {
          _id: "5eb9747abd177101de04d2c1",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212281/Coders-Tokyo-Forum/posts/hxg4w01ofaonslelfpci.jpg"
        },
        media: {
          _id: "5eb97482bd177101de04d2c2",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212289/Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: null,
          resourceType: "video",
          media: {
            type: "upload",
            signature: "0f2f498a03da53735b7756314851ccd8199764fd",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:51:30.120Z",
          updatedAt: "2020-05-11T15:51:30.120Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:51:32.144Z",
        updatedAt: "2020-05-11T15:51:32.144Z"
      },
      {
        _id: "5eb9745c147da00177e0eca7",
        tags: [],
        comments: [],
        authors: [
          {
            _id: "5eb9745c147da00177e0eca8",
            type: "composer",
            name: "gdfgf"
          },
          {
            _id: "5eb9745c147da00177e0eca9",
            type: "artist",
            name: "dgfd"
          }
        ],
        likes: [],
        foodPhotos: [],
        savedBy: [],
        user: {
          _id: "5eaf9763c2cba93ce26aafb9",
          username: "ydobon",
          description: "dsfds",
          socialLinks: [
            {
              _id: "5eba183dd7244b46d2a1a298",
              type: "Facebook",
              url: "facebook.com/spacemanraem"
            },
            {
              _id: "5eb561b5a7e91a167ff5721b",
              type: "Linkedin",
              url: "dd"
            }
          ],
          createdAt: "2020-05-04T04:17:39.202Z",
          avatar: {
            _id: "5eb5607ca7e91a167ff5721a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg"
          },
          followers: [],
          following: [],
          job: "Blogger",
          sex: "Male"
        },
        topic: "dfgfd",
        description: "",
        content: "fdgfd",
        type: "song",
        cover: {
          _id: "5eb97456147da00177e0eca6",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1589212246/Coders-Tokyo-Forum/posts/bwec3feuv6ue9fmj5at4.jpg"
        },
        media: {
          _id: "5eb97454147da00177e0eca5",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1589212243/Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu",
          fileName: "Vung Ky Uc - Chillies",
          sizeBytes: 4835851,
          user: "5eaf9763c2cba93ce26aafb9",
          postId: null,
          resourceType: "video",
          media: {
            type: "upload",
            signature: "a7ddd694ca1c8ac6faeff63d9c67bee68268d089",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24
          },
          createdAt: "2020-05-11T15:50:44.746Z",
          updatedAt: "2020-05-11T15:50:44.746Z",
          __v: 0
        },
        createdAt: "2020-05-11T15:50:52.791Z",
        updatedAt: "2020-05-11T15:50:52.791Z"
      }
    ];

    this.audioList = fakeAudioList;
    this.audioFormat = fakeAudioList.map(audio => {
      let artists = audio.authors.filter(person => person.type === "artist");
      return {
        name: audio.media.fileName,
        artist: artists.map(person => person.name).toString(),
        url: audio.media.secureURL,
        cover: audio.cover.secureURL
      };
    });
  },
  watch: {
    isLoading(newValue) {
      if (newValue === false) {
        setTimeout(() => {
          let aplayerPic = document.querySelector(".aplayer-pic");
          aplayerPic.style.minWidth = "80px";

          let toggleOpenAPlayer = document.querySelector(
            ".aplayer-miniswitcher"
          );
          toggleOpenAPlayer.addEventListener("click", () => {
            let isOpen = document.querySelector(".aplayer-arrow");
            if (isOpen) {
              let aplayerPic = document.querySelector(".aplayer-pic");
              aplayerPic.style.minWidth = "80px";

              if (!this.isPlaying) {
                let playIcon = document.querySelector(".aplayer-play");
                playIcon.style.bottom = "67%";
                playIcon.style.right = "62%";
              }

              if (this.isPlaying) {
                let pauseIcon = document.querySelector(".aplayer-pause");
                pauseIcon.style.bottom = "60%";
                pauseIcon.style.right = "50%";
              }
            }

            if (!isOpen) {
              let aplayerPic = document.querySelector(".aplayer-pic");
              aplayerPic.style.minWidth = "130px";

              if (!this.isPlaying) {
                let playIcon = document.querySelector(".aplayer-play");
                playIcon.style.bottom = "50%";
                playIcon.style.right = "50%";
              }

              if (this.isPlaying) {
                let pauseIcon = document.querySelector(".aplayer-pause");
                pauseIcon.style.bottom = "3%";
                pauseIcon.style.right = "3%";
              }
            }
          });
        }, 0);
      }
    },
    togglePlayAnotherSong(newValue) {
      this.togglePlayAnotherSong = newValue;
    }
  },
};
</script>

<style scroped lang="scss">
.aplayer .aplayer-pic {
  min-width: 80px;

  .aplayer-play {
    bottom: 67%;
    right: 62%;
  }
}
</style>
