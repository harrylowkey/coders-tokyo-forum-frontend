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
              />
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
                />
              </div>
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
                        field="cover"
                        @crop-upload-success="cropUploadSuccess"
                        @crop-upload-fail="cropUploadFail"
                        v-model="isUploadBanner"
                        :url="APIS.UPLOAD_BANNER"
                        :width="800"
                        :height="400"
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
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider
                        name="Movie name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          :error-messages="errors"
                          v-model="data.movie.name"
                          label="Movie name*"
                          required
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="data.movie.country"
                        label="Nation"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="2">
                      <v-text-field v-model="data.movie.IMDb" label="IMDb" />
                    </v-col>
                    <v-col cols="12" sm="4" md="2">
                      <v-text-field
                        v-model="data.movie.time"
                        hint="Unit: minutes"
                        label="Times"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="8">
                      <v-text-field v-model="data.movie.link" label="Link" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div class="d-flex align-end">
                        <v-text-field v-model="director" label="Director" />
                        <span class="pb-4 pl-3" v-if="!addCoDirector">
                          <v-icon
                            @click="addCoDirector = !addCoDirector"
                            color="green"
                            style="cursor: pointer"
                          >
                            mdi-plus-circle-outline
                          </v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="addCoDirector">
                          <v-icon
                            @click="handleRemoveCoDirector"
                            color="warning"
                            style="cursor: pointer"
                          >
                            mdi-close-circle-outline
                          </v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="addCoDirector">
                      <div class="d-flex align-end">
                        <v-text-field
                          v-model="coDirector"
                          label="Co - Director"
                        />
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div class="d-flex align-end">
                        <v-text-field v-model="actor" label="Actor/Actress" />
                        <span class="pb-4 pl-3" v-if="!addActor2">
                          <v-icon
                            @click="addActor2 = !addActor2"
                            color="green"
                            style="cursor: pointer"
                          >
                            mdi-plus-circle-outline
                          </v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="addActor2">
                          <v-icon
                            @click="handleRemoveCoDirector(2)"
                            color="warning"
                            style="cursor: pointer"
                          >
                            mdi-close-circle-outline
                          </v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="addActor2">
                      <div class="d-flex align-end">
                        <v-text-field v-model="actor2" label="Actor/Actress" />
                        <span class="pb-4 pl-3" v-if="!addActor3">
                          <v-icon
                            @click="addActor3 = !addActor3"
                            color="green"
                            style="cursor: pointer"
                          >
                            mdi-plus-circle-outline
                          </v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="addActor3">
                          <v-icon
                            @click="handleRemoveActor(3)"
                            color="warning"
                            style="cursor: pointer"
                          >
                            mdi-close-circle-outline
                          </v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="addActor3">
                      <div class="d-flex align-end">
                        <v-text-field v-model="actor3" label="Actor/Actress" />
                        <span class="pb-4 pl-3" v-if="!addActor4">
                          <v-icon
                            @click="addActor4 = !addActor4"
                            color="green"
                            style="cursor: pointer"
                          >
                            mdi-plus-circle-outline
                          </v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="addActor4">
                          <v-icon
                            @click="handleRemoveActor(4)"
                            color="warning"
                            style="cursor: pointer"
                          >
                            mdi-close-circle-outline
                          </v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="addActor4">
                      <div class="d-flex align-end">
                        <v-text-field v-model="actor4" label="Actor/Actress" />
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="7">
                      <v-text-field
                        v-model="data.movie.releaseDate"
                        label="Release Date"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-container class="d-flex pl-0 pb-0 pr-0 mt-2">
                        <span
                          style="font-size: 17px; color: rgba(0, 0, 0, 0.57);"
                          class="mb-0 pt-1 pr-5"
                        >
                          Your stars:
                        </span>
                        <v-rating
                          v-model="data.movie.stars"
                          color="yellow darken-3"
                          background-color="grey darken-1"
                          empty-icon="$ratingFull"
                          half-increments
                          hover
                          small
                        />
                      </v-container>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        :items="genres"
                        label="Genres"
                        v-model="data.movie.genres"
                        multiple
                      />
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        name="Topic"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          label="Topic*"
                          persistent-hint
                          v-model="data.topic"
                          rows="2"
                          required
                          :error-messages="errors"
                          hint="Write description to attract people at the first glance"
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
                          :error-messages="errors"
                          v-model="data.content"
                          placeholder="Markdown"
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
import { ROUTES } from '@/mixins/routes';

export default {
  mixins: [createPost],
  components: {},
  data() {
    return {
      director: '',
      coDirector: '',
      actor: '',
      actor2: '',
      actor3: '',
      actor4: '',
      addCoDirector: false,
      addActor2: '',
      addActor3: '',
      addActor4: '',
      isUploadBanner: false,
      data: {
        tags: [],
        movie: {
          name: '',
          status: 'Finished',
          country: '',
          releaseDate: '',
          length: 0,
          genres: [],
          suggestedBy: [],
          stars: 5,
        },
        authors: [],
        topic: '',
        description: '',
        content: '',
        type: 'movies',
        cover: '',
      },
      imgDataUrl: '',
      isPreviewing: false,
      genres: ['Action', 'Funny', 'Moving', 'History'],
    };
  },
  computed: {},
  methods: {
    handleRemoveCoDirector() {
      this.addCoDirector = !this.addCoDirector;
      this.coDirector = '';
    },
    handleRemoveActor(index) {
      this[`addActor${index}`] = !this[`addActor${index}`];
      this[`actor${index}`] = '';
    },
    async submit() {
      if (this.data.cover === '') {
        this.$notify({
          type: 'error',
          title: 'Error!',
          text: "Let's upload the cover",
        });
        return;
      }

      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      this.data.authors = [
        { type: 'actor', name: this.actor },
        { type: 'actor', name: this.actor2 },
        { type: 'actor', name: this.actor3 },
        { type: 'actor', name: this.actor4 },
        { type: 'director', name: this.director },
        { type: 'director', name: this.coDirector },
      ].filter(person => person.name !== '');

      const res = await this.createPost(this.data);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Success!',
        });

        setTimeout(() => {
          return this.$router.push({
            path: ROUTES.MOVIE_REVIEWS(res.data._id),
          });
        }, 1000);
      }
      if (res.status === 400) {
        this.$notify({
          type: 'error',
          title: 'Error!',
          text: res.message,
        });
      }
    },
  },
  created() {
    this.APIS = APIS;
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
.signature {
  font-family: 'Great Vibes', cursive;
  font-size: 28px;
}
</style>
