<template>
  <v-form>
    <v-row>
      <v-col cols="12" sm="12" md="12" style="padding: 0;">
        <v-textarea @keyup.enter="handleUpdateDescription" auto-grow class="pt-0" v-model="editDescription"></v-textarea>
      </v-col>
      <v-card-actions class="pt-0">
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn @click="handleUpdateDescription" small color="success">Update</v-btn>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn @click="onCancel" dark small color="red">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["description"],
  data() {
    return {
      isEdit: false,
      editDescription: this.description
    };
  },
  methods: {
    ...mapActions("user", ["updateProfile"]),
    onCancel() {
      this.$emit("handleCancelEditDescription");
    },
    async handleUpdateDescription() {
      let res = await this.updateProfile({ description: this.editDescription });
      this.$emit("handleUpdateDescription", res.data);
    }
  }
};
</script>

<style>
</style>