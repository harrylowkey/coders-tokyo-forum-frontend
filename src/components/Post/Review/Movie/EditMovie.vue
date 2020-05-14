<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark">
      <v-row>
        <v-col
          cols="12"
          sm="8"
          md="8"
          lg="8"
          xl="8"
          offset-sm="2"
          offset-md="2"
          offset-lg="2"
          offset-xl="2"
          class="pt-0"
        >
          <div class="pt-6">
            <app-alert v-if="alert" :alertMessage="alertMessage" />
            <ValidationObserver ref="observer">
              <v-form>
                <v-alert
                  v-if="alert"
                  id="alert"
                  type="warning"
                  border="left"
                  transition="slide-x-reverse-transition"
                  dismissible
                >
                  {{ alertMessage }}
                </v-alert>
                <v-card class="d-flex py-3 pt-0">
                  <v-row>
                    <v-col cols="4" offset-sm="4" class="py-1">
                      <div class="d-flex flex-column align-center">
                        <user-avatar
                          :src="
                            'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'
                          "
                          :username="user.username"
                          style="height: 130px;"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pb-0 pt-0 px-6"
                      style="height: 60px;"
                    >
                      <div class="d-flex ml-7">
                        <div class="d-flex">
                          <toggle-tag
                            v-for="(tag, i) in tags"
                            :key="i"
                            :tagName="tag"
                            @handleRemoveTag="handleRemoveTag(i)"
                          />
                        </div>
                        <create-tag-blog
                          v-if="tags.length < 3"
                          @handleAddTag="handleAddTag"
                          :tags="tags"
                        />
                      </div>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-container class="pt-0">
                        <v-card-text class="pb-0 pt-0 px-6">
                          <v-container class="py-0">
                            <v-row>
                              <v-col cols="12" class="pa-0">
                                <my-upload
                                  class="pt-0"
                                  field="img"
                                  @crop-success="cropSuccess"
                                  @crop-upload-success="cropUploadSuccess"
                                  @crop-upload-fail="cropUploadFail"
                                  v-model="uploadBanner"
                                  :width="800"
                                  :height="400"
                                  :params="params"
                                  :headers="headers"
                                  img-format="jpg"
                                  langType="en"
                                  noCircle
                                />
                                <v-container
                                  class="d-flex justify-center"
                                  v-if="post.cover.secureURL"
                                  style="postition: relative"
                                >
                                  <v-img
                                    max-width="650"
                                    max-height="250"
                                    :src="post.cover.secureURL"
                                  />
                                  <v-chip
                                    @click="uploadBanner = !uploadBanner"
                                    style="cursor: pointer"
                                    text-color="#fff"
                                    class="ma-2 mr-12 update-banner-btn"
                                    color="green"
                                    label
                                  >
                                    <v-icon left>
                                      mdi-cloud-upload-outline
                                    </v-icon>
                                    Update Image
                                  </v-chip>
                                </v-container>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <ValidationProvider
                                  name="Movie name"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    :error-messages="errors"
                                    v-model="post.movie.name"
                                    label="Movie name*"
                                    required
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="post.movie.country"
                                  label="Nation"
                                />
                              </v-col>
                              <v-col cols="12" sm="4" md="2">
                                <v-text-field
                                  v-model="post.movie.imdb"
                                  label="IMDb"
                                />
                              </v-col>
                              <v-col cols="12" sm="4" md="2">
                                <v-text-field
                                  v-model="post.movie.time"
                                  hint="Unit: minutes"
                                  label="Times"
                                />
                              </v-col>
                              <v-col cols="12" sm="4" md="8">
                                <v-text-field
                                  v-model="post.movie.link"
                                  label="Link"
                                />
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <div class="d-flex align-end">
                                  <v-text-field
                                    v-model="director"
                                    label="Director"
                                  />
                                  <span class="pb-4 pl-3" v-if="!addCoDirector">
                                    <v-icon
                                      @click="addCoDirector = !addCoDirector"
                                      color="green"
                                      style="cursor: pointer"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </span>
                                  <span class="pb-4 pl-3" v-if="addCoDirector">
                                    <v-icon
                                      @click="handleRemoveCoDirector"
                                      color="warning"
                                      style="cursor: pointer"
                                    >
                                      mdi-close-circle-outline
                                    </v-icon>
                                  </span>
                                </div>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                                v-if="addCoDirector"
                              >
                                <div class="d-flex align-end">
                                  <v-text-field
                                    v-model="coDirector"
                                    label="Co - Director"
                                  />
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <div class="d-flex align-end">
                                  <v-text-field
                                    v-model="actor"
                                    label="Actor/Actress"
                                  />
                                  <span class="pb-4 pl-3" v-if="!addActor2">
                                    <v-icon
                                      @click="addActor2 = !addActor2"
                                      color="green"
                                      style="cursor: pointer"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </span>
                                  <span class="pb-4 pl-3" v-if="addActor2">
                                    <v-icon
                                      @click="handleRemoveCoDirector(2)"
                                      color="warning"
                                      style="cursor: pointer"
                                    >
                                      mdi-close-circle-outline
                                    </v-icon>
                                  </span>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" v-if="addActor2">
                                <div class="d-flex align-end">
                                  <v-text-field
                                    v-model="actor2"
                                    label="Actor/Actress"
                                  />
                                  <span class="pb-4 pl-3" v-if="!addActor3">
                                    <v-icon
                                      @click="addActor3 = !addActor3"
                                      color="green"
                                      style="cursor: pointer"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </span>
                                  <span class="pb-4 pl-3" v-if="addActor3">
                                    <v-icon
                                      @click="handleRemoveActor(3)"
                                      color="warning"
                                      style="cursor: pointer"
                                    >
                                      mdi-close-circle-outline
                                    </v-icon>
                                  </span>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" v-if="addActor3">
                                <div class="d-flex align-end">
                                  <v-text-field
                                    v-model="actor3"
                                    label="Actor/Actress"
                                  />
                                  <span class="pb-4 pl-3" v-if="!addActor4">
                                    <v-icon
                                      @click="addActor4 = !addActor4"
                                      color="green"
                                      style="cursor: pointer"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </span>
                                  <span class="pb-4 pl-3" v-if="addActor4">
                                    <v-icon
                                      @click="handleRemoveActor(4)"
                                      color="warning"
                                      style="cursor: pointer"
                                    >
                                      mdi-close-circle-outline
                                    </v-icon>
                                  </span>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" v-if="addActor4">
                                <div class="d-flex align-end">
                                  <v-text-field
                                    v-model="actor4"
                                    label="Actor/Actress"
                                  />
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="5">
                                <v-text-field
                                  v-model="post.movie.releaseDate"
                                  label="Release Date"
                                />
                              </v-col>
                              <v-col cols="12" sm="12" md="7">
                                <v-container class="d-flex pl-0 pb-0 pr-0 mt-2">
                                  <span
                                    style="font-size: 17px; color: rgba(0, 0, 0, 0.57);"
                                    class="mb-0 pt-1 pr-5"
                                  >
                                    Your stars:
                                  </span>
                                  <v-rating
                                    v-model="post.movie.stars"
                                    color="yellow darken-3"
                                    background-color="grey darken-1"
                                    empty-icon="$ratingFull"
                                    half-increments
                                    hover
                                    small
                                  />
                                </v-container>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-autocomplete
                                  :items="genres"
                                  label="Genres"
                                  v-model="post.movie.genres"
                                  multiple
                                />
                              </v-col>
                              <v-col cols="12">
                                <ValidationProvider
                                  name="Topic"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    label="Topic*"
                                    v-model="post.topic"
                                    @change="dataUpdate.topic = post.topic"
                                    persistent-hint
                                    rows="2"
                                    required
                                    :error-messages="errors"
                                    hint="Write description to attract people at the first glance"
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Description"
                                  v-model="post.description"
                                  @change="
                                    dataUpdate.description = post.description
                                  "
                                  persistent-hint
                                  rows="2"
                                  hint="Write description to attract people at the first glance"
                                />
                              </v-col>
                              <v-col cols="12">
                                <ValidationProvider
                                  name="Content"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-textarea
                                    label="Content*"
                                    v-model="post.content"
                                    @change="
                                      dataUpdate.description = post.description
                                    "
                                    auto-grow
                                    rows="15"
                                    required
                                    :error-messages="errors"
                                    placeholder="Markdown"
                                  />
                                </ValidationProvider>
                                <v-dialog
                                  v-model="isPreviewing"
                                  max-width="800"
                                >
                                  <v-card
                                    class="preview px-8 pt-8 pb-5 d-flex flex-column"
                                    style="min-height: 330px;"
                                  >
                                    <p
                                      style="line-height: 1.5"
                                      v-html="
                                        $options.filters.markdown(
                                          post.content || '',
                                        )
                                      "
                                    />
                                    <v-spacer />
                                    <div class="d-flex justify-end">
                                      <span class="signature">hong_quang</span>
                                    </div>
                                  </v-card>
                                </v-dialog>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions class="pt-0">
                          <v-spacer />
                          <v-btn
                            class="mr-5"
                            color="primary"
                            @click="togglePreviewContent"
                            dark
                          >
                            Preview
                          </v-btn>
                          <v-btn
                            class="mr-5"
                            color="warning"
                            dark
                            @click="submit"
                          >
                            Update
                          </v-btn>
                        </v-card-actions>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card>
              </v-form>
            </ValidationObserver>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import myUpload from 'vue-image-crop-upload';
