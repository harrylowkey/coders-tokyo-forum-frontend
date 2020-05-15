<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark">
      <v-row>
        <v-col
          cols="12"
          sm="8"
          md="8"
          lg="8"
          xl="8"
          offset-sm="2"
          offset-md="2"
          offset-lg="2"
          offset-xl="2"
          class="pt-0"
        >
          <div class="pt-6">
            <app-alert v-if="alert" :alertMessage="alertMessage" />
            <ValidationObserver ref="observer">
              <v-form>
                <v-alert
                  v-if="alert"
                  id="alert"
                  type="warning"
                  border="left"
                  transition="slide-x-reverse-transition"
                  dismissible
                >
                  {{ alertMessage }}
                </v-alert>
                <v-card class="d-flex py-3 pt-0">
                  <v-row>
                    <v-col cols="4" offset-sm="4" class="py-1">
                      <div class="d-flex flex-column align-center">
                        <user-avatar
                          :src="
                            'https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png'
                          "
                          :username="user.username"
                          style="height: 130px;"
                        />
                      </div>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-container class="pt-0">
                        <v-card-text class="pb-0 pt-0 px-6">
                          <v-container class="py-0">
                            <v-row>
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
                                    />
                                  </v-col>
                                  <div
                                    style="flex: 26%"
                                    class="d-flex flex-column align-center"
                                  >
                                    <div
                                      v-if="!post.cover.secureURL"
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
                                        <v-icon left>
                                          mdi-cloud-upload-outline
                                        </v-icon>
                                        Image
                                      </v-chip>
                                    </div>
                                    <v-container
                                      class="d-flex justify-center"
                                      v-if="post.cover.secureURL"
                                      style="position: relative"
                                    >
                                      <v-img
                                        max-width="210"
                                        max-height="210"
                                        :src="bannerImage"
                                      />
                                      <v-chip
                                        @click="uploadBanner = !uploadBanner"
                                        text-color="#fff"
                                        class="upload-btn"
                                        color="green"
                                        label
                                      >
                                        <v-icon left>
                                          mdi-cloud-upload-outline
                                        </v-icon>
                                        Update
                                      </v-chip>
                                    </v-container>
                                    <div
                                      class="mt-10 d-flex justify-center align-center flex-column"
                                    >
                                      <toggle-tag
                                        v-for="(tag, i) in tags"
                                        :key="i"
                                        :tagName="tag"
                                        @handleRemoveTag="handleRemoveTag(i)"
                                      />

                                      <create-tag
                                        v-if="tags.length < 3"
                                        @handleAddTag="handleAddTag"
                                        :tags="tags"
                                      />
                                    </div>
                                  </div>
                                </v-col>
                                <v-col cols="12" sm="12" md="8" class="pt-0">
                                  <v-col cols="12" sm="12" md="12" class="pt-0">
                                    <ValidationProvider
                                      name="Song name"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        class="mt-0"
                                        :error-messages="errors"
                                        v-model="post.topic"
                                        @change="dataUpdate.topic = post.topic"
                                        label="Song name*"
                                        required
                                      />
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
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addComposer2"
                                        >
                                          <v-icon
                                            @click="
                                              addComposer2 = !addComposer2
                                            "
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addComposer2"
                                        >
                                          <v-icon
                                            @click="handleRemoveComposer(2)"
                                            color="warning"
                                            style="cursor: pointer"
                                          >
                                            mdi-close-circle-outline
                                          </v-icon>
                                        </span>
                                      </div>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="6"
                                      v-if="addComposer2"
                                      class
                                    >
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
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addComposer3"
                                        >
                                          <v-icon
                                            @click="
                                              addComposer3 = !addComposer3
                                            "
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addComposer3"
                                        >
                                          <v-icon
                                            @click="handleRemoveComposer(3)"
                                            color="warning"
                                            style="cursor: pointer"
                                          >
                                            mdi-close-circle-outline
                                          </v-icon>
                                        </span>
                                      </div>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="6"
                                      v-if="addComposer3"
                                      class
                                    >
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
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addComposer4"
                                        >
                                          <v-icon
                                            @click="
                                              addComposer4 = !addComposer4
                                            "
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addComposer4"
                                        >
                                          <v-icon
                                            @click="handleRemoveComposer(4)"
                                            color="warning"
                                            style="cursor: pointer"
                                          >
                                            mdi-close-circle-outline
                                          </v-icon>
                                        </span>
                                      </div>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="6"
                                      v-if="addComposer4"
                                    >
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
                                          />
                                        </ValidationProvider>
                                      </div>
                                    </v-col>
                                  </div>
                                  <div class="d-flex flex-wrap">
                                    <v-col cols="12" sm="6" md="6">
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Name"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            required
                                            v-model="artist"
                                            label="Artist"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addArtist2"
                                        >
                                          <v-icon
                                            @click="addArtist2 = !addArtist2"
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addArtist2"
                                        >
                                          <v-icon
                                            @click="handleRemoveArtist(2)"
                                            color="warning"
                                            style="cursor: pointer"
                                          >
                                            mdi-close-circle-outline
                                          </v-icon>
                                        </span>
                                      </div>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="6"
                                      v-if="addArtist2"
                                      class
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Name"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="artist2"
                                            label="Artist"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addArtist3"
                                        >
                                          <v-icon
                                            @click="addArtist3 = !addArtist3"
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addArtist3"
                                        >
                                          <v-icon
                                            @click="handleRemoveArtist(3)"
                                            color="warning"
                                            style="cursor: pointer"
                                          >
                                            mdi-close-circle-outline
                                          </v-icon>
                                        </span>
                                      </div>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="6"
                                      v-if="addArtist3"
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Name"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="artist3"
                                            label="Artist"
                                          />
                                        </ValidationProvider>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="!addArtist4"
                                        >
                                          <v-icon
                                            @click="addArtist4 = !addArtist4"
                                            color="green"
                                            style="cursor: pointer"
                                          >
                                            mdi-plus-circle-outline
                                          </v-icon>
                                        </span>
                                        <span
                                          class="pb-4 pl-3"
                                          v-if="addArtist4"
                                        >
                                          <v-icon
                                            @click="handleRemoveArtist(4)"
                                            color="warning"
                                            style="cursor: pointer"
                                          >
                                            mdi-close-circle-outline
                                          </v-icon>
                                        </span>
                                      </div>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="6"
                                      v-if="addArtist4"
                                    >
                                      <div class="d-flex align-end">
                                        <ValidationProvider
                                          name="Name"
                                          rules="required"
                                          v-slot="{ errors }"
                                        >
                                          <v-text-field
                                            :error-messages="errors"
                                            v-model="artist4"
                                            label="Artist"
                                          />
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
                                      v-model="post.content"
                                      @change="
                                        dataUpdate.content = post.content
                                      "
                                      placeholder="Markdown"
                                    />
                                  </v-col>
                                </v-col>
                              </v-row>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions class="pt-0">
                          <v-spacer />
                          <v-btn
                            class="mr-5"
                            color="warning"
                            dark
                            @click="submit"
                          >
                            Update
                          </v-btn>
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
import myUpload from 'vue-image-crop-upload';
import { extend, setInteractionMode } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

