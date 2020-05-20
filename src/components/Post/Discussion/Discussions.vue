<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" sm="7" md="8" lg="8" xl="7" offset-xl="1" class="pt-0">
        <v-skeleton-loader
          class="mt-5 mb-5"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />

        <v-skeleton-loader
          class="mt-5 mb-5"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />

        <v-skeleton-loader
          class="mt-5 mb-5"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />

        <v-skeleton-loader
          class="mt-5 mb-5"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />

        <v-skeleton-loader
          class="mt-5 mb-5"
          v-if="isLoading"
          type="list-item-avatar-three-line, list-item-three-line"
        />
        <div v-if="!isLoading">
          <discussion
            v-for="item in discussions"
            :key="item._id"
            :_id="item._id"
            :tags="item.tags"
            :comments="item.comments"
            :likes="item.likes"
            :savedBy="item.savedBy"
            :author="item.user"
            :topic="item.topic"
            :content="item.content"
            :type="item.type"
            :createdAt="item.createdAt"
            :updatedAt="item.updatedAt"
            :metadata="item.metadata"
            @likedPost="handleLikedPost"
            @unlikedPost="handleUnlikedPost"
          />
        </div>

        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isLoadmore"
          infinite-scroll-distance="10"
        />
        <v-text-field color="primary" v-if="isLoadmore" loading disabled />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" xl="4" :style="sideBarStyle">
        <side-card
          class="fix-sidebar top-blogger"
          :title="topBloggers.title"
          :type="topBloggers.type"
          :data="topBloggers.data"
          v-if="showTopBloggers"
        />

        <side-card
          class="fix-sidebar most-view-posts"
          :title="mostViewBlogs.title"
          :type="mostViewBlogs.type"
          :data="mostViewBlogs.data"
        />

        <side-card
          class="fix-sidebar"
          :title="tags.title"
          :type="tags.type"
          :data="tags.data"
        />

        <side-card
          class="fix-sidebar member-online"
          :title="membersOnline.title"
          :type="membersOnline.type"
          :data="membersOnline.data"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import SideCard from '@/components/Shared/SideCard';

import Discussion from './Discussion';

