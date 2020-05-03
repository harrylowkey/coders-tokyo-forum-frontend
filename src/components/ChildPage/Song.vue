<template>
  <div>
    <v-row id="post">
      <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0 wrapper-icon d-sm-none d-md-flex">
        <post-reactions
          :likes="post.metadata.likes"
          :saves="post.metadata.saves"
          :flowers="123"
          :postId="post._id"
        ></post-reactions>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <v-card id="song" class="mx-auto pa-0 pa-8">
          <v-container class="d-flex">
            <v-img
              class="cover"
              src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              min-height="210px"
              max-height="210px"
              min-width="210px"
              max-width="210px"
              style="cursor: pointer"
              @click="togglePlayPause"
            >
              <div class="align-self-center d-flex justify-center wrapper-play-pause-icon">
                <v-icon class="play-pause-icon" size="50">{{ togglePlayPauseIcon }}</v-icon>
              </div>
            </v-img>

            <v-card-text class="song-description pl-0 pt-0">
              <v-card-title class="ml-5 headline pt-0">{{ post.song.name}}</v-card-title>
              <v-card-subtitle class="pt-1 ml-8 pl-1 pb-0">
                <span style="font-size: 13px" v-for="(author, i) in post.authors" :key="author._id">
                  {{ author.name }}
                  <span
                    style="font-size: 12px"
                  >{{ isAddFt(i, post.authors.length) }}</span>
                </span>
              </v-card-subtitle>

              <div class="ml-9">
                <av-waveform
                  class="mt-4"
                  ref="player"
                  audio-src="https://cdn.moefe.org/music/mp3/thing.mp3"
                  :canv-width="600"
                  :canv-height="80"
                  :played-line-width="1.1"
                  :played-line-color="'#4CAF50'"
                  :noplayed-line-width="0.5"
                  :noplayed-line-color="'grey'"
                  :playtime="false"
                  :playtime-with-ms="false"
                  :playtime-font-color="'#5e5b5b'"
                  :playtime-slider-width="2.5"
                  :playtime-slider-color="'#4CAF50'"
                  :playtime-font-family="'Roboto' || 'sans-serif'"
                />
                <div class="d-flex pr-5 justify-end">
                  <span
                    style="font-size: 13px; color: grey"
                    class="font-italic mb-0"
                  >{{ totalLength }}</span>
                </div>
              </div>
              <div class="wrapper-volume pr-3 pt-0">
                <v-card-actions class="d-flex ml-5 pt-0">
                  <tag :tagName="tag.tagName" v-for="tag in post.tags" :key="tag._id"></tag>
                </v-card-actions>
                <v-spacer></v-spacer>
                <div class="volume">
                  <v-icon @click="toggleMutedVolume" class="volume-icon">{{ volumeIcon }}</v-icon>
                  <v-slider
                    :color="'#4CAF50'"
                    class="volume-bar"
                    v-model="currentVolume"
                    max="100"
                    min="1"
                    track-color="grey"
                  ></v-slider>
                </div>
              </div>
            </v-card-text>
          </v-container>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col class="pr-0 user-profile" cols="3" sm="4" md="4" lg="3" xl="3">
                <div class="d-flex flex-column justify-center">
                  <v-container class="d-flex justify-center">
                    <user-social-links
                      :socialLinks="socialLinks"
                      :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
                      :username="'chau_chau'"
                    ></user-social-links>
                  </v-container>
                  <v-container class="d-flex justify-center pt-1">
                    <v-btn
                      @click="isFollowing = !isFollowing"
                      v-if="isFollowing"
                      dark
                      color="green"
                      x-small
                    >Follow</v-btn>
                    <v-btn
                      @click="isFollowing = !isFollowing"
                      v-else
                      dark
                      color="red"
                      x-small
                    >Unfollow</v-btn>
                  </v-container>
                </div>
              </v-col>

              <v-col class="lyric" cols="9" sm="8" md="8" lg="9" xl="9">
                <div :class="lyricClasses">
                  <p v-html="$options.filters.markdown(post.content)"></p>
                </div>
                <span
                  v-if="!isShowMore"
                  @click="toggleShowLyrics"
                  style="font-size: 13px; color: grey; cursor: pointer"
                  class="font-italic mb-0 show-more"
                >Show more</span>
                <span
                  v-if="isShowMore"
                  @click="toggleShowLyrics"
                  style="font-size: 13px; color: grey; cursor: pointer"
                  class="font-italic mb-0 show-more"
                >Show less</span>
                <div class="ml-9 mt-5 d-flex justify-end">
                  <edit-delete-btns
                    @handleEditPost="handleEditPost"
                    @handleDeletePost="handleDeletePost"
                  ></edit-delete-btns>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <div class="mt-5">
          <v-divider></v-divider>
          <h1 class="mb-3 mt-8">Comments</h1>

          <write-comment></write-comment>

          <div v-if="post.comments.length">
            <comment
              v-for="comment in post.comments"
              :key="comment._id"
              :comment="comment"
              :author="post.user"
              :postId="post._id"
            ></comment>
          </div>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
        class="wrapper-author-follow d-sm-none d-md-flex flex-column"
      >
        <author-follow-card class="author-follow" :user="user" :description="user.description"></author-follow-card>

        <div
          v-if="otherSongsOfAuthor.length"
          class="d-flex flex-column justify-center align-center mt-2"
        >
          <v-hover
            v-slot:default="{ hover }"
            style="transition: 0.3s"
            v-for="song in otherSongsOfAuthor"
            :key="song._id"
          >
            <v-card :elevation="hover ? 10 : 3" :class="{ 'on-hover': hover }" id="audio-card">
              <v-img
                class="cover"
                src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="100px"
                style="cursor: pointer"
                @click="playAnotherSong(song._id)"
              >
                <v-card-title class="title white--text d-flex flex-column align-start pb-0 pt-2">
                  <p class="mt-0 mb-0 font-italic subheading text-left">{{ song.topic }}</p>
                  <p
                    class="caption font-weight-medium font-italic text-left"
                  >{{ song.authors[0].name }}</p>
                </v-card-title>

                <div class="align-self-center d-flex justify-center mb-2 wrapper-icon">
                  <v-icon
                    class="play-icon"
                    style="color: #fff"
                    @click="hanldePlayAnotherSong"
                    size="50"
                  >mdi-music-circle-outline</v-icon>
                </div>
              </v-img>

              <v-card-actions style="padding: 25px 25px 0 15px; height: 30px" class="pb-1">
                <v-card-text
                  class="font-italic font-weight-light pt-0"
                  style="font-size: 13px; height: 30px; margin-top: 16px !important"
                >
                  <span class="mt-2">{{ song.createdAt | date }}</span>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-container class="pt-4 pl-6 pr-0 d-flex justify-space-around">
                  <like-btn :likes="4"></like-btn>
                  <comment-btn :comments="9"></comment-btn>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-hover>
        </div>
      </v-col>
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
import { userSocialLinks } from "@/mixins/userSocialLinks";
import ReadTime from "@/components/Shared/readTime";
import WriteComment from "@/components/Comment/WriteComment";
import EditDeleteBtns from "../Post/EditDeleteBtns";

