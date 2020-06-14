<template>
  <div id="wrapper-notif" class="wrapper-notif ml-1 mr-4 mb-1">
    <span v-if="isAuthenticated && isNewNotif" class="newNotif" />
    <v-icon
      v-if="isAuthenticated"
      @click="toggleShowNotifList(!isShowNotifList)"
      style="cursor: pointer"
      :color="`${isNewNotif ? 'red' : 'primary'}`"
      size="18"
    >
      {{ isNewNotif ? 'mdi-bell-ring' : 'mdi-bell' }}
    </v-icon>
    <v-list class="list-notif py-0" v-if="isShowNotifList">
      <div class="d-flex justify-space-between px-5 py-3">
        <span>{{ $t('Notifications') }}</span>
        <a
          class="pt-1 mark-read"
          style="font-size: 13px"
          @click="handleMarkAllAsRead"
        >
          {{ $t('Mark all as read') }}
        </a>
      </div>
      <v-divider />
      <v-list-item
        class="pb-4 pt-1"
        v-for="(item, i) in notifications"
        :key="i"
        @click="handleClickNotif(item.path, item._id)"
        :style="item.isRead ? [baseStyleNotif] : [baseStyleNotif, notReadNotif]"
      >
        <v-avatar size="35" class="mr-3 mt-3" style="cursor: pointer">
          <img :src="item.creator.avatar.secureURL" alt="Avatar" />
        </v-avatar>
        <div class="d-flex ml-1 flex-column" style="width: 100%">
          <span
            class="caption mt-4"
            style="cursor: pointer; width: 300px"
            v-html="$options.filters.markdown(handleNotifContent(item.content))"
          />
          <span style="font-size: 10px; color: green ">
            {{ handleDuration(item.createdAt) }}
          </span>
        </div>
        <v-img
          class="mt-2 ml-10"
          height="50px"
          width="50px"
          v-if="item.post && item.post.cover"
          :src="item.post.cover.secureURL"
          alt="cover"
        />
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      baseStyleNotif: {
        borderBottom: '0.5px solid #d6d4d4',
      },
      notReadNotif: {
        background: '#f2f2f2',
      },
    };
  },
  // next-line: check this please!
  directives: {},
  methods: {
    ...mapActions('notifications', [
      'getNotifs',
      'toggleShowNotifList',
      'markAllRead',
      'markOneAsRead',
    ]),
    async handleClickNotif(path, notifId) {
      const isMarkRead = await this.markOneAsRead(notifId);
      if (isMarkRead.status === 200) {
        if (path !== this.$route.fullPath) {
          this.$router.push({ path });
        }
      }

      this.toggleShowNotifList(false);
    },
    handleMarkAllAsRead() {
      this.markAllRead();
    },
    checkClickOn(event) {
      if (!document.getElementById('wrapper-notif').contains(event.target)) {
        this.toggleShowNotifList(false);
      }
    },
    handleDuration(createdAt) {
      const duration = this.$options.filters.duration(createdAt);
      if (duration === 'now') {
        return this.$t(duration);
      }
      const counter = duration.split(' ')[0];
      const time = duration
        .split(' ')
        .slice(1)
        .join(' ');
      return `${counter} ${this.$t(time)}`;
    },
    handleNotifContent(content) {
      if (content.indexOf('others') > 0) {
        const splitContent = content.split(' ');
        const user = splitContent[0];
        const counterOthers = splitContent[1];
        const others = splitContent[2];
        const action = splitContent.slice(3).join(' ');
        return `${user} ${counterOthers} ${this.$t(others)} ${this.$t(action)}`;
      } else {
        const splitContent = content.split(' ');
        const user = splitContent[0];
        const action = splitContent.slice(1).join(' ');
        return `${user} ${this.$t(action)}`;
      }
    },
  },
  computed: {
    ...mapState('utils', ['errorMes', 'isLoading', 'isLoadmore']),
    ...mapState('user', ['user', 'isAuthenticated']),
    ...mapState('notifications', [
      'notifications',
      'metadata',
      'isShowNotifList',
    ]),
    ...mapGetters('notifications', ['isNewNotif']),
  },
  created() {
    if (this.isAuthenticated === true) {
      this.getNotifs();
    }

    window.addEventListener('click', this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.checkClickOn);
  },
  watch: {
    isAuthenticated(val) {
      if (val === true) {
        this.getNotifs();
      }
    },
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          type: 'error',
          title: `${this.$t('notifications.title.Error')}!`,
          text: this.$t(newVal),
        });
      }
    },
  },
};
</script>

<style scoped>
span.caption >>> p {
  margin-bottom: 6px;
}
.wrapper-notif {
  position: relative;
}

.newNotif {
  position: absolute;
  top: 2px;
  right: -4px;
  width: 5px !important;
  height: 5px !important;
  background: red;
  border-radius: 50%;
  border: 0.5px solid red;
}

.list-notif {
  height: 435px;
  z-index: 1;
  min-height: 435px;
  min-width: 471px;
  background: #fff;
  overflow-y: scroll;
  position: absolute;
  right: -30px;
  top: 38px;
  border-right: 1.5px solid #e5e5e5 !important;
  border-left: 1.5px solid #e5e5e5 !important;
  border-bottom: 1.5px solid #e5e5e5 !important;
}

.theme--light.v-list-item--active::before {
  opacity: 0;
}

.mark-read:active {
  color: #0065ff;
}
</style>
