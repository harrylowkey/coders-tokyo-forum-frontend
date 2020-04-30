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
        <v-chip
          v-if="tags.length < 3"
          @click="addTag = !addTag"
          style="cursor: pointer"
          class="ma-2"
          color="#e57373"
          label
          text-color="white"
        >
          <v-icon left>mdi-plus-circle-outline</v-icon>Tags
        </v-chip>
        <v-card v-if="!!addTag" elevation="5" class="add-tag-dialog">
          <v-text-field
            style="padding 0 15px"
            v-model="tag"
            required
            @keyup.enter.native="handleAddTag(tag)"
            :rules="tagRules"
            lazy-validation
            placeholder="#"
          ></v-text-field>
        </v-card>
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
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      user: {
        username: "hong_quang"
      },
      addTag: false,
      tag: "",
      tagRules: [
        t => t[0] === "#" || "Hash tag at a first character is required",
        t => t.length <= 20 || "Tag muse be less than 20 characters"
      ],
      tags: []
    };
  },
  methods: {
    handleAddTag(tag) {
      this.addTag = !this.addTag
      this.tags.push(tag)
      this.tag = ''
    }
  }
};
</script>

<style scoped lang="scss">
.add-tag-dialog {
  width: 120px !important;
  border-radius: 4px;
  margin: 10px 24px !important;
  overflow-y: auto;
  pointer-events: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  z-index: inherit;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}

.v-input__slot {
}

.v-text-field {
  padding: 0 15px;
}
</style>