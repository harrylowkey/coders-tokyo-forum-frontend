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
                    <v-col cols="12" class="pt-0">
                      <v-container class="pt-0">
                        <v-card-text class="pb-0 pt-0 px-6">
                          <v-container class="py-0">
                            <v-row>
                              <v-row class="mt-5">
                                <v-col cols="12" sm="12" md="4">
                                  <v-col cols="12" class="pa-0">
                                    <my-upload
                                      class="pt-0"
                                      field="cover"
                                      @crop-upload-success="cropUploadSuccess"
                                      @crop-upload-fail="cropUploadFail"
                                      v-model="isUploadBanner"
                                      :width="210"
                                      :height="210"
                                      :headers="headers"
                                      img-format="jpg"
                                      langType="en"
                                      :url="APIS.UPLOAD_BANNER"
                                      noCircle
                                    />
                                  </v-col>
                                  <div
                                    style="flex: 26%"
                                    class="d-flex flex-column align-center"
                                  >
                                    <div
                                      v-if="!post.cover.secureURL"
                                      class="banner d-flex justify-center align-center pr-2"
                                    >
                                      <v-chip
                                        @click="
                                          isUploadBanner = !isUploadBanner
                                        "
                                        style="cursor: pointer"
                                        text-color="#fff"
                                        class="upload-btn"
                                        color="green"
                                        label
                                      >
                                        <v-icon left>
                                          mdi-cloud-upload-outline
                                        </v-icon>
                                        Image
                                      </v-chip>
                                    </div>
                                    <v-container
                                      class="d-flex justify-center"
                                      v-if="
                                        newCover.secureURL ||
                                          post.cover.secureURL
                                      "
                                      style="position: relative"
                                    >
                                      <v-img
                                        max-width="210"
                                        max-height="210"
                                        :src="
                                          newCover.secureURL ||
                                            post.cover.secureURL
                                        "
                                      />
                                      <v-chip
                                        @click="
                                          isUploadBanner = !isUploadBanner
                                        "
                                        text-color="#fff"
                                        class="upload-btn"
                                        color="green"
                                        label
                                      >
                                        <v-icon left>
                                          mdi-cloud-upload-outline
                                        </v-icon>
                                        Update
                                      </v-chip>
                                    </v-container>
                                    <div
                                      class="mt-10 d-flex justify-center align-center flex-column"
                                    >
                                      <toggle-tag
                                        v-for="(tag, i) in post.tags"
                                        :key="i"
                                        :tagName="tag"
                                        @handleRemoveTag="handleRemoveTag(i)"
                                      />

                                      <create-tag
                                        v-if="post.tags.length < 3"
                                        @handleAddTag="handleAddTag"
                                        :tags="post.tags"
                                      />
                                    </div>
                                  </div>
                                </v-col>
                                <v-col cols="12" sm="12" md="8" class="pt-0">
                                  <v-col cols="12" sm="12" md="12" class="pt-0">
                                    <ValidationProvider
                                      name="Song name"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        class="mt-0"
                                        :error-messages="errors"
                                        v-model="post.topic"
                                        @change="dataUpdate.topic = post.topic"
                                        label="Song name*"
                                        required
                                      />
                                    </ValidationProvider>
                                  </v-col>
                                  <div class="d-flex flex-wrap">
                                    <v-col cols="12" sm="6" md="6">
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Composer"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            required
                                            v-model="composer"
                                            label="Composer"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addComposer2 && !composer2"
                                        >
                                          <v-icon
                                            @click="
                                              addComposer2 = !addComposer2
                                            "
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addComposer2 || composer2"
                                        >
                                          <v-icon
                                            @click="handleRemoveComposer(2)"
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
                                      md="6"
                                      v-if="addComposer2 || composer2"
                                      class
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Composer"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="composer2"
                                            label="Composer"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addComposer3 && !composer3"
                                        >
                                          <v-icon
                                            @click="
                                              addComposer3 = !addComposer3
                                            "
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addComposer3 || composer3"
                                        >
                                          <v-icon
                                            @click="handleRemoveComposer(3)"
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
                                      md="6"
                                      v-if="addComposer3 || composer3"
                                      class
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Composer"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="composer3"
                                            label="Composer"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addComposer4 && composer4"
                                        >
                                          <v-icon
                                            @click="
                                              addComposer4 = !addComposer4
                                            "
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addComposer4 || composer4"
                                        >
                                          <v-icon
                                            @click="handleRemoveComposer(4)"
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
                                      md="6"
                                      v-if="addComposer4 | composer4"
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Composer"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="composer4"
                                            label="Composer"
                                          />
                                        </ValidationProvider>
                                      </div>
                                    </v-col>
                                  </div>
                                  <div class="d-flex flex-wrap">
                                    <v-col cols="12" sm="6" md="6">
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Name"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            required
                                            v-model="artist"
                                            label="Artist"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addArtist2 && !artist2"
                                        >
                                          <v-icon
                                            @click="addArtist2 = !addArtist2"
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addArtist2 || artist2"
                                        >
                                          <v-icon
                                            @click="handleRemoveArtist(2)"
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
                                      md="6"
                                      v-if="addArtist2 || artist2"
                                      class
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Name"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="artist2"
                                            label="Artist"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addArtist3 && !artist3"
                                        >
                                          <v-icon
                                            @click="addArtist3 = !addArtist3"
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addArtist3 || artist3"
                                        >
                                          <v-icon
                                            @click="handleRemoveArtist(3)"
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
                                      md="6"
                                      v-if="addArtist3 || artist3"
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Name"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="artist3"
                                            label="Artist"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addArtist4 && !artist4"
                                        >
                                          <v-icon
                                            @click="addArtist4 = !addArtist4"
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addArtist4 || artist4"
                                        >
                                          <v-icon
                                            @click="handleRemoveArtist(4)"
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
                                      md="6"
                                      v-if="addArtist4 || artist4"
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Name"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="artist4"
                                            label="Artist"
                                          />
                                        </ValidationProvider>
                                      </div>
                                    </v-col>
                                  </div>
                                  <v-col cols="12">
                                    <v-textarea
                                      label="Lyric*"
                                      auto-grow
                                      rows="15"
                                      required
                                      v-model="post.description"
                                      placeholder="Markdown"
                                    />
                                  </v-col>
                                </v-col>
                              </v-row>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions class="pt-0">
                          <v-spacer />
                          <v-btn
                            class="mr-5 white--text"
                            color="warning"
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
    <app-footer />
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
      addArtist2: false,
      addArtist3: false,
      addArtist4: false,
      addComposer2: false,
      addComposer3: false,
      addComposer4: false,
      artist: '',
      artist2: '',
      artist3: '',
      artist4: '',
      composer: '',
      composer2: '',
      composer3: '',
      composer4: '',
    };
  },
  computed: {},
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
      }).then(data => {
        this.post = data;
        this.post.tags = this.post.tags.map(tag => tag.tagName);
        this.tags = this.post.tags.map(tag => tag.tagName);
        const composers = this.post.authors.filter(
          person => person.type === 'composer',
        );
        this.composer = composers[0] ? composers[0].name : '';
        this.composer2 = composers[1] ? composers[1].name : '';
        this.composer3 = composers[2] ? composers[2].name : '';
        this.composer4 = composers[3] ? composers[3].name : '';
        this.addComposer2 = !!this.composer2;
        this.addComposer3 = !!this.composer3;
        this.addComposer4 = !!this.composer4;

        const singers = this.post.authors.filter(
          person => person.type === 'artist',
        );
        this.artist = singers[0] ? singers[0].name : '';
        this.artist2 = singers[1] ? singers[1].name : '';
        this.artist3 = singers[2] ? singers[2].name : '';
        this.artist4 = singers[3] ? singers[3].name : '';
        this.addArtist2 = !!this.artist2;
        this.addArtist3 = !!this.artist3;
        this.addArtist4 = !!this.artist4;
      });
    },
    handleRemoveComposer(index) {
      this[`addComposer${index}`] = !this[`addComposer${index}`];
      this[`composer${index}`] = '';
    },
    handleRemoveArtist(index) {
      this[`addArtist${index}`] = !this[`addArtist${index}`];
      this[`artist${index}`] = '';
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
        description: this.post.description,
        tags: this.post.tags,
        type: this.post.type,
        cover: this.post.cover,
        authors: [],
      };

      const authors = [
        { type: 'composer', name: this.composer },
        { type: 'composer', name: this.composer2 },
        { type: 'composer', name: this.composer3 },
        { type: 'composer', name: this.composer4 },
        { type: 'artist', name: this.artist },
        { type: 'artist', name: this.artist2 },
        { type: 'artist', name: this.artist3 },
        { type: 'artist', name: this.artist4 },
      ].filter(person => person.name !== '');

      dataUpdate.authors = authors;

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
          path: `/${this.post.type}s/${this.post._id}?type=${this.post.type}`,
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
</style>
