<template>
  <v-hover v-slot:default="{ hover }" style="transition: 0.3s">
    <v-card class="mx-auto mt-6 movie-card" :elevation="hover ? 20 : 3">
      <v-row style="margin-right: 0">
        <v-col class="pt-0 pr-0" cols="12" sm="12" md="12" lg="7" xl="8">
          <v-img
            src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
            height="400px"
            style
            class="cover-movie"
          ></v-img>
        </v-col>
        <v-col class="pa-0" cols="12" sm="12" md="12" lg="5" xl="4" style="position: relative">
          <div class="d-md-none d-lg-flex">
            <v-container class="ml-1 movie-detail">
              <v-card-text class="pb-2 pt-2">
                <router-link class="title-link" :to="blogLink">
                  <p class="title text--primary mb-0 pt-1">{{ topic }}</p>
                </router-link>

                <v-container class="d-flex pl-1 pb-0">
                  <p class="key mb-0 mr-3">Director:</p>
                  <span></span>
                  <p class="mb-0 mr-3">
                    <span
                      v-for="(director, i) in directors"
                      :key="director._id"
                      class="value mb-0"
                    >{{ director.name }}{{ isAddComma(i, directors.length) }}</span>
                  </p>
                </v-container>

                <v-container class="d-flex pl-1 pb-0">
                  <p class="key mb-0 mr-3">Actors:</p>
                  <span></span>
                  <p class="mb-0 mr-3">
                    <span
                      v-for="(actor, i) in actors"
                      :key="actor._id"
                      class="value mb-0"
                    >{{ actor.name }}{{ isAddComma(i, actors.length) }}</span>
                  </p>
                </v-container>

                <v-container class="d-flex pl-1 pb-0">
                  <p class="key mb-0 mr-3">IMDb:</p>
                  <v-chip
                    label
                    text-color="black"
                    outlined
                    small
                    style="border: 1px solid #FBC02D !important; background-color: #fdd835 !important"
                  >{{ movie.imdb }}</v-chip>
                </v-container>

                <v-container class="d-flex pl-1 pb-0">
                  <p class="key mb-0 mr-3">Nation:</p>
                  <p class="value mb-0">{{ movie.country }}</p>
                </v-container>

                <v-container class="d-flex pl-1 pb-0">
                  <p class="key mb-0 mr-3">Link:</p>
                  <v-chip label text-color="black" outlined small :style="calMovieYearColor">
                    <a target="_blank" :href="movie.link">{{ movie.link }}</a>
                  </v-chip>
                </v-container>

                <v-container class="d-flex pl-1 pb-0">
                  <p class="key mb-0 mr-3">Release Date:</p>
                  <v-chip
                    label
                    text-color="black"
                    outlined
                    small
                    style="border: 1px solid #90d2a3 !important; background-color: #C5E1A5 !important"
                  >{{ movie.releaseDate }}</v-chip>
                </v-container>

                <v-container class="d-flex pl-1 pb-0">
                  <p class="key mb-0 mr-3">Time:</p>
                  <p class="value mb-0">{{ movie.time }} minutes</p>
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
            <v-container class="ml-1 movie-detail pt-1 pb-0">
              <v-card-text class="pb-6 pt-0 d-flex justify-space-around">
                <div>
                  <v-container class="d-flex pl-1 pb-0 pt-2">
                    <p class="key mb-0 mr-3">Status:</p>
                    <p class="value mb-0" :style="calMovieStatusColor">{{ movie.status }}</p>
                  </v-container>

                  <v-container class="d-flex pl-1 pb-0">
                    <p class="key mb-0 mr-3">Director:</p>
                    <span></span>
                    <p class="mb-0 mr-3">
                      <span
                        v-for="(director, i) in directors"
                        :key="director._id"
                        class="value mb-0"
                      >{{ director.name }}{{ isAddComma(i, directors.length) }}</span>
                    </p>
                  </v-container>

                  <v-container class="d-flex pl-1 pb-0">
                    <p class="key mb-0 mr-3">Actors:</p>
                    <span></span>
                    <p class="mb-0 mr-3">
                      <span
                        v-for="(actor, i) in actors"
                        :key="actor._id"
                        class="value mb-0"
                      >{{ actor.name }}{{ isAddComma(i, actors.length) }}</span>
                    </p>
                  </v-container>

                  <v-container class="d-flex pl-1 pb-0">
                    <p class="key mb-0 mr-3">IMDb:</p>
                    <v-chip
                      label
                      text-color="black"
                      outlined
                      small
                      style="border: 1px solid #FBC02D !important; background-color: #fdd835 !important"
                    >{{ movie.imdb }}</v-chip>
                  </v-container>
                  <v-container class="d-flex pl-1 pb-0">
                    <p class="key mb-0 mr-3">Nation:</p>
                    <p class="value mb-0">{{ movie.country }}</p>
                  </v-container>
                </div>

                <div>
                  <v-container class="d-flex pl-1 pb-0">
                    <p class="key mb-0 mr-3">Year:</p>
                    <v-chip
                      label
                      text-color="black"
                      outlined
                      small
                      :style="calMovieYearColor"
                    >{{ movie.year }}</v-chip>
                  </v-container>

                  <v-container class="d-flex pl-1 pb-0">
                    <p class="key mb-0 mr-3">Release Date:</p>
                    <v-chip
                      label
                      text-color="black"
                      outlined
                      small
                      style="border: 1px solid #90d2a3 !important; background-color: #C5E1A5 !important"
                    >{{ movie.releaseDate }}</v-chip>
                  </v-container>

                  <v-container class="d-flex pl-1 pb-0">
                    <p class="key mb-0 mr-3">Time:</p>
                    <p class="value mb-0">{{ movie.time }} minutes</p>
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
              </v-card-text>
              <v-divider></v-divider>
            </v-container>
          </div>
        </v-col>
      </v-row>

      <v-list-item three-line style="padding: 0 25px 0 20px;">
        <v-list-item-content class="pr-10 pt-lg-0 pb-lg-0">
          <router-link class="title-link" :to="blogLink">
            <v-list-item-title class="headline movie-title mb-0 mt-3">{{ topic }}</v-list-item-title>
          </router-link>
          <p class="description mb-0 pt-2">{{ description || content }}</p>
          <span style="font-size: 0.775rem;" class="pt-1"></span>
          <div class="d-flex justify-space-between" style="height: 20px">
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
        <tag :tagName="tags[0].tagName" :postType="'movie'"></tag>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import LikeBtn from "@/components/Shared/LikeButton";
import CommentBtn from "@/components/Shared/CommentButton";
import Tag from "@/components/Shared/Tag";
import UserAvatar from "@/components/Shared/UserAvatar";
import { movieDescription } from "@/mixins/movieDescription";
import ReadTime from "@/components/Shared/readTime";

export default {
  mixins: [movieDescription],
  props: {
    _id: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    },
    authors: {
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
    url: {
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
    movie: {
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
      director: {},
      actors: {},
      blogLink: ""
    };
  },
  methods: {
    linkToBlog() {
      this.$router.push({ path: this.blogLink });
    }
  },
  created() {
    this.blogLink = `/movieReviews/${this._id}`;
  }
};
</script>

<style scoped lang="scss">
.value {
  color: #000;
}
.movie-title {
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

.movie-card {
  border-radius: 7px !important;
}

.cover-movie {
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