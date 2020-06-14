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
import { mapActions } from 'vuex';

import NavBar from '@/components/Layout/NavBar';
import Footer from '@/components/Layout/Footer';
import socket from '@/socket.js';

import Aplayer from './components/Player/aplayer';

export default {
  name: 'App',
  components: {
    Aplayer,
    Footer,
    NavBar,
  },
  methods: {
    ...mapActions('notifications', ['updateNotifications']),
    onClickLogo() {
      return this.$refs.forumTitle.click();
    },
    handleNotifContent(content) {
      if (content.indexOf('others') > 0) {
        const splitContent = content.split(' ');
        const user = splitContent[0];
        const others = splitContent[1];
        const action = splitContent.slice(2).join(' ');
        return `${user} ${others} ${this.$t(action)}`;
      } else {
        const splitContent = content.split(' ');
        const user = splitContent[0];
        const action = splitContent.slice(1).join(' ');
        return `${user} ${this.$t(action)}`;
      }
    },
  },
  created() {
    socket.on('NOTIFICATIONS', payload => {
      this.$notify({
        type: 'success',
        title: `${this.$t('Notification')}!`,
        text: this.$t(
          this.handleNotifContent(payload.content.replace(/[^a-zA-Z ]/g, '')),
        ),
      });

      this.updateNotifications(payload.notif);
    });
  },
};
</script>
<style scoped lang="scss">
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
  font-size: 12px;
  cursor: pointer;

  color: #ffffff;
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.success {
    border-left: 5px solid #42a85f;
    padding: 10px;
    background: #68cd86;
    border-color: #42a85f;
  }
}

.top-border {
  height: 4px;
  background: red;
}
</style>
