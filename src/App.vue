<template>
  <v-app>
    <v-card color="grey lighten-4">
      <v-toolbar dense class="toolbar">
        <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
        <v-avatar size="35" class="ml-2 mr-3" style="cursor: pointer" @click="onClickLogo">
          <img
            src="https://res.cloudinary.com/hongquangraem/image/upload/v1586963014/coders-logo_nqkmk8.jpg"
            alt="codersX-logo"
          />
        </v-avatar>
        <v-toolbar-title>
          <a ref="forumTitle" href="/stream" style="text-decoration: none; color: #000">Forum</a>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" v-if="isSearching" hide-details single-line></v-text-field>
        <v-btn text class="ml-10 search-icon" color="primary" @click="isSearching = !isSearching">
          <v-icon size="20">search</v-icon>
        </v-btn>
        <v-btn
          class="hidden-xs-only mr-1"
          color="primary"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          text
        >
          <!-- <v-icon v-if="item.icon" left>{{ item.icon }}</v-icon> -->
          {{ item.title }}
        </v-btn>
        <v-menu transition="slide-y-transition" style="top: 48px" open-on-hover>
          <template v-slot:activator="{ on }">
            <v-avatar
              v-if="userIsAuthenticated"
              size="37"
              class="ml-2"
              style="cursor: pointer"
              dark
              v-on="on"
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                alt="Avatar"
              />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in dropdownMenus" :key="i" :to="item.link">
              <v-list-item-icon>
                <v-icon color="primary" size="20">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title style="cursor: pointer">{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="onLogout">
              <v-list-item-icon>
                <v-icon color="red" size="20">exit_to_app</v-icon>
              </v-list-item-icon>
              <v-list-item-title style="cursor: pointer">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <main class="mt-12">
        <router-view></router-view>
      </main>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
       isSearching: false,
      search: "",
      sideNav: false,
      dropdownMenus: [
        { title: "Profile", link: "/profile", icon: "person" },
        { title: "Create post", link: "create-post", icon: "create" }
      ]
    };
  },
  computed: {
    menuItems() {
      let menus = [
        { title: "Sign up", icon: "how_to_reg", link: "/signup" },
        { title: "Sign in", icon: "lock_open", link: "/signin" }
      ];

      if (this.userIsAuthenticated) {
        menus = [
          {
            title: "Stream",
            link: "/stream"
          },
          { title: "Create post", icon: "edit", link: "/meetup/new" }
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
    },
    onClickLogo() {
      return this.$refs.forumTitle.click()
    },
    onClickAvatar() {
      return this.$router.push({ path: "/profile" });
    }
  }
};
</script>
<style scoped>
.v-menu__content {
  top: 42px !important;
}
.search-icon {
  height: 36px !important;
  min-width: 38px !important;
  padding: 0 10px !important;
  border-radius: 50% !important;
}

.toolbar {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
}
</style>
