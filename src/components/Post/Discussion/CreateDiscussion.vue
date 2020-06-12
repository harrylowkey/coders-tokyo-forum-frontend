<template>
  <ValidationObserver ref="observer">
    <v-form>
      <v-card class="d-flex py-3">
        <div style="flex: 26%" class="d-flex flex-column align-center">
          <user-avatar
            :src="user.avatar.secureURL"
            :username="user.username"
            style="height: 150px;"
          />
          <toggle-tag
            v-for="(tag, i) in data.tags"
            :key="i"
            :tagName="tag"
            @handleRemoveTag="handleRemoveTag(i)"
          />
          <create-tag
            v-if="data.tags.length < 3"
            @handleAddTag="handleAddTag"
            :tags="data.tags"
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
                      @keyup.enter="submit"
                      label="Topic*"
                      v-model="data.topic"
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
                      @keyup.enter="submit"
                      :error-messages="errors"
                      v-model="data.content"
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
            <v-btn @click="submit" class="mr-5 white--text" color="green">
              Post
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { ROUTES } from '@/mixins/routes';
import { createPost } from '@/mixins/createPost';

export default {
  mixins: [createPost],
  components: {},
  data() {
    return {
      data: {
        topic: '',
        content: '',
        tags: [],
        type: 'discussions',
      },
    };
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      this.data.content = this.sanitizeContent(this.data.content);
      const res = await this.createPost(this.data);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Success!',
        });
        setTimeout(() => {
          return this.$router.push({ path: ROUTES.DISCUSSION(res.data._id) });
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
  computed: {},
  watch: {},
};
</script>

<style scoped></style>
