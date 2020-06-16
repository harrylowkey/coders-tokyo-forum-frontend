<template>
  <div
    class="fb-share-button"
    :data-href="`http://34.87.169.3/${url}`"
    data-layout="box_count"
    data-size="small"
  >
    <a
      target="_blank"
      href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
      class="fb-xfbml-parse-ignore"
    >Share</a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log('url&&&&&&&', this.url);
  },
};
</script>

<style></style>
