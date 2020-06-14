<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark" v-if="!isLoading">
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
                    <v-col
                      cols="12"
                      class="pb-0 pt-0 px-6"
                      style="height: 60px;"
                    >
                      <div class="d-flex ml-7">
                        <div class="d-flex" />
                        <toggle-tag
                          v-for="(tag, i) in post.tags"
                          :key="i"
                          :tagName="tag"
                          @handleRemoveTag="handleRemoveTag(i)"
                        />
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
                                  field="cover"
                                  @crop-upload-success="cropUploadSuccess"
                                  @crop-upload-fail="cropUploadFail"
                                  v-model="isUploadBanner"
                                  :url="APIS.UPLOAD_BANNER"
                                  :width="800"
                                  :height="450"
                                  :headers="headers"
                                  img-format="jpg"
                                  :langExt="langExtVN"
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
                                  >
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
                                      {{ $t('Update Cover Image') }}
                                    </v-chip>
                                  </v-img>
                                </v-container>
                              </v-col>
                              <v-col cols="12">
                                <v-container class="ml-n2 headline">
                                  <v-icon color="primary" size="18" left>
                                    mdi-paperclip
                                  </v-icon>
                                  <span style="font-size: 17px">
                                    {{ $t('Attach photos') }}
                                  </span>
                                </v-container>
                                <div
                                  id="my-strictly-unique-vue-upload-multiple-image"
                                  style="display: flex; justify-content: center;"
                                >
                                  <vue-upload-multiple-image
                                    @upload-success="uploadImageSuccess"
                                    @before-remove="beforeRemove"
                                    @edit-image="editImage"
                                    :data-images="previewPhotos"
                                    :maxImage="maxImages"
                                    :primaryText="''"
                                    :showPrimary="false"
                                    :markIsPrimaryText="''"
                                    :accept="
                                      'image/gif,image/jpeg,image/png,image/bmp,image/jpg'
                                    "
                                    :dragText="'Drag photos to here'"
                                    :browseText="'or choose'"
                                    @limit-exceeded="handleLimitExceed"
                                  />
                                </div>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <ValidationProvider
                                  name="Restaurant name"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    :error-messages="$t(errors)"
                                    v-model="post.food.restaurant"
                                    :label="$t('Restaurant name*')"
                                    required
                                  />
                                </ValidationProvider>
                              </v-col>

                              <v-col cols="12" sm="8" md="8">
                                <div class="d-flex align-end">
                                  <v-text-field
                                    :hint="
                                      $t('E.g') + ': 200.000 - 400.000 VND'
                                    "
                                    v-model="post.food.priceAverage"
                                    :label="$t('Average price')"
                                  />
                                </div>
                              </v-col>
                              <v-col cols="12" sm="4" md="4">
                                <v-text-field
                                  v-model="post.food.openTime"
                                  :label="$t('Open time')"
                                  :hint="$t('E.g') + ': 08:00 / 20:00'"
                                />
                              </v-col>
                              <v-col cols="12" sm="6" md="3">
                                <ValidationProvider
                                  name="Quality point"
                                  rules="required|numeric|minmax:1,10"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    :error-messages="$t(errors)"
                                    v-model="post.food.quality"
                                    :hint="'1 - 10' + $t('points')"
                                    :label="$t('Quality') + '*'"
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" sm="6" md="3">
                                <ValidationProvider
                                  name="Price point"
                                  rules="required|numeric|minmax:1,10"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    v-model="post.food.price"
                                    :error-messages="$t(errors)"
                                    :hint="'1 - 10' + $t('points')"
                                    :label="$t('Price') + '*'"
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" sm="6" md="3">
                                <ValidationProvider
                                  name="Service point"
                                  rules="required|numeric|minmax:1,10"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    v-model="post.food.service"
                                    :error-messages="$t(errors)"
                                    :hint="'1 - 10' + $t('points')"
                                    :label="$t('Service') + '*'"
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" sm="6" md="3">
                                <ValidationProvider
                                  name="Service point"
                                  rules="required|numeric|minmax:1,10"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    v-model="post.food.space"
                                    :error-messages="$t(errors)"
                                    :hint="'1 - 10' + $t('points')"
                                    :label="$t('Space') + '*'"
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" sm="6" md="7">
                                <v-text-field
                                  v-model="post.food.location"
                                  :label="$t('Address')"
                                />
                              </v-col>
                              <v-col cols="12" sm="6" md="5">
                                <v-container class="d-flex pl-0 pr-0 mt-2">
                                  <span
                                    style="font-size: 17px;  color: rgba(0, 0, 0, 0.57);"
                                    class="mb-0 pt-1 pr-5"
                                  >
                                    {{ $t('Stars') }}
                                  </span>
                                  <v-rating
                                    v-model="post.food.stars"
                                    color="yellow darken-3"
                                    background-color="grey darken-1"
                                    empty-icon="$ratingFull"
                                    hover
                                    small
                                  />
                                </v-container>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <ValidationProvider
                                  name="Topic"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    :error-messages="$t(errors)"
                                    v-model="post.topic"
                                    :label="$t('Title') + '*'"
                                    required
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  :label="$t('Description')"
                                  v-model="post.description"
                                  persistent-hint
                                  rows="2"
                                  :hint="
                                    $t(
                                      'Write description to attract people at the first glance',
                                    )
                                  "
                                />
                              </v-col>
                              <v-col cols="12">
                                <ValidationProvider
                                  name="Content"
                                  v-model="post.title"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-textarea
                                    :label="$t('Content*')"
                                    :rows="
                                      getNumberOfLines(post.content, 15) || 15
                                    "
                                    required
                                    :error-messages="$t(errors)"
                                    v-model="post.content"
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
                                          sanitizeContent(post.content || ''),
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
                            dark
                            class="mr-5"
                            color="primary"
                            @click="togglePreviewContent"
                          >
                            {{ $t('Preview') }}
                          </v-btn>
                          <v-btn
                            class="white--text"
                            :disabled="isLoadingUpload"
                            color="warning"
                            @click="submit"
                          >
                            {{ $t('Update') }}
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
import VueUploadMultipleImage from 'vue-upload-multiple-image';

