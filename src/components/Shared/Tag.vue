<template>
  <span 
    class="caption text-center" 
    id="tag" 
    :style="tagStyle"
    >
    <a href="#" id="tag-link">#{{ tagName }}</a>
  </span>
</template>

<script>
export default {
  props: {
    tagName: String,
    customize: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tagStyle: {
"background-color": '#ef9a9a',
        padding: "0 3px 0 3px",
        "margin-left": "7px",
        "border-radius": "4px"
      }
    };
  },
  created() {
    if (this.customize) {
      this.tagStyle = {
        ...this.tagStyle,
        ...this.customize
      }
    }
  }
};
</script>

<style>

#tag-link {
  text-decoration: none;
  color: #000;
}
</style>