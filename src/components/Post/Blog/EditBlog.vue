<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner></app-banner>
    <v-divider></v-divider>
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
            <app-alert v-if="alert" :alertMessage="alertMessage"></app-alert>
            <ValidationObserver ref="observer">
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
                    <v-col cols="12" class="pb-0 pt-0 px-6" style="height: 60px;">
                      <div class="d-flex ml-7">
                        <div class="d-flex"></div>
                        <toggle-tag
                          v-for="(tag, i) in tags"
                          :key="i"
                          :tagName="tag"
                          @handleRemoveTag="handleRemoveTag(i)"
                        ></toggle-tag>
                        <create-tag-blog
                          v-if="tags.length < 3"
                          @handleAddTag="handleAddTag"
                          :tags="tags"
                        ></create-tag-blog>
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
                                <v-container
                                  class="d-flex justify-center"
                                  v-if="post.cover.secureURL"
                                  style="postition: relative"
                                >
                                  <v-img
                                    max-width="650"
                                    max-height="250"
                                    :src="post.cover.secureURL"
                                  ></v-img>
                                  <v-chip
                                    @click="uploadBanner = !uploadBanner"
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
                                    :change="dataUpdate.topic = post.topic"
                                    :error-messages="errors"
                                    label="Topic*"
                                    required
                                  ></v-text-field>
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Description"
                                  persistent-hint
                                  rows="3"
                                  v-model="post.description"
                                  @change="dataUpdate.description = post.description"
                                  hint="Write description to attract people at the first glance"
                                ></v-text-field>
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
                                    @change="dataUpdate.content = post.content"
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
                                      v-html="$options.filters.markdown(post.content || '')"
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
import UserAvatar from "@/components/Shared/UserAvatar";
import myUpload from "vue-image-crop-upload";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import { updateBanner } from "@/mixins/updateBanner";
import CreateTag from "@/components/Shared/CreateTag";
import { extend, setInteractionMode } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import ToggleTag from "@/components/Shared/ToggleTag";
import CreateTagBlog from "@/components/Shared/CreateTagBlog";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required"
});

