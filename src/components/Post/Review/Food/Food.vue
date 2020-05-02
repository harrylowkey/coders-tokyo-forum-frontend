<template>
  <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
    <v-card class="mx-auto mt-6 food-card" :elevation="hover ? 20 : 3">
      <v-row style="margin-right: 0">
        <v-col class="pt-0 pr-0" cols="12" sm="12" md="12" lg="7" xl="8">
          <v-img @click="linkToBlog" :src="cover.secureURL" height="378px" style="cursor: pointer" class="cover-food"></v-img>
        </v-col>
        <v-col class="pa-0" cols="12" sm="12" md="12" lg="5" xl="4" style="position: relative">
          <div class="d-md-none d-lg-flex">
            <v-container class="ml-1 food-detail">
              <v-card-text class="pb-2 pt-2">
                <router-link class="title-link" :to="blogLink">
                  <p class="title text--primary mb-0 pt-1">{{ food.restaurant }}</p>
                </router-link>
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
                <div>
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
                </div>
                <div>
                  <v-container class="d-flex pl-1 pb-0 flex-wrap">
                    <p class="key mb-0 mr-3">Location:</p>
                    <p class="value mb-0">
                      <a href="#">{{ food.address }}</a>
                    </p>
                  </v-container>
                </div>
              </v-card-text>
              <v-divider></v-divider>
            </v-container>
          </div>
        </v-col>
      </v-row>

      <v-list-item three-line style="padding: 0 25px 0 20px;">
        <v-list-item-content class="pr-10 pt-lg-0 pb-lg-0">
          <router-link class="title-link" :to="blogLink">
            <v-list-item-title class="headline food-title mb-0 mt-3">{{ topic }}</v-list-item-title>
          </router-link>
          <p class="description mb-0 pt-2">{{ description || content }}</p>
          <div class="d-flex justify-space-between mt-1" style="height: 20px">
            <span style="font-size: 0.775rem;" class="pt-1">
              <a style=" text-decoration: none" :href="blogLink">Read more...</a>
            </span>
            <read-time class="pt-0" :text="content" :customize="'font-size: 0.775rem'"></read-time>
          </div>
        </v-list-item-content>
        <user-avatar
          :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
          :username="userId.username"
          style="padding-bottom: 7px;"
        ></user-avatar>
      </v-list-item>

      <v-card-actions style="padding: 2px 25px 0 6px;" class="pb-1 pb-lg-2">
        <v-card-text
          class="font-italic font-weight-light pt-0 pb-0"
          style="font-size: small"
        >{{ createdAt | date }}</v-card-text>
        <v-spacer></v-spacer>
        <v-container>
          <v-row>
            <v-col
              class="pa-lg-0"
              cols="5"
              sm="5"
              md="4"
              offset-md="2"
              lg="3"
              offset-lg="5"
              xl="2"
              offset-xl="5"
            >
              <like-btn :likes="200"></like-btn>
            </v-col>
            <v-col class="pa-lg-0">
              <comment-btn :comments="500"></comment-btn>
            </v-col>
          </v-row>
        </v-container>
        <tag :tagName="tags[0].tagName" :postType="'food'"></tag>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import LikeBtn from "@/components/Shared/LikeButton";
import CommentBtn from "@/components/Shared/CommentButton";
import Tag from "@/components/Shared/Tag";
import UserAvatar from "@/components/Shared/UserAvatar";
import ReadTime from "@/components/Shared/readTime";

export default {
  props: {
    _id: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    },
    foodPhotos: {
      type: Array,
      default: () => []
    },
    commments: {
      type: Array,
      default: () => []
    },
    likes: {
      type: Array,
      default: () => []
    },
    savedBy: {
      type: Array,
      default: () => []
    },
    userId: {
      type: Object,
      default: () => ({})
    },
    topic: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    updatedAt: {
      type: String,
      required: true
    },
    metadata: {
      type: Object,
      default: () => ({})
    },
    food: {
      type: Object,
      default: () => ({})
    },
    cover: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Tag,
    LikeBtn,
    ReadTime,
    CommentBtn,
    UserAvatar
  },
  data() {
    return {
      maxSlice1: 1,
      maxSlice: 2,
      blogLink: ""
    };
  },
  methods: {
    isStar(index) {
      if (index <= this.food.stars) return "#FDD835";
      else return "";
    },
    calPointColor(point) {
      if (point < 5)
        return {
          border: "1px solid #D50000 !important",
          backgroundColor: "#EF9A9A !important"
        };
      if (point < 8)
        return {
          border: "1px solid #FBC02D !important",
          backgroundColor: "#fdd835 !important"
        };
      if (point >= 8)
        return {
          border: "1px solid #90d2a3 !important",
          backgroundColor: "#C5E1A5 !important"
        };
    },
    linkToBlog() {
      this.$router.push({ path: this.blogLink });
    }
  },
  created() {
    this.blogLink = `/foodReviews/${this._id}`;
  }
};
</script>

<style scoped lang="scss">
.value {
  color: #000;
}
.food-title {
  text-align: left;
  white-space: initial;
  line-height: 1.1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.title-link {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}

.food-card {
  border-radius: 7px !important;
}

.cover-food {
  border-top-left-radius: 7px !important;
}
.like-icon,
.comment-icon {
  position: relative;
}

.like-icon-content {
  position: absolute !important;
  top: 10px;
  left: 22px;
  font-size: 12px;
}

.comment-icon-content {
  position: absolute !important;
  top: 10px;
  left: 22px;
  font-size: 12px;
}

.description {
  overflow: hidden;
  position: relative;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  max-height: 1.4;
  text-align: justify;
  white-space: initial;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
</style>