import { editPost } from '@/mixins/editPost';
import { APIS } from '@/mixins/api-endpoints';
import { updateBanner } from '@/mixins/updateBanner';
import { attachImage } from '@/mixins/attachImage';
import Tips from '@/components/Shared/Tips';

export default {
  mixins: [editPost, updateBanner, attachImage],
  components: {
    VueUploadMultipleImage,
    Tips,
  },
  data() {
    return {
      post: null,
      newCover: '',
      isUploadBanner: false,
      maxImages: 20,
      isPreviewing: false,
      previewPhotos: [],
      photosToDelete: [],
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
      }).then(data => {
        this.post = data;
        this.post.tags = this.post.tags.map(tag => tag.tagName);
        this.previewPhotos = this.post.food.foodPhotos.map(photo => ({
          path: photo.secureURL,
        }));
      });
    },
    async beforeRemove(index, done) {
      const photoToDelete = this.post.food.foodPhotos[index];
      this.photosToDelete.push(photoToDelete);
      this.post.food.foodPhotos.splice(index, 1);
      done();
    },
    async uploadImageSuccess(formData) {
      const response = await this.uploadFiles(formData);
      if (response.status === 200) {
        this.post.food.foodPhotos.push(response.data);
        this.previewPhotos.push({ path: response.data.secureURL });

        // library bug
        this.previewPhotos = this.previewPhotos.filter(
          photo => photo.default !== 0,
        );
        this.$notify({
          type: 'success',
          title: `${this.$t('notifications.title.Success')}!`,
          text: this.$t('notifications.upload.Success'),
        });
      }

      if (response.status === 400) {
        this.$notify({
          type: 'error',
          title: `${this.$t('notifications.title.Error')}!`,
          text: this.$t('notifications.upload.Fail'),
        });
      }
    },
    async editImage(formData, index) {
      const photoToDelete = this.post.food.foodPhotos[index];
      this.photosToDelte.push(photoToDelete);
      this.post.food.foodPhotos.splice(index, 1);
    },
    handleLimitExceed() {
      this.alertMessage = 'Please choose less than 20 photos';
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    async submit() {
      if (this.newCover) {
        this.post.cover = this.newCover;
      }
      if (this.post.cover === '') {
        this.$notify({
          type: 'error',
          title: `${this.$t('notifications.title.Error')}!`,
          text: this.$t("Let's upload the banner"),
        });
        return;
      }

      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      const dataUpdate = {
        topic: this.post.topic,
        content: this.sanitizeContent(this.post.content),
        description: this.post.description,
        tags: this.post.tags,
        type: this.post.type,
        cover: this.post.cover,
        food: this.post.food,
      };

      const res = await this.editPost({ _id: this.post._id, data: dataUpdate });
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: `${this.$t('notifications.title.Success')}!`,
          text: this.$t('Update success'),
        });

        if (this.newCover._id) {
          this.deleteFile({ fileId: this.oldCover._id });
        }

        if (this.photosToDelete.length) {
          this.photosToDelete.map(photo =>
            this.deleteFile({ fileId: photo._id }),
          );
        }
        return this.$router.push({
          path: `/${this.post.type}Reviews/${this.post._id}?type=${this.post.type}`,
        });
      }
      if (res.status === 400) {
        this.$notify({
          type: 'error',
          title: `${this.$t('notifications.title.Error')}!`,
          text: this.$t(res.message),
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
  top: 40.4%;
  left: 40%;
  opacity: 0.9;
}

.update-banner-btn:hover {
  opacity: 1;
}
</style>