export default {
  components: {
    Discussion,
    SideCard,
  },
  data() {
    return {
      topBloggers: {
        title: 'Top Bloggers',
        type: 1,
        data: [
          {
            _id: '5ec3ee4a42ec002876cb495f',
            tags: [
              {
                _id: '5ec3ed193ab2411f88c4d497',
                tagName: 'aaaa',
              },
              {
                _id: '5ec3f985e41d6829e77b88a2',
                tagName: 'bbb',
              },
            ],
            comments: [],
            authors: [],
            likes: [],
            url: null,
            savedBy: [],
            user: {
              _id: '5eaf9763c2cba93ce26aafb9',
              username: 'ydobon',
              description: 'aa  kklj.hgdfg',
              socialLinks: [
                {
                  _id: '5ec0fc4d07e23d1239846e95',
                  type: 'Github',
                  url: 'https://github.com/hongquangraem',
                },
                {
                  _id: '5eba183dd7244b46d2a1a298',
                  type: 'Facebook',
                  url: 'https://www.facebook.com/spaceraem',
                },
                {
                  _id: '5ec0fc4d07e23d1239846e93',
                  type: 'Linkedin',
                  url: 'dgfg',
                },
              ],
              createdAt: '2020-05-04T04:17:39.202Z',
              avatar: {
                _id: '5eb5607ca7e91a167ff5721a',
                secureURL:
                  'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
              },
              followers: ['5e8b577f1a2dde32298795f4'],
              following: ['5e8b577f1a2dde32298795f4'],
              job: 'Blogger',
              sex: 'Male',
            },
            topic: 'áda',
            content: 'ádađá',
            type: 'discussion',
            createdAt: '2020-05-19T14:33:46.862Z',
            updatedAt: '2020-05-19T15:23:30.282Z',
            __v: 0,
            metadata: {
              _id: '5ec3ee4a42ec002876cb495f',
              comments: 0,
              likes: 0,
              saves: 0,
            },
          },
          {
            _id: '5ec243dd51d66276850d7a1b',
            tags: [
              {
                _id: '5ec3ed193ab2411f88c4d497',
                tagName: 'aaaa',
              },
            ],
            comments: [],
            authors: [],
            likes: [
              {
                _id: '5e8b577f1a2dde32298795f4',
                username: 'hongquangraem',
              },
              {
                _id: '5ec3c758321bcb2ff6ab3101',
                username: 'quangdepzai_99',
              },
              {
                _id: '5eaf9763c2cba93ce26aafb9',
                username: 'ydobon',
              },
            ],
            url: null,
            savedBy: [],
            user: {
              _id: '5eaf9763c2cba93ce26aafb9',
              username: 'ydobon',
              description: 'aa  kklj.hgdfg',
              socialLinks: [
                {
                  _id: '5ec0fc4d07e23d1239846e95',
                  type: 'Github',
                  url: 'https://github.com/hongquangraem',
                },
                {
                  _id: '5eba183dd7244b46d2a1a298',
                  type: 'Facebook',
                  url: 'https://www.facebook.com/spaceraem',
                },
                {
                  _id: '5ec0fc4d07e23d1239846e93',
                  type: 'Linkedin',
                  url: 'dgfg',
                },
              ],
              createdAt: '2020-05-04T04:17:39.202Z',
              avatar: {
                _id: '5eb5607ca7e91a167ff5721a',
                secureURL:
                  'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
              },
              followers: ['5e8b577f1a2dde32298795f4'],
              following: ['5e8b577f1a2dde32298795f4'],
              job: 'Blogger',
              sex: 'Male',
            },
            topic: 'aa',
            content: 'fsadf',
            type: 'discussion',
            createdAt: '2020-05-18T08:14:21.383Z',
            updatedAt: '2020-05-19T15:23:27.880Z',
            __v: 0,
            metadata: {
              _id: '5ec243dd51d66276850d7a1b',
              comments: 0,
              likes: 3,
              saves: 0,
            },
          },
        ],
      },
      tags: {
        title: 'Tags',
        type: 2,
        data: [
          {
            _id: '1',
            text: 'javascript',
            counter: 153,
          },
          {
            _id: '2',
            text: 'discussion',
            counter: 153,
          },
          {
            _id: '3',
            text: 'nodejs',
            counter: 153,
          },
          {
            _id: '4',
            text: 'html',
            counter: 153,
          },
        ],
      },
      mostViewBlogs: {
        title: 'Most Views',
        type: 2,
        data: [
          {
            _id: '1',
            text: 'Javascript the best parts',
            counter: 153,
          },
          {
            _id: '2',
            text: 'Top 5 nodejs frameworks',
            counter: 100,
          },
          {
            _id: '3',
            text: 'HTML for dummies',
            counter: 99,
          },
          {
            _id: '4',
            text: 'Testing issues',
            counter: 80,
          },
          {
            _id: '5',
            text: 'Setting Mongo local',
            counter: 79,
          },
          {
            _id: '6',
            text: 'Javascript the best parts',
            counter: 153,
          },
          {
            _id: '7',
            text: 'Top 5 nodejs frameworks',
            counter: 100,
          },
          {
            _id: '8',
            text: 'HTML for dummies',
            counter: 99,
          },
          {
            _id: '9',
            text: 'Testing issues',
            counter: 80,
          },
          {
            _id: '10',
            text: 'Setting Mongo local',
            counter: 79,
          },
        ],
      },
      membersOnline: {
        title: 'Members Online',
        type: 1,
        data: [
          {
            _id: '1',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1586965772/Draw-io-avatars/12_avatar-128_hvhfyk.png',
            text: 'ngo_minh',
          },
          {
            _id: '2',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1586965680/Draw-io-avatars/4_avatar-128_rk2yxz.png',
            text: 'nhat_anh',
          },
          {
            _id: '3',
            icon:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1586965594/Draw-io-avatars/avatar-128_s94fqh.png',
            text: 'thanh_ton',
          },
        ],
      },
      showTopBloggers: true,
      showMostViewBlogs: true,
      showMembersOnline: true,
      sideBarStyle: {
        paddingTop: '12px',
      },
    };
  },
  computed: {
    ...mapState('utils', ['errorMes', 'isLoading', 'isLoadmore']),
    ...mapState('discussions', ['discussions', 'metadata']),
  },
  methods: {
    ...mapActions('discussions', ['getDiscussions', 'loadMoreDiscussions']),
    async loadMore() {
      if (this.metadata.page >= this.metadata.totalPage) {
        return;
      }

      await this.loadMoreDiscussions({
        limit: 10,
        page: this.metadata.page + 1,
      });
    },
    handleLikedPost({ postId, user }) {
      const discussion = this.discussions.find(
        discussion => discussion._id === postId,
      );
      discussion.likes.push({ username: user.username, _id: user._id });
    },
    handleUnlikedPost({ postId, user }) {
      const discussion = this.discussions.find(
        discussion => discussion._id === postId,
      );
      discussion.likes = discussion.likes.filter(
        _user => _user._id !== user._id,
      );
    },
  },
  async created() {
    if (this.$route.path === '/stream' || this.$route.path === '/') {
      this.mostViewBlogs.title = 'Top 5 Discussions';
      const sliceMostViews = this.mostViewBlogs.data.slice(5);
      this.mostViewBlogs.data = sliceMostViews;
    }
    await this.getDiscussions();
  },
  errorMes(newVal) {
    if (newVal.length) {
      this.$notify({
        type: 'error',
        title: 'Update failed',
        text: newVal,
      });
    }
  },
};
</script>
