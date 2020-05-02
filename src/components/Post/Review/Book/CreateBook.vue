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
                    <v-col cols="12" sm="8" md="8">
                      <ValidationProvider name="Book name" rules="required" v-slot="{ errors }">
                        <v-text-field
                          v-model="data.book.name"
                          label="Book name*"
                          required
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <ValidationProvider name="Status" rules="required" v-slot="{ errors }">
                        <v-text-field
                          v-model="data.book.status"
                          :error-messages="errors"
                          label="Status"
                          hint="E.g: Finished or 15/34 Chapters"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div class="d-flex align-end">
                        <ValidationProvider name="Author" rules="required" v-slot="{ errors }">
                          <v-text-field
                            required
                            v-model="author"
                            label="Author"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                        <span class="pb-4 pl-3" v-if="!coAuthor">
                          <v-icon
                            @click="coAuthor = !coAuthor"
                            color="green"
                            style="cursor: pointer"
                          >mdi-plus-circle-outline</v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="coAuthor">
                          <v-icon
                            @click="coAuthor = !coAuthor"
                            color="warning"
                            style="cursor: pointer"
                          >mdi-close-circle-outline</v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="coAuthor">
                      <div class="d-flex align-end">
                        <v-text-field v-model="coAuthor" label="Co - Author"></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <div class="d-flex align-end">
                        <v-text-field v-model="recommender" label="Recommender"></v-text-field>
                        <span class="pb-4 pl-3" v-if="!recommender2">
                          <v-icon
                            @click="recommender2 = !recommender2"
                            color="green"
                            style="cursor: pointer"
                          >mdi-plus-circle-outline</v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="recommender2">
                          <v-icon
                            @click="recommender2 = !recommender2"
                            color="warning"
                            style="cursor: pointer"
                          >mdi-close-circle-outline</v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-if="recommender2">
                      <div class="d-flex align-end">
                        <v-text-field v-model="recommender2" label="Recommender"></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Nation"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field hint="E.g: 200 pages" label="Length"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="5">
                      <v-container class="d-flex pl-0 pr-0 mt-2">
                        <span
                          style="font-size: 17px; color: rgba(0, 0, 0, 0.57);"
                          class="mb-0 pt-1 pr-5"
                        >Your stars:</span>
                        <v-rating
                          v-model="data.book.stars"
                          color="yellow darken-3"
                          background-color="grey darken-1"
                          empty-icon="$ratingFull"
                          hover
                          small
                        ></v-rating>
                      </v-container>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        :items="genres"
                        label="Genres"
                        v-model="data.book.genres"
                        multiple
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider name="Topic" rules="required" v-slot="{ errors }">
                        <v-text-field
                          v-model="data.topic"
                          required
                          :error-messages="errors"
                          label="Topic*"
                          persistent-hint
                          rows="2"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Description"
                        persistent-hint
                        rows="2"
                        hint="Write description to attract people at the first glance"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider name="Content" rules="required" v-slot="{ errors }">
                        <v-textarea
                          label="Content*"
                          v-model="data.content"
                          auto-grow
                          rows="15"
                          required
                          :error-messages="errors"
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
import { uploadBanner } from "@/mixins/uploadBanner";
import { extend, setInteractionMode } from "vee-validate";
setInteractionMode("eager");
export default {
  mixins: [uploadBanner],
  components: {
    UserAvatar,
    CreateTagBlog,
    myUpload
  },
  data() {
    return {
      alert: false,
      alertMessage: "",
      author: "",
      coAuthor: "",
      recommender: "",
      recommender2: "",
      user: {
        username: "hong_quang"
      },
      uploadBanner: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      data: {
        tags: [],
        book: {
          name: "",
          status: "Finished",
          country: "",
          year: "",
          length: 0,
          genres: [],
          suggestedBy: [],
          stars: 5
        },
        authors: [],
        topic: "",
        description: "",
        content: "",
        type: "book"
      },
      imgDataUrl: "",
      isPreviewing: false,
      genres: [
        "Fiction",
        "Science",
        "Fantasy",
        "Thriller",
        "Poetry",
        "Novel",
        "Narrative",
        "Literary",
        "Deactive",
        "Action",
        "Improve-self"
      ]
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
    submit() {
      if (this.data.coverImage === "") {
        this.alertMessage = "Hang on! Let's upload cover images for blog";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        return;
      }
      this.data.authors = [
        { type: "author", name: this.author },
        { type: "author", name: this.coAuthor }
      ].filter(author => author.name !== "");
      this.data.book.suggestedBy = [this.recommender, this.recommender2].filter(
        recommender => recommender !== ""
      );
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
</style>