<template>
  <v-row class="d-flex justify-center flex-wrap">
    <template v-for="(item, i) in items">
      <v-col :key="i" cols="12" md="3" style="max-width: 21%">
        <Audio
          :cover="item.cover" 
          :title="item.title" 
          :text="item.text" 
          :subtext="item.subtext"
        ></Audio>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import Audio from "./Audio.vue";
export default {
  data() {
    return {
      items: [
        {
          title: "Rock",
          text: "Greatest Rock Hits",
          subtext: "Lose yourself in rock tunes.",
          cover:
            "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
        },
        {
          title: "Mellow Moods",
          text: "Ambient Bass",
          subtext: "Chill beats to mellow you out.",
          cover:
            "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        },
        {
          title: "Rock",
          text: "Greatest Rock Hits",
          subtext: "Lose yourself in rock tunes.",
          cover:
            "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        },
        {
          title: "Rock",
          text: "Greatest Rock Hits",
          subtext: "Lose yourself in rock tunes.",
          cover:
            "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        }
      ],
      transparent: "rgba(255, 255, 255, 0)"
    };
  },

  components: {
    Audio
  }
};
</script>

<style scoped >
</style>