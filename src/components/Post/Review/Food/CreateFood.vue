<template>
  <ValidationObserver ref="observer">
    <v-form>
      <v-card class="d-flex py-3 pt-0">
        <v-row>
          <v-col cols="4" offset-sm="4" class="py-1">
            <div class="d-flex flex-column align-center">
              <user-avatar
                :src="user.avatar.secureURL"
                :username="user.username"
                style="height: 130px;"
              ></user-avatar>
            </div>
          </v-col>
          <v-col cols="12" class="pb-0 pt-0 px-6" style="height: 60px;">
            <div class="d-flex ml-7">
              <div class="d-flex">
                <v-chip
                  style="cursor: pointer"
                  class="ma-2"
                  color="#e57373"
                  label
                  text-color="white"
                  v-for="(tag, i) in data.tags"
                  :key="i"
                >{{ tag }}</v-chip>
              </div>
              <create-tag-blog
                v-if="data.tags.length < 3"
                @handleAddTag="handleAddTag"
                :tags="data.tags"
              ></create-tag-blog>
              <v-spacer></v-spacer>
              <v-chip
                @click="uploadBanner = !uploadBanner"
                style="cursor: pointer"
                text-color="#fff"
                class="ma-2 mr-12"
                color="green"
                label
              >
                <v-icon left>mdi-cloud-upload-outline</v-icon>Image
              </v-chip>
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
                        field="banner"
                        @crop-upload-success="cropUploadSuccess"
                        @crop-upload-fail="cropUploadFail"
                        v-model="uploadBanner"
                        :width="800"
                        :height="400"
                        :headers="headers"
                        img-format="jpg"
                        langType="en"
                        noCircle
                        url="http://localhost:3000/api/v1/files/upload/banner?type=banner"
                      ></my-upload>
                      <v-container class="d-flex justify-center" v-if="data.banner.secureURL">
                        <v-img max-width="650" max-height="250" :src="data.banner.secureURL"></v-img>
                      </v-container>
                    </v-col>
                    <v-col cols="12">
                      <v-container class="ml-n2 headline">
                        <v-icon color="primary" size="18" left>mdi-paperclip</v-icon>
                        <span style="font-size: 17px">Attach photos</span>
                      </v-container>
                      <div
                        id="my-strictly-unique-vue-upload-multiple-image"
                        style="display: flex; justify-content: center;"
                      >
                        <div>
                          <vue-upload-multiple-image
                            @upload-success="uploadImageSuccess"
                            @before-remove="beforeRemove"
                            @edit-image="editImage"
                            :data-images="previewPhotos"
                            :maxImage="maxImages"
                            :primaryText="''"
                            :showPrimary="false"
                            :markIsPrimaryText="''"
                            :accept="'image/gif,image/jpeg,image/png,image/bmp,image/jpg'"
                            :dragText="'Drag photos to here'"
                            :browseText="'or choose'"
                            @limit-exceeded="handleLimitExceed"
                          ></vue-upload-multiple-image>
                        </div>
                        <!-- <v-skeleton-loader
                          v-if="isLoading"
                          class
                          height="180"
                          width="200"
                          type="card"
                        ></v-skeleton-loader>-->
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
                          v-model="data.food.restaurant"
                          label="Restaurant name*"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12" sm="8" md="8">
                      <div class="d-flex align-end">
                        <v-text-field
                          hint="E.g: 200.000 - 400.000 VND"
                          v-model="data.food.priceAverage"
                          label="Average price"
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="data.food.openTime"
                        label="Open time"
                        hint="E.g: 08:00 / 20:00"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ValidationProvider
                        name="Quality point"
                        rules="required|numeric|minmax:1,10"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          :error-messages="errors"
                          v-model="data.food.quality"
                          hint="1 - 10 points"
                          label="Quality*"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ValidationProvider
                        name="Price point"
                        rules="required|numeric|minmax:1,10"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="data.food.price"
                          :error-messages="errors"
                          hint="1 - 10 points"
                          label="Price*"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ValidationProvider
                        name="Service point"
                        rules="required|numeric|minmax:1,10"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="data.food.service"
                          :error-messages="errors"
                          hint="1 - 10 points"
                          label="Service*"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ValidationProvider
                        name="Service point"
                        rules="required|numeric|minmax:1,10"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="data.food.space"
                          :error-messages="errors"
                          hint="1 - 10 points"
                          label="Space*"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="7">
                      <v-text-field v-model="data.food.location" label="Location"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-container class="d-flex pl-0 pr-0 mt-2">
                        <span
                          style="font-size: 17px; color: rgba(0, 0, 0, 0.57);"
                          class="mb-0 pt-1 pr-5"
                        >Your stars:</span>
                        <v-rating
                          v-model="data.food.stars"
                          color="yellow darken-3"
                          background-color="grey darken-1"
                          empty-icon="$ratingFull"
                          half-increments
                          hover
                          small
                        ></v-rating>
                      </v-container>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <ValidationProvider name="Topic" rules="required" v-slot="{ errors }">
                        <v-text-field
                          :error-messages="errors"
                          v-model="data.topic"
                          label="Title*"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Description"
                        persistent-hint
                        v-model="data.description"
                        rows="2"
                        hint="Write description to attract people at the first glance"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
                        <v-textarea
                          label="Content*"
                          auto-grow
                          rows="15"
                          required
                          :error-messages="errors"
                          v-model="data.content"
                          placeholder="Markdown"
                        ></v-textarea>
                      </ValidationProvider>
                      <v-dialog v-model="isPreviewing" max-width="800">
                        <v-card
                          class="preview px-8 pt-8 pb-5 d-flex flex-column"
                          style="min-height: 330px;"
                        >
                          <p
                            style="line-height: 1.5"
                            v-html="$options.filters.markdown(data.content || '')"
                          ></p>
                          <v-spacer></v-spacer>
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
                <v-chip
                  style="cursor: pointer"
                  class="ml-5"
                  @click="isAttachImage = !isAttachImage"
                >
                  <v-icon left color="primary">image</v-icon>Attach image
                </v-chip>
                <v-spacer></v-spacer>
                <v-btn class="mr-5" color="primary" @click="togglePreviewContent" dark>Preview</v-btn>
                <v-btn class="mr-5" color="green" dark @click="submit">Post</v-btn>
              </v-card-actions>
            </v-container>
            <v-dialog max-width="500" v-model="isAttachImage">
              <attach-image-dialog
                :isLoading="isLoading"
                :attachImage="attachImage"
                @handleUploadImage="uploadImage"
                @handleOnChange="onChange"
              ></attach-image-dialog>
            </v-dialog>
            <coppy-clipboard
              :imageURL="imageURL"
              :isAttachImageSuccess="isAttachImageSuccess"
              @handleOnCopy="onCopy"
              @handleErrorCopy="onError"
            ></coppy-clipboard>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
