<template>
  <span 
    class="caption text-center" 
    id="tag"
    style="background-color: #EF9A9A"
  >
    <a href="#" id="tag-link">#{{ tagName }}</a>
  </span>
</template>

<script>
export default {
  props: ['tagName']
}
</script>

<style>
  #tag {
    background-color: rgb(239, 154, 154);
    padding: 0 3px 0 3px;
    margin-left: 7px;
    border-radius: 6px;
  }

  #tag-link {
    text-decoration: none;
    color: #000
  }
</style>