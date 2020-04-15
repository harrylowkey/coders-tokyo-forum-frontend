<template>
  <v-app>
    <v-card color="grey lighten-4">
      <v-sheet height="748px" style="position: relative;">
        <v-navigation-drawer v-model="sideNav" absolute temporary>
          <v-list dense>
            <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="userIsAuthenticated" @click="onLogout">
              <v-list-item-icon>
                <v-icon>exit_to_app</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar dense>
          <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
          <v-toolbar-title>Forum</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items class="hidden-xs-only"> -->
            <v-btn color="primary" v-for="item in menuItems" :key="item.title" :to="item.link" class="ml-3">
              <v-icon v-if="item.icon" left>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
          <!-- </v-toolbar-items> -->
            <v-avatar size=37 class="ml-2" style="cursor: pointer">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
        </v-toolbar>
        <main>
          <router-view></router-view>
        </main>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menus = [
        { title: "Sign up", icon: "face", link: "/signup" },
        { title: "Sign in", icon: "lock_open", link: "/signin" }
      ];

      if (this.userIsAuthenticated) {
        menus = [
          {
            title: "Stream",
            link: "/stream"
          },
          { title: "Create post", icon: "edit", link: "/meetup/new" },
        ];
      }
      return menus;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      return this.$store.dispatch("logOut");
    }
  }
};
</script>
