<template>
  <v-toolbar dense class="toolbar" style="padding-bottom: 2px !important">
    <v-app-bar-nav-icon
      class="hidden-sm-and-up"
      @click.stop="sideNav = !sideNav"
    />
    <v-toolbar-title>
      <router-link
        ref="forumTitle"
        to="/stream"
        style="text-decoration: none; color: #000"
      >
        <v-avatar size="35" class="ml-2 mr-3" style="cursor: pointer">
          <img
            src="https://res.cloudinary.com/hongquangraem/image/upload/v1586963014/coders-logo_nqkmk8.jpg"
            alt="codersX-logo"
          />
        </v-avatar>
        <span>Forum</span>
      </router-link>
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

    <notification />

    <v-menu
      transition="slide-y-transition"
      style="top: 48px"
      open-on-hover
      :offset-y="true"
      v-if="isAuthenticated"
    >
      <template v-slot:activator="{ on }">
        <v-avatar size="37" class="ml-2" style="cursor: pointer" dark v-on="on">
          <img :src="user.avatar.secureURL" alt="Avatar" />
        </v-avatar>
      </template>

      <v-list class="pt-0">
        <v-list-item
          style="background: #fff"
          v-for="(item, i) in dropdownMenus"
          :key="i"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon color="primary" size="20">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <span style="cursor: pointer">{{ item.title }}</span>
        </v-list-item>
        <v-divider />
        <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon color="red" size="20">exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="cursor: pointer">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Notification from '@/components/Notification';
import socket from '@/socket.js';

export default {
  name: 'NavBar',
  components: {
    Notification,
  },
  data() {
    return {
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
        { title: 'Create post', link: '/writePost', icon: 'create' },
        { title: 'Login', icon: 'lock_open', link: '/signin' },
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
  },
  created() {
    socket.emit('auth', window.localStorage.getItem('accessToken'));
    socket.on('USER_CONNECTIONS', data => {
      this.setOnlineMembers(data.online);
    });
  },
};
</script>
