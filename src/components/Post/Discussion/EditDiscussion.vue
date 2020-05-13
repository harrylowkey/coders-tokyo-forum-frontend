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
                <v-card class="d-flex py-3">
                  <div
                    style="flex: 26%"
                    class="d-flex flex-column align-center"
                  >
                    <user-avatar
                      :src="
                        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'
                      "
                      :username="user.username"
                      style="height: 150px;"
                    />
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
                  <div style="flex:80%">
                    <v-card-title class="pb-0">
                      <span class="headline">Make a discussion</span>
                    </v-card-title>
                    <v-card-text class="pb-0">
                      <v-container class="py-0">
                        <v-row>
                          <v-col cols="12">
                            <ValidationProvider
                              name="Topic"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                label="Topic*"
                                :value="post.topic"
                                @change="dataUpdate.topic = post.topic"
                                :error-messages="errors"
                                required
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider
                              name="Content"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-textarea
                                :error-messages="errors"
                                :value="post.content"
                                @change="dataUpdate.content = post.content"
                                label="Content*"
                                auto-grow
                                rows="4"
                                required
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="pt-0">
                      <v-spacer />
                      <v-btn @click="submit" class="mr-5" color="warning" dark>
                        Update
                      </v-btn>
                    </v-card-actions>
                  </div>
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
import VueUploadMultipleImage from 'vue-upload-multiple-image';
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
    // eslint-disable-next-line vue/no-unused-components
    myUpload,
    ToggleTag,
    // eslint-disable-next-line vue/no-unused-components
    VueUploadMultipleImage,
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
        _id: '5e9494fe935dfb5ed3043975',
        tags: [
          {
            _id: '5e931565701c6a1f851074ec',
            tagName: 'javascript',
          },
          {
            _id: '5e931565701c6a1f851074ec',
            tagName: 'javascript',
          },
        ],
        comments: [
          {
            _id: '5ea04ece861ec016ab4e7280',
            childComments: [
              {
                _id: '5ea08f6d14328169d8422a42',
                content:
                  '#reply thread \n\nWhy Markdown?\n [Marked] lets you convert [Markdown] into HTML\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n',
                user: {
                  _id: '5e8b577f1a2dde32298795f4',
                  username: 'hongquang',
                  job: 'developer',
                },
                parentId: '5ea08ee8467cac6969fe223d',
                replyToComment: {
                  _id: '5ea04ece861ec016ab4e7280',
                  user: {
                    _id: '5e8b577f1a2dde32298795f4',
                    username: 'nhat_anh',
                  },
                },
                createdAt: '2020-04-22T18:39:41.982Z',
              },
              {
                _id: '5ea08f6073749769b53fd952',
                content: 'reply thread',
                user: {
                  _id: '5e8b577f1a2dde32298795f4',
                  username: 'hongquang',
                  job: 'developer',
                },
                parentId: '5ea08ee8467cac6969fe223d',
                replyToComment: {
                  _id: '5ea04ece861ec016ab4e7280',
                  user: {
                    _id: '5e8b577f1a2dde32298795f4',
                    username: 'nhat_anh',
                  },
                },
                createdAt: '2020-04-22T18:39:28.963Z',
              },
              {
                _id: '5ea08f0a467cac6969fe223f',
                content: 'replycomment',
                user: {
                  _id: '5e8b577f1a2dde32298795f4',
                  username: 'thanh_ton',
                  job: 'developer',
                },
                parentId: '5ea08ee8467cac6969fe223d',
                replyToComment: {
                  _id: '5ea08f6073749769b53fd952',
                  user: {
                    _id: '5e8b577f1a2dde32298795f4',
                    username: 'hongquang',
                  },
                },
                createdAt: '2020-04-22T18:38:02.161Z',
              },
              {
                _id: '5ea08efc467cac6969fe223e',
                content: 'replycomment',
                user: {
                  _id: '5e8b577f1a2dde32298795f4',
                  username: 'hongquang',
                  job: 'developer',
                },
                parentId: '5ea08ee8467cac6969fe223d',
                replyToComment: {
                  _id: '5ea08ee8467cac6969fe223d',
                  user: {
                    _id: '5e8b577f1a2dde32298795f4',
                    username: 'hongquang',
                  },
                },
                createdAt: '2020-04-22T18:37:48.322Z',
              },
              {
                _id: '5ea08f6d14328169d8422a42',
                content: 'reply thread',
                user: {
                  _id: '5e8b577f1a2dde32298795f4',
                  username: 'hongquang',
                  job: 'dev',
                },
                parentId: '5ea08ee8467cac6969fe223d',
                replyToComment: {
                  _id: '5ea08f0a467cac6969fe223f',
                  user: {
                    _id: '5e8b577f1a2dde32298795f4',
                    username: 'hongquang',
                  },
                },
                createdAt: '2020-04-22T18:39:41.982Z',
              },
              {
                _id: '5ea08f6073749769b53fd952',
                content: 'reply thread',
                user: {
                  _id: '5e8b577f1a2dde32298795f4',
                  username: 'hongquang',
                  job: 'developer',
                },
                parentId: '5ea08ee8467cac6969fe223d',
                replyToComment: {
                  _id: '5ea08f0a467cac6969fe223f',
                  user: {
                    _id: '5e8b577f1a2dde32298795f4',
                    username: 'hongquang',
                  },
                },
                createdAt: '2020-04-22T18:39:28.963Z',
              },
              {
                _id: '5ea08f0a467cac6969fe223f',
                content: 'replycomment',
                user: {
                  _id: '5e8b577f1a2dde32298795f4',
                  username: 'hongquang',
                  job: 'developer',
                },
                parentId: '5ea08ee8467cac6969fe223d',
                replyToComment: {
                  _id: '5ea08ee8467cac6969fe223d',
                  user: {
                    _id: '5e8b577f1a2dde32298795f4',
                    username: 'hongquang',
                  },
                },
                createdAt: '2020-04-22T18:38:02.161Z',
              },
              {
                _id: '5ea08efc467cac6969fe223e',
                content: 'replycomment',
                user: {
                  _id: '5e8b577f1a2dde32298795f4',
                  username: 'hongquang',
                  job: 'developer',
                },
                parentId: '5ea08ee8467cac6969fe223d',
                replyToComment: {
                  _id: '5ea08ee8467cac6969fe223d',
                  user: {
                    _id: '5e8b577f1a2dde32298795f4',
                    username: 'hongquang',
                  },
                },
                createdAt: '2020-04-22T18:37:48.322Z',
              },
            ],
            postId: '5e9ecbe865e89626b7a4fd27',
            content:
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A eveniet nisi atque suscipit, magni quia placeat eaque, quisquam eos dolores voluptatibus, quasi pariatur expedita minima quidem quibusdam odio. Iure, esse.',
            user: {
              _id: '5e8b577f1a2dde32298795f4',
              username: 'nhat_anh',
              job: 'Developer',
            },
            parentId: null,
            createdAt: '2020-04-22T14:03:58.083Z',
            updatedAt: '2020-04-22T14:21:50.493Z',
          },
          {
            _id: '5ea04eca861ec016ab4e727f',
            childComments: [],
            postId: '5e9ecbe865e89626b7a4fd27',
            content: 'comment2',
            user: {
              _id: '5e8b577f1a2dde32298795f4',
              username: 'thanh_ton',
              job: 'Developer',
            },
            parentId: null,
            createdAt: '2020-04-22T14:03:54.429Z',
            updatedAt: '2020-04-22T14:03:54.429Z',
          },
          {
            _id: '5ea04ec4861ec016ab4e727e',
            childComments: [],
            postId: '5e9ecbe865e89626b7a4fd27',
            content: 'comment1',
            user: {
              _id: '5e8b577f1a2dde32298795f4',
              username: 'thanh_ton',
              job: 'Developer',
            },
            parentId: null,
            createdAt: '2020-04-22T14:03:48.372Z',
            updatedAt: '2020-04-22T14:03:48.372Z',
          },
        ],
        likes: [],
        savedBy: ['5e8b577f1a2dde32298795f4'],
        user: {
          _id: '5e8b577f1a2dde32298795f4',
          username: 'kenviruss',
        },
        topic: 'How can I remove an image in a folder on cloudinary in Nodejs?',
        content:
          'I have tried this way but the result still the same, anyone help me with this problem? Here is my code. I have tried this way but the result still the same, anyone help me with this problem? Here is my code...I have tried this way but the result still the same, anyone help me with this problem? Here is my code...',
        type: 'discussion',
        createdAt: '2020-04-13T16:36:14.767Z',
        updatedAt: '2020-04-13T16:46:02.835Z',
        metadata: {
          _id: '5e9494fe935dfb5ed3043971',
          comments: 256,
          likes: 500,
          saves: 1,
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
  },
  methods: {
    handleAddTag(tag) {
      this.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.tags.splice(tagIndex, 1);
    },
    submit() {
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
