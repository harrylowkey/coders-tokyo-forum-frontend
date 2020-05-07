<template>
  <span class="caption text-center" id="tag">
    <a :href="link" id="tag-link">{{ tagName }}</a>
  </span>
</template>

<script>
export default {
  props: {
    tagName: String,
    customize: {
      type: Object,
      default: () => ({})
    },
    postType: String
  },
  data() {
    return {
      link: ""
    };
  },
  created() {
    if (this.customize) {
      this.tagStyle = {
        ...this.tagStyle,
        ...this.customize
      };
    }
    this.link = `/posts?tag=${this.tagName}&type=${this.postType}`;
  }
};
</script>

<style>
#tag-link {
  text-decoration: none;
  color: #000;
}

#tag {
  background-color: #ef9a9a;
  padding: 0 3px 0 3px;
  margin-left: 7px;
  border-radius: 4px;
}

#tag:hover {
  background-color: #e57373;
  transition: ease 0.4s;
}
</style>