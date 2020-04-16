<template>
  <v-container>
    <discussion
      v-for="item in discussions"
      :key="item._id"
      :_id="item._id"
      :tags="item.tags"
      :comments="item.comments"
      :likes="item.likes"
      :savedBy="item.savedBy"
      :userId="item.userId"
      :topic="item.topic"
      :content="item.content"
      :type="item.type"
      :createdAt="item.createdAt"
      :updatedAt="item.updatedAt"
      :metadata="item.metadata"
    ></discussion>
  </v-container>
</template>

<script>
import Discussion from "./Discussion";
export default {
  components: {
    discussion: Discussion
  },
  data() {
    return {
      discussions: [
        {
          _id: "5e9494fe935dfb5ed3043975",
          tags: [
            {
              _id: "5e931565701c6a1f851074ec",
              tagName: 'javascript'
            }
          ],
          comments: [],
          likes: [],
          savedBy: ["5e8b577f1a2dde32298795f4"],
          userId: {
            _id: "5e8b577f1a2dde32298795f4",
            username: "kenviruss"
          },
          topic:
            "How can I remove an image in a folder on cloudinary in Nodejs?",
          content:
            "I have tried this way but the result still the same, anyone help me with this problem? Here is my code...",
          type: "discussion",
          createdAt: "2020-04-13T16:36:14.767Z",
          updatedAt: "2020-04-13T16:46:02.835Z",
          metadata: {
            _id: "5e9494fe935dfb5ed3043971",
            comments:256,
            likes: 500,
            saves: 1
          }
        },
        {
          _id: "5e9494fe935dfb5ed304975",
          tags: [
            {
              _id: "5e931565701c6a1f851074ec",
              tagName: 'javascript'
            }
          ],
          comments: [],
          likes: [],
          savedBy: ["5e8b577f1a2dde32298795f4"],
          userId: {
            _id: "5e8b577f1a2dde32298795f4",
            username: "hongquang"
          },
          topic:
            "How can I remove an image in a folder on cloudinary in Nodejs?",
          content:
            "I have tried this way but the result still the same, anyone help me with this problem? Here is my code...",
          type: "discussion",
          createdAt: "2020-04-13T16:36:14.767Z",
          updatedAt: "2020-04-13T16:46:02.835Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9494fe935dfb5ed04975",
          tags: [
            {
              _id: "5e931565701c6a1f851074ec",
              tagName: 'javascript'
            }
          ],
          comments: [],
          likes: [],
          savedBy: ["5e8b577f1a2dde32298795f4"],
          userId: {
            _id: "5e8b577f1a2dde32298795f4",
            username: "hongquang"
          },
          topic:
            "How can I remove an image in a folder on cloudinary in Nodejs?",
          content:
            "I have tried this way but the result still the same, anyone help me with this problem? Here is my code...",
          type: "discussion",
          createdAt: "2020-04-13T16:36:14.767Z",
          updatedAt: "2020-04-13T16:46:02.835Z",
          metadata: {
            _id: "5e9494fe935fb5ed3043975",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9494fe95dfb5ed3043975",
          tags: [
            {
              _id: "5e931565701c6a1f851074ec",
              tagName: 'javascript'
            }
          ],
          comments: [],
          likes: [],
          savedBy: ["5e8b577f1a2dde32298795f4"],
          userId: {
            _id: "5e8b577f1a2dde32298795f4",
            username: "hongquang"
          },
          topic:
            "How can I remove an image in a folder on cloudinary in Nodejs?",
          content:
            "I have tried this way but the result still the same, anyone help me with this problem? Here is my code...",
          type: "discussion",
          createdAt: "2020-04-13T16:36:14.767Z",
          updatedAt: "2020-04-13T16:46:02.835Z",
          metadata: {
            _id: "5e9494fe935dfbed3043975",
            comments: 20,
            likes: 6,
            saves: 1
          }
        },
        {
          _id: "5e9494fe95dfb5ed3043975",
          tags: [
            {
              _id: "5e931565701c6a1f851074ec",
              tagName: 'javascript'
            }
          ],
          comments: [],
          likes: [],
          savedBy: ["5e8b577f1a2dde32298795f4"],
          userId: {
            _id: "5e8b577f1a2dde32298795f4",
            username: "hongquang"
          },
          topic:
            "How can I remove an image in a folder on cloudinary in Nodejs?",
          content:
            "I have tried this way but the result still the same, anyone help me with this problem? Here is my code...",
          type: "discussion",
          createdAt: "2020-04-13T16:36:14.767Z",
          updatedAt: "2020-04-13T16:46:02.835Z",
          metadata: {
            _id: "5e9494fe935dfb5d3043975",
            comments: 123,
            likes: 69,
            saves: 1
          }
        }
      ]
    };
  }
};
</script>

<style>
</style>