<template>
  <v-form>
    <v-card class="d-flex py-3">
      <div style="flex: 26%" class="d-flex flex-column align-center">
        <user-avatar
          :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
          :username="user.username"
          style="height: 150px;"
        ></user-avatar>

        <v-chip
          style="cursor: pointer"
          class="ma-2"
          color="#e57373"
          label
          text-color="white"
          v-for="(tag, i) in tags"
          :key="i"
        >{{ tag }}</v-chip>
        <create-tag v-if="tags.length < 3" @handleAddTag="handleAddTag" :tags="tags"></create-tag>
      </div>
      <div style="flex:80%">
        <v-container class="d-flex justify-space-between pb-2 pt-2">
          <v-card-title class="py-0 pl-0">
            <span class="headline">Write blog</span>
          </v-card-title>
          <v-chip
            @click="uploadBanner = !uploadBanner"
            style="cursor: pointer"
            text-color="#fff"
            class="ma-2"
            color="green"
            label
          >
            <v-icon left>mdi-cloud-upload-outline</v-icon>Banner
          </v-chip>
        </v-container>
        <v-card-text class="pb-0 pt-0">
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
                <v-container class="d-flex justify-center" width="500"  v-if="data.cover">
                  <v-img max-width="500" height="200" :src="data.cover"></v-img>
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
                 v-if="!isPreviewing"
                ></v-textarea>
                <v-card v-else class="preview px-8 pt-8 pb-5 mb-4" style="min-height: 330px; max-width: 540px">
                  <p style="line-height: 1.5" v-html="$options.filters.markdown(data.content)"></p>
               </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn class="mr-5" color="primary" @click="togglePreviewContent" dark>Preview</v-btn>
          <v-btn class="mr-5" color="green" dark>Post</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import UserAvatar from "@/components/Shared/UserAvatar";
import CreateTag from "@/components/Shared/CreateTag";
import myUpload from "vue-image-crop-upload";
export default {
  components: {
    UserAvatar,
    CreateTag,
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
      imgDataUrl: '',
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
      if (!this.isPreviewing && this.data.content !== '') {
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
</style>