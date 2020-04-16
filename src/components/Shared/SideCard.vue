<template>
  <v-container class="profile-introduction">
    <v-card max-width="344" class="mx-auto" style="border-radius: 20px">
      <v-card-title class="justify-center" style="padding: 10px !important">{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-list-item v-for="item in data" :key="item._id">
        <v-list-item-avatar class="ml-4" v-if="type === 1">
          <v-img :src="item.icon"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="pl-2">
          <v-list-item-title>{{ title === 'Tags' ? '#' : '' }}{{ item.text }}</v-list-item-title>
        </v-list-item-content>
        <v-chip
          v-if="type === 2"
          class="ma-2"
          label
          text-color="black"
          outlined
          small
          style="border: 1px solid #90d2a3 !important; background-color: #b3ddbf !important"
        >{{ item.counter }}</v-chip>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    type: {
      type: Number
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
      item: 1,
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" }
      ]
    };
  }
};
</script>

<style>
</style>