import { createPost } from "@/mixins/createPost";

export default {
  mixins: [createPost],
  components: {
    VueUploadMultipleImage
  },
  data() {
    return {
      maxImages: 20,
      uploadBanner: false,
      isPreviewing: false,
      data: {
        tags: [],
        food: {
          priceAverage: "",
          restaurant: "",
          quality: 8,
          price: 8,
          service: 10,
          space: 8,
          openTime: "",
          stars: 5,
          location: '',
          foodPhotos: []
        },
        topic: "",
        description: "",
        content: "",
        type: "food",
        banner: ""
      },
      previewPhotos: []
    };
  },
  computed: {},
  methods: {
    async beforeRemove(index, done, fileList) {
      let photoToDelete = this.data.food.foodPhotos[index];
      const response = await this.deleteFile({ fileId: photoToDelete._id });
      if (response.status === 200) {
        this.data.food.foodPhotos.splice(index, 1);
        this.$notify({
          type: "success",
          title: "Delete success"
        });
      }
      if (response.status === 400) {
        this.$notify({
          type: "error",
          title: "Delete failed"
        });
      }
      done();
    },
    async uploadImageSuccess(formData, index, fileList) {
      const response = await this.uploadFiles(formData);
      if (response.status === 200) {
        this.data.food.foodPhotos.push(response.data);
        this.previewPhotos.push({ path: response.data.secureURL });

        // library bug
        this.previewPhotos = this.previewPhotos.filter(
          photo => photo.default !== 0
        );
        this.$notify({
          type: "success",
          title: "Upload success"
        });
      }

      if (response.status === 400) {
        this.$notify({
          type: "error",
          title: "Upload failed"
        });
      }
    },
    async editImage(formData, index, fileList) {
      let photoToDelete = this.data.food.foodPhotos[index];
      const response = await this.deleteFile({ fileId: photoToDelete._id });
      if (response.status === 200) {
        this.data.food.foodPhotos.splice(index, 1);

        const response = await this.uploadFiles(formData);
        if (response.status === 200) {
          this.data.food.foodPhotos.push(response.data);
          this.$notify({
            type: "success",
            title: "Update success"
          });
        }

        if (response.status === 400) {
          this.$notify({
            type: "error",
            title: "Update failed"
          });
        }
      }
      if (response.status === 400) {
        this.$notify({
          type: "error",
          title: "Delete failed"
        });
      }
    },
    handleLimitExceed(amount) {
      this.$notify({
        type: "error",
        title: "Please upload less than 20 photos"
      });
    },
    async submit() {
      if (this.data.banner === "") {
        this.$notify({
          type: "error",
          title: "Let's upload the banner"
        });
        return;
      }

      if (!this.data.food.foodPhotos.length) {
        this.$notify({
          type: "error",
          title: "Attach at least 1 photo to your blog"
        });
        return;
      }

      console.log(this.data)

      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      const res = await this.createPost(this.data);
      if (res.status === 200) {
        this.$notify({
          type: "success",
          title: "Success"
        });
      }
      if (res.status === 400) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: res.message
        });
      }

      setTimeout(() => {
        return this.$router.push({
          path: `/${this.data.type}Reviews/${res.data._id}?type=${this.data.type}`
        });
      }, 1000);
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");
.signature {
  font-family: "Great Vibes", cursive;
  font-size: 28px;
}

#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>