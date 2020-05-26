<template>
  <v-app>
    <notifications class="notif" />
    <v-card color="grey lighten-4">
      <nav-bar />
      <aplayer />
      <main>
        <router-view />
      </main>
      <Footer />
    </v-card>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import NavBar from '@/components/Layout/NavBar';
import Footer from '@/components/Layout/Footer';

import Aplayer from './components/Player/aplayer';

export default {
  name: 'App',
  components: {
    Aplayer,
    Footer,
    NavBar,
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
  border-bottom: 2px solid red;
}

.notif {
  margin-top: 60px;
}

.top-border {
  height: 4px;
  background: red;
}
</style>
>>>>>>> be4c414... [modify] create file navbar and fix no avatar user when
