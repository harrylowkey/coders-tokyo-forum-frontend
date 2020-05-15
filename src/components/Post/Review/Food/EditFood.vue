<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark">
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
                        <div class="d-flex" />
                        <toggle-tag
                          v-for="(tag, i) in tags"
                          :key="i"
                          :tagName="tag"
                          @handleRemoveTag="handleRemoveTag(i)"
                        />
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
                                  v-model="uploadBanner"
                                  field="img"
                                  @crop-success="cropSuccess"
                                  @crop-upload-success="cropUploadSuccess"
                                  @crop-upload-fail="cropUploadFail"
                                  :width="880"
                                  :height="450"
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
                              <v-col cols="12">
                                <v-container class="ml-n2 headline">
                                  <v-icon color="primary" size="18" left>
                                    mdi-paperclip
                                  </v-icon>
                                  <span style="font-size: 17px">
                                    Attach photos
                                  </span>
                                </v-container>
                                <div
                                  id="my-strictly-unique-vue-upload-multiple-image"
                                  style="display: flex; justify-content: center;"
                                >
                                  <vue-upload-multiple-image
                                    @upload-success="uploadImageSuccess"
                                    idUpload="myIdUpload"
                                    editUpload="myIdEdit"
                                    :data-images="foodPhotosConvert"
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
                                    :error-messages="errors"
                                    v-model="post.food.restaurant"
                                    label="Restaurant name*"
                                    required
                                  />
                                </ValidationProvider>
                              </v-col>

                              <v-col cols="12" sm="8" md="8">
                                <div class="d-flex align-end">
                                  <v-text-field
                                    hint="E.g: 200.000 - 400.000 VND"
                                    v-model="post.food.priceAverage"
                                    label="Average price"
                                  />
                                </div>
                              </v-col>
                              <v-col cols="12" sm="4" md="4">
                                <v-text-field
                                  v-model="post.food.openTime"
                                  label="Open time"
                                  hint="E.g: 08:00 / 20:00"
                                />
                              </v-col>
                              <v-col cols="12" sm="6" md="3">
                                <ValidationProvider
                                  name="Quality point"
                                  rules="required|numeric|minmax:1,10"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    :error-messages="errors"
                                    v-model="post.food.quality"
                                    hint="1 - 10 points"
                                    label="Quality*"
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
                                    :error-messages="errors"
                                    hint="1 - 10 points"
                                    label="Price*"
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
                                    :error-messages="errors"
                                    hint="1 - 10 points"
                                    label="Service*"
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
                                    :error-messages="errors"
                                    hint="1 - 10 points"
                                    label="Space*"
                                  />
                                </ValidationProvider>
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
                                    v-model="post.food.stars"
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
                                <ValidationProvider
                                  name="Topic"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    :error-messages="errors"
                                    v-model="post.topic"
                                    @change="dataUpdate.topic = post.topic"
                                    label="Title*"
                                    required
                                  />
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Description"
                                  v-model="post.description"
                                  @change="
                                    dataUpdate.desciption = post.description
                                  "
                                  persistent-hint
                                  rows="2"
                                  hint="Write description to attract people at the first glance"
                                />
                              </v-col>
                              <v-col cols="12">
                                <ValidationProvider
                                  name="Title"
                                  v-model="post.title"
                                  @change="dataUpdate.title = post.title"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-textarea
                                    label="Content*"
                                    auto-grow
                                    rows="15"
                                    required
                                    :error-messages="errors"
                                    v-model="post.content"
                                    @change="dataUpdate.content = post.content"
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
import VueUploadMultipleImage from 'vue-upload-multiple-image';
import { extend, setInteractionMode } from 'vee-validate';
import { numeric } from 'vee-validate/dist/rules';

import { updateBanner } from '@/mixins/updateBanner';
import UserAvatar from '@/components/Shared/UserAvatar';
import ToggleTag from '@/components/Shared/ToggleTag';
import CreateTagBlog from '@/components/Shared/CreateTagBlog';

setInteractionMode('eager');
extend('minmax', {
  validate(value, { min, max }) {
    return value >= Number(min) && value <= Number(max);
  },
  message: 'Valid range: 1 - 10',
  params: ['min', 'max'],
});

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1,
    };
  },
  computesRequired: true,
  message: '{_field_} is required',
});

extend('numeric', {
  ...numeric,
  message: '{_field_} must be a number',
});

