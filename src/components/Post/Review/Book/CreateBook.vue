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
                {{ $t('Cover image') }}
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
                        :langExt="langExtVN"
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
                    <v-col cols="12" sm="8" md="8">
                      <ValidationProvider
                        name="Book name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="data.book.name"
                          :label="$t('Book name*')"
                          required
                          :error-messages="$t(errors)"
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <ValidationProvider
                        :label="$t('Status')"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="data.book.status"
                          :error-messages="$t(errors)"
                          label="Status"
                          :hint="$t('E.g: Finished or 15/34 Chapters')"
                          required
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div class="d-flex align-end">
                        <ValidationProvider
                          :label="$t('Author')"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            required
                            v-model="author"
                            label="Author"
                            :error-messages="$t(errors)"
                          />
                        </ValidationProvider>
                        <span class="pb-4 pl-3" v-if="!addCoAuthor">
                          <v-icon
                            @click="addCoAuthor = !addCoAuthor"
                            color="green"
                            style="cursor: pointer"
                          >
                            mdi-plus-circle-outline
                          </v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="addCoAuthor">
                          <v-icon
                            @click="handleRemoveCoAuthor"
                            color="warning"
                            style="cursor: pointer"
                          >
                            mdi-close-circle-outline
                          </v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="addCoAuthor">
                      <div class="d-flex align-end">
                        <ValidationProvider
                          name="Name"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :error-messages="$t(errors)"
                            v-model="coAuthor"
                            :label="$t('Co - Author')"
                          />
                        </ValidationProvider>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <div class="d-flex align-end">
                        <v-text-field
                          v-model="recommender"
                          :label="$t('Recommender')"
                        />
                        <span class="pb-4 pl-3" v-if="!addRecomender2">
                          <v-icon
                            @click="addRecomender2 = !addRecomender2"
                            color="green"
                            style="cursor: pointer"
                          >
                            mdi-plus-circle-outline
                          </v-icon>
                        </span>
                        <span class="pb-4 pl-3" v-if="addRecomender2">
                          <v-icon
                            @click="handleRemoveRecommender2"
                            color="warning"
                            style="cursor: pointer"
                          >
                            mdi-close-circle-outline
                          </v-icon>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-if="addRecomender2">
                      <div class="d-flex align-end">
                        <v-text-field
                          v-model="recommender2"
                          :label="$t('Recommender')"
                        />
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="data.book.country"
                        :label="$t('Nation')"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="data.book.length"
                        :hint="$t('E.g: 200 pages')"
                        label="Length"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="5">
                      <v-container class="d-flex pl-0 pr-0 mt-2">
                        <span
                          style="font-size: 17px; color: rgba(0, 0, 0, 0.57);"
                          class="mb-0 pt-1 pr-5"
                        >
                          {{ $t('Stars') }}
                        </span>
                        <v-rating
                          v-model="data.book.stars"
                          color="yellow darken-3"
                          background-color="grey darken-1"
                          empty-icon="$ratingFull"
                          hover
                          small
                        />
                      </v-container>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        :items="genresVN"
                        :label="$t('Genres')"
                        v-model="data.book.genres"
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
                          v-model="data.topic"
                          required
                          :error-messages="$t(errors)"
                          :label="$t('Topic*')"
                          persistent-hint
                          rows="2"
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        :label="$t('Description')"
                        persistent-hint
                        rows="3"
                        v-model="data.description"
                        :hint="
                          $t(
                            'Write description to attract people at the first glance',
                          )
                        "
                      />
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        name="Content"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-textarea
                          :label="$t('Content*')"
                          v-model="data.content"
                          :rows="getNumberOfLines(data.content, 15) || 15"
                          required
                          :error-messages="$t(errors)"
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
                              $options.filters.markdown(
                                sanitizeContent(data.content) || '',
                              )
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
                  {{ $t('Attach image') }}
                </v-chip>
                <v-spacer />
                <v-btn
                  class="mr-5"
                  color="primary"
                  @click="togglePreviewContent"
                  dark
                >
                  {{ $t('Preview') }}
                </v-btn>
                <v-btn
                  class="mr-5"
                  color="green white--text"
                  @click="submit"
                  :disabled="isLoadingUpload"
                >
                  {{ $t('Post') }}
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
      data: {
        tags: [],
        book: {
          name: '',
          status: 'Finished',
          country: '',
          length: 0,
          genres: [],
          suggestedBy: [],
          stars: 5,
        },
        authors: [],
        topic: '',
        description: '',
        content: '',
        type: 'books',
        cover: '',
      },
      author: '',
      coAuthor: '',
      recommender: '',
      recommender2: '',
      addCoAuthor: false,
      addRecomender2: false,
      isUploadBanner: false,
      imgDataUrl: '',
      isPreviewing: false,
      genres: [
        'Fiction',
        'Science',
        'Fantasy',
        'Thriller',
        'Poetry',
        'Novel',
        'Literary',
        'Deactive',
        'Action',
        'Improve-self',
      ],
      genresVN: [
        'Viễn tưởng',
        'Khoa học',
        'Thần thoại',
        'Kinh dị',
        'Thơ ca',
        'Tiểu thuyết',
        'Văn học',
        'Trinh thám',
        'Hành động',
        'Phát triển bản thân',
      ],
    };
  },
  computed: {},
  methods: {
    handleRemoveCoAuthor() {
      this.addCoAuthor = !this.addCoAuthor;
      this.coAuthor = '';
    },
    handleRemoveRecommender2() {
      this.addRecomender2 = !this.addRecomender2;
      this.recommender2 = 0;
    },
    async submit() {
      if (this.data.cover === '') {
        this.$notify({
          type: 'error',
          title: `${this.$t('notifications.title.Error')}!`,
          text: this.$t("Let's upload the cover"),
        });
        return;
      }
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      this.data.authors = [
        { type: 'author', name: this.author },
        { type: 'author', name: this.coAuthor },
      ].filter(author => author.name !== '');
      this.data.book.suggestedBy = [this.recommender, this.recommender2].filter(
        recommender => recommender !== '',
      );

      const res = await this.createPost(this.data);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: `${this.$t('notifications.title.Success')}!`,
        });
        setTimeout(() => {
          return this.$router.push({ path: ROUTES.BOOK_REVIEWS(res.data._id) });
        }, 1000);
      }
      if (res.status === 400) {
        this.$notify({
          type: 'error',
          title: `${this.$t('notifications.title.Error')}!`,
          text: this.$t(res.message),
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
