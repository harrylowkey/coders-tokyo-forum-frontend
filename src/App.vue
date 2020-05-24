<template>
  <v-app>
    <notifications class="notif" />
    <v-card color="grey lighten-4">
      <v-toolbar dense class="toolbar">
        <v-app-bar-nav-icon
          class="hidden-sm-and-up"
          @click.stop="sideNav = !sideNav"
        />
        <v-avatar
          size="35"
          class="ml-2 mr-3"
          style="cursor: pointer"
          @click="onClickLogo"
        >
          <img
            src="https://res.cloudinary.com/hongquangraem/image/upload/v1586963014/coders-logo_nqkmk8.jpg"
            alt="codersX-logo"
          />
        </v-avatar>
        <v-toolbar-title>
          <a
            ref="forumTitle"
            href="/stream"
            style="text-decoration: none; color: #000"
          >
            Forum
          </a>
        </v-toolbar-title>
        <v-spacer />
        <div class="mr-2">
          <span class="body-2" style="font-size: 16px">{{ online }}</span>
          <v-avatar size="8" class="ml-1 mr-3">
            <img
              src="https://res.cloudinary.com/hongquangraem/image/upload/v1590030842/online-icon_fitjtb.jpg"
              alt="online-icon"
            />
          </v-avatar>
        </div>
        <v-btn
          class="hidden-xs-only mr-1"
          color="primary"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          text
        >
          {{ item.title }}
        </v-btn>
        <v-menu transition="slide-y-transition" style="top: 48px" open-on-hover>
          <template v-slot:activator="{ on }">
            <v-avatar
              v-if="isAuthenticated"
              size="37"
              class="ml-2"
              style="cursor: pointer"
              dark
              v-on="on"
            >
              <img :src="user.avatar.secureURL" alt="Avatar" />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in dropdownMenus"
              :key="i"
              :to="item.link"
              target="_blank"
            >
              <v-list-item-icon>
                <v-icon color="primary" size="20">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title style="cursor: pointer">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item @click="signOut">
              <v-list-item-icon>
                <v-icon color="red" size="20">exit_to_app</v-icon>
              </v-list-item-icon>
              <v-list-item-title style="cursor: pointer">
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <aplayer />
      <main>
        <router-view />
        <Footer />
      </main>
    </v-card>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import socket from '@/socket.js';

import Aplayer from './components/Player/aplayer';

export default {
  name: 'App',
  components: {
    Aplayer,
  },
  data() {
    return {
      isSearching: false,
      search: '',
      sideNav: false,
    };
  },
  computed: {
    ...mapState('user', ['user', 'isAuthenticated']),
    ...mapState('socket', ['online']),
    menuItems() {
      let menus = [
        {
          title: 'Stream',
          link: '/stream',
        },
        { title: 'Sign up', icon: 'how_to_reg', link: '/signup' },
        { title: 'Sign in', icon: 'lock_open', link: '/signin' },
      ];

      if (this.isAuthenticated) {
        menus = [
          {
            title: 'Stream',
            link: '/stream',
          },
          { title: 'Create post', icon: 'edit', link: '/writePost' },
        ];
      }
      return menus;
    },
    dropdownMenus() {
      return [
        {
          title: 'Profile',
          link: `/users/profile/${this.user.username}`,
          icon: 'person',
        },
        { title: 'Create post', link: '/writePost', icon: 'create' },
      ];
    },
  },
  methods: {
    ...mapActions('user', ['signOut']),
    ...mapActions('socket', ['setOnlineMembers']),
    onClickLogo() {
      return this.$refs.forumTitle.click();
    },
    onClickAvatar() {
      return this.$router.push({ path: '/profile' });
    },
  },
  created() {
    socket.emit('auth', window.localStorage.getItem('accessToken'));
    socket.on('USER_CONNECTIONS', data => {
      this.setOnlineMembers(data.online);
    });
  },
};
</script>
<style scoped>
.v-menu__content {
  top: 42px !important;
}

.toolbar {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
}

.notif {
  margin-top: 60px;
}
</style>
