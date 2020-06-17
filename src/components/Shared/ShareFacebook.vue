<template>
  <iframe
    class="pl-3"
    :src="
      `https://www.facebook.com/plugins/share_button.php?href=http://34.87.169.3/${url}&layout=box_count&size=small&appId=884850398690749&width=96&height=100`
    "
    width="96"
    height="100"
    style="border:none;overflow:hidden"
    scrolling="no"
    frameborder="0"
    allowtransparency="true"
    allow="encrypted-media"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
