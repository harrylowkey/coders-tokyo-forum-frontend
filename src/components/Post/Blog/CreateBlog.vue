<template>
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
                v-for="(tag, i) in tags"
                :key="i"
              >{{ tag }}</v-chip>
            </div>
            <create-tag-blog v-if="tags.length < 3" @handleAddTag="handleAddTag" :tags="tags"></create-tag-blog>
            <v-spacer></v-spacer>
            <v-chip
              @click="uploadBanner = !uploadBanner"
              style="cursor: pointer"
              text-color="#fff"
              class="ma-2 mr-5"
              color="green"
              label
            >
              <v-icon left>mdi-cloud-upload-outline</v-icon>Banner
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
                    <v-container class="d-flex justify-center" v-if="data.cover">
                      <v-img max-width="650" max-height="250" :src="data.cover"></v-img>
                    </v-container>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Topic*" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Description"
                      persistent-hint
                      rows="2"
                      hint="example of helper text only on focus"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Content*"
                      auto-grow
                      rows="15"
                      required
                      v-model="data.content"
                      placeholder="Markdown"
                    ></v-textarea>

                    <v-dialog v-model="isPreviewing" max-width="800">
                      <v-card class="preview px-8 pt-8 pb-5 d-flex flex-column" style="min-height: 330px;">
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
              <v-btn class="mr-5" color="green" dark>Post</v-btn>
            </v-card-actions>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script>
import UserAvatar from "@/components/Shared/UserAvatar";
import CreateTagBlog from "@/components/Shared/CreateTagBlog";
import myUpload from "vue-image-crop-upload";
export default {
  components: {
    UserAvatar,
    CreateTagBlog,
    myUpload
  },
  data() {
    return {
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
      data: {},
      imgDataUrl: "",
      isPreviewing: false
    };
  },
  methods: {
    handleAddTag(tag) {
      this.tags.push(tag);
    },
    togglePreviewContent() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.data.content !== "") {
        return (this.isPreviewing = true);
      }
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.data.cover = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
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