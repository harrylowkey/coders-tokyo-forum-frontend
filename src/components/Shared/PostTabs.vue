<template>
  <v-container style="padding: 0 !important">
    <v-card color="basil">
      <v-tabs v-model="tab" grow>
        <v-tab 
          v-for="page in pages" 
          :key="page"
          @click="setActivePage(page)"
        >{{ page }}
        </v-tab>
      </v-tabs>

    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
      pages: ["Discussions", "Blogs", "Reviews", "Audios", "Videos"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {
    setActivePage(page) {
      console.log('page', page)
      return this.$emit('setActivePage', { page })
    }
  }
};
</script>

<style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>