export default {
  mixins: [updateBanner],
  components: {
    CreateTagBlog,
    UserAvatar,
    CreateTag,
    myUpload,
    ToggleTag,
    VueUploadMultipleImage
  },
  data() {
    return {
      alert: false,
      alertMessage: "",
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
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      post: {
        _id: "5e9ab00f0591fb40fc87faa2",
        tags: [
          {
            _id: "5e8ddf319ac8ee2dd68b1cd7",
            tagName: "coercion"
          },
          {
            _id: "5e8cb5562ded8236f29fc885",
            tagName: "nhatanh"
          }
        ],
        comments: [
          {
            _id: "5ea04ece861ec016ab4e7280",
            childComments: [
              {
                _id: "5ea08f6d14328169d8422a42",
                content:
                  "#reply thread \n\nWhy Markdown?\n [Marked] lets you convert [Markdown] into HTML\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea04ece861ec016ab4e7280",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "nhat_anh"
                  }
                },
                createdAt: "2020-04-22T18:39:41.982Z"
              },
              {
                _id: "5ea08f6073749769b53fd952",
                content: "reply thread",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea04ece861ec016ab4e7280",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "nhat_anh"
                  }
                },
                createdAt: "2020-04-22T18:39:28.963Z"
              },
              {
                _id: "5ea08f0a467cac6969fe223f",
                content: "replycomment",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "thanh_ton",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08f6073749769b53fd952",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:38:02.161Z"
              },
              {
                _id: "5ea08efc467cac6969fe223e",
                content: "replycomment",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08ee8467cac6969fe223d",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:37:48.322Z"
              },
              {
                _id: "5ea08f6d14328169d8422a42",
                content: "reply thread",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "dev"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08f0a467cac6969fe223f",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:39:41.982Z"
              },
              {
                _id: "5ea08f6073749769b53fd952",
                content: "reply thread",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08f0a467cac6969fe223f",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:39:28.963Z"
              },
              {
                _id: "5ea08f0a467cac6969fe223f",
                content: "replycomment",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08ee8467cac6969fe223d",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:38:02.161Z"
              },
              {
                _id: "5ea08efc467cac6969fe223e",
                content: "replycomment",
                user: {
                  _id: "5e8b577f1a2dde32298795f4",
                  username: "hongquang",
                  job: "developer"
                },
                parentId: "5ea08ee8467cac6969fe223d",
                replyToComment: {
                  _id: "5ea08ee8467cac6969fe223d",
                  user: {
                    _id: "5e8b577f1a2dde32298795f4",
                    username: "hongquang"
                  }
                },
                createdAt: "2020-04-22T18:37:48.322Z"
              }
            ],
            postId: "5e9ecbe865e89626b7a4fd27",
            content:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A eveniet nisi atque suscipit, magni quia placeat eaque, quisquam eos dolores voluptatibus, quasi pariatur expedita minima quidem quibusdam odio. Iure, esse.",
            user: {
              _id: "5e8b577f1a2dde32298795f4",
              username: "nhat_anh",
              job: "Developer"
            },
            parentId: null,
            createdAt: "2020-04-22T14:03:58.083Z",
            updatedAt: "2020-04-22T14:21:50.493Z"
          },
          {
            _id: "5ea04eca861ec016ab4e727f",
            childComments: [],
            postId: "5e9ecbe865e89626b7a4fd27",
            content: "comment2",
            user: {
              _id: "5e8b577f1a2dde32298795f4",
              username: "thanh_ton",
              job: "Developer"
            },
            parentId: null,
            createdAt: "2020-04-22T14:03:54.429Z",
            updatedAt: "2020-04-22T14:03:54.429Z"
          },
          {
            _id: "5ea04ec4861ec016ab4e727e",
            childComments: [],
            postId: "5e9ecbe865e89626b7a4fd27",
            content: "comment1",
            user: {
              _id: "5e8b577f1a2dde32298795f4",
              username: "thanh_ton",
              job: "Developer"
            },
            parentId: null,
            createdAt: "2020-04-22T14:03:48.372Z",
            updatedAt: "2020-04-22T14:03:48.372Z"
          }
        ],
        likes: [],
        savedBy: [],
        user: {
          _id: "5e8b577f1a2dde3229879524",
          username: "nhat_anh",
          job: "Developer"
        },
        topic: "Bạn chưa hiểu JavaScript đâu kỳ 2 - Coercion",
        description:
          "Tại sao mọi người lại  thích rời khỏi nhà và vác ba lô đi khắp thế giới đến như vậy ? Lý do thì muôn trùng không thể đếm xuể. Đôi khi lý do cũng rất khác biệt. Nhưng hãy xem 10 lý do mà tôi liệt kê dưới đây,để xem cái nào đúng nhất với bạn nhé.",
        content:
          "[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\nHow To Use The Demo\n-------------------\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n",
        type: "blog",
        cover: {
          _id: "5e9ab00f0591fb40fc87faa3",
          secureURL:
            "https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png",
          publicId: "Coders-Tokyo-Forum/posts/javascript.png",
          fileName: "javascript.png",
          sizeBytes: 316358,
          userId: "5e8b577f1a2dde32298795f4",
          postId: "5e9ab00f0591fb40fc87faa2",
          resourceType: "image",
          createdAt: "2020-04-18T07:45:19.838Z",
          updatedAt: "2020-04-18T07:45:19.838Z",
          __v: 0
        },
        createdAt: "2020-04-18T07:45:19.846Z",
        updatedAt: "2020-04-18T07:45:19.846Z",
        metadata: {
          likes: 0,
          comments: 6,
          saves: 0,
          comment: {
            page: 1,
            pageSize: 5,
            totalPage: 2,
            totalRecords: 6
          }
        }
      },
      tags: [],
      dataUpdate: {},
      isPreviewing: false
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
    togglePreviewContent() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.post.content.trim() !== "") {
        return (this.isPreviewing = true);
      }
    },
    submit() {
      this.dataUpdate.tags = this.tags;
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

.update-banner-btn {
  position: absolute;
  top: 17.4%;
  opacity: 0.9;
}

.update-banner-btn:hover {
  opacity: 1
}
</style>