<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark" v-if="!isLoading">
      <v-row>
        <v-col
          cols="12"
          sm="9"
          md="9"
          lg="9"
          xl="9"
          offset-sm="1"
          offset-md="1"
          offset-lg="1"
          offset-xl="1"
          class="pt-0"
        >
          <div class="pt-6">
            <ValidationObserver ref="observer">
              <v-form>
                <v-card class="d-flex py-3 pt-0">
                  <v-row>
                    <v-col cols="4" offset-sm="4" class="py-1">
                      <div class="d-flex flex-column align-center">
                        <user-avatar
                          :src="post.user.avatar.secureURL"
                          :username="post.user.username"
                          style="height: 130px"
                        />
                      </div>
                    </v-col>
                    <v-col cols="12" class="pb-0 pt-0 px-6" style="height: 60px;">
                      <div class="d-flex ml-7">
                        <div class="d-flex">
                          <toggle-tag
                            v-for="(tag, i) in post.tags"
                            :key="i"
                            :tagName="tag"
                            @handleRemoveTag="handleRemoveTag(i)"
                          />
                        </div>
                        <create-tag-blog
                          v-if="post.tags.length < 3"
                          @handleAddTag="handleAddTag"
                          :tags="post.tags"
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
                                  @crop-upload-success="cropUploadSuccess"
                                  @crop-upload-fail="cropUploadFail"
                                  v-model="isUploadBanner"
                                  :url="APIS.UPLOAD_BANNER"
                                  :width="800"
                                  :height="450"
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
                                    :src="newCover.secureURL || post.cover.secureURL"
                                  />
                                  <v-chip
                                    @click="uploadBanner = !uploadBanner"
                                    style="cursor: pointer"
                                    text-color="#fff"
                                    class="ma-2 mr-12 update-banner-btn"
                                    color="green"
                                    label
                                  >
                                    <v-icon left>mdi-cloud-upload-outline</v-icon>Update Image
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
                                <v-text-field v-model="post.movie.country" label="Nation" />
                              </v-col>
                              <v-col cols="12" sm="4" md="2">
                                <ValidationProvider
                                  name="Service point"
                                  rules="numeric|minmax:1,10"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    :error-messages="errors"
                                    v-model="post.movie.IMDb"
                                    hint="1 - 10 points"
                                    label="IMDb"
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" sm="4" md="2">
                                <v-text-field
                                  v-model="post.movie.time"
                                  hint="Unit: minutes"
                                  label="Times"
                                />
                              </v-col>
                              <v-col cols="12" sm="4" md="8">
                                <v-text-field v-model="post.movie.link" label="Link" />
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <div class="d-flex align-end">
                                  <v-text-field v-model="director" label="Director" />
                                  <span class="pb-4 pl-3" v-if="!addCoDirector && !coDirector">
                                    <v-icon
                                      @click="addCoDirector = !addCoDirector"
                                      color="green"
                                      style="cursor: pointer"
                                    >mdi-plus-circle-outline</v-icon>
                                  </span>
                                  <span class="pb-4 pl-3" v-if="addCoDirector || coDirector">
                                    <v-icon
                                      @click="handleRemoveCoDirector"
                                      color="warning"
                                      style="cursor: pointer"
                                    >mdi-close-circle-outline</v-icon>
                                  </span>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" v-if="addCoDirector || coDirector">
                                <div class="d-flex align-end">
                                  <v-text-field v-model="coDirector" label="Co - Director" />
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <div class="d-flex align-end">
                                  <v-text-field v-model="actor" label="Actor/Actress" />
                                  <span class="pb-4 pl-3" v-if="!addActor2 && !actor2">
                                    <v-icon
                                      @click="addActor2 = !addActor2"
                                      color="green"
                                      style="cursor: pointer"
                                    >mdi-plus-circle-outline</v-icon>
                                  </span>
                                  <span class="pb-4 pl-3" v-if="addActor2 || actor2">
                                    <v-icon
                                      @click="handleRemoveCoDirector(2)"
                                      color="warning"
                                      style="cursor: pointer"
                                    >mdi-close-circle-outline</v-icon>
                                  </span>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" v-if="addActor2 || actor2">
                                <div class="d-flex align-end">
                                  <v-text-field v-model="actor2" label="Actor/Actress" />
                                  <span class="pb-4 pl-3" v-if="!addActor3 && !actor3">
                                    <v-icon
                                      @click="addActor3 = !addActor3"
                                      color="green"
                                      style="cursor: pointer"
                                    >mdi-plus-circle-outline</v-icon>
                                  </span>
                                  <span class="pb-4 pl-3" v-if="addActor3 || actor3">
                                    <v-icon
                                      @click="handleRemoveActor(3)"
                                      color="warning"
                                      style="cursor: pointer"
                                    >mdi-close-circle-outline</v-icon>
                                  </span>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" v-if="addActor3 || actor3">
                                <div class="d-flex align-end">
                                  <v-text-field v-model="actor3" label="Actor/Actress" />
                                  <span class="pb-4 pl-3" v-if="!addActor4 && !actor4">
                                    <v-icon
                                      @click="addActor4 = !addActor4"
                                      color="green"
                                      style="cursor: pointer"
                                    >mdi-plus-circle-outline</v-icon>
                                  </span>
                                  <span class="pb-4 pl-3" v-if="addActor4 || actor4">
                                    <v-icon
                                      @click="handleRemoveActor(4)"
                                      color="warning"
                                      style="cursor: pointer"
                                    >mdi-close-circle-outline</v-icon>
                                  </span>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" v-if="addActor4 || actor4">
                                <div class="d-flex align-end">
                                  <v-text-field v-model="actor4" label="Actor/Actress" />
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
                                  >Your stars:</span>
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
                                    persistent-hint
                                    rows="2"
                                    required
                                    :error-messages="errors"
                                    hint="Write description to attract people at the first glance"
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12">
                                <v-textarea
                                  label="Description"
                                  persistent-hint
                                  rows="3"
                                  v-model="post.description"
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
                                    auto-grow
                                    rows="15"
                                    required
                                    :error-messages="errors"
                                    placeholder="Markdown"
                                  />
                                </ValidationProvider>
                                <v-dialog v-model="isPreviewing" max-width="800">
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
                            class="mr-5 white--text"
                            color="primary"
                            @click="togglePreviewContent"
                          >Preview</v-btn>
                          <v-btn
                            class="white--text"
                            :disabled="isLoadingUpload"
                            color="warning"
                            @click="submit"
                          >Update</v-btn>
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
import { mapActions } from 'vuex';

