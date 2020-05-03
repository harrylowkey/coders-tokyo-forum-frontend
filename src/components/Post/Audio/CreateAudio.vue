<template>
  <ValidationObserver ref="observer">
    <app-alert v-if="alert" :alertMessage="alertMessage"></app-alert>
    <v-form>
      <v-alert
        v-if="alert"
        id="alert"
        type="warning"
        border="left"
        transition="slide-x-reverse-transition"
        dismissible
      >{{ alertMessage }}</v-alert>
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
                            :theme="'list'"
                            :deletable="true"
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
                            @delete="fileDeleted($event)"
                            v-model="fileRecords"
                            :class="fileSelectClasses"
                          ></VueFileAgent>
                        </div>
                      </v-container>
                    </v-col>
                    <v-row class="mt-5">
                      <v-col cols="12" sm="12" md="4">
                        <v-col cols="12" class="pa-0">
                          <my-upload
                            class="pt-0"
                            field="img"
                            @crop-success="cropSuccess"
                            @crop-upload-success="cropUploadSuccess"
                            @crop-upload-fail="cropUploadFail"
                            v-model="uploadBanner"
                            :width="210"
                            :height="210"
                            :params="params"
                            :headers="headers"
                            img-format="jpg"
                            langType="en"
                            noCircle
                          ></my-upload>
                        </v-col>
                        <div style="flex: 26%" class="d-flex flex-column align-center">
                          <div
                            v-if="!data.coverImage"
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
                          <v-container class="d-flex justify-center" v-if="data.coverImage">
                            <v-img max-width="210" max-height="210" :src="data.coverImage"></v-img>
                          </v-container>
                          <div class="mt-10 d-flex justify-center align-center flex-column">
                            <toggle-tag
                              v-for="(tag, i) in tags"
                              :key="i"
                              :tagName="tag"
                              @handleRemoveTag="handleRemoveTag(i)"
                            ></toggle-tag>

                            <create-tag
                              v-if="tags.length < 3"
                              @handleAddTag="handleAddTag"
                              :tags="tags"
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
                              <ValidationProvider
                                name="Singer"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  :error-messages="errors"
                                  required
                                  v-model="singer"
                                  label="Singer/Rapper"
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addSinger2">
                                <v-icon
                                  @click="addSinger2 = !addSinger2"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addSinger2">
                                <v-icon
                                  @click="handleRemoveSinger(2)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addSinger2" class>
                            <div class="d-flex align-end">
                              <ValidationProvider
                                name="Singer"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  :error-messages="errors"
                                  v-model="singer2"
                                  label="Singer/Rapper"
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addSinger3">
                                <v-icon
                                  @click="addSinger3 = !addSinger3"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addSinger3">
                                <v-icon
                                  @click="handleRemoveSinger(3)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addSinger3">
                            <div class="d-flex align-end">
                              <ValidationProvider
                                name="Singer"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  :error-messages="errors"
                                  v-model="singer3"
                                  label="Singer/Rapper"
                                ></v-text-field>
                              </ValidationProvider>
                              <span class="pb-4 pl-3" v-if="!addSinger4">
                                <v-icon
                                  @click="addSinger4 = !addSinger4"
                                  color="green"
                                  style="cursor: pointer"
                                >mdi-plus-circle-outline</v-icon>
                              </span>
                              <span class="pb-4 pl-3" v-if="addSinger4">
                                <v-icon
                                  @click="handleRemoveSinger(4)"
                                  color="warning"
                                  style="cursor: pointer"
                                >mdi-close-circle-outline</v-icon>
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" v-if="addSinger4">
                            <div class="d-flex align-end">
                              <ValidationProvider
                                name="Singer"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  :error-messages="errors"
                                  v-model="singer4"
                                  label="Singer/Rapper"
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
import UserAvatar from "@/components/Shared/UserAvatar";
import myUpload from "vue-image-crop-upload";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import { uploadBanner } from "@/mixins/uploadBanner";
import CreateTag from "@/components/Shared/CreateTag";
import ToggleTag from "@/components/Shared/ToggleTag";
export default {
  mixins: [uploadBanner],
  props: ["type"],
  components: {
    UserAvatar,
    ToggleTag,
    CreateTag,
    myUpload,
    VueUploadMultipleImage
  },
  data() {
    return {
      singer: "",
      singer2: "",
      singer3: "",
      singer4: "",
      composer: "",
      composer2: "",
      composer3: "",
      composer4: "",
      addSinger2: false,
      addSinger3: false,
      addSinger4: false,
      addComposer2: false,
      addComposer3: false,
      addComposer4: false,
      alert: false,
      alertMessage: "",
      maxImages: 20,
      coAuthor: false,
      recommender2: false,
      user: {
        username: "hong_quang"
      },
      tags: [],
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
        audio: "",
        authors: [],
        topic: "",
        description: "",
        content: "",
        type: ""
      },
      imgDataUrl: "",
      fileRecords: [],
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: [],
      choseFile: false,
      fileSelectClasses: ["file-select", "wrapper-file-select"]
    };
  },
  computed: {},
  created() {
    this.data.type = this.type;
  },
  methods: {
    handleAddTag(tag) {
      this.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.tags.splice(tagIndex, 1);
    },
    handleRemoveComposer(index) {
      this[`addComposer${index}`] = !this[`addComposer${index}`];
      this[`composer${index}`] = "";
    },
    handleRemoveSinger(index) {
      this[`addSinger${index}`] = !this[`addSinger${index}`];
      this[`singer${index}`] = "";
    },
    chooseFile() {
      this.$refs.vueFileAgent.$refs.fileInput.click();
    },
    uploadFiles: function() {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(
        this.uploadUrl,
        this.uploadHeaders,
        this.fileRecordsForUpload
      );
      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile: function(fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    filesSelected: function(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      this.choseFile = true;
      this.fileSelectClasses.push(
        ...["show-wrapper-file-select", "show-file-select"]
      );
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
      this.fileSelectClasses = ["file-select", "wrapper-file-select"];
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
      if (!this.fileRecordsForUpload.length) {
        this.alertMessage = "Hang on! Let's upload audio first";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        return;
      }
      this.data.authors = [
        { type: "composer", name: this.composer },
        { type: "composer", name: this.composer2 },
        { type: "composer", name: this.composer3 },
        { type: "composer", name: this.composer4 },
        { type: "singer", name: this.singer },
        { type: "singer", name: this.singer2 },
        { type: "singer", name: this.singer3 },
        { type: "singer", name: this.singer4 }
      ].filter(person => person.name !== "");
      this.data.audio = this.fileRecordsForUpload[0];
      if (this.data.content === "") this.data.content = "Update later";
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