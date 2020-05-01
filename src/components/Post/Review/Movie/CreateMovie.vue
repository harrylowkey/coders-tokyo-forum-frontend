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
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider name="Movie name" rules="required" v-slot="{ errors }">
                        <v-text-field
                          :error-messages="errors"
                          v-model="data.movie.name"
                          label="Movie name*"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field label="Nation"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="2">
                      <v-text-field label="IMDb"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="2">
                      <v-text-field hint="Unit: minutes" label="Times"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="8">
                      <v-text-field label="Link"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div class="d-flex align-end">
                        <v-text-field label="Director"></v-text-field>
                        <span class="pb-4 pl-3" v-if="!coDirector">
                          <v-icon
                            @click="coDirector = !coDirector"
                            color="green"
                            style="cursor: pointer"
                          >mdi-plus-circle-outline</v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="coDirector">
                          <v-icon
                            @click="coDirector = !coDirector"
                            color="warning"
                            style="cursor: pointer"
                          >mdi-close-circle-outline</v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="coDirector">
                      <div class="d-flex align-end">
                        <v-text-field label="Co - Director"></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div class="d-flex align-end">
                        <v-text-field label="Actor/Actress"></v-text-field>
                        <span class="pb-4 pl-3" v-if="!actor2">
                          <v-icon
                            @click="actor2 = !actor2"
                            color="green"
                            style="cursor: pointer"
                          >mdi-plus-circle-outline</v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="actor2">
                          <v-icon
                            @click="actor2 = !actor2"
                            color="warning"
                            style="cursor: pointer"
                          >mdi-close-circle-outline</v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="actor2">
                      <div class="d-flex align-end">
                        <v-text-field label="Actor/Actress"></v-text-field>
                        <span class="pb-4 pl-3" v-if="!actor3">
                          <v-icon
                            @click="actor3 = !actor3"
                            color="green"
                            style="cursor: pointer"
                          >mdi-plus-circle-outline</v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="actor3">
                          <v-icon
                            @click="actor3 = !actor3"
                            color="warning"
                            style="cursor: pointer"
                          >mdi-close-circle-outline</v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="actor3">
                      <div class="d-flex align-end">
                        <v-text-field label="Actor/Actress"></v-text-field>
                        <span class="pb-4 pl-3" v-if="!actor4">
                          <v-icon
                            @click="actor4 = !actor4"
                            color="green"
                            style="cursor: pointer"
                          >mdi-plus-circle-outline</v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="actor4">
                          <v-icon
                            @click="actor4 = !actor4"
                            color="warning"
                            style="cursor: pointer"
                          >mdi-close-circle-outline</v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="actor4">
                      <div class="d-flex align-end">
                        <v-text-field label="Actor/Actress"></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-text-field label="Release Date"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="7">
                      <v-container class="d-flex pl-0 pb-0 pr-0 mt-2">
                        <span
                          style="font-size: 17px; color: rgba(0, 0, 0, 0.57);"
                          class="mb-0 pt-1 pr-5"
                        >Your stars:</span>
                        <v-rating
                          v-model="data.movie.stars"
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
                      <v-autocomplete
                        :items="genres"
                        label="Genres"
                        v-model="data.movie.genres"
                        multiple
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider name="Topic" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Topic*"
                          persistent-hint
                          rows="2"
                          required
                          :error-messages="errors"
                          hint="Write description to attract people at the first glance"
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
import { uploadBanner } from "@/mixins/uploadBanner";
import { extend, setInteractionMode } from 'vee-validate';
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
      director: "",
      coDirector: "",
      actor: "",
      actor2: "",
      actor3: "",
      actor4: "",
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
        movie: {
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
        type: "movie",
        cover: ""
      },
      imgDataUrl: "",
      isPreviewing: false,
      genres: ["Action", "Funny", "Moving", "History"]
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
      this.data.authors = [
        { type: "actor", name: this.actor },
        { type: "actor", name: this.actor2 },
        { type: "actor", name: this.actor3 },
        { type: "actor", name: this.actor4 },
        { type: "director", name: this.director },
        { type: "director", name: this.coDirector }
      ].filter(person => person.name !== "");
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