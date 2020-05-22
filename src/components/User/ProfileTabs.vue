<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6 mt-3 d-flex">
      <h1
        class="font-weight-bold display-3 basil--text"
        style="flex: 85%; padding-left: 100px"
      >
        {{ user.username }}
      </h1>
      <div
        class="d-flex flex-column justify-end"
        style="flex: 15%; text-align: end"
      >
        <span
          @click="showFollowCard('followers')"
          class="caption mb-1 mt-2 follow"
        >
          {{ followers.length }} followers
        </span>
        <span @click="showFollowCard('following')" class="caption follow">
          {{ following.length }} following
        </span>
      </div>
    </v-card-title>
    <v-dialog
      style="margin-bottom: 384px !important;"
      max-width="390px"
      v-model="isShowFollowCard"
    >
      <follow-card
        :userFollowing="following"
        :type="toggleTypeFollow"
        :list="toggleListFollow"
        @handleFollow="handleFollow"
        @handleUnfollow="handleUnfollow"
      />
    </v-dialog>

    <v-tabs background-color="transparent" color="basil" grow>
      <v-tab
        @click="setActiveTab(tab.key)"
        v-for="tab in profileTabs"
        :key="tab.key"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items>
      <user-posts :user="user" v-if="tab === 'legacies'" />
      <saved-posts :user="user" v-if="tab === 'saved-posts'" />
    </v-tabs-items>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex';

import { ROUTES } from '@/mixins/routes';
import FollowCard from '@/components/Shared/FollowCard';

import UserPosts from './UserPosts';
import SavedPosts from './SavedPosts';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      savedPostMenus: [
        { menu: 'Discussions', category: 'Discussions', icon: 'menu_book' },
        { menu: 'Blogs', category: 'Blogs', icon: 'fastfood' },
        { menu: 'Book Reviews', category: 'Books', icon: 'menu_book' },
        { menu: 'Movie Reviews', category: 'Movies', icon: 'movie_filter' },
        { menu: 'Food Reviews', category: 'Food', icon: 'fastfood' },
        { menu: 'Songs', category: 'Movies', icon: 'movie_filter' },
        { menu: 'Podcasts', category: 'Podcasts', icon: 'movie_filter' },
      ],
      isShowFollowCard: false,
      toggleListFollow: [],
      toggleTypeFollow: 'Followers',
    };
  },
  methods: {
    ...mapActions('user', [
      'follow',
      'unfollow',
      'setFollowerList',
      'setFollowingList',
    ]),
    setActiveTab(tabName) {
      this.$router.push({
        path: `/users/profile/${this.user.username}#${tabName}`,
      });
      return (this.tab = tabName);
    },
    showFollowCard(type) {
      if (!this.isOwner) return;
      this.toggleListFollow = this[type];
      this.toggleTypeFollow = this.toggleTypeFollow =
        type.charAt(0).toUpperCase() + type.slice(1);
      this.isShowFollowCard = !this.isShowFollowCard;
    },
    async handleFollow({ user }) {
      const response = await this.follow(user._id);
      if (!response) {
        return this.$router.push({ path: ROUTES.LOGIN });
      }
      if (response.status === 200) {
        this.following.push(user);
        this.setFollowerList(this.following);
      }

      if (response.status === 401) {
        this.$router.push({ path: ROUTES.LOGIN });
      }
    },
    async handleUnfollow({ user }) {
      const response = await this.unfollow(user._id);
      if (!response) {
        return this.$router.push({ path: ROUTES.LOGIN });
      }
      if (response.status === 200) {
        const newList = this.toggleListFollow.filter(
          _user => _user._id !== user._id,
        );
        // this.toggleListFollow = newList
        this.setFollowingList(newList);
      }
    },
  },
  components: {
    UserPosts,
    SavedPosts,
    FollowCard,
  },
  created() {
    if (!this.isOwner) {
      this.profileTabs = [{ name: 'Legacies', key: 'legacies' }];
    } else {
      this.profileTabs = [
        { name: 'Legacies', key: 'legacies' },
        { name: 'Saved Posts', key: 'saved-posts' },
      ];
    }

    if (!this.$route.hash) {
      this.tab = 'legacies';
    } else {
      const selectedTab = this.$route.hash.slice(1);
      this.tab = selectedTab;
    }
  },
  computed: {
    ...mapState('user', ['following', 'followers']),
    ...mapState('utils', ['errorMes']),
  },
  watch: {
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          type: 'error',
          title: 'Login failed',
          text: newVal,
        });
      }
    },
  },
};
</script>

<style scoped>
.basil {
  background: lightgray;
}
.basil--text {
  color: #e57373 !important;
}

.follow {
  cursor: pointer;
  color: #222;
  transition: 0.4s;
}

.follow:hover {
  color: #000;
}
</style>
