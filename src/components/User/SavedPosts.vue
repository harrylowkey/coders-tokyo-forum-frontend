<template>
  <v-container class="d-flex pt-0 flex-wrap justify-center mb-3 pt-4" id="wrapper">
    <v-container v-for="post in data" :key="post._id" :style="calWidth(post.type)">
      <discussion
        v-if="post.type === 'discussion'"
        :key="post._id"
        :_id="post._id"
        :tags="post.tags"
        :comments="post.comments"
        :likes="post.likes"
        :savedBy="post.savedBy"
        :userId="post.userId"
        :topic="post.topic"
        :content="post.content"
        :type="post.type"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :metadata="post.metadata"
      ></discussion>

      <blog
        v-if="post.type === 'blog'"
        :key="post._id"
        :_id="post._id"
        :topic="post.topic"
        :description="post.description"
        :content="post.content"
        :tags="post.tags"
        :cover="post.cover"
        :userId="post.userId"
        :type="post.type"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :metadata="post.metadata"
      ></blog>

      <movie
        v-if="post.type === 'movie'"
        :key="post._id"
        :_id="post._id"
        :topic="post.topic"
        :description="post.description"
        :content="post.content"
        :tags="post.tags"
        :cover="post.cover"
        :userId="post.userId"
        :url="post.url"
        :type="post.type"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :metadata="post.metadata"
        :movie="post.movie"
        :authors="post.authors"
      ></movie>

      <book
        v-if="post.type === 'book'"
        :key="post._id"
        :_id="post._id"
        :topic="post.topic"
        :description="post.description"
        :content="post.content"
        :tags="post.tags"
        :cover="post.cover"
        :userId="post.userId"
        :type="post.type"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :metadata="post.metadata"
        :book="post.book"
        :authors="post.authors"
      ></book>

      <food
        v-if="post.type === 'food'"
        :key="post._id"
        :url="post.url"
        :_id="post._id"
        :topic="post.topic"
        :description="post.description"
        :content="post.content"
        :tags="post.tags"
        :cover="post.cover"
        :userId="post.userId"
        :type="post.type"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :metadata="post.metadata"
        :food="post.food"
      ></food>

      <song
      class="song"
        v-if="post.type === 'song'"
        :key="post._id"
        :_id="post._id"
        :tags="post.tags"
        :comments="post.comments"
        :authors="post.authors"
        :likes="post.likes"
        :savedBy="post.savedBy"
        :userId="post.userId"
        :topic="post.topic"
        :content="post.content"
        :description="post.description"
        :type="post.type"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :media="post.media"
        :metadata="post.metadata"
      ></song>
    </v-container>
  </v-container>
</template>

