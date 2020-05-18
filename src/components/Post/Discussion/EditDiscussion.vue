<template>
  <v-container fluid style="padding: 0 !important">
    <app-banner />
    <v-divider />
    <br />
    <v-container color="dark" v-if="!isLoading">
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
          <div class="pt-6">
            <ValidationObserver ref="observer">
              <v-form>
                <v-card class="d-flex py-3">
                  <div
                    style="flex: 26%"
                    class="d-flex flex-column align-center"
                  >
                    <user-avatar
                      :src="post.user.avatar.secureURL"
                      :username="post.user.username"
                      style="height: 150px;"
                    />
                    <toggle-tag
                      v-for="(tag, i) in post.tags"
                      :key="i"
                      :tagName="tag"
                      @handleRemoveTag="handleRemoveTag(i)"
                    />
                    <create-tag
                      v-if="post.tags.length < 3"
                      @handleAddTag="handleAddTag"
                      :tags="post.tags"
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
                                v-model="post.topic"
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
                                v-model="post.content"
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
import { mapState, mapActions } from 'vuex';
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
    ToggleTag,
  },
  data() {
    return {
      post: null,
    };
  },
  computed: {
    ...mapState('utils', ['isLoading', 'errorMes']),
  },
  async created() {
    await this.fetchPost();
  },
  methods: {
    ...mapActions('post', ['getPostById', 'editPost']),
    async fetchPost() {
      this.getPostById({
        id: this.$route.params.id,
        typeQuery: this.$route.query.type,
      }).then(data => {
        this.post = data;
        this.post.tags = this.post.tags.map(tag => tag.tagName);
      });
    },
    handleAddTag(tag) {
      this.post.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.post.tags.splice(tagIndex, 1);
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      const dataUpdate = {
        topic: this.post.topic,
        content: this.post.content,
        tags: this.post.tags,
        type: this.post.type,
      };

      const res = await this.editPost({ _id: this.post._id, data: dataUpdate });
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Update success',
        });

        return this.$router.push({
          path: `/${this.post.type}s/${this.post._id}?type=${this.post.type}`,
        });
      }
      if (res.status === 400) {
        this.$notify({
          type: 'error',
          title: 'Failed',
          text: res.message,
        });
      }
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
