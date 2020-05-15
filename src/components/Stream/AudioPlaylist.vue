<template>
  <div
    class="mx-auto wrapper"
    elevation="8"
    max-width="1520px"
    max-height="200px"
  >
    <v-slide-group class="px-4" show-arrows center-active>
      <v-slide-item v-for="(item, i) in audioList" :key="i">
        <v-row class="mr-10">
          <v-col :key="i" cols="12" md="12">
            <Audio
              :cover="item.cover.secureURL"
              :name="item.topic"
              :authors="item.authors"
              :link="item.media.secureURL"
              :index="i"
              :_id="item._id"
              @handlePlayPause="handlePlayPause"
              @handleSwitchAudio="handleSwitchAudio"
            />
          </v-col>
        </v-row>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Audio from './Audio.vue';

export default {
  data() {
    return {};
  },
  components: {
    Audio,
  },
  methods: {
    ...mapActions('player', [
      'updatePlaying',
      'toggleShowPlayer',
      'switchAudio',
    ]),
    handlePlayPause({ isPlay, audio }) {
      if (isPlay) {
        this.updatePlaying({ status: true, audio });
        this.toggleShowPlayer(true);
      }

      if (!isPlay) {
        this.updatePlaying({ status: false, audio });
      }
    },
    handleSwitchAudio({ status, audio }) {
      if (status === true) {
        this.switchAudio({ status, audio });
      }
    },
  },
  computed: {
    ...mapState('utils', ['isLoading']),
    audioList() {
      return [
        {
          _id: '5ebb574e24f0d8118a7e9d6',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eba0fec9964403c2853d108',
              type: 'composer',
              name: 'Eminem',
            },
            {
              _id: '5eba0fec9964403c2853d109',
              type: 'artist',
              name: 'Laydy Gaga',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'fdasf',
          description: '',
          content: 'bbbb',
          type: 'song',
          cover: {
            _id: '5ebb574824f0d8118a7e9bd5',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589335879/Coders-Tokyo-Forum/posts/eq9kcoihzbh0lj4ihky2.jpg',
          },
          media: {
            _id: '5ebb573e24f0d8118a7e9bd4',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589335870/Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5ebb574e24f0d8118a7e9bd6',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: 'a17f3d8225e4efff90681e43041449b720a2d1ec',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-13T02:11:10.851Z',
            updatedAt: '2020-05-13T02:11:26.042Z',
            __v: 0,
          },
          createdAt: '2020-05-13T02:11:26.063Z',
          updatedAt: '2020-05-13T02:11:26.063Z',
        },
        {
          _id: '5eba0fec9964403c2853d107',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eba0fec9964403c2853d108',
              type: 'composer',
              name: 'aa',
            },
            {
              _id: '5eba0fec9964403c2853d109',
              type: 'artist',
              name: 'bb',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'gsadg',
          description: '',
          content: 'gfgf',
          type: 'song',
          cover: {
            _id: '5eba0fe59964403c2853d106',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589252069/Coders-Tokyo-Forum/posts/dcs73cilryegrqfram1y.jpg',
          },
          media: {
            _id: '5eba0fdd9964403c2853d105',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589252060/Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5eba0fec9964403c2853d107',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '9b27b17a2ff936004dcd8c7d72d42539b2275285',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-12T02:54:21.267Z',
            updatedAt: '2020-05-12T02:54:36.463Z',
            __v: 0,
          },
          createdAt: '2020-05-12T02:54:36.476Z',
          updatedAt: '2020-05-12T02:54:36.476Z',
        },
        {
          _id: '5eb97577d26469063033a912',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb97577d26469063033a913',
              type: 'composer',
              name: 'vxv',
            },
            {
              _id: '5eb97577d26469063033a914',
              type: 'artist',
              name: 'cxv',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'cx',
          description: '',
          content: 'xcvxcv',
          type: 'song',
          cover: {
            _id: '5eb97573d26469063033a911',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212530/Coders-Tokyo-Forum/posts/sy7ewydvcyrolwqqxrwn.jpg',
          },
          media: {
            _id: '5eb97571d26469063033a910',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212528/Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5eb97577d26469063033a912',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '05a093e10835b2eb31b99e9c034dcd06c39e8bf8',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:55:29.615Z',
            updatedAt: '2020-05-11T15:55:35.675Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:55:35.683Z',
          updatedAt: '2020-05-11T15:55:35.683Z',
        },
        {
          _id: '5eb97484bd177101de04d2c3',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb97484bd177101de04d2c5',
              type: 'artist',
              name: 'sdf',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'sdf',
          description: '',
          content: 'sdfdsf',
          type: 'song',
          cover: {
            _id: '5eb9747abd177101de04d2c1',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212281/Coders-Tokyo-Forum/posts/hxg4w01ofaonslelfpci.jpg',
          },
          media: {
            _id: '5eb97482bd177101de04d2c2',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212289/Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: null,
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '0f2f498a03da53735b7756314851ccd8199764fd',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:51:30.120Z',
            updatedAt: '2020-05-11T15:51:30.120Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:51:32.144Z',
          updatedAt: '2020-05-11T15:51:32.144Z',
        },
        {
          _id: '5eb9745c147da00177e0eca7',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb9745c147da00177e0eca8',
              type: 'composer',
              name: 'gdfgf',
            },
            {
              _id: '5eb9745c147da00177e0eca9',
              type: 'artist',
              name: 'dgfd',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'dfgfd',
          description: '',
          content: 'fdgfd',
          type: 'song',
          cover: {
            _id: '5eb97456147da00177e0eca6',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212246/Coders-Tokyo-Forum/posts/bwec3feuv6ue9fmj5at4.jpg',
          },
          media: {
            _id: '5eb97454147da00177e0eca5',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212243/Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: null,
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: 'a7ddd694ca1c8ac6faeff63d9c67bee68268d089',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:50:44.746Z',
            updatedAt: '2020-05-11T15:50:44.746Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:50:52.791Z',
          updatedAt: '2020-05-11T15:50:52.791Z',
        },
        {
          _id: '5ebb574e24f0d8118a7e9d6',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eba0fec9964403c2853d108',
              type: 'composer',
              name: 'aa',
            },
            {
              _id: '5eba0fec9964403c2853d109',
              type: 'artist',
              name: 'Layda Gaga',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'fdasf',
          description: '',
          content: 'bbbb',
          type: 'song',
          cover: {
            _id: '5ebb574824f0d8118a7e9bd5',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589335879/Coders-Tokyo-Forum/posts/eq9kcoihzbh0lj4ihky2.jpg',
          },
          media: {
            _id: '5ebb573e24f0d8118a7e9bd4',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589335870/Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5ebb574e24f0d8118a7e9bd6',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: 'a17f3d8225e4efff90681e43041449b720a2d1ec',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-13T02:11:10.851Z',
            updatedAt: '2020-05-13T02:11:26.042Z',
            __v: 0,
          },
          createdAt: '2020-05-13T02:11:26.063Z',
          updatedAt: '2020-05-13T02:11:26.063Z',
        },
        {
          _id: '5eba0fec9964403c2853d107',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eba0fec9964403c2853d108',
              type: 'composer',
              name: 'aa',
            },
            {
              _id: '5eba0fec9964403c2853d109',
              type: 'artist',
              name: 'bb',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'gsadg',
          description: '',
          content: 'gfgf',
          type: 'song',
          cover: {
            _id: '5eba0fe59964403c2853d106',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589252069/Coders-Tokyo-Forum/posts/dcs73cilryegrqfram1y.jpg',
          },
          media: {
            _id: '5eba0fdd9964403c2853d105',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589252060/Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5eba0fec9964403c2853d107',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '9b27b17a2ff936004dcd8c7d72d42539b2275285',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-12T02:54:21.267Z',
            updatedAt: '2020-05-12T02:54:36.463Z',
            __v: 0,
          },
          createdAt: '2020-05-12T02:54:36.476Z',
          updatedAt: '2020-05-12T02:54:36.476Z',
        },
        {
          _id: '5eb97577d26469063033a912',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb97577d26469063033a913',
              type: 'composer',
              name: 'vxv',
            },
            {
              _id: '5eb97577d26469063033a914',
              type: 'artist',
              name: 'cxv',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'cx',
          description: '',
          content: 'xcvxcv',
          type: 'song',
          cover: {
            _id: '5eb97573d26469063033a911',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212530/Coders-Tokyo-Forum/posts/sy7ewydvcyrolwqqxrwn.jpg',
          },
          media: {
            _id: '5eb97571d26469063033a910',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212528/Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5eb97577d26469063033a912',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '05a093e10835b2eb31b99e9c034dcd06c39e8bf8',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:55:29.615Z',
            updatedAt: '2020-05-11T15:55:35.675Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:55:35.683Z',
          updatedAt: '2020-05-11T15:55:35.683Z',
        },
        {
          _id: '5eb97484bd177101de04d2c3',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb97484bd177101de04d2c5',
              type: 'artist',
              name: 'sdf',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'sdf',
          description: '',
          content: 'sdfdsf',
          type: 'song',
          cover: {
            _id: '5eb9747abd177101de04d2c1',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212281/Coders-Tokyo-Forum/posts/hxg4w01ofaonslelfpci.jpg',
          },
          media: {
            _id: '5eb97482bd177101de04d2c2',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212289/Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: null,
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '0f2f498a03da53735b7756314851ccd8199764fd',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:51:30.120Z',
            updatedAt: '2020-05-11T15:51:30.120Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:51:32.144Z',
          updatedAt: '2020-05-11T15:51:32.144Z',
        },
        {
          _id: '5eb9745c147da00177e0eca7',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb9745c147da00177e0eca8',
              type: 'composer',
              name: 'gdfgf',
            },
            {
              _id: '5eb9745c147da00177e0eca9',
              type: 'artist',
              name: 'dgfd',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'dfgfd',
          description: '',
          content: 'fdgfd',
          type: 'song',
          cover: {
            _id: '5eb97456147da00177e0eca6',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212246/Coders-Tokyo-Forum/posts/bwec3feuv6ue9fmj5at4.jpg',
          },
          media: {
            _id: '5eb97454147da00177e0eca5',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212243/Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: null,
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: 'a7ddd694ca1c8ac6faeff63d9c67bee68268d089',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:50:44.746Z',
            updatedAt: '2020-05-11T15:50:44.746Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:50:52.791Z',
          updatedAt: '2020-05-11T15:50:52.791Z',
        },
        {
          _id: '5ebb54e24f0d8118a7e9bd6',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eba0fec9964403c2853d108',
              type: 'composer',
              name: 'aa',
            },
            {
              _id: '5eba0fec9964403c2853d109',
              type: 'artist',
              name: 'bb',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'fdasf',
          description: '',
          content: 'bbbb',
          type: 'song',
          cover: {
            _id: '5ebb574824f0d8118a7e9bd5',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589335879/Coders-Tokyo-Forum/posts/eq9kcoihzbh0lj4ihky2.jpg',
          },
          media: {
            _id: '5ebb573e24f0d8118a7e9bd4',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589335870/Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/9a79bd303ac8e669142239d024cf668e_tonavh',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5ebb574e24f0d8118a7e9bd6',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: 'a17f3d8225e4efff90681e43041449b720a2d1ec',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-13T02:11:10.851Z',
            updatedAt: '2020-05-13T02:11:26.042Z',
            __v: 0,
          },
          createdAt: '2020-05-13T02:11:26.063Z',
          updatedAt: '2020-05-13T02:11:26.063Z',
        },
        {
          _id: '5eba0fec9964403c2853d107',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eba0fec9964403c2853d108',
              type: 'composer',
              name: 'aa',
            },
            {
              _id: '5eba0fec9964403c2853d109',
              type: 'artist',
              name: 'bb',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'gsadg',
          description: '',
          content: 'gfgf',
          type: 'song',
          cover: {
            _id: '5eba0fe59964403c2853d106',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589252069/Coders-Tokyo-Forum/posts/dcs73cilryegrqfram1y.jpg',
          },
          media: {
            _id: '5eba0fdd9964403c2853d105',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589252060/Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/d857414cca8e12cbbf0939a686494c71_qgwfg0',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5eba0fec9964403c2853d107',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '9b27b17a2ff936004dcd8c7d72d42539b2275285',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-12T02:54:21.267Z',
            updatedAt: '2020-05-12T02:54:36.463Z',
            __v: 0,
          },
          createdAt: '2020-05-12T02:54:36.476Z',
          updatedAt: '2020-05-12T02:54:36.476Z',
        },
        {
          _id: '5eb97577d26469063033a912',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb97577d26469063033a913',
              type: 'composer',
              name: 'vxv',
            },
            {
              _id: '5eb97577d26469063033a914',
              type: 'artist',
              name: 'cxv',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'cx',
          description: '',
          content: 'xcvxcv',
          type: 'song',
          cover: {
            _id: '5eb97573d26469063033a911',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212530/Coders-Tokyo-Forum/posts/sy7ewydvcyrolwqqxrwn.jpg',
          },
          media: {
            _id: '5eb97571d26469063033a910',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212528/Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/728e3874ced3dcf27b716bb94fe7dd8f_c8otul',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: '5eb97577d26469063033a912',
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '05a093e10835b2eb31b99e9c034dcd06c39e8bf8',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:55:29.615Z',
            updatedAt: '2020-05-11T15:55:35.675Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:55:35.683Z',
          updatedAt: '2020-05-11T15:55:35.683Z',
        },
        {
          _id: '5eb97484bd177101de04d2c3',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb97484bd177101de04d2c5',
              type: 'artist',
              name: 'sdf',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'sdf',
          description: '',
          content: 'sdfdsf',
          type: 'song',
          cover: {
            _id: '5eb9747abd177101de04d2c1',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212281/Coders-Tokyo-Forum/posts/hxg4w01ofaonslelfpci.jpg',
          },
          media: {
            _id: '5eb97482bd177101de04d2c2',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212289/Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/436fcb6907c5644929d38f94702a669c_jferch',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: null,
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: '0f2f498a03da53735b7756314851ccd8199764fd',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:51:30.120Z',
            updatedAt: '2020-05-11T15:51:30.120Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:51:32.144Z',
          updatedAt: '2020-05-11T15:51:32.144Z',
        },
        {
          _id: '5eb9745c147da00177e0eca7',
          tags: [],
          comments: [],
          authors: [
            {
              _id: '5eb9745c147da00177e0eca8',
              type: 'composer',
              name: 'gdfgf',
            },
            {
              _id: '5eb9745c147da00177e0eca9',
              type: 'artist',
              name: 'dgfd',
            },
          ],
          likes: [],
          foodPhotos: [],
          savedBy: [],
          user: {
            _id: '5eaf9763c2cba93ce26aafb9',
            username: 'ydobon',
            description: 'dsfds',
            socialLinks: [
              {
                _id: '5eba183dd7244b46d2a1a298',
                type: 'Facebook',
                url: 'facebook.com/spacemanraem',
              },
              {
                _id: '5eb561b5a7e91a167ff5721b',
                type: 'Linkedin',
                url: 'dd',
              },
            ],
            createdAt: '2020-05-04T04:17:39.202Z',
            avatar: {
              _id: '5eb5607ca7e91a167ff5721a',
              secureURL:
                'https://res.cloudinary.com/hongquangraem/image/upload/v1588945019/Coders-Tokyo-Forum/avatars/vmbqq7davi7srvxrwuds.jpg',
            },
            followers: [],
            following: [],
            job: 'Blogger',
            sex: 'Male',
          },
          topic: 'dfgfd',
          description: '',
          content: 'fdgfd',
          type: 'song',
          cover: {
            _id: '5eb97456147da00177e0eca6',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/image/upload/v1589212246/Coders-Tokyo-Forum/posts/bwec3feuv6ue9fmj5at4.jpg',
          },
          media: {
            _id: '5eb97454147da00177e0eca5',
            secureURL:
              'https://res.cloudinary.com/hongquangraem/video/upload/v1589212243/Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu.mp3',
            publicId:
              'Coders-Tokyo-Forum/posts/media/5a2a63e92a9406b7e9c745fce8efb571_v1wvzu',
            fileName: 'Vung Ky Uc - Chillies',
            sizeBytes: 4835851,
            user: '5eaf9763c2cba93ce26aafb9',
            postId: null,
            resourceType: 'video',
            media: {
              type: 'upload',
              signature: 'a7ddd694ca1c8ac6faeff63d9c67bee68268d089',
              width: 500,
              height: 500,
              format: 'mp3',
              resource_type: 'video',
              frame_rate: 90000,
              bit_rate: 129717,
              duration: 298.24,
            },
            createdAt: '2020-05-11T15:50:44.746Z',
            updatedAt: '2020-05-11T15:50:44.746Z',
            __v: 0,
          },
          createdAt: '2020-05-11T15:50:52.791Z',
          updatedAt: '2020-05-11T15:50:52.791Z',
        },
      ];
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #fff;
}
</style>
