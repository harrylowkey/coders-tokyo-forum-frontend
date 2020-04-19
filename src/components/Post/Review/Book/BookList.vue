<template>
  <v-container class="pt-0">
    <book
      v-for="item in books"
      :key="item._id"
      :_id="item._id"
      :topic="item.topic"
      :description="item.description"
      :content="item.content"
      :tags="item.tags"
      :cover="item.cover"
      :userId="item.userId"
      :type="item.type"
      :createdAt="item.createdAt"
      :updatedAt="item.updatedAt"
      :metadata="item.metadata"
      :book="item.book"
      :authors="item.authors"
    ></book>
  </v-container>
</template>

<script>
import Book from "./Book";
export default {
  components: {
    book: Book
  },
  data() {
    return {
      books: [
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
            status: 'Finished',
            country: 'Vietnam',
            year: 2019,
            length: 200,
            genres: ['Literary', 'Action'],
            suggestedBy: ['Trần Tôn'],
            stars: 5
          },
        },
        {
          _id: "5e9c3320ea604201558edfa",
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
          userId:  {
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
            status: 'Finished',
            country: 'Vietnam',
            year: 2019,
            pages: 200,
            genre: 'literary',
            republishTimes: 0,
            suggestBy: ['Trần Tôn'],
            stars: 5
          },
        },
        {
          _id: "5e9c33a20ea60420f1558edfa",
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
            status: 'Finished',
            country: 'Vietnam',
            year: 2019,
            pages: 200,
            genre: 'literary',
            republishTimes: 0,
            suggestBy: ['Trần Tôn'],
            stars: 5
          },
        },
        {
          _id: "5e9c33af20ea604201558edfa",
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
            status: 'Finished',
            country: 'Vietnam',
            year: 2019,
            pages: 200,
            genre: 'literary',
            republishTimes: 0,
            suggestBy: ['Trần Tôn'],
            stars: 5
          },
        },
      ]
    };
  }
};
</script>

<style>
</style>