<template>
  <ValidationObserver ref="observer">
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
                <toggle-tag
                  v-for="(tag, i) in data.tags"
                  :key="i"
                  :tagName="tag"
                  @handleRemoveTag="handleRemoveTag(i)"
                ></toggle-tag>
              </div>
              <create-tag-blog
                v-if="data.tags.length < 3"
                @handleAddTag="handleAddTag"
                :tags="data.tags"
              ></create-tag-blog>
              <v-spacer></v-spacer>
              <v-chip
                @click="isUploadBanner = !isUploadBanner"
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
                        v-model="isUploadBanner"
                        url="http://localhost:3000/api/v1/files/upload/banner?type=banner"
                        :width="800"
                        :height="400"
                        :headers="headers"
                        img-format="jpg"
                        langType="en"
                        noCircle
                      ></my-upload>
                      <v-container class="d-flex justify-center" v-if="data.banner.secureURL">
                        <v-img max-width="650" max-height="250" :src="data.banner.secureURL"></v-img>
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
                        <span class="pb-4 pl-3" v-if="!addCoAuthor">
                          <v-icon
                            @click="addCoAuthor = !addCoAuthor"
                            color="green"
                            style="cursor: pointer"
                          >mdi-plus-circle-outline</v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="addCoAuthor">
                          <v-icon
                            @click="handleRemoveCoAuthor"
                            color="warning"
                            style="cursor: pointer"
                          >mdi-close-circle-outline</v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="addCoAuthor">
                      <div class="d-flex align-end">
                        <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                          <v-text-field
                            :error-messages="errors"
                            v-model="coAuthor"
                            label="Co - Author"
                          ></v-text-field>
                        </ValidationProvider>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <div class="d-flex align-end">
                        <v-text-field v-model="recommender" label="Recommender"></v-text-field>
                        <span class="pb-4 pl-3" v-if="!addRecomender2">
                          <v-icon
                            @click="addRecomender2 = !addRecomender2"
                            color="green"
                            style="cursor: pointer"
                          >mdi-plus-circle-outline</v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="addRecomender2">
                          <v-icon
                            @click="handleRemoveRecommender2"
                            color="warning"
                            style="cursor: pointer"
                          >mdi-close-circle-outline</v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-if="addRecomender2">
                      <div class="d-flex align-end">
                        <v-text-field v-model="recommender2" label="Recommender"></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="data.book.country" label="Nation"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field v-model="data.book.length" hint="E.g: 200 pages" label="Length"></v-text-field>
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
import { createPost } from "@/mixins/createPost";

export default {
  mixins: [createPost],
  components: {},
  data() {
    return {
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
        type: "books",
        banner: ""
      },
      author: "",
      coAuthor: "",
      recommender: "",
      recommender2: "",
      addCoAuthor: false,
      addRecomender2: false,
      isUploadBanner: false,
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
    handleRemoveCoAuthor() {
      this.addCoAuthor = !this.addCoAuthor;
      this.coAuthor = "";
    },
    handleRemoveRecommender2() {
      this.addRecomender2 = !this.addRecomender2;
      this.recommender2 = 0;
    },
    async submit() {
      if (this.data.banner === "") {
        this.$notify({
          type: "error",
          title: "Let's upload the banner"
        });
        return;
      }
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      this.data.authors = [
        { type: "author", name: this.author },
        { type: "author", name: this.coAuthor }
      ].filter(author => author.name !== "");
      this.data.book.suggestedBy = [this.recommender, this.recommender2].filter(
        recommender => recommender !== ""
      );

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

      let type = this.data.type.slice(0, this.data.type.length - 1);
      setTimeout(() => {
        return this.$router.push({
          path: `/${type}Reviews/${res.data._id}?type=${type}`
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
</style>