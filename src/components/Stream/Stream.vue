<template>
    <v-container fluid style="padding: 0 !important">
      <app-banner></app-banner>
      <audio-playlist></audio-playlist>
    </v-container>
</template>

<script>
import AudioPlaylist from './AudioPlaylist'
export default {
  components: {
    audioPlaylist: AudioPlaylist
  }
};
</script>

<style>
</style>