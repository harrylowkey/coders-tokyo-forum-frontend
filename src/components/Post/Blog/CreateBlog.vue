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
              <div class="d-flex"></div>
              <toggle-tag
                v-for="(tag, i) in data.tags"
                :key="i"
                :tagName="tag"
                @handleRemoveTag="handleRemoveTag(i)"
              ></toggle-tag>
              <create-tag-blog v-if="data.tags.length < 3" @handleAddTag="handleAddTag" :tags="data.tags"></create-tag-blog>
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
                      ></my-upload>
                      <v-container class="d-flex justify-center" v-if="data.coverImage">
                        <v-img max-width="650" max-height="250" :src="data.coverImage"></v-img>
                      </v-container>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider name="Topic" rules="required" v-slot="{ errors }">
                        <v-text-field :error-messages="errors" label="Topic*" required></v-text-field>
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
                          v-model="data.content"
                          placeholder="Markdown"
                          :error-messages="errors"
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
import ToggleTag from "@/components/Shared/ToggleTag";
export default {
  mixins: [uploadBanner],
  components: {
    UserAvatar,
    CreateTagBlog,
    myUpload,
    ToggleTag
  },
  data() {
    return {
      user: {
        username: "hong_quang"
      },

      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      data: {
        topic: "",
        description: "",
        content: "",
        coverImage: "",
        tags: []
      },
      imgDataUrl: "",
      isPreviewing: false,
      uploadBanner: false
    };
  },
  methods: {
    handleAddTag(tag) {
      this.data.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.data.tags.splice(tagIndex, 1)
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