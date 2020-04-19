<template>
  <v-container class="pt-0">
    <movie
      v-for="item in movies"
      :key="item._id"
      :_id="item._id"
      :topic="item.topic"
      :description="item.description"
      :content="item.content"
      :tags="item.tags"
      :cover="item.cover"
      :userId="item.userId"
      :url="item.url"
      :type="item.type"
      :createdAt="item.createdAt"
      :updatedAt="item.updatedAt"
      :metadata="item.metadata"
      :movie="item.movie"
      :authors="item.authors"
    ></movie>
  </v-container>
</template>

<script>
import Movie from "./Movie";
export default {
  components: {
    movie: Movie
  },
  data() {
    return {
      movies: [
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
            status: 'Finished',
            imdb: 5.2,
            country: 'England',
            year: 2019,
            releaseDate: '22/11/2019',
            time: 91,
            stars: 4
          },
          createdAt: "2020-04-18T13:47:33.708Z",
          updatedAt: "2020-04-18T13:47:33.708Z"
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
            _id: "5e8b577f1a2dde322987924",
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
            status: 'Finished',
            imdb: 5.2,
            country: 'England',
            year: 2019,
            releaseDate: '22/11/2019',
            time: 91,
            stars: 4
          },
          createdAt: "2020-04-18T13:47:33.708Z",
          updatedAt: "2020-04-18T13:47:33.708Z"
        },
        {
          _id: "5e9b04f5d1f1dabaece2ff5",
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
            status: 'Finished',
            imdb: 5.2,
            country: 'England',
            year: 2019,
            releaseDate: '22/11/2019',
            time: 91,
            stars: 4
          },
          createdAt: "2020-04-18T13:47:33.708Z",
          updatedAt: "2020-04-18T13:47:33.708Z"
        },
        {
          _id: "5e9b0f5d1f1da5baece2ff5",
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
            status: 'Finished',
            imdb: 5.2,
            country: 'England',
            year: 2019,
            releaseDate: '22/11/2019',
            time: 91,
            stars: 4
          },
          createdAt: "2020-04-18T13:47:33.708Z",
          updatedAt: "2020-04-18T13:47:33.708Z"
        }
      ]
    };
  }
};
</script>

<style>
</style>