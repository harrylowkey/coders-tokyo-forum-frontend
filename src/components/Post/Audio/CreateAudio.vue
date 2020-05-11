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
          <v-col cols="12" class="pt-0">
            <v-container class="pt-0">
              <v-card-text class="pb-0 pt-0 px-6">
                <v-container class="py-0">
                  <v-row>
                    <v-col cols="12" class="pt-0">
                      <v-container class="ml-n2 headline">
                        <v-btn @click="chooseFile()" dark small color="primary" class="mb-8 ml-2">
                          <v-icon left color="white" size="18">mdi-paperclip</v-icon>Choose audio file
                        </v-btn>
                        <div :class="fileSelectClasses">
                          <VueFileAgent
                            ref="vueFileAgent"
                            theme="list"
                            :deletable="!isLoading"
                            :meta="true"
                            :accept="'.mp3, .wma, .wav'"
                            :maxSize="'10MB'"
                            :helpText="'Drag audio file or choose here'"
                            :errorText="{
                              type: 'Invalid audio type. Only audio extension allowed',
                              size: 'Files should not exceed 10MB in size',
                            }"
                            multiple="false"
                            @select="filesSelected($event)"
                            @beforedelete="onBeforeDelete($event)"
                          ></VueFileAgent>
                        </div>
                      </v-container>
                    </v-col>
                    <v-row class="mt-5">
                      <v-col cols="12" sm="12" md="4">
                        <v-col cols="12" class="pa-0">
                          <my-upload
                            class="pt-0"
                            field="banner"
                            @crop-upload-success="cropUploadSuccess"
                            @crop-upload-fail="cropUploadFail"
                            v-model="uploadBanner"
                            :width="210"
                            :height="210"
                            :headers="headers"
                            img-format="jpg"
                            langType="en"
                            url="http://localhost:3000/api/v1/files/upload/banner?type=banner"
                            noCircle
                          ></my-upload>
                        </v-col>
                        <div style="flex: 26%" class="d-flex flex-column align-center">
                          <div
                            v-if="!data.banner.secureURL"
                            class="banner d-flex justify-center align-center pr-2"
                          >
                            <v-chip
                              @click="uploadBanner = !uploadBanner"
                              style="cursor: pointer"
                              text-color="#fff"
                              class="upload-btn"
                              color="green"
                              label
                            >
                              <v-icon left>mdi-cloud-upload-outline</v-icon>Image
                            </v-chip>
                          </div>
                          <v-container class="d-flex justify-center" v-if="data.banner.secureURL">
                            <v-img
                              style="cursor: pointer"
                              @click="uploadBanner = !uploadBanner"
                              max-width="210"
                              max-height="210"
                              :src="data.banner.secureURL"
                            ></v-img>
                          </v-container>
                          <div class="mt-10 d-flex justify-center align-center flex-column">
                            <toggle-tag
                              v-for="(tag, i) in data.tags"
                              :key="i"
                              :tagName="tag"
                              @handleRemoveTag="handleRemoveTag(i)"
                            ></toggle-tag>

                            <create-tag
                              v-if="data.tags.length < 3"
                              @handleAddTag="handleAddTag"
                              :tags="data.tags"
                            ></create-tag>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="12" md="8" class="pt-0">
                        <v-col cols="12" sm="12" md="12" class="pt-0">
                          <ValidationProvider name="Song name" rules="required" v-slot="{ errors }">
                            <v-text-field
                              class="mt-0"
                              :error-messages="errors"
                              v-model="data.topic"
                              label="Song name*"
                              required
                            ></v-text-field>
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
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addComposer2">
                                <v-icon
                                  @click="addComposer2 = !addComposer2"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addComposer2">
                                <v-icon
                                  @click="handleRemoveComposer(2)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addComposer2" class>
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
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addComposer3">
                                <v-icon
                                  @click="addComposer3 = !addComposer3"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addComposer3">
                                <v-icon
                                  @click="handleRemoveComposer(3)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addComposer3" class>
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
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addComposer4">
                                <v-icon
                                  @click="addComposer4 = !addComposer4"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addComposer4">
                                <v-icon
                                  @click="handleRemoveComposer(4)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addComposer4">
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
                                ></v-text-field>
                              </ValidationProvider>
                            </div>
                          </v-col>
                        </div>
                        <div class="d-flex flex-wrap">
                          <v-col cols="12" sm="6" md="6">
                            <div class="d-flex align-end">
                              <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                <v-text-field
                                  :error-messages="errors"
                                  required
                                  v-model="artist"
                                  label="Artist"
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addArtist2">
                                <v-icon
                                  @click="addArtist2 = !addArtist2"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addArtist2">
                                <v-icon
                                  @click="handleRemoveArtist(2)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addArtist2" class>
                            <div class="d-flex align-end">
                              <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                <v-text-field
                                  :error-messages="errors"
                                  v-model="artist2"
                                  label="Artist"
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addArtist3">
                                <v-icon
                                  @click="addArtist3 = !addArtist3"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addArtist3">
                                <v-icon
                                  @click="handleRemoveArtist(3)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addArtist3">
                            <div class="d-flex align-end">
                              <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                <v-text-field
                                  :error-messages="errors"
                                  v-model="artist3"
                                  label="Artist"
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addArtist4">
                                <v-icon
                                  @click="addArtist4 = !addArtist4"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addArtist4">
                                <v-icon
                                  @click="handleRemoveArtist(4)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addArtist4">
                            <div class="d-flex align-end">
                              <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                <v-text-field
                                  :error-messages="errors"
                                  v-model="artist4"
                                  label="Artist"
                                ></v-text-field>
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
                            v-model="data.content"
                            placeholder="Markdown"
                          ></v-textarea>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
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
import myUpload from "vue-image-crop-upload";
import { createPost } from "@/mixins/createPost";
import { mapActions } from "vuex";
export default {
  mixins: [createPost],
  props: ["type"],
  components: {
    myUpload
  },
  data() {
    return {
      artist: "",
      artist2: "",
      artist3: "",
      artist4: "",
      composer: "",
      composer2: "",
      composer3: "",
      composer4: "",
      addArtist2: false,
      addArtist3: false,
      addArtist4: false,
      addComposer2: false,
      addComposer3: false,
      addComposer4: false,
      maxImages: 20,
      coAuthor: false,
      recommender2: false,
      uploadBanner: false,
      data: {
        tags: [],
        audio: {},
        authors: [],
        topic: "",
        description: "",
        content: "",
        type: "",
        banner: ""
      },
      imgDataUrl: "",
      uploadAudioURL:
        "http://localhost:3000/api/v1/files/upload/audio?type=audio",
      fileRecordsForUpload: [],
      fileSelectClasses: ["file-select", "wrapper-file-select"]
    };
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${this.accessToken}`
      };
    }
  },
  created() {
    this.data.type = this.type;
  },
  methods: {
    ...mapActions("post", ["uploadAudio"]),
    ...mapActions("utils", ["setLoading"]),
    handleRemoveComposer(index) {
      this[`addComposer${index}`] = !this[`addComposer${index}`];
      this[`composer${index}`] = "";
    },
    handleRemoveArtist(index) {
      this[`addArtist${index}`] = !this[`addArtist${index}`];
      this[`artist${index}`] = "";
    },
    chooseFile() {
      this.$refs.vueFileAgent.$refs.fileInput.click();
    },
    async uploadFile() {
      const res = (
        await this.$refs.vueFileAgent.upload(
          this.uploadAudioURL,
          this.headers,
          this.fileRecordsForUpload
        )
      )[0];

      if (res.status === 200) {
        this.$notify({
          type: "success",
          title: "Upload success"
        });
        this.data.audio = res.data.data;
        this.setLoading(false);
        console.log(this.data);
      }
      if (res.status === 400) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: res.message
        });
      }

      this.fileRecordsForUpload = [];
    },
    async onBeforeDelete(fileRecord) {
      const res = await this.deleteFile({ fileId: this.data.audio._id });
      if (res.status === 200) {
        this.data.audio = {};
        this.fileSelectClasses = ["file-select", "wrapper-file-select"];
      }
    },
    async filesSelected(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      this.fileSelectClasses.push(
        ...["show-wrapper-file-select", "show-file-select"]
      );
      this.setLoading(true);
      this.uploadFile();
    },
    async submit() {
      if (this.data.banner === "") {
        this.$notify({
          type: "error",
          title: "Let's upload the banner"
        });
        return;
      }
      if (!this.fileRecordsForUpload.length) {
        if (this.data.banner === "") {
          this.$notify({
            type: "error",
            title: "Hang on! Let's upload audio"
          });
          return;
        }
      }

      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      this.data.authors = [
        { type: "composer", name: this.composer },
        { type: "composer", name: this.composer2 },
        { type: "composer", name: this.composer3 },
        { type: "composer", name: this.composer4 },
        { type: "artist", name: this.artist },
        { type: "artist", name: this.artist2 },
        { type: "artist", name: this.artist3 },
        { type: "artist", name: this.artist4 }
      ].filter(person => person.name !== "");
      if (this.data.content === "") this.data.content = "Update later";

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
          path: `/${type}/${res.data._id}?type=${type}`
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

.banner {
  width: 210px;
  height: 210px;
  box-shadow: 9px 9px 10px 6px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 9px 9px 10px 6px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 9px 9px 10px 6px rgba(0, 0, 0, 0.16);
}
</style>