import { updateBanner } from '@/mixins/updateBanner';
import CreateTag from '@/components/Shared/CreateTag';
import UserAvatar from '@/components/Shared/UserAvatar';
import ToggleTag from '@/components/Shared/ToggleTag';

setInteractionMode('eager');
extend('required', {
  ...required,
  message: '{_field_} is required',
});

export default {
  mixins: [updateBanner],
  components: {
    UserAvatar,
    CreateTag,
    myUpload,
    ToggleTag,
  },
  data() {
    return {
      alert: false,
      alertMessage: '',
      user: {
        username: 'hong_quang',
      },
      tags: [],
      uploadBanner: false,
      params: {
        token: '123456798',
        name: 'avatar',
      },
      headers: {
        smail: '*_~',
      },
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
      uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
      post: {
        _id: '5e9920603c513c2611a9df88',
        tags: [
          {
            _id: '5e8c5f27abf7df7d3be426db',
            tagName: 'aucoustic',
          },
          {
            _id: '5e8c5f27abf7df7d3be426dc',
            tagName: 'tinh ca',
          },
        ],
        comments: [],
        authors: [
          {
            _id: '5e9920603c513c2611a9df89',
            type: 'artist',
            name: 'Chillies',
          },
          {
            _id: '5e9920603c513c26119df89',
            type: 'artist',
            name: 'ChilliesB',
          },
          {
            _id: '5e9920603c513c2611a9df89',
            type: 'composer',
            name: 'Chillies',
          },
          {
            _id: '5e9920603c513c26119df89',
            type: 'composer',
            name: 'ChilliesB',
          },
        ],
        likes: [],
        savedBy: [],
        userId: '5e8b577f1a2dde32298795f4',
        topic: ' Memories place',
        description: 'Rock Ballad',
        content:
          '\nLyrics :  \nAnh sẽ mang tên em vào trong mixtape  \nSau đêm nay chỉ mong em vui lên  \nI see you wanna be mah girl  \nVà nếu em là mãi mãi\n\nJust let me show you what love really do  \nHaving the best moment for me n you  \nSo what you say girl  \nWill you be my world ?  \nHold my hand and feel my love\n\nĐôi chân phiêu du anh đưa tay tới nơi phía chân trời  \nLặng nhìn bầu trời vàng trong hoàng hôn  \nCho nỗi nhớ em thêm đầy vơi  \nBaby tell me you feel the same  \nCause I wanna be your man  \nGive me one more chance  \nTo be with you again  \nI wanna see you on the night\n\nBae I wanna see you on the night  \nỞ một nơi có từng cơn sóng xô  \nNhẹ nhàng sâu lắng nghe từng âm thanh  \nCâu hát phiêu dạt về nơi xa  \nĐiệu nhạc tình với rượu vang trên tay  \nEm có biết đâu khi lòng ta say  \nI say Drink wit meh overnight  \nLê bước chân trên những con đường dài.\n\nTên của em nó nằm trong bảng chữ cái A B C  \nVà Mr Yanbi đã nhắc tên em ở trong một cái MP3  \nSẽ là một nơi em đến  \nBao nhiêu người xung quanh yêu mến  \nAnh thắp chút ánh nến hòa với đôi môi em ngọt như là bánh Cookie Cookie  \nChỉ cần có em bay theo điệu nhạc với một chiếc bút bi bút bi  \nAnh sẽ hát bài ca này trên Radio và TV  \nGhi dấu lại những dòng tâm tư và thu vào trong cái CD  \nLet me see you babe girl  \nEm đẹp xinh khiến anh ngẩn ngơ  \nMọi thứ cứ xảy ra như thế vì đâu ai ngờ  \nNgay bây giờ ngay từng nhịp điệu anh viết chắc em nghĩ anh là Florida  \nVì em đẹp hơn cả Nexttop Model  \nEm sẽ phải sống ra sao khi trong cơn say này xô bồ  \nKhi T-Akayz in da track  \nEm không yêu chỉ còn 1 cách  \nEm sẽ không thể quên được anh đâu  \nMây mưa trăng sao mình bên nhau  \nVà đêm từng đêm về  \nEm ơi không cần câu nệ  \nNow let me see ya overnight\n\nBae I wanna see you on the night  \nỞ một nơi có từng cơn sóng xô  \nNhẹ nhàng sâu lắng nghe từng âm thanh  \nCâu hát phiêu dạt về nơi xa  \nĐiệu nhạc tình với rượu vang trên tay  \nEm có biết đâu khi lòng ta say  \nI say Drink wit meh overnight  \nLê bước chân trên những con đường dài.',
        type: 'podcast',
        media: {
          _id: '5e99206e3c513c2611a9df8a',
          secureURL:
            'https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614.mp3',
          publicId:
            'Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614',
          fileName: 'hongquang_podcast_Vung Ky Uc - Chillies',
          sizeBytes: 4835851,
          userId: '5e8b577f1a2dde32298795f4',
          postId: '5e9920603c513c2611a9df88',
          resourceType: 'video',
          media: {
            type: 'upload',
            signature: 'b1cd21b54d3ac48aab7b3097fe59957cb525e614',
            width: 500,
            height: 500,
            format: 'mp3',
            resource_type: 'video',
            frame_rate: 90000,
            bit_rate: 129717,
            duration: 298.24,
          },
          createdAt: '2020-04-17T03:20:14.881Z',
          updatedAt: '2020-04-17T03:20:14.881Z',
          __v: 0,
        },
        podcast: {
          name: 'Memories place',
          artist: 'Chillies',
          url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
          cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
        },
        createdAt: '2020-04-17T03:20:14.886Z',
        updatedAt: '2020-04-17T03:20:14.886Z',
        metadata: {
          _id: '5e9494fe935dfb5ed30435',
          comments: 123,
          likes: 69,
          saves: 1,
        },
        cover: {
          _id: '5e9ab00f0591fb40fc87faa3',
          secureURL:
            'https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png',
          publicId: 'Coders-Tokyo-Forum/posts/javascript.png',
          fileName: 'javascript.png',
          sizeBytes: 316358,
          userId: '5e8b577f1a2dde32298795f4',
          postId: '5e9ab00f0591fb40fc87faa2',
          resourceType: 'image',
          createdAt: '2020-04-18T07:45:19.838Z',
          updatedAt: '2020-04-18T07:45:19.838Z',
          __v: 0,
        },
      },
      addArtist2: false,
      addArtist3: false,
      addArtist4: false,
      addComposer2: false,
      addComposer3: false,
      addComposer4: false,
      artist: '',
      artist2: '',
      artist3: '',
      artist4: '',
      composer: '',
      composer2: '',
      composer3: '',
      composer4: '',
      bannerImage: '',
      composers: [],
      singers: [],
      dataUpdate: {},
    };
  },
  computed: {},
  created() {
    this.tags = this.post.tags.map(tag => tag.tagName);
    this.bannerImage = this.post.cover.secureURL;
    const composers = this.post.authors.filter(
      person => person.type === 'composer',
    );
    this.composer = composers[0] ? composers[0].name : '';
    this.composer2 = composers[1] ? composers[1].name : '';
    this.composer3 = composers[2] ? composers[2].name : '';
    this.composer4 = composers[3] ? composers[3].name : '';
    this.addComposer2 = !!this.composer2;
    this.addComposer3 = !!this.composer3;
    this.addComposer4 = !!this.composer4;

    const singers = this.post.authors.filter(
      person => person.type === 'artist',
    );
    this.artist = singers[0] ? singers[0].name : '';
    this.artist2 = singers[1] ? singers[1].name : '';
    this.artist3 = singers[2] ? singers[2].name : '';
    this.artist4 = singers[3] ? singers[3].name : '';
    this.addArtist2 = !!this.artist2;
    this.addArtist3 = !!this.artist3;
    this.addArtist4 = !!this.artist4;
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
      this[`composer${index}`] = '';
    },
    handleRemoveArtist(index) {
      this[`addArtist${index}`] = !this[`addArtist${index}`];
      this[`artist${index}`] = '';
    },
    submit() {
      const authors = [
        { type: 'composer', name: this.composer },
        { type: 'composer', name: this.composer2 },
        { type: 'composer', name: this.composer3 },
        { type: 'composer', name: this.composer4 },
        { type: 'artist', name: this.artist },
        { type: 'artist', name: this.artist2 },
        { type: 'artist', name: this.artist3 },
        { type: 'artist', name: this.artist4 },
      ].filter(person => person.name !== '');

      this.dataUpdate.authors = authors;
      this.dataUpdate.tags = this.tags;
      this.$refs.observer.validate();
    },
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