export default {
  mixins: [userSocialLinks],
  data() {
    return {
      lyricClasses: ["lyric-wrapper"],
      isShowMore: false,
      togglePlayPauseIcon: "mdi-play-circle-outline",
      volumeIcon: "mdi-volume-high",
      currentVolume: 100,
      maxVolume: 1.0,
      minVolume: 0.0,
      totalLength: 0,
      isFollowing: false,
      post: {
        _id: "5e9920603c513c2611a9df88",
        tags: [
          {
            _id: "5e8c5f27abf7df7d3be426db",
            tagName: "aucoustic"
          },
          {
            _id: "5e8c5f27abf7df7d3e426dc",
            tagName: "tinh ca"
          }
        ],
        comments: [],
        authors: [
          {
            _id: "5e9920603c513c2611a9df89",
            type: "artist",
            name: "Chillies"
          },
          {
            _id: "5e9920603c513c26119df89",
            type: "artist",
            name: "ChilliesB"
          }
        ],
        likes: [],
        savedBy: [],
        userId: "5e8b577f1a2dde32298795f4",
        topic: " Memories place",
        description: "Rock Ballad",
        content:
          "\nLyrics :  \nAnh sẽ mang tên em vào trong mixtape  \nSau đêm nay chỉ mong em vui lên  \nI see you wanna be mah girl  \nVà nếu em là mãi mãi\n\nJust let me show you what love really do  \nHaving the best moment for me n you  \nSo what you say girl  \nWill you be my world ?  \nHold my hand and feel my love\n\nĐôi chân phiêu du anh đưa tay tới nơi phía chân trời  \nLặng nhìn bầu trời vàng trong hoàng hôn  \nCho nỗi nhớ em thêm đầy vơi  \nBaby tell me you feel the same  \nCause I wanna be your man  \nGive me one more chance  \nTo be with you again  \nI wanna see you on the night\n\nBae I wanna see you on the night  \nỞ một nơi có từng cơn sóng xô  \nNhẹ nhàng sâu lắng nghe từng âm thanh  \nCâu hát phiêu dạt về nơi xa  \nĐiệu nhạc tình với rượu vang trên tay  \nEm có biết đâu khi lòng ta say  \nI say Drink wit meh overnight  \nLê bước chân trên những con đường dài.\n\nTên của em nó nằm trong bảng chữ cái A B C  \nVà Mr Yanbi đã nhắc tên em ở trong một cái MP3  \nSẽ là một nơi em đến  \nBao nhiêu người xung quanh yêu mến  \nAnh thắp chút ánh nến hòa với đôi môi em ngọt như là bánh Cookie Cookie  \nChỉ cần có em bay theo điệu nhạc với một chiếc bút bi bút bi  \nAnh sẽ hát bài ca này trên Radio và TV  \nGhi dấu lại những dòng tâm tư và thu vào trong cái CD  \nLet me see you babe girl  \nEm đẹp xinh khiến anh ngẩn ngơ  \nMọi thứ cứ xảy ra như thế vì đâu ai ngờ  \nNgay bây giờ ngay từng nhịp điệu anh viết chắc em nghĩ anh là Florida  \nVì em đẹp hơn cả Nexttop Model  \nEm sẽ phải sống ra sao khi trong cơn say này xô bồ  \nKhi T-Akayz in da track  \nEm không yêu chỉ còn 1 cách  \nEm sẽ không thể quên được anh đâu  \nMây mưa trăng sao mình bên nhau  \nVà đêm từng đêm về  \nEm ơi không cần câu nệ  \nNow let me see ya overnight\n\nBae I wanna see you on the night  \nỞ một nơi có từng cơn sóng xô  \nNhẹ nhàng sâu lắng nghe từng âm thanh  \nCâu hát phiêu dạt về nơi xa  \nĐiệu nhạc tình với rượu vang trên tay  \nEm có biết đâu khi lòng ta say  \nI say Drink wit meh overnight  \nLê bước chân trên những con đường dài.",
        type: "song",
        media: {
          _id: "5e99206e3c513c2611a9df8a",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614.mp3",
          publicId:
            "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614",
          fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
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
        song: {
          name: "Memories place",
          artist: "Chillies",
          url: "https://cdn.moefe.org/music/mp3/thing.mp3",
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
      otherSongsOfAuthor: [
        {
          _id: "5e9920603c513c2611a9df88",
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
              type: "artist",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: " Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
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
            name: "东西（Cover：林俊呈）",
            artist: "纳豆",
            url: "https://cdn.moefe.org/music/mp3/thing.mp3",
            cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
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
          _id: "5e99202c3c513c2611a9df86",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "rock"
            },
            {
              _id: "5e8c5f27abfdf7d3be426dc",
              tagName: "rockballad"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e8c5f27abf7df7d3be426dd",
              type: "artist",
              name: "Sweettie"
            },
            {
              _id: "5e8c5f27abf7df7d3be426de",
              type: "composer",
              name: "Sweettie"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "The last time",
          description: "A good song",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e9920363c513c2611a9df87",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093557/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558",
            fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e99202c3c513c2611a9df86",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "1f824197f0826b949e90ed5a78544ba7c268d52a",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:19:18.857Z",
            updatedAt: "2020-04-17T03:19:18.857Z",
            __v: 0
          },
          audio: {
            name: "东西（Cover：林俊呈）",
            artist: "纳豆",
            url: "https://cdn.moefe.org/music/mp3/thing.mp3",
            cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
            lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
          },
          createdAt: "2020-04-17T03:19:18.881Z",
          updatedAt: "2020-04-17T03:19:18.881Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        }
      ]
    };
  },
  methods: {
    playAnotherSong(songId) {
      this.$router.push({ path: `/songs/${songId}` });
    },
    slicedTags(tags) {
      return tags.slice(0, this.maxTags);
    },
    hanldePlayAnotherSong() {
      console.log("Play another song");
    },
    toggleShowLyrics() {
      if (this.isShowMore) {
        this.lyricClasses.pop();
      } else {
        this.lyricClasses.push("show-lyric-wrapper");
      }
      this.isShowMore = !this.isShowMore;
    },
    togglePlayPause() {
      if (this.togglePlayPauseIcon === "mdi-play-circle-outline") {
        this.togglePlayPauseIcon = "mdi-pause-circle-outline";
        return this.$refs.player.audio.play();
      } else {
        this.togglePlayPauseIcon = "mdi-play-circle-outline";
        return this.$refs.player.audio.pause();
      }
    },
    isAddFt(index, dataLength) {
      return index + 1 < dataLength ? "ft" : "";
    },
    toggleMutedVolume() {
      if (this.volumeIcon === "mdi-volume-high") {
        this.volumeIcon = "mdi-volume-off";
        this.currentVolume = 0;
        return (this.$refs.player.audio.volume = this.minVolume);
      } else {
        this.volumeIcon = "mdi-volume-high";
        this.currentVolume = 50;
        return (this.$refs.player.audio.volume = this.maxVolume / 2);
      }
    },
    calProgressBar() {
      const player = this.$refs.player.audio;
      const currentTime = player.currentTime;

      this.totalLength = this.calculateTotalValue(player.duration);

      // calculate current value time
      this.currentTime = this.calculateCurrentValue(currentTime);

      this.progressBar.value = player.currentTime / player.duration;

      if (player.currentTime == player.duration) {
        this.togglePlayPauseIcon = "mdi-play-circle-outline";
      }
    },
    calculateTotalValue(length) {
      let minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ":" + seconds;

      return time;
    },
    calculateCurrentValue(currentTime) {
      let current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time =
          (current_minute < 10 ? "0" + current_minute : current_minute) +
          ":" +
          (current_seconds < 10 ? "0" + current_seconds : current_seconds);

      return current_time;
    },
    calTotalLength() {
      let duration = this.post.media.media.duration / 60;
      let splitRes = duration.toString().split(".");
      let minutes = Number(splitRes[0]);
      let seconds = Math.round(Number(splitRes[1]) * 0.6).toFixed(0);
      seconds = seconds.toString().split(".");
      seconds = seconds[0].slice(0, 2);
      return `${minutes}:${seconds}`;
    }
  },
  watch: {
    currentVolume(newValue, oldValue) {
      if (newValue === 1) this.volumeIcon = "mdi-volume-off";
      if (newValue !== 1) this.volumeIcon = "mdi-volume-high";
      return (this.$refs.player.audio.volume = newValue / 100);
    }
  },
  created() {
    this.totalLength = this.calTotalLength();
  },
  computed: {},
  components: {
    Tag,
    ReadTime,
    EditDeleteBtns,
    UserSocialLinks,
    LikeBtn,
    CommentBtn,
    UserAvatar,
    FacebookBtn,
    ViewsBtn,
    Comment,
    WriteComment,
    AuthorProfile,
    AuthorFollowCard,
    PostReactions,
    OtherPostsOfAuthor
  }
};
</script>

<style lang="scss">
.lyric-wrapper {
  height: 270px;
  overflow: hidden;
}

.show-lyric-wrapper {
  height: auto;
}

.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 0 !important;
}
.song-description {
  // border: 1px solid grey;
  // border-left: none;
  // border-top-right-radius: 5px;
  // border-bottom-right-radius: 5px;
}
.cover {
  position: relative;

  .wrapper-play-pause-icon {
    position: absolute;
    top: 36%;
    left: 36%;

    .play-pause-icon {
      color: #fff;
    }
  }
}

#song {
  padding: 16px 15px 8px 15px !important;
}

.aplayer {
  -webkit-box-shadow: none;
  box-shadow: none;
  margin: 0;

  .aplayer-icon {
    width: 18px;
    height: 18px;
  }

  .aplayer-pic {
    height: 250px !important;
    width: 280px !important;

    .aplayer-play {
      width: 56px;
      height: 56px;
      border: 2px solid #fff;
      bottom: 44%;
      right: 44%;
      margin: 0 -15px -15px 0;
    }

    .aplayer-play svg {
      position: absolute;
      top: 5px;
      left: 4px;
      height: 46px;
      width: 55px;
    }
  }

  .aplayer-info {
    margin-left: 290px !important;

    .aplayer-controller {
      .aplayer-bar-wrap {
        .aplayer-bar {
          .aplayer-played {
            height: 2px;
          }
        }
      }
    }

    .aplayer-music {
      margin-bottom: 35px;
      height: 40px;

      .aplayer-title {
        font-size: 1.65rem !important;
      }

      .aplayer-author {
        font-size: 1.05rem !important;
      }
    }
  }
}

.aplayer
  .aplayer-info
  .aplayer-controller
  .aplayer-time
  .aplayer-icon.aplayer-icon-loop {
  display: none !important;
}

.aplayer
  .aplayer-info
  .aplayer-controller
  .aplayer-volume-wrap
  .aplayer-volume-bar-wrap
  .aplayer-volume-bar {
  bottom: 4px !important;
  right: 12px !important;
}

audio {
  display: none;
}

.wrapper-volume {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .volume {
    display: flex;
    width: 20%;

    .volume-icon {
      cursor: pointer;
    }
    .volume-bar {
      width: 163px;
      height: 20px;
      margin-bottom: 14px;
      transition: ease 0.5s;
      color: #000;
    }
  }
}

#audio-card {
  height: 155px;
  width: 270px;
  margin-top: 30px;
  position: relative;

  .wrapper-icon {
    position: absolute;
    top: 70%;
    left: 6%;

    .play-icon {
      font-size: 21px !important;
    }
  }
}
</style>