<template>
  <v-app>
    <v-card color="grey lighten-4">
      <v-sheet height="1450px" style="position: relative;">
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
          <v-avatar size="35" class="ml-2 mr-3" style="cursor: pointer" @click="onClickLogo">
            <img
              src="https://res.cloudinary.com/hongquangraem/image/upload/v1586963014/coders-logo_nqkmk8.jpg"
              alt="codersX-logo"
            />
          </v-avatar>
          <v-toolbar-title>
            <a href="/stream" style="text-decoration: none; color: #000">Forum</a>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            class="hidden-xs-only ml-3"
            color="primary"
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
          >
            <v-icon v-if="item.icon" left>{{ item.icon }}</v-icon>
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
      sideNav: false,
      dropdownMenus: [
        { title: "Profile", link: "/profile", icon: 'person' },
        { title: "Create post", link: "create-post", icon: 'create'  }
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
      return this.$router.push({ path: "/stream" });
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
</style>
