<template>
  <div id="wrapper-notif" class="wrapper-notif ml-1 mr-4 mb-1">
    <span v-if="isAuthenticated && isNewNotif" class="newNotif" />
    <v-icon
      v-if="isAuthenticated"
      @click="handleToggleShowNotifList"
      style="cursor: pointer"
      :color="`${isNewNotif ? 'red' : 'primary'}`"
      size="18"
      v-click-outside="hideNotifList"
    >
      {{ isNewNotif ? 'mdi-bell-ring' : 'mdi-bell' }}
    </v-icon>
    <v-list class="list-notif py-0" v-if="isShowNotifList && !isLoading">
      <v-list-item
        class="pb-4 pt-1"
        v-for="(item, i) in notifications"
        :key="i"
        @click="handleClickNotif(item.post)"
        style="border-bottom: 0.5px solid #d6d4d4"
      >
        <v-avatar size="35" class="mr-3 mt-3" style="cursor: pointer">
          <img :src="item.creator.avatar.secureURL" alt="Avatar" />
        </v-avatar>
        <div
          class="d-flex ml-1 justify-space-between flex-column"
          style="width: 100%"
        >
          <span
            class="caption mt-4"
            style="cursor: pointer; width: 285px; height: 25px"
            v-html="$options.filters.markdown(item.content)"
          />
          <span style="font-size: 10px; color: green ">
            {{ item.createdAt | duration }}
          </span>
        </div>
        <v-img
          class="mt-2 ml-10"
          height="50px"
          width="50px"
          v-if="item.post.cover"
          :src="item.post.cover.secureURL"
          alt="cover"
        />
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions('notifications', ['getNotifs', 'toggleShowNotifList']),
    handleToggleShowNotifList() {
      this.toggleShowNotifList(!this.isShowNotifList);
      this.isNewNotif = true;
    },
    hideNotifList() {
      this.toggleShowNotifList(false);
    },
    handleClickNotif(post) {
      let typeParams = post.type;
      if (
        post.type === 'book' ||
        post.type === 'movie' ||
        post.type === 'food'
      ) {
        typeParams = `${post.type}Review`;
      }

      const path = `/${typeParams}s/${post._id}?type=${post.type}`;
      if (path !== this.$route.fullPath) {
        this.$router.push({ path });
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
      'isNewNotif',
    ]),
  },
  events: {},
  directives: {
    'click-outside': {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind: function(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
  created() {
    if (this.isAuthenticated === true) {
      this.getNotifs();
    }
  },
  watch: {
    isAuthenticated(val) {
      if (val === true) {
        this.getNotifs();
      }
    },
  },
};
</script>

<style scoped>
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
  height: 386px;
  z-index: 1;
  min-height: 386px;
  min-width: 400px;
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
</style>