// import VueUploadMultipleImage from "vue-upload-multiple-image";
// import CreateTag from "@/components/Shared/CreateTag";
import { extend, setInteractionMode } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

import { updateBanner } from '@/mixins/updateBanner';
import UserAvatar from '@/components/Shared/UserAvatar';
import ToggleTag from '@/components/Shared/ToggleTag';
import CreateTagBlog from '@/components/Shared/CreateTagBlog';

setInteractionMode('eager');
extend('required', {
  ...required,
  message: '{_field_} is required',
});

export default {
  mixins: [updateBanner],
  components: {
    UserAvatar,
    // CreateTag,
    myUpload,
    ToggleTag,
    CreateTagBlog,
    // VueUploadMultipleImage
  },
  data() {
    return {
      alert: false,
      alertMessage: '',
      user: {
        username: 'hong_quang',
      },
      tags: [],
      uploadBanner: false,
      params: {
        token: '123456798',
        name: 'avatar',
      },
      headers: {
        smail: '*_~',
      },
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
      uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
      post: {
        _id: '5e9b04f5d1f1da5baece2ff5',
        tags: [
          {
            _id: '5e8c563eeda853638189e854',
            tagName: '#action',
          },
          {
            _id: '5e9b047ef82e7d563b8e2c5a',
            tagName: '#funny',
          },
        ],
        comments: [],
        user: {
          _id: '5e8b577f1a2dde3229879524',
          username: 'nhat_anh',
        },
        authors: [
          {
            _id: '5e9b047ef82e7d563b8e2c5b',
            type: 'actor',
            name: 'Dave Bautista (JJ)',
          },
          {
            _id: '5e9b047ef82e7d563b8e2c5d',
            type: 'actor',
            name: 'Ken Jeong (Kim)',
          },
          {
            _id: '5e9b04f5d1f1da5baece2ff7',
            type: 'director',
            name: 'KristenSchall (Bobbi)',
          },
        ],
        likes: [],
        url: 'http://www.phimmoi.net/phim/diep-vien-ti-hon-8928/',
        savedBy: [],
        topic: 'My Spey (2019)',
        description:
          'Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta',
        content:
          'Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta',
        type: 'movie',
        cover: {
          _id: '5e9ab00f0591fb40fc87faa3',
          secureURL:
            'https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png',
          publicId: 'Coders-Tokyo-Forum/posts/javascript.png',
          fileName: 'javascript.png',
          sizeBytes: 316358,
          userId: '5e8b577f1a2dde32298795f4',
          postId: '5e9ab00f0591fb40fc87faa2',
          resourceType: 'image',
          createdAt: '2020-04-18T07:45:19.838Z',
          updatedAt: '2020-04-18T07:45:19.838Z',
          __v: 0,
        },
        metadata: {
          _id: '5e9494fe935dfb5ed30435',
          comments: 123,
          likes: 69,
          saves: 1,
        },
        movie: {
          name: 'Spy',
          genres: ['Action'],
          imdb: 5.2,
          country: 'England',
          link: 'facebook.com',
          releaseDate: '22/11/2019',
          time: 91,
          stars: 4,
        },
        createdAt: '2020-04-18T13:47:33.708Z',
        updatedAt: '2020-04-18T13:47:33.708Z',
      },
      director: '',
      coDirector: '',
      actor: '',
      actor2: '',
      actor3: '',
      actor4: '',
      addCoDirector: false,
      addActor2: '',
      addActor3: '',
      addActor4: '',
      dataUpdate: {},
      imgDataUrl: '',
      isPreviewing: false,
      genres: ['Action', 'Funny', 'Moving', 'History'],
    };
  },
  computed: {},
  created() {
    this.tags = this.post.tags.map(tag => tag.tagName);
    this.bannerImage = this.post.cover.secureURL;
    const actors = this.post.authors.filter(person => person.type === 'actor');
    this.actor = actors[0] ? actors[0].name : '';
    this.actor2 = actors[1] ? actors[1].name : '';
    this.actor3 = actors[2] ? actors[2].name : '';
    this.actor4 = actors[3] ? actors[3].name : '';
    this.addActor2 = !!this.actor2;
    this.addActor3 = !!this.actor3;
    this.addActor24 = !!this.actor4;

    const directors = this.post.authors.filter(
      person => person.type === 'director',
    );
    this.director = directors[0] ? directors[0].name : '';
    this.coDirector = directors[1] ? directors[1].name : '';
  },
  methods: {
    handleAddTag(tag) {
      this.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.tags.splice(tagIndex, 1);
    },
    handleRemoveCoDirector() {
      this.addCoDirector = !this.addCoDirector;
      this.coDirector = '';
    },
    handleRemoveActor(index) {
      this[`addActor${index}`] = !this[`addActor${index}`];
      this[`actor${index}`] = '';
    },
    togglePreviewContent() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.post.content.trim() !== '') {
        return (this.isPreviewing = true);
      }
    },
    submit() {
      this.dataUpdate.authors = [
        { type: 'actor', name: this.actor },
        { type: 'actor', name: this.actor2 },
        { type: 'actor', name: this.actor3 },
        { type: 'actor', name: this.actor4 },
        { type: 'director', name: this.director },
        { type: 'director', name: this.coDirector },
      ].filter(person => person.name !== '');

      this.dataUpdate.book.suggestedBy = [
        this.recommender,
        this.recommender2,
      ].filter(recommender => recommender !== '');
      this.dataUpdate.tags = this.tags;
      this.dataUpdate.book = this.post.book;
      this.$refs.observer.validate();
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
.signature {
  font-family: 'Great Vibes', cursive;
  font-size: 28px;
}

#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrapper-file-select {
  height: 0;
  transition: height 0.5s ease-in-out;
}

.show-wrapper-file-select {
  height: auto;
}

.file-select {
  opacity: 0;
  position: relative;
  left: -900px;
}

.show-file-select {
  opacity: 1;
  left: 0px;
}

.upload-btn {
  cursor: pointer;
  position: absolute;
  top: 42%;
  opacity: 0.9;
}

.upload-btn:hover {
  opacity: 1;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#alert {
  position: fixed;
  top: 65px;
  right: 0;
  z-index: 1;
}

.banner {
  width: 210px;
  height: 210px;
  box-shadow: 9px 9px 10px 6px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 9px 9px 10px 6px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 9px 9px 10px 6px rgba(0, 0, 0, 0.16);
}

.update-banner-btn {
  position: absolute;
  top: 19.5%;
  opacity: 0.9;
}

.update-banner-btn:hover {
  opacity: 1;
}
</style>
