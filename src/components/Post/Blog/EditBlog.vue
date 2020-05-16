<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark">
      <v-row>
        <v-col
          cols="12"
          sm="9"
          md="9"
          lg="9"
          xl="9"
          offset-sm="1"
          offset-md="1"
          offset-lg="1"
          offset-xl="1"
          class="pt-0"
        >
          <div class="pt-6" v-if="!isLoading">
            <ValidationObserver ref="observer">
              <v-form>
                <v-card class="d-flex py-3 pt-0">
                  <v-row>
                    <v-col cols="4" offset-sm="4" class="py-1">
                      <div class="d-flex flex-column align-center">
                        <user-avatar
                          :src="post.user.avatar.secureURL"
                          :username="post.user.username"
                          style="height: 130px"
                        />
                      </div>
                    </v-col>
                    <v-col cols="12" class="pb-0 pt-0 px-6" style="height: 60px;">
                      <div class="d-flex ml-7">
                        <div class="d-flex" />
                        <toggle-tag
                          v-for="(tag, i) in post.tags"
                          :key="i"
                          :tagName="tag"
                          @handleRemoveTag="handleRemoveTag(i)"
                        />
                        <create-tag-blog
                          v-if="post.tags.length < 3"
                          @handleAddTag="handleAddTag"
                          :tags="post.tags"
                        />
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
                                  v-if="post.cover.secureURL"
                                  style="postition: relative"
                                >
                                  <v-img
                                    max-width="650"
                                    max-height="250"
                                    :src="newCover.secureURL || post.cover.secureURL"
                                  />
                                  <v-chip
                                    @click="isUploadBanner = !isUploadBanner"
                                    style="cursor: pointer"
                                    text-color="#fff"
                                    class="ma-2 mr-12 update-banner-btn"
                                    color="green"
                                    label
                                  >
                                    <v-icon left>mdi-cloud-upload-outline</v-icon>Update Image
                                  </v-chip>
                                </v-container>
                              </v-col>
                              <v-col cols="12">
                                <ValidationProvider
                                  name="Topic"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <v-text-field
                                    v-model="post.topic"
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
                                  v-model="post.description"
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
                                    v-model="post.content"
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
                                        $options.filters.markdown(
                                          post.content || '',
                                        )
                                      "
                                    />
                                    <v-spacer />
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
                          <v-spacer />
                          <v-btn
                            class="mr-5"
                            color="primary"
                            @click="togglePreviewContent"
                            dark
                          >Preview</v-btn>
                          <v-btn class="mr-5" color="warning" dark @click="submit">Update</v-btn>
                        </v-card-actions>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card>
              </v-form>
            </ValidationObserver>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { editPost } from '@/mixins/editPost';
import { APIS } from '@/mixins/api-endpoints';

export default {
  mixins: [editPost],
  components: {},
  data() {
    return {
      post: null,
      isPreviewing: false,
      newCover: '',
    };
  },
  computed: {
    ...mapState('utils', ['isLoading', 'errorMes']),
  },
  methods: {
    ...mapActions('post', ['getPostById']),
    async fetchPost() {
      this.getPostById({
        id: this.$route.params.id,
        typeQuery: this.$route.query.type,
      }).then((data) => {
        this.post = data;
        this.post.tags = this.post.tags.map((tag) => tag.tagName);
      });
    },
  },
  async created() {
    this.APIS = APIS;
    await this.fetchPost();
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
.signature {
  font-family: 'Great Vibes', cursive;
  font-size: 28px;
}

#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

.upload-btn {
  cursor: pointer;
  position: absolute;
  top: 42%;
  opacity: 0.9;
}

.upload-btn:hover {
  opacity: 1;
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

.update-banner-btn {
  position: absolute;
  top: 25.4%;
  opacity: 0.9;
}

.update-banner-btn:hover {
  opacity: 1;
}
</style>
