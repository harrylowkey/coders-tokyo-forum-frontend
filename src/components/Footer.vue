<template>
  <div v-if="!isLoading">
    <div class="top-border" />
    <v-card flat tile class="lighten-1 text-center">
      <v-card-text>
        <v-btn v-for="icon in links" :key="icon.name" class="mx-4" icon>
          <v-icon
            :color="icon.color"
            @click="handleClickLink(icon.url)"
            size="24px"
          >
            {{ icon.name }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <div class="d-flex justify-center pt-3">
        <v-card-text class="pt-0 signature" style="width: 45%">
          "Believe in yourself, do not compare to anyone!"
        </v-card-text>
      </div>
      <div class="d-flex justify-center pb-3">
        <strong style="font-size: 12px;">Founder CodersX</strong>
      </div>
      <v-divider />

      <v-card-text>
        © {{ new Date().getFullYear() }} —
        <strong style="color: red">CodersX Forum</strong>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      links: [
        {
          name: 'mdi-facebook',
          url: 'https://www.facebook.com/groups/jsland/',
          color: 'blue',
        },
        {
          name: 'mdi-instagram',
          url: 'https://www.instagram.com/codersxcommunity/',
          color: '#833AB4',
        },
        {
          name: 'mdi-youtube',
          url: 'https://www.youtube.com/channel/UCwczk9A3ITHTZT6W_9nalqg',
          color: 'red',
        },
        {
          name: 'mdi-newspaper',
          url: 'https://coders-x.com/',
          color: 'green',
        },

        {
          name: 'mdi-school',
          url: 'https://school.coders-x.com/',
          color: 'blue',
        },
      ],
    };
  },
  methods: {
    handleClickLink(url) {
      return window.open(url, '_blank');
    },
  },
  computed: {
    ...mapState('utils', ['isLoading', 'isLoadingAPI']),
  },
};
</script>

<style scoped>
.top-border {
  height: 4px;
  background: red;
}

@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
.signature {
  font-family: 'Indie Flower', cursive;
  font-size: 28px;
}
</style>
