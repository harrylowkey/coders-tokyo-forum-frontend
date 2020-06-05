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
          offset-sm="1"
          offset-md="1"
          offset-lg="1"
          offset-xl="1"
          class="pt-0"
        >
          <div class="pt-6" v-if="!isLoading">
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
                    <v-col
                      cols="12"
                      class="pb-0 pt-0 px-6"
                      style="height: 60px;"
                    >
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
                                    :src="
                                      newCover.secureURL || post.cover.secureURL
                                    "
                                  />
                                  <v-chip
                                    @click="isUploadBanner = !isUploadBanner"
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
                              <v-col cols="12" sm="8" md="8">
                                <ValidationProvider
                                  name="Book name"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    v-model="post.book.name"
                                    label="Book name*"
                                    required
                                    :error-messages="errors"
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" sm="4" md="4">
                                <ValidationProvider
                                  name="Status"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    v-model="post.book.status"
                                    :error-messages="errors"
                                    label="Status"
                                    hint="E.g: Finished or 15/34 Chapters"
                                    required
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <div class="d-flex align-end">
                                  <ValidationProvider
                                    name="Author"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <v-text-field
                                      required
                                      v-model="author"
                                      label="Author"
                                      :error-messages="errors"
                                    />
                                  </ValidationProvider>
                                  <span
                                    class="pb-4 pl-3"
                                    v-if="!addCoAuthor && !coAuthor"
                                  >
                                    <v-icon
                                      @click="addCoAuthor = !addCoAuthor"
                                      color="green"
                                      style="cursor: pointer"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </span>
                                  <span
                                    class="pb-4 pl-3"
                                    v-if="addCoAuthor || coAuthor"
                                  >
                                    <v-icon
                                      @click="handleRemoveCoAuthor"
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
                                v-if="addCoAuthor || coAuthor"
                              >
                                <div class="d-flex align-end">
                                  <ValidationProvider
                                    name="Name"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <v-text-field
                                      :error-messages="errors"
                                      v-model="coAuthor"
                                      label="Co - Author"
                                    />
                                  </ValidationProvider>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <div class="d-flex align-end">
                                  <v-text-field
                                    v-model="recommender"
                                    label="Recommender"
                                  />
                                  <span
                                    class="pb-4 pl-3"
                                    v-if="!addRecomender2 && !recommender2"
                                  >
                                    <v-icon
                                      @click="addRecomender2 = !addRecomender2"
                                      color="green"
                                      style="cursor: pointer"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </span>
                                  <span
                                    class="pb-4 pl-3"
                                    v-if="addRecomender2 || recommender2"
                                  >
                                    <v-icon
                                      @click="handleRemoveRecommender2"
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
                                v-if="addRecomender2 || recommender2"
                              >
                                <div class="d-flex align-end">
                                  <v-text-field
                                    v-model="recommender2"
                                    label="Recommender"
                                  />
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="post.book.country"
                                  label="Nation"
                                />
                              </v-col>
                              <v-col cols="12" sm="6" md="3">
                                <v-text-field
                                  v-model="post.book.length"
                                  hint="E.g: 200 pages"
                                  label="Length"
                                />
                              </v-col>
                              <v-col cols="12" sm="12" md="5">
                                <v-container class="d-flex pl-0 pr-0 mt-2">
                                  <span
                                    style="font-size: 17px; color: rgba(0, 0, 0, 0.57);"
                                    class="mb-0 pt-1 pr-5"
                                  >
                                    Your stars:
                                  </span>
                                  <v-rating
                                    v-model="post.book.stars"
                                    color="yellow darken-3"
                                    background-color="grey darken-1"
                                    empty-icon="$ratingFull"
                                    hover
                                    small
                                  />
                                </v-container>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-autocomplete
                                  :items="genres"
                                  label="Genres"
                                  v-model="post.book.genres"
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
                                    v-model="post.topic"
                                    required
                                    :error-messages="errors"
                                    label="Topic*"
                                    persistent-hint
                                    rows="2"
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
                                      <span class="signature">
                                        {{ user.username }}
                                      </span>
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
                            v-if="!isLoadingUpload"
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
        <v-col
          sm="3"
          md="3"
          lg="3"
          xl="3"
          class="mt-12"
          style="position: relative"
        >
          <tips />
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
import Tips from '@/components/Shared/Tips';

export default {
  mixins: [editPost, updateBanner, attachImage],
  components: {
    Tips,
  },
  data() {
    return {
      post: null,
      newCover: '',
      author: '',
      coAuthor: '',
      recommender: '',
      recommender2: '',
      addCoAuthor: false,
      addRecomender2: false,
      isPreviewing: false,
      genres: [
        'Fiction',
        'Science',
        'Fantasy',
        'Thriller',
        'Poetry',
        'Novel',
        'Narrative',
        'Literary',
        'Deactive',
        'Action',
        'Improve-self',
      ],
    };
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
        const authors = this.post.authors.filter(
          person => person.type === 'author',
        );
        this.author = authors[0] ? authors[0].name : '';
        this.coAuthor = authors[1] ? authors[1].name : '';

        const recommenders = this.post.book.suggestedBy;
        this.recommender = recommenders[0] || '';
        this.recommender2 = recommenders[1] || '';
      });
    },
    handleRemoveCoAuthor() {
      this.addCoAuthor = !this.addCoAuthor;
      this.coAuthor = '';
    },
    handleRemoveRecommender2() {
      this.addRecomender2 = !this.addRecomender2;
      this.recommender2 = '';
    },
    async submit() {
      if (this.newCover) {
        this.post.cover = this.newCover;
      }
      if (this.post.cover === '') {
        this.$notify({
          type: 'error',
          title: 'Error!',
          text: "Let's upload the banner",
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
        book: this.post.book,
        authors: [],
      };

      dataUpdate.authors = [
        { type: 'author', name: this.author },
        { type: 'author', name: this.coAuthor },
      ].filter(author => author.name !== '');

      dataUpdate.book.suggestedBy = [
        this.recommender,
        this.recommender2,
      ].filter(recommender => recommender !== '');

      const res = await this.editPost({ _id: this.post._id, data: dataUpdate });
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Success!',
          text: 'Update success',
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
          title: 'Error!',
          text: res.message,
        });
        this.deleteFile({ fileId: this.newCover._id });
      }
    },
  },
  async created() {
    this.APIS = APIS;
    await this.fetchPost();
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
  top: 19.8%;
  opacity: 0.9;
}

.update-banner-btn:hover {
  opacity: 1;
}
</style>
