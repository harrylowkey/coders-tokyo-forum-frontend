<template>
  <div class="d-flex">
    <v-card class="other-posts px-7 pt-4 pb-4 mx-3" v-for="post in posts" :key="post._id">
      <v-list-item-content>
        <router-link class="title-link" :to="`/${postType}/${post._id}`">
          <v-list-item-title class="headline post-title">{{ post.topic }}</v-list-item-title>
        </router-link>
        <p class="description mb-0 pt-2">{{ post.description }}</p>
        <div class="d-flex justify-space-between" style="height: 20px">
          <span style="font-size: 0.775rem;" class="pt-3">
            <a style=" text-decoration: none" href="#">Read more...</a>
          </span>
          <read-time class="pt-3" :text="post.content" :customize="'font-size: 0.775rem'"></read-time>
        </div>
      </v-list-item-content>
    </v-card>
  </div>
</template>

<script>
import ReadTime from "@/components/Shared/readTime";
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
    postType: String
  },
  components: {
    ReadTime
  }
};
</script>

<style>
.other-posts {
  flex: 30%;
  padding: 20px;
  justify-content: center;
  border-radius: 0px !important;
}

.post-title {
  text-align: left;
  white-space: initial;
  line-height: 1.1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.description {
  overflow: hidden;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  max-height: 1.4;
  white-space: initial;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
</style>