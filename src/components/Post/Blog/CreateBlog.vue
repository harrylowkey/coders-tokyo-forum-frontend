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
                style="height: 130px"
              />
            </div>
          </v-col>
          <v-col cols="12" class="pb-0 pt-0 px-6" style="height: 60px;">
            <div class="d-flex ml-7">
              <div class="d-flex" />
              <toggle-tag
                v-for="(tag, i) in data.tags"
                :key="i"
                :tagName="tag"
                @handleRemoveTag="handleRemoveTag(i)"
              />
              <create-tag-blog
                v-if="data.tags.length < 3"
                @handleAddTag="handleAddTag"
                :tags="data.tags"
              />
              <v-spacer />
              <v-chip
                @click="isUploadBanner = !isUploadBanner"
                style="cursor: pointer"
                text-color="#fff"
                class="ma-2 mr-12"
                color="green"
                label
              >
                <v-icon left>mdi-cloud-upload-outline</v-icon>
                Image
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
                        v-model="isUploadBanner"
                        field="cover"
                        @crop-upload-success="cropUploadSuccess"
                        @crop-upload-fail="cropUploadFail"
                        :url="APIS.UPLOAD_BANNER"
                        :width="880"
                        :height="450"
                        :headers="headers"
                        img-format="jpg"
                        langType="en"
                        noCircle
                      />
                      <v-container
                        class="d-flex justify-center"
                        v-if="data.cover.secureURL"
                      >
                        <v-img
                          max-width="650"
                          max-height="250"
                          :src="data.cover.secureURL"
                        />
                      </v-container>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        name="Topic"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="data.topic"
                          :error-messages="errors"
                          label="Topic*"
                          required
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Description"
                        persistent-hint
                        rows="3"
                        v-model="data.description"
                        hint="Write description to attract people at the first glance"
                      />
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        name="Content"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-textarea
                          label="Content*"
                          auto-grow
                          rows="15"
                          required
                          v-model="data.content"
                          placeholder="Markdown"
                          :error-messages="errors"
                        />
                      </ValidationProvider>

                      <v-dialog v-model="isPreviewing" max-width="800">
                        <v-card
                          class="preview px-8 pt-8 pb-5 d-flex flex-column"
                          style="min-height: 330px;"
                        >
                          <p
                            style="line-height: 1.5"
                            v-html="
                              $options.filters.markdown(data.content || '')
                            "
                          />
                          <v-spacer />
                          <div class="d-flex justify-end">
                            <span class="signature">{{ user.username }}</span>
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
                  <v-icon left color="primary">image</v-icon>
                  Attach image
                </v-chip>
                <v-spacer />
                <v-btn
                  class="mr-5"
                  color="primary"
                  @click="togglePreviewContent"
                  dark
                >
                  Preview
                </v-btn>
                <v-btn
                  class="mr-5"
                  color="green white--text"
                  @click="submit"
                  :disabled="isLoadingUpload"
                >
                  Post
                </v-btn>
              </v-card-actions>
            </v-container>
            <v-dialog max-width="500" v-model="isAttachImage">
              <attach-image-dialog
                :attachImage="attachImage"
                :isLoadingUpload="isLoadingUpload"
                @handleUploadImage="uploadImage"
                @handleOnChange="onChange"
              />
            </v-dialog>
            <coppy-clipboard
              :imageURL="imageURL"
              :isAttachImageSuccess="isAttachImageSuccess"
              @handleOnCopy="onCopy"
              @handleErrorCopy="onError"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { createPost } from '@/mixins/createPost';
import { APIS } from '@/mixins/api-endpoints';

export default {
  mixins: [createPost],
  components: {},
  data() {
    return {
      data: {
        topic: '',
        description: '',
        content: '',
        cover: '',
        tags: [],
        type: 'blogs',
      },
      imgDataUrl: '',
      isPreviewing: false,
    };
  },
  created() {
    this.APIS = APIS;
  },
  methods: {},
  computed: {},
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
.signature {
  font-family: 'Great Vibes', cursive;
  font-size: 28px;
}

.dialog-attach-image {
  width: 1000px;
  height: 600px;
}
</style>
