<template>
  <v-app>
    <v-card color="grey lighten-4">
      <app-nav-bar></app-nav-bar>
      <main>
        <router-view></router-view>
      </main>
    </v-card>
  </v-app>
</template>

<script>
import NavBar from '@/components/Shared/Navbar'

export default {
  name: "App",
  components: {
    appNavBar: NavBar
  },
  data() {
    return {
      
    };
  },
  computed: {
  },
  methods: {

  }
};
</script>
<style scoped>
</style>
