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
          <v-container class="pa-0 pb-4">
            <v-row style="margin-right: 0">
              <v-col class="pt-0 pr-0" cols="12" sm="12" md="12" lg="7" xl="8">
                <v-img
                  src="https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg"
                  height="360px"
                  style
                  class="cover-book"
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
                  <v-container class="ml-1 food-detail">
                    <v-card-text class="pb-2 pt-2">
                      <p class="title text--primary mb-0 pt-1">{{ food.restaurant }}</p>

                      <v-container class="d-flex pl-1 pb-0 pt-2">
                        <v-icon color="green" size="15" class="mb-0 mr-2">mdi-tag-text</v-icon>
                        <p class="value mb-0">{{ food.priceAverage }} {{ food.priceUnit}}</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Open time:</p>
                        <p class="value mb-0">{{ food.openTime }}</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Quality:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          :style="calPointColor(food.quality)"
                        >{{ food.quality }}</v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Price:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          :style="calPointColor(food.price)"
                        >{{ food.price }}</v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Service:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          :style="calPointColor(food.service)"
                        >{{ food.service }}</v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Space:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          :style="calPointColor(food.space)"
                        >{{ food.space }}</v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">Location:</p>
                        <p class="value mb-0">
                          <a href="#">{{ food.address }}</a>
                        </p>
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
                  </v-container>
                </div>
                <div class="d-none d-md-flex d-lg-none">
                  <v-container class="ml-1 book-detail pt-1 pb-0">
                    <v-card-text class="pb-6 pt-0 d-flex justify-space-around flex-wrap">
                      <div class="ml-12">
                        <p class="title text--primary mb-0 pt-1">{{ food.restaurant }}</p>

                        <v-container class="d-flex pl-1 pb-0 pt-2">
                          <v-icon color="green" size="15" class="mb-0 mr-2">mdi-tag-text</v-icon>
                          <p class="value mb-0">{{ food.priceAverage }} {{ food.priceUnit}}</p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Open time:</p>
                          <p class="value mb-0">{{ food.openTime }}</p>
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

                      <div>
                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Quality:</p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            :style="calPointColor(food.quality)"
                          >{{ food.quality }}</v-chip>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Price:</p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            :style="calPointColor(food.price)"
                          >{{ food.price }}</v-chip>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Service:</p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            :style="calPointColor(food.service)"
                          >{{ food.service }}</v-chip>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">Space:</p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            :style="calPointColor(food.space)"
                          >{{ food.space }}</v-chip>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0 flex-wrap">
                          <p class="key mb-0 mr-3">Location:</p>
                          <p class="value mb-0">
                            <a href="#">{{ food.address }}</a>
                          </p>
                        </v-container>
                      </div>
                    </v-card-text>
                  </v-container>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-sheet class="mx-auto">
            <v-slide-group v-model="foodPhotos" class="px-4 pt-4" show-arrows center-active>
              <v-slide-item v-for="(photo, i) in foodPhotos" :key="i">
                <v-card class="ma-4" height="155" width="155">
                  <v-img
                    :src="photo.secureURL"
                    height="100%"
                    width="100%"
                    class="cover-book"
                    style="cursor: pointer"
                    @click="handleZoomPhoto(photo.secureURL)"
                  ></v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
            <div class="d-flex justify-end mx-10 pb-4">
              <p
                v-if="foodPhotos.length > 3"
                style="font-size: 13px;"
                class="font-italic mb-0"
              >{{ foodPhotos.length }} photos</p>
            </div>
          </v-sheet>

          <v-row justify="center">
            <v-dialog v-model="dialog" max-width="700">
              <v-card style="height: 500px !important">
                <v-img
                  :src="dialogImageSrc"
                  height="100%"
                  width="100%"
                  class="cover-book"
                  style="cursor: pointer"
                  @click="dialog = !dialog"
                ></v-img>
              </v-card>
            </v-dialog>
          </v-row>

          <v-divider></v-divider>
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
        <div>
          <v-divider></v-divider>
          <h1 class="mb-3 mt-8">Comments</h1>
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
      <v-col cols="12" sm="12" md="3" lg="3" xl="3"></v-col>
    </v-row>

    <v-row id="other-posts-of-author" v-if="otherBooksOfAuthor.length" class="mb-10">
      <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0"></v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <v-divider></v-divider>
        <h1 class="mt-8 mb-3">Other blogs of author</h1>
        <other-posts-of-author :posts="otherBooksOfAuthor"></other-posts-of-author>
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
import { foodDescription } from "@/mixins/foodDescription";
import { userSocialLinks } from "@/mixins/userSocialLinks";
import ReadTime from "@/components/Shared/readTime";

export default {
  mixins: [foodDescription, userSocialLinks],
  data() {
    return {
      dialog: false,
      dialogImageSrc: "",
      post: {
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
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
            fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
            sizeBytes: 112398
          },
          {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png",
            fileName: "89025324_2760328297369108_3874548065679441920_n.png",
            sizeBytes: 184898
          },
          {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
            fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
            sizeBytes: 112398
          },
          {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png",
            fileName: "89025324_2760328297369108_3874548065679441920_n.png",
            sizeBytes: 184898
          },
          {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
            fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
            sizeBytes: 112398
          },
          {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png",
            fileName: "89025324_2760328297369108_3874548065679441920_n.png",
            sizeBytes: 184898
          },
          {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png",
            fileName: "89025324_2760328297369108_3874548065679441920_n.png",
            sizeBytes: 184898
          },
          {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
            fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
            sizeBytes: 112398
          },
          {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
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
        user: {
          _id: "5e8b577f1a2dde322987924",
          username: "nhat_anh"
        },
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
      otherBooksOfAuthor: [
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
                "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
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
      tagStyle: {
        fontSize: "0.975em !important",
        fontWeight: 300,
        padding: "5px 5px",
        height: "35px",
        letterSpacing: "0.0111333333em !important",
        marginLeft: "12px !important",
        borderRadius: "4px"
      },
      food: {},
      prevIcon: true,
      nextIcon: true,
      foodPhotos: []
    };
  },
  computed: {},
  created() {
    this.foodPhotos = this.post.foodPhotos;
  },
  methods: {
    handleZoomPhoto(photoSrc) {
      this.dialogImageSrc = photoSrc;
      this.dialog = !this.dialog;
    }
  },
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