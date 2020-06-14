<template>
  <div class="markdown-content" v-html="$options.filters.markdown(content)" />
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.markdown-content >>> img {
  width: 100% !important;
}

::v-deep pre code:before {
  content: '' !important;
}

.markdown-content {
  line-height: 1.6;
}

::v-deep code:before {
  content: '' !important;
}

::v-deep code:after {
  content: '' !important;
}

::v-deep code {
  font-size: 13.5px !important;
  box-shadow: none;
  background-color: #fff;
}

::v-deep pre code {
  display: block;
  overflow-x: auto;
  padding: 1em;
  color: #abb2bf;
  background: #282c34;
  margin: 15px 0px;
}
</style>
