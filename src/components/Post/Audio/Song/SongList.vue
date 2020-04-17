<template>
  <v-container class="d-flex pt-0" id="song-wrapper">
    <song
      class="song"
      v-for="item in songList"
      :key="item._id"
      :_id="item._id"
      :tags="item.tags"
      :comments="item.comments"
      :authors="item.authors"
      :likes="item.likes"
      :savedBy="item.savedBy"
      :userId="item.userId"
      :topic="item.topic"
      :content="item.content"
      :description="item.description"
      :type="item.type"
      :createdAt="item.createdAt"
      :updatedAt="item.updatedAt"
      :media="item.media"
      :metadata="item.metadata"
    ></song>
  </v-container>
</template>

<script>
import Audio from "../Audio";
export default {
  components: {
    song: Audio
  },
  data() {
    return {
      songList: [
        {
          _id: "5e9920603c513c2611a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "aucoustic"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "tinh ca"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: " Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e99202c3c513c2611a9df86",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "rock"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "rockballad"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e8c5f27abf7df7d3be426dd",
              type: "singer",
              name: "Sweettie"
            },
            {
              _id: "5e8c5f27abf7df7d3be426de",
              type: "composer",
              name: "Sweettie"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "The last time",
          description: "A good song",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e9920363c513c2611a9df87",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093557/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558",
            fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e99202c3c513c2611a9df86",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "1f824197f0826b949e90ed5a78544ba7c268d52a",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:19:18.857Z",
            updatedAt: "2020-04-17T03:19:18.857Z",
            __v: 0
          },
          createdAt: "2020-04-17T03:19:18.881Z",
          updatedAt: "2020-04-17T03:19:18.881Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e990603c513c2611a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "aucoustic"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "tinh ca"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: " Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "599202c3c513c2611a9df86",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "rock"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "rockballad"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e8c5f27abf7df7d3be426dd",
              type: "singer",
              name: "Sweettie"
            },
            {
              _id: "5e8c5f27abf7df7d3be426de",
              type: "composer",
              name: "Sweettie"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "The last time",
          description: "A good song",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e9920363c513c2611a9df87",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093557/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558",
            fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e99202c3c513c2611a9df86",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "1f824197f0826b949e90ed5a78544ba7c268d52a",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:19:18.857Z",
            updatedAt: "2020-04-17T03:19:18.857Z",
            __v: 0
          },
          createdAt: "2020-04-17T03:19:18.881Z",
          updatedAt: "2020-04-17T03:19:18.881Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e990603c51c2611a9df88",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "aucoustic"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "tinh ca"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9920603c513c2611a9df89",
              type: "singer",
              name: "Chillies"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: " Memories place",
          description: "Rock Ballad",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e99206e3c513c2611a9df8a",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093614/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093614",
            fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9920603c513c2611a9df88",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "b1cd21b54d3ac48aab7b3097fe59957cb525e614",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:20:14.881Z",
            updatedAt: "2020-04-17T03:20:14.881Z",
            __v: 0
          },
          createdAt: "2020-04-17T03:20:14.886Z",
          updatedAt: "2020-04-17T03:20:14.886Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "59920c3c513c2611a9df86",
          tags: [
            {
              _id: "5e8c5f27abf7df7d3be426db",
              tagName: "rock"
            },
            {
              _id: "5e8c5f27abf7df7d3be426dc",
              tagName: "rockballad"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e8c5f27abf7df7d3be426dd",
              type: "singer",
              name: "Sweettie"
            },
            {
              _id: "5e8c5f27abf7df7d3be426de",
              type: "composer",
              name: "Sweettie"
            }
          ],
          likes: [],
          savedBy: [],
          userId: "5e8b577f1a2dde32298795f4",
          topic: "The last time",
          description: "A good song",
          content: "lyric",
          type: "song",
          media: {
            _id: "5e9920363513c2611a9df87",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/video/upload/v1587093557/Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558.mp3",
            publicId:
              "Coders-Tokyo-Forum/posts/media/hongquang_podcast_Vung Ky Uc - Chillies_1587093558",
            fileName: "hongquang_podcast_Vung Ky Uc - Chillies",
            sizeBytes: 4835851,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e99202c3c513c2611a9df86",
            resourceType: "video",
            media: {
              type: "upload",
              signature: "1f824197f0826b949e90ed5a78544ba7c268d52a",
              width: 500,
              height: 500,
              format: "mp3",
              resource_type: "video",
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24
            },
            createdAt: "2020-04-17T03:19:18.857Z",
            updatedAt: "2020-04-17T03:19:18.857Z",
            __v: 0
          },
          createdAt: "2020-04-17T03:19:18.881Z",
          updatedAt: "2020-04-17T03:19:18.881Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
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
#song-wrapper {
  flex-wrap: wrap;
  justify-content: center;
}

.song {
  margin: 20px;
  flex: 45%;
}
</style>