export default {
  mixins: [updateBanner],
  components: {
    CreateTagBlog,
    UserAvatar,
    myUpload,
    ToggleTag,
    VueUploadMultipleImage,
  },
  data() {
    return {
      alert: false,
      alertMessage: '',
      user: {
        username: 'hong_quang',
      },
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
        _id: '5e9c6ce7830bd646939c7624',
        tags: [
          {
            _id: '5e8de2fcad60773238e94f1c',
            tagName: 'seafood',
          },
          {
            _id: '5e8de2fcad60773238e94f1d',
            tagName: 'street',
          },
        ],
        comments: [],
        likes: [],
        url: 'facebook.com',
        savedBy: [],
        foodPhotos: [
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg',
            fileName: '91427262_222687395745934_4371644556861505536_n.jpg',
            sizeBytes: 112398,
          },
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png',
            fileName: '89025324_2760328297369108_3874548065679441920_n.png',
            sizeBytes: 184898,
          },
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg',
            fileName: '91427262_222687395745934_4371644556861505536_n.jpg',
            sizeBytes: 112398,
          },
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png',
            fileName: '89025324_2760328297369108_3874548065679441920_n.png',
            sizeBytes: 184898,
          },
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg',
            fileName: '91427262_222687395745934_4371644556861505536_n.jpg',
            sizeBytes: 112398,
          },
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png',
            fileName: '89025324_2760328297369108_3874548065679441920_n.png',
            sizeBytes: 184898,
          },
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png',
            fileName: '89025324_2760328297369108_3874548065679441920_n.png',
            sizeBytes: 184898,
          },
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg',
            fileName: '91427262_222687395745934_4371644556861505536_n.jpg',
            sizeBytes: 112398,
          },
          {
            secureURL:
              'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
            publicId:
              'Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png',
            fileName: '89025324_2760328297369108_3874548065679441920_n.png',
            sizeBytes: 184898,
          },
        ],
        food: {
          foodName: 'sushi',
          priceAverage: '200000 - 250000 VND',
          address: 'Let’s Sushi 13B Quốc Tử Giám',
          stars: 5,
          restaurant: "Let's sushi",
          quality: 7.8,
          price: 8,
          service: 10,
          space: 8,
          openTime: '10:00 - 22:00',
        },
        topic: 'Sushi',
        description:
          'Originally, sushi was fermented fish with rice preserved in salt, and this was a staple dish in Japan for a thousand years until the Edo Period (1603 to 1868) when contemporary sushi was developed. The word "sushi" means "it\'s sour," which reflects back to sushi\'s origins of being preserved in salt',
        content:
          'Originally, sushi was fermented fish with rice preserved in salt, and this was a staple dish in Japan for a thousand years until the Edo Period (1603 to 1868) when contemporary sushi was developed. The word "sushi" means "it\'s sour," which reflects back to sushi\'s origins of being preserved in salt',
        type: 'food',
        cover: {
          secureURL:
            'https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg',
          publicId:
            'Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg',
          fileName: '91427262_222687395745934_4371644556861505536_n.jpg',
          sizeBytes: 112398,
        },
        createdAt: '2020-04-19T15:23:19.975Z',
        updatedAt: '2020-04-19T15:23:19.975Z',
        user: {
          _id: '5e8b577f1a2dde322987924',
          username: 'nhat_anh',
        },
        metadata: {
          _id: '5e9494fe935dfb5ed30435',
          comments: 123,
          likes: 69,
          saves: 1,
        },
      },
      uploadBanner: false,
      foodPhotosConvert: [],
      tags: [],
      maxImages: 20,
      dataUpdate: {},
      isPreviewing: false,
    };
  },
  computed: {},
  created() {
    this.tags = this.post.tags.map(tag => tag.tagName);
    this.foodPhotosConvert = this.post.foodPhotos.map(photo => ({
      path: photo.secureURL,
    }));
  },
  methods: {
    handleAddTag(tag) {
      this.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.tags.splice(tagIndex, 1);
    },
    togglePreviewContent() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.post.content.trim() !== '') {
        return (this.isPreviewing = true);
      }
    },
    handleLimitExceed() {
      this.alertMessage = 'Please choose less than 20 photos';
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    submit() {
      this.dataUpdate.tags = this.tags;
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
  top: 17.4%;
  opacity: 0.9;
}

.update-banner-btn:hover {
  opacity: 1;
}
</style>
