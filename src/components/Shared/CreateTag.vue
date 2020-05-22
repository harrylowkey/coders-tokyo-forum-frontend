<template>
  <div class="wrapper-create-tag">
    <v-chip
      v-if="tags.length < 3"
      @click="addTag = !addTag"
      style="cursor: pointer"
      class="ma-2"
      color="#e57373"
      label
      text-color="white"
    >
      <span v-if="!addTag">
        <v-icon left>mdi-plus-circle-outline</v-icon>
        Tags
      </span>
      <span v-else>
        <v-icon left>mdi-close-circle-outline</v-icon>
        Tags
      </span>
    </v-chip>
    <v-card v-if="!!addTag" elevation="5" class="add-tag-dialog">
      <v-text-field
        style="padding 0 15px"
        v-model="tag"
        required
        @keyup.enter.native="handleAddTag(tag)"
        :rules="tagRules"
        lazy-validation
        :value="tag"
      />
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      valid: true,
      addTag: false,
      tag: '',
      tagRules: [t => t.length <= 20 || 'Tag muse be less than 20 characters'],
    };
  },
  methods: {
    handleAddTag(tag) {
      if (tag.length > 20 || tag.trim() === '') return;
      if (tag.indexOf(' ') >= 0) {
        this.$notify({
          type: 'error',
          title: 'Use underscore instead of space',
        });
        return;
      }
      this.addTag = !this.addTag;
      this.tag = '';
      return this.$emit('handleAddTag', tag);
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper-create-tag {
  width: 140px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
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

.v-text-field {
  padding: 0 15px;
}
</style>
