<template>
  <div class="mt-12">
    <v-row id="post">
      <v-col
        cols="12"
        sm="12"
        md="1"
        lg="1"
        xl="1"
        class="pr-0 wrapper-icon d-sm-none d-md-flex"
      >
        <post-reactions
          v-if="!isLoading"
          @hanldeClickCommentBtn="hanldeClickCommentBtn"
          @likedPost="handleLikedPost"
          @unlikedPost="handleUnlikedPost"
          @savedPost="handleSavedPost"
          @unsavedPost="handleUnsavedPost"
          :postId="post._id"
          :likes="post.likes"
          :saves="post.savedBy"
          :flowers="0"
          :isUserLiked="isUserLiked"
          :isUserSaved="isUserSaved"
        />
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="ml-12">
        <a
          id="trigger-scroll-comments"
          style="display: none"
          href="#"
          v-scroll-to="'#comments'"
        >
          Scroll to #comment
        </a>
        <v-skeleton-loader />
        <v-boilerplate
          class="mx-auto mt-6"
          v-if="isLoading"
          type="image, card-avatar, article"
        />
        <v-card v-else class="mx-auto mt-6" id="blog-card" elevation="6">
          <v-container class="pa-0">
            <v-row style="margin-right: 0">
              <v-col class="pt-0 pr-0" cols="12" sm="12" md="12" lg="7" xl="8">
                <v-img
                  :src="post.cover.secureURL"
                  height="400px"
                  style
                  class="cover-movie"
                />
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
                  <v-container class="ml-1 pl-3 movie-detail">
                    <v-card-text class="pb-2 pt-2">
                      <p class="title text--primary mb-0 pt-1">
                        {{ post.topic }}
                      </p>
                      <v-container class="d-flex pl-1 pb-0">
                        <p style="width: 66px" class="key mb-0 mr-3">
                          {{ $t('Director') }}:
                        </p>
                        <span />
                        <p class="mb-0 mr-3">
                          <span
                            v-for="(director, i) in slicedDirectors"
                            :key="director._id"
                            class="value mb-0"
                          >
                            {{ director.name
                            }}{{ isAddComma(i, slicedDirectors.length) }}
                          </span>
                        </p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p style="width: 110px" class="key mb-0 mr-3">
                          {{ $t('Actors') }}:
                        </p>
                        <span />
                        <p class="mb-0 mr-3">
                          <span
                            v-for="(actor, i) in slicedActors"
                            :key="actor._id"
                            class="value mb-0"
                          >
                            {{ actor.name
                            }}{{ isAddComma(i, slicedActors.length) }}
                          </span>
                        </p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p style="width: 60px" class="key mb-0 mr-3">IMDb:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          style="border: 1px solid #FBC02D !important; background-color: #fdd835 !important"
                        >
                          {{ post.movie.IMDb }}
                        </v-chip>
                      </v-container>
                      <v-container class="d-flex pl-1 pb-0">
                        <p style="width: 60px" class="key mb-0 mr-3">
                          {{ $t('Genres') }}:
                        </p>
                        <span v-if="post.movie.genres.length">
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            style="border: 1px solid #FBC02D !important; background-color: #fdd835 !important"
                            v-for="genre in post.movie.genres"
                            :key="genre._id"
                            class="mr-1 mb-1"
                          >
                            {{ genre }}
                          </v-chip>
                        </span>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">{{ $t('Nation') }}:</p>
                        <p class="value mb-0">{{ post.movie.country }}</p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p style="width: 60px" class="key mb-0 mr-3">Link:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          style="border: 1px solid #90d2a3 !important; background-color: #C5E1A5 !important"
                        >
                          <a target="_blank" :href="post.movie.link">
                            {{ post.movie.link }}
                          </a>
                        </v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">{{ $t('Release Date') }}:</p>
                        <v-chip
                          label
                          text-color="black"
                          outlined
                          small
                          :style="calMovieYearColor"
                        >
                          {{ post.movie.releaseDate }}
                        </v-chip>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p class="key mb-0 mr-3">{{ $t('Time') }}:</p>
                        <p class="value mb-0">
                          {{ post.movie.time }} {{ $t('minutes') }}
                        </p>
                      </v-container>

                      <v-container class="d-flex pl-1 pb-0">
                        <p style="width: 65px" class="key mb-0 mr-4">
                          {{ $t('Stars') }}:
                        </p>
                        <v-icon
                          v-for="(start, i) in 5"
                          :key="i"
                          size="20"
                          :color="isStar(i + 1)"
                          style="width: 25px"
                        >
                          start
                        </v-icon>
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
                          <p class="value mb-0" :style="calMovieStatusColor">
                            {{ post.movie.status }}
                          </p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">{{ $t('Director') }}:</p>
                          <span />
                          <p class="mb-0 mr-3">
                            <span
                              v-for="(director, i) in slicedDirectors"
                              :key="director._id"
                              class="value mb-0"
                            >
                              {{ director.name
                              }}{{ isAddComma(i, slicedDirectors.length) }}
                            </span>
                          </p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p style="width: 90px" class="key mb-0 mr-3">
                            {{ $t('Actors') }}:
                          </p>
                          <span />
                          <p class="mb-0 mr-3">
                            <span
                              v-for="(actor, i) in slicedActors"
                              :key="actor._id"
                              class="value mb-0"
                            >
                              {{ actor.name
                              }}{{ isAddComma(i, slicedActors.length) }}
                            </span>
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
                          >
                            {{ post.movie.IMDb }}
                          </v-chip>
                        </v-container>
                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">{{ $t('Nation') }}:</p>
                          <p class="value mb-0">{{ post.movie.country }}</p>
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
                          >
                            {{ post.movie.year }}
                          </v-chip>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p style="width: 80px" class="key mb-0 mr-3">
                            {{ $t('Release Date') }}:
                          </p>
                          <v-chip
                            label
                            text-color="black"
                            outlined
                            small
                            style="border: 1px solid #90d2a3 !important; background-color: #C5E1A5 !important"
                          >
                            {{ post.movie.releaseDate }}
                          </v-chip>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p class="key mb-0 mr-3">{{ $t('Time') }}:</p>
                          <p class="value mb-0">
                            {{ post.movie.time }} {{ $t('minutes') }}
                          </p>
                        </v-container>

                        <v-container class="d-flex pl-1 pb-0">
                          <p style="width: 60px" class="key mb-0 mr-4">
                            {{ $t('Stars') }}:
                          </p>
                          <v-icon
                            v-for="(start, i) in 5"
                            :key="i"
                            size="20"
                            :color="isStar(i + 1)"
                            style="width: 25px"
                          >
                            start
                          </v-icon>
                        </v-container>
                      </div>
                    </v-card-text>
                    <v-divider />
                  </v-container>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-if="!isLoading" style="padding: 15px 50px 20px 50px">
            <v-list-item three-line style="padding: 10px 25px 25px 0px">
              <v-list-item-content class="pr-10 pt-lg-0">
                <v-list-item-title class="blog-title mb-0">
                  <h1 class="blog-title">{{ post.topic }}</h1>
                </v-list-item-title>
                <v-card-actions class="pl-0">
                  <v-avatar size="40" dark>
                    <img :src="post.user.avatar.secureURL" alt="Avatar" />
                  </v-avatar>
                  <v-card-subtitle style="font-size: 16px" class="ml-n1 pr-0">
                    <a
                      :href="authorProfileLink"
                      style="text-decoration: none; color: #000"
                    >
                      {{ post.user.username }}
                    </a>
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
                    >
                      {{ link.icon }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-card-subtitle class="pl-1">
                    {{ $d(new Date(post.createdAt), 'short', 'vi-VN') }}
                  </v-card-subtitle>
                  <read-time class="pl-0" :text="post.content" />
                  <edit-delete-btns
                    v-if="isAuthor"
                    @handleDeletePost="handleDeletePost"
                    :postId="post._id"
                    :postType="post.type"
                  />
                </v-card-actions>
                <v-card-text
                  v-if="post.tags.length"
                  style="margin-left: -25px"
                  class="pt-3"
                >
                  <tag
                    v-for="tag in post.tags"
                    :key="tag._id"
                    class="ml-2"
                    :tagName="tag.tagName"
                    :style="tagStyle"
                  />
                </v-card-text>
              </v-list-item-content>
            </v-list-item>
            <div
              class="markdown=content"
              v-html="$options.filters.markdown(post.content)"
            />
          </v-container>
        </v-card>
        <v-container>
          <v-row id="comments">
            <div style="width: 100%" id="comments" class="mt-5">
              <h1 class="mb-3 mt-8">{{ $t('Comments') }}</h1>

              <v-boilerplate
                style="width: 100%"
                v-if="isLoading"
                type="image"
              />
              <write-comment
                v-if="!isLoading"
                :postId="post._id"
                type="comment"
              />

              <div v-if="!isLoading && post.comments.length">
                <transition-group name="list">
                  <comment
                    transition="slide-y-transition"
                    v-for="comment in post.comments"
                    :key="comment._id"
                    :comment="comment"
                    :author="post.user"
                    :postId="post._id"
                    :user="user"
                    @handleDeleteComment="handleDeleteComment"
                  />
                </transition-group>
              </div>
              <div class="loadmore-comment-wrapper" v-if="!isLoading">
                <div
                  class="d-flex justify-center mb-3"
                  v-if="commentMetadata.page < commentMetadata.totalPage"
                >
                  <span
                    @click="handleLoadmoreComments"
                    class="font-italic load-more"
                  >
                    ... Load more comments ...
                  </span>
                </div>
                <v-text-field
                  color="primary"
                  v-if="isLoadmore"
                  loading
                  disabled
                />
              </div>
            </div>
          </v-row>
        </v-container>
        <v-container>
          <v-divider />
          <div v-if="!isLoadingAPI">
            <v-row
              id="other-posts-of-author"
              v-if="otherPostsOfAuthor.length"
              class="mb-10"
            >
              <h1 class="mt-8 mb-3">{{ $t('Other Movie Reviews') }}</h1>
              <div v-if="isLoading" style="width: 100%" class="d-flex">
                <v-boilerplate
                  class="other-post"
                  style="width: 100%"
                  type="article"
                />
                <v-boilerplate
                  class="other-post"
                  style="width: 100%"
                  type="article"
                />
              </div>
              <other-posts-of-author
                v-if="!isLoading"
                postType="movieReviews"
                typeQuery="movie"
                :posts="otherPostsOfAuthor.slice(0, 2)"
              />
            </v-row>
          </div>
        </v-container>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
        class="wrapper-author-follow d-sm-none d-md-flex"
      >
        <v-boilerplate
          class="author-follow"
          style="width: 100%; padding: 5px 10px; background: #fff"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />
        <author-follow-card
          v-if="!isLoading"
          class="author-follow"
          :author="post.user"
          @handleFollow="handleFollow"
          @handleUnFollow="handleUnFollow"
          :isFollowing="isFollowing"
          :isAuthor="isAuthor"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { movieDescription } from '@/mixins/movieDescription';
import { crudPost } from '@/mixins/crudPost';

export default {
  mixins: [movieDescription, crudPost],
  computed: {},
  methods: {
    handleLikedPost({ user }) {
      this.post.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ user }) {
      this.post.likes = this.post.likes.filter(_user => _user._id !== user._id);
    },
    handleSavedPost({ user }) {
      this.post.savedBy.push({ username: user.username, _id: user._id });
    },
    handleUnsavedPost({ user }) {
      this.post.savedBy = this.post.savedBy.filter(
        _user => _user._id !== user._id,
      );
    },
  },
  components: {},
};
</script>

<style scoped>
#blog-card {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.wrapper-author-follow {
  position: relative;
  padding: 0 25px 0 20px;
}

.author-follow {
  position: fixed;
  max-width: 365px;
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
  line-height: 1.3;
  -webkit-line-clamp: 6;
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

.other-post {
  flex: 30%;
  margin: 20px;
  justify-content: center;
}

.markdown-content >>> img {
  width: 100% !important;
}

::v-deep pre code:before {
  content: '' !important;
}

.markdown-content {
  line-height: 1.6;
}

::v-deep code:before {
  content: '' !important;
}

::v-deep code:after {
  content: '' !important;
}

::v-deep code {
  font-size: 13.5px !important;
  box-shadow: none;
  background-color: #fff;
}

::v-deep pre code {
  display: block;
  overflow-x: auto;
  padding: 1em;
  color: #abb2bf;
  background: #282c34;
  margin: 15px 0px;
}
</style>
