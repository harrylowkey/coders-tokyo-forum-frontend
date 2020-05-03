<template>
  <ValidationObserver ref="observer">
    <app-alert v-if="alert" :alertMessage="alertMessage"></app-alert>
    <v-form>
      <v-card class="d-flex py-3 pt-0">
        <v-row>
          <v-col cols="4" offset-sm="4" class="py-1">
            <div class="d-flex flex-column align-center">
              <user-avatar
                :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
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
                      ></my-upload>
                      <v-container class="d-flex justify-center" v-if="data.coverImage">
                        <v-img max-width="650" max-height="250" :src="data.coverImage"></v-img>
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
                        <vue-upload-multiple-image
                          @upload-success="uploadImageSuccess"
                          @before-remove="beforeRemove"
                          @edit-image="editImage"
                          idUpload="myIdUpload"
                          editUpload="myIdEdit"
                          :data-images="foodPhotos"
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
                    <v-col cols="12" sm="12" md="5">
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
                <v-spacer></v-spacer>
                <v-btn class="mr-5" color="primary" @click="togglePreviewContent" dark>Preview</v-btn>
                <v-btn class="mr-5" color="green" dark @click="submit">Post</v-btn>
              </v-card-actions>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import UserAvatar from "@/components/Shared/UserAvatar";
import CreateTagBlog from "@/components/Shared/CreateTagBlog";
import myUpload from "vue-image-crop-upload";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import { uploadBanner } from "@/mixins/uploadBanner";
import { extend, setInteractionMode } from "vee-validate";
import { required, numeric } from "vee-validate/dist/rules";
setInteractionMode("eager");
extend("minmax", {
  validate(value, { min, max }) {
    return value >= Number(min) && value <= Number(max);
  },
  message: "Valid range: 1 - 10",
  params: ["min", "max"]
});

extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: "{_field_} is required"
});

extend("numeric", {
  ...numeric,
  message: "{_field_} must be a number"
});

export default {
  mixins: [uploadBanner],
  components: {
    UserAvatar,
    CreateTagBlog,
    myUpload,
    VueUploadMultipleImage
  },
  data() {
    return {
      alert: false,
      alertMessage: "",
      maxImages: 20,
      uploadBanner: false,
      user: {
        username: "hong_quang"
      },
      isPreviewing: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      data: {
        tags: [],
        food: {
          priceAverage: "",
          priceUnit: "",
          year: "",
          restaurant: "",
          quality: 8,
          price: 8,
          service: 10,
          space: 8,
          openTime: "",
          stars: 5,
          foodPhotos: [],
        },
        authors: [],
        topic: "",
        description: "",
        content: "",
        type: "food",
        cover: ""
      },
      foodPhotos: []
    };
  },
  computed: {},
  methods: {
    handleAddTag(tag) {
      this.data.tags.push(tag);
    },
    togglePreviewContent() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.data.content.trim() !== "") {
        return (this.isPreviewing = true);
      }
    },
    beforeRemove(index, done, fileList) {
      done();
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
    },
    handleLimitExceed(amount) {
      this.alertMessage = "Please choose less than 20 photos";
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    submit() {
      if (this.data.coverImage === "") {
        this.alertMessage = "Hang on! Let's upload cover images for blog";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        return;
      }

      if (!this.data.food.foodPhotos.length) {
        this.alertMessage = "Attach at least 1 photo for your blog";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        return;
      }
      this.$refs.observer.validate();
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