<template>
  <ValidationObserver ref="observer">
    <v-form>
      <v-card class="d-flex py-3">
        <div style="flex: 26%" class="d-flex flex-column align-center">
          <user-avatar
            :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
            :username="user.username"
            style="height: 150px;"
          ></user-avatar>
          <toggle-tag
            v-for="(tag, i) in data.tags"
            :key="i"
            :tagName="tag"
            @handleRemoveTag="handleRemoveTag(i)"
          ></toggle-tag>
          <create-tag v-if="data.tags.length < 3" @handleAddTag="handleAddTag" :tags="data.tags"></create-tag>
        </div>
        <div style="flex:80%">
          <v-card-title class="pb-0">
            <span class="headline">Make a discussion</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <ValidationProvider name="Topic" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Topic*"
                      v-model="data.topic"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider name="Content" rules="required" v-slot="{ errors }">
                    <v-textarea
                      :error-messages="errors"
                      v-model="data.content"
                      label="Content*"
                      auto-grow
                      rows="4"
                      required
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn @click="submit" class="mr-5" color="green" dark>Post</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import UserAvatar from "@/components/Shared/UserAvatar";
import CreateTag from "@/components/Shared/CreateTag";
import { extend, setInteractionMode } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import ToggleTag from '@/components/Shared/ToggleTag'
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required"
});
export default {
  components: {
    UserAvatar,
    CreateTag,
    ToggleTag
  },
  data() {
    return {
      user: {
        username: "hong_quang"
      },
      data: {
        topic: "",
        content: "",
        tags: []
      }
    };
  },
  methods: {
    handleAddTag(tag) {
      this.data.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.data.tags.splice(tagIndex, 1)
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return
      
    }
  }
};
</script>

<style scoped>
</style>