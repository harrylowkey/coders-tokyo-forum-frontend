<template>
  <div>
    <router-link class="edit-btn" :to="`/edit/${postType}/${postId}`">
      <v-btn class="mr-3" x-small color="info">Edit</v-btn>
    </router-link>
    <v-btn x-small color="error" @click="dialogDeletePost = true">Delete</v-btn>
    <v-dialog
      style="postition: relative; right: 150px;"
      v-model="dialogDeletePost"
      max-width="290"
      class="dialog-delete"
    >
      <v-card>
        <v-card-title class="headline">
          Are you sure to delete this blog?
        </v-card-title>
        <v-card-text>
          You can not restore it after deleting, so let's make sure before
          making your decision.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text small color="error" @click="onClickDelete">Delete</v-btn>
          <v-btn
            text
            small
            color="green"
            dark
            @click="dialogDeletePost = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
    postType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialogDeletePost: false,
    };
  },
  methods: {
    onClickEdit() {
      this.$emit('handleEditPost');
    },
    onClickDelete() {
      this.dialogDeletePost = false;
      this.$emit('handleDeletePost');
    },
  },
};
</script>

<style>
.edit-btn {
  text-decoration: none;
}
</style>
