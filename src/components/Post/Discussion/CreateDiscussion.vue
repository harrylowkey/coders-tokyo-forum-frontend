<template>
  <v-form>
    <v-card class="d-flex py-3">
      <div style="flex: 30%" class="d-flex flex-column align-center">
        <user-avatar
          :src="'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png'"
          :username="user.username"
          style="height: 150px;"
        ></user-avatar>

        <v-chip
          style="cursor: pointer"
          class="ma-2"
          color="#e57373"
          label
          text-color="white"
          v-for="(tag, i) in tags"
          :key="i"
        >
         {{ tag }}
        </v-chip>

        <create-tag
          v-if="tags.length < 3"
          @handleAddTag="handleAddTag"
          :tags="tags"
        ></create-tag>

      </div>
      <div>
        <v-card-title class="pb-0">
          <span class="headline">Make a discussion</span>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12">
                <v-text-field label="Topic*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  persistent-hint
                  rows="2"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Content*" auto-grow rows="4" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn class="mr-5" color="green" dark>Post</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import UserAvatar from "@/components/Shared/UserAvatar";
import CreateTag from '@/components/Shared/CreateTag'
export default {
  components: {
    UserAvatar,
    CreateTag
  },
  data() {
    return {
      user: {
        username: "hong_quang"
      },
      tags: []
    };
  },
  methods: {
    handleAddTag(tag) {
      this.tags.push(tag)
    }
  }
};
</script>

<style >

</style>