<template>
  <v-container class="pt-0">
    <food
      v-for="item in foodList"
      :key="item._id"
      :url="item.url"
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
      :food="item.food"
    ></food>
  </v-container>
</template>

<script>
import Food from "./Food";
export default {
  components: {
    food: Food
  },
  data() {
    return {
      foodList: [
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
          url: 'facebook.com',
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
            priceUnit: 'VND',
            address: "Let’s Sushi 13B Quốc Tử Giám ",
            stars: 5,
            restaurant: "Let's sushi",
            quality: 7.8,
            price: 8,
            service: 10,
            space: 8,
            openTime: '10:00 - 22:00'
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
        }
      ]
    };
  }
};
</script>

<style>
</style>