import { editPost } from '@/mixins/editPost';
import { APIS } from '@/mixins/api-endpoints';
import { updateBanner } from '@/mixins/updateBanner';
import { attachImage } from '@/mixins/attachImage';

export default {
  mixins: [editPost, updateBanner, attachImage],
  components: {},
  data() {
    return {
      post: null,
      newCover: '',
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
      isPreviewing: false,
      genres: ['Action', 'Funny', 'Moving', 'History'],
    };
  },
  async created() {
    this.APIS = APIS;
    await this.fetchPost();
  },
  methods: {
    ...mapActions('post', ['getPostById']),
    async fetchPost() {
      this.getPostById({
        id: this.$route.params.id,
        typeQuery: this.$route.query.type,
      }).then((data) => {
        this.post = data;
        this.post.tags = this.post.tags.map((tag) => tag.tagName);
        const actors = this.post.authors.filter(
          (person) => person.type === 'actor',
        );
        this.actor = actors[0] ? actors[0].name : '';
        this.actor2 = actors[1] ? actors[1].name : '';
        this.actor3 = actors[2] ? actors[2].name : '';
        this.actor4 = actors[3] ? actors[3].name : '';
        this.addActor2 = !!this.actor2;
        this.addActor3 = !!this.actor3;
        this.addActor24 = !!this.actor4;

        const directors = this.post.authors.filter(
          (person) => person.type === 'director',
        );
        this.director = directors[0] ? directors[0].name : '';
        this.coDirector = directors[1] ? directors[1].name : '';
      });
    },
    handleRemoveCoDirector() {
      this.addCoDirector = !this.addCoDirector;
      this.coDirector = '';
    },
    handleRemoveActor(index) {
      this[`addActor${index}`] = !this[`addActor${index}`];
      this[`actor${index}`] = '';
    },
    async submit() {
      if (this.newCover) {
        this.post.cover = this.newCover;
      }
      if (this.post.cover === '') {
        this.$notify({
          type: 'error',
          title: "Let's upload the banner",
        });
        return;
      }

      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      const dataUpdate = {
        topic: this.post.topic,
        content: this.post.content,
        description: this.post.description,
        tags: this.post.tags,
        type: this.post.type,
        cover: this.post.cover,
        movie: this.post.movie,
        authors: [],
      };

      dataUpdate.authors = [
        { type: 'actor', name: this.actor },
        { type: 'actor', name: this.actor2 },
        { type: 'actor', name: this.actor3 },
        { type: 'actor', name: this.actor4 },
        { type: 'director', name: this.director },
        { type: 'director', name: this.coDirector },
      ].filter((person) => person.name !== '');

      const res = await this.editPost({ _id: this.post._id, data: dataUpdate });
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Update success',
        });

        if (this.newCover._id) {
          this.deleteFile({ fileId: this.oldCover._id });
        }
        return this.$router.push({
          path: `/${this.post.type}Reviews/${this.post._id}?type=${this.post.type}`,
        });
      }
      if (res.status === 400) {
        this.$notify({
          type: 'error',
          title: 'Failed',
          text: res.message,
        });
        this.deleteFile({ fileId: this.newCover._id });
      }
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
