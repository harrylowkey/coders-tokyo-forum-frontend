<template>
  <span class="caption text-center" id="tag">
    <a :href="ROUTES.SEARCH_TAG({ tagName, postType })" id="tag-link">
      {{ tagName }}
    </a>
  </span>
</template>

<script>
import { ROUTES } from '@/mixins/routes';

export default {
  props: {
    tagName: String,
    customize: {
      type: Object,
      default: () => ({}),
    },
    postType: String,
  },
  created() {
    this.ROUTES = ROUTES;
    if (this.customize) {
      this.tagStyle = {
        ...this.tagStyle,
        ...this.customize,
      };
    }
  },
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