<script>
import Song from "@/components/Post/Audio/Audio";
import Discussion from "@/components/Post/Discussion/Discussion";
import Blog from "@/components/Post/Blog/Blog";
import Movie from "@/components/Post/Review/Movie/Movie";
import Food from "@/components/Post/Review/Food/Food";
import Book from "@/components/Post/Review/Book/Book";
export default {
  components: {
    Song,
    Discussion,
    Blog,
    Movie,
    Food,
    Book
  },
  data() {
    return {
      data: [
        {
          _id: "5e9494fe935dfb5ed3043975",
          tags: [
            {
              _id: "5e931565701c6a1f851074ec",
              tagName: "javascript"
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
            comments: 256,
            likes: 500,
            saves: 1
          }
        },
        {
          _id: "5e9c33a20ea604201558edfa",
          tags: [
            {
              _id: "5e9c33a20ea604201558edfc",
              tagName: "kientran"
            },
            {
              _id: "5e9c33a20ea604201558edfd",
              tagName: "laptrinhquydaocuocdoi"
            }
          ],
          comments: [],
          authors: [
            {
              _id: "5e9c33a20ea604201558edfe",
              name: "Kiên Trần"
            }
          ],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          likes: [],
          savedBy: [],
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          topic: "Lập trình qũy đạo cuộc đời",
          description:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
          content:
            "Đây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành\nĐây không phải là sách phát triển bản thân. \nĐây Đây là sách giups bạn am am hiểu bản thân và lập trình nên Qũy Đạo Đạo Cuộc Đời Đời cho riêng bạn.\nBạn không thể phatstriener nếu bạn không am am hiểu cách bản thân bạn và xã hội vận hành",
          type: "book",
          cover: {
            _id: "5e9c33a20ea604201558edfb",
            secureURL:
              "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
            publicId: "Coders-Tokyo-Forum/posts/a.jpg",
            fileName: "a.jpg",
            sizeBytes: 107648,
            userId: {
              _id: "5e8b577f1a2dde3229879524",
              username: "nhat_anh"
            },
            postId: "5e9c33a20ea604201558edfa",
            resourceType: "image",
            createdAt: "2020-04-19T11:18:58.228Z",
            updatedAt: "2020-04-19T11:18:58.228Z",
            __v: 0
          },
          createdAt: "2020-04-19T11:18:58.251Z",
          updatedAt: "2020-04-19T11:18:58.251Z",
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          },
          book: {
            status: "Finished",
            country: "Vietnam",
            year: 2019,
            length: 200,
            genres: ["Literary", "Action"],
            suggestedBy: ["Trần Tôn"],
            stars: 5
          }
        },
        {
          _id: "5e992003c513c2611a9df88",
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
          _id: "5e9b04f5d1f1da5baece2ff5",
          tags: [
            {
              _id: "5e8c563eeda853638189e854",
              tagName: "action"
            },
            {
              _id: "5e9b047ef82e7d563b8e2c5a",
              tagName: "funny"
            }
          ],
          comments: [],
          userId: {
            _id: "5e8b577f1a2dde3229879524",
            username: "nhat_anh"
          },
          authors: [
            {
              _id: "5e9b047ef82e7d563b8e2c5b",
              type: "actor",
              name: "Dave Bautista (JJ)"
            },
            {
              _id: "5e9b047ef82e7d563b8e2c5d",
              type: "actor",
              name: "Ken Jeong (Kim)"
            },
            {
              _id: "5e9b04f5d1f1da5baece2ff7",
              type: "director",
              name: "KristenSchall (Bobbi)"
            }
          ],
          likes: [],
          url: "http://www.phimmoi.net/phim/diep-vien-ti-hon-8928/",
          savedBy: [],
          topic: "My Spey (2019)",
          description:
            "Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta",
          content:
            "Điệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta\nĐiệp Viên Tí Hon kể về công việc làm gia sư dở khóc dở cười của JJ - một điệp viên CIA chuyên nghiệp. Trong một lần hoạt động ngầm, anh bị Sophie - một cô bé 9 tuổi phát hiện ra thân phận của mình. JJ miễn cưỡng phải nhận dạy Sophie cách làm điệp viên, nếu không cô bé lém lỉnh nhiều trò này sẽ thổi tung vỏ bọc của anh ta",
          type: "movie",
          cover: {
            _id: "5e9ab00f0591fb40fc87faa3",
            secureURL:
              "https://res.cloudinary.com/hongquangraem/image/upload/v1587195917/Coders-Tokyo-Forum/posts/javascript.png.png",
            publicId: "Coders-Tokyo-Forum/posts/javascript.png",
            fileName: "javascript.png",
            sizeBytes: 316358,
            userId: "5e8b577f1a2dde32298795f4",
            postId: "5e9ab00f0591fb40fc87faa2",
            resourceType: "image",
            createdAt: "2020-04-18T07:45:19.838Z",
            updatedAt: "2020-04-18T07:45:19.838Z",
            __v: 0
          },
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          },
          movie: {
            status: "Finished",
            imdb: 5.2,
            country: "England",
            year: 2019,
            releaseDate: "22/11/2019",
            time: 91,
            stars: 4
          },
          createdAt: "2020-04-18T13:47:33.708Z",
          updatedAt: "2020-04-18T13:47:33.708Z"
        },
        {
          _id: "5e9c6ce7830bd646939c7624",
          tags: [
            {
              _id: "5e8de2fcad60773238e94f1c",
              tagName: "seafood"
            },
            {
              _id: "5e8de2fcad60773238e94f1d",
              tagName: "street"
            }
          ],
          comments: [],
          likes: [],
          url: "facebook.com",
          savedBy: [],
          foodPhotos: [
            {
              secureURL:
                "https://res.cloudinary.com/hongquangraem/image/upload/v1586676116/Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg.jpg",
              publicId:
                "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
              fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
              sizeBytes: 112398
            },
            {
              secureURL:
                "https://res.cloudinary.com/hongquangraem/image/upload/v1587350197/Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png.png",
              publicId:
                "Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png",
              fileName: "89025324_2760328297369108_3874548065679441920_n.png",
              sizeBytes: 184898
            }
          ],
          food: {
            foodName: "sushi",
            priceAverage: "200000 - 250000",
            priceUnit: "VND",
            address: "Let’s Sushi 13B Quốc Tử Giám ",
            stars: 5,
            restaurant: "Let's sushi",
            quality: 7.8,
            price: 8,
            service: 10,
            space: 8,
            openTime: "10:00 - 22:00"
          },
          topic: "Sushi",
          description:
            'Originally, sushi was fermented fish with rice preserved in salt, and this was a staple dish in Japan for a thousand years until the Edo Period (1603 to 1868) when contemporary sushi was developed. The word "sushi" means "it\'s sour," which reflects back to sushi\'s origins of being preserved in salt',
          content:
            'Originally, sushi was fermented fish with rice preserved in salt, and this was a staple dish in Japan for a thousand years until the Edo Period (1603 to 1868) when contemporary sushi was developed. The word "sushi" means "it\'s sour," which reflects back to sushi\'s origins of being preserved in salt',
          type: "food",
          cover: {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
            fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
            sizeBytes: 112398
          },
          createdAt: "2020-04-19T15:23:19.975Z",
          updatedAt: "2020-04-19T15:23:19.975Z",
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        {
          _id: "5e9920603c513c2611a9f88",
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
          _id: "5e9cce7830bd646939c7624",
          tags: [
            {
              _id: "5e8de2fcad60773238e94f1c",
              tagName: "seafood"
            },
            {
              _id: "5e8de2fcad60773238e94f1d",
              tagName: "street"
            }
          ],
          comments: [],
          likes: [],
          url: "facebook.com",
          savedBy: [],
          foodPhotos: [
            {
              secureURL:
                "https://res.cloudinary.com/hongquangraem/image/upload/v1586676116/Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg.jpg",
              publicId:
                "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
              fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
              sizeBytes: 112398
            },
            {
              secureURL:
                "https://res.cloudinary.com/hongquangraem/image/upload/v1587350197/Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png.png",
              publicId:
                "Coders-Tokyo-Forum/posts/foodReview/89025324_2760328297369108_3874548065679441920_n.png",
              fileName: "89025324_2760328297369108_3874548065679441920_n.png",
              sizeBytes: 184898
            }
          ],
          food: {
            foodName: "sushi",
            priceAverage: "200000 - 250000",
            priceUnit: "VND",
            address: "Let’s Sushi 13B Quốc Tử Giám ",
            stars: 5,
            restaurant: "Let's sushi",
            quality: 7.8,
            price: 8,
            service: 10,
            space: 8,
            openTime: "10:00 - 22:00"
          },
          topic: "Sushi",
          description:
            'Originally, sushi was fermented fish with rice preserved in salt, and this was a staple dish in Japan for a thousand years until the Edo Period (1603 to 1868) when contemporary sushi was developed. The word "sushi" means "it\'s sour," which reflects back to sushi\'s origins of being preserved in salt',
          content:
            'Originally, sushi was fermented fish with rice preserved in salt, and this was a staple dish in Japan for a thousand years until the Edo Period (1603 to 1868) when contemporary sushi was developed. The word "sushi" means "it\'s sour," which reflects back to sushi\'s origins of being preserved in salt',
          type: "food",
          cover: {
            secureURL:
              "https://kenh14cdn.com/2018/7/25/tram03-1532490851483378789140.jpg",
            publicId:
              "Coders-Tokyo-Forum/posts/foodReview/91427262_222687395745934_4371644556861505536_n.jpg",
            fileName: "91427262_222687395745934_4371644556861505536_n.jpg",
            sizeBytes: 112398
          },
          createdAt: "2020-04-19T15:23:19.975Z",
          updatedAt: "2020-04-19T15:23:19.975Z",
          userId: {
            _id: "5e8b577f1a2dde322987924",
            username: "nhat_anh"
          },
          metadata: {
            _id: "5e9494fe935dfb5ed30435",
            comments: 123,
            likes: 69,
            saves: 1
          }
        },
        
      ]
    };
  },
  methods: {
    calWidth(type) {
      if (type === 'song') return { width: '40% !important'}
      return { width: '100%'}
    }
  }
};
</script>

<style>

</style>