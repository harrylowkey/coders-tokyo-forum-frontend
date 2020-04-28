<template>
  <v-container class="d-flex align-center justify-center flex-column">
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" :style="audioStyle">
        <v-img :src="cover" height="160px" width="160px" class="audio-cover">
          <v-card-title class="title white--text">
            <v-row class="fill-height flex-column" justify="space-between">
              <p style="font-size: 16px !important" class="mt-4 text-left ml-3">{{ title }}</p>
              <div>
                <p
                  style="font-size: 14px !important"
                  class="ma-0 body-1 font-weight-bold font-italic text-left"
                >{{ text }}</p>
                <p class="caption font-weight-medium font-italic text-left">{{ subtext }}</p>
              </div>

              <div class="align-self-center">
                <v-btn :class="{ 'show-btns': hover}" color="transparent" icon>
                  <v-icon
                    v-if="!isPlaying"
                    :class="{ 'show-btns': hover }"
                    color="transparent"
                    @click="isPlaying = !isPlaying"
                  >{{ iconPlay }}</v-icon>
                  <v-icon
                    v-else
                    :class="{ 'show-btns': hover }"
                    color="transparent"
                    @click="isPlaying = !isPlaying"
                  >{{ iconStop }}</v-icon>
                </v-btn>
              </div>
            </v-row>
          </v-card-title>
        </v-img>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  props: {
    cover: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    subtext: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      audioStyle: {
        borderRadius: "50%"
      },
      iconPlay: "mdi-play",
      iconStop: "mdi-stop",
      isPlaying: false
    };
  }
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

/* .v-card:not(.on-hover) {
  opacity: 0.6;
 } */

.audio-cover:hover {
  animation-play-state: paused;
}

/* .audio-cover {
  cursor: pointer;
  -webkit-animation: spin 3.5s linear infinite;
  -moz-animation: spin 3.5s linear infinite;
  animation: spin 3.5s linear infinite;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
} */
</style>