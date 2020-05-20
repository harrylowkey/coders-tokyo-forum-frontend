<template>
  <v-container class="profile-introduction">
    <v-card max-width="344" class="mx-auto" style="border-radius: 20px">
      <v-card-title class="justify-center" style="padding: 10px !important">
        {{ title }}
      </v-card-title>
      <v-divider />
      <v-list-item v-for="item in data" :key="item._id">
        <v-list-item-avatar class="ml-4" v-if="type === 1">
          <v-img :src="item.icon" />
        </v-list-item-avatar>
        <v-list-item-content class="pl-2">
          <v-list-item-title>
            <a
              style="text-decoration: none; color: #000"
              target="_blank"
              :href="link(item)"
            >
              {{ dataType === 'tags' ? '#' : '' }}{{ handleGenText(item) }}
            </a>
          </v-list-item-title>
        </v-list-item-content>
        <v-chip
          v-if="type === 2"
          class="ma-2"
          label
          text-color="black"
          outlined
          small
          style="border: 1px solid #90d2a3 !important; background-color: #C5E1A5 !important"
        >
          {{ handleGenCounter(item) }}
        </v-chip>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
import { ROUTES } from '@/mixins/routes';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    dataType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      item: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    };
  },
  methods: {
    handleGenText(item) {
      if (this.dataType === 'tags') {
        return item.tagName;
      }

      if (this.dataType === 'posts') {
        return item.topic;
      }

      if (this.dataType === 'onlineMembers' || this.dataType === 'bloggers') {
        return item.text;
      }
    },
    handleGenCounter(item) {
      if (this.dataType === 'tags') {
        return item.total;
      }

      if (this.dataType === 'posts') {
        return item.likes;
      }
    },
    link(item) {
      if (this.dataType === 'bloggers') {
        return ROUTES.USER_PROFILE({ username: item.text });
      }

      if (this.dataType === 'tags') {
        return ROUTES.SEARCH_TAG({ tagName: item.tagName });
      }

      if (this.dataType === 'posts') {
        if (
          item.type === 'food' ||
          item.type === 'movie' ||
          item.type === 'book'
        ) {
          return `/${item.type}Reviews/${item._id}?type=${item.type}`;
        } else {
          return `/${item.type}s/${item._id}?type=${item.type}`;
        }
      }
    },
  },
};
</script>
