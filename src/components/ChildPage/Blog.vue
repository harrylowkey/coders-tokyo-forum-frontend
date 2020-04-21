<template>
  <v-row>
    <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="pr-0 wrapper-icon">
      <div class="icon-container d-flex flex-column align-center justify-space-around">
        <div class="wrapper-icon">
          <v-icon fab size="50" color="#F44336" class="icon heart-icon">mdi-heart-circle</v-icon>
          <span class="counter">{{ post.metadata.likes }}</span>
        </div>
        <div class="wrapper-icon">
          <v-icon fab size="50" color="#0288D1" class="icon saved-icon">mdi-content-save</v-icon>
          <span class="counter">{{ post.metadata.saves }}</span>
        </div>
        <div>
          <v-icon fab size="50" color="#66BB6A" class="icon coin-icon">mdi-bitcoin</v-icon>
        </div>
      </div>
    </v-col>
    <v-col cols="12" sm="12" md="8" lg="8" xl="8" class>
      <v-card class="mx-auto mt-6" id="blog-card" elevation="6">
        <v-container class="pa-0">
          <v-img
            src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
            height="450px"
            style
            class="cover-blog"
          ></v-img>
        </v-container>
        <v-container style="padding: 15px 50px 20px 50px">
          <v-list-item three-line style="padding: 10px 25px 25px 0px">
            <v-list-item-content class="pr-10 pt-lg-0">
              <v-list-item-title class="blog-title mb-0">
                <h1 class="blog-title">{{ post.topic }}</h1>
              </v-list-item-title>
              <v-card-actions class="pl-0">
                <v-avatar size="40" style="cursor: pointer" dark>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                    alt="Avatar"
                  />
                </v-avatar>
                <v-card-subtitle style="font-size: 16px" class="ml-n1 pr-0">
                  <a style="text-decoration: none; color: #000" href>{{ user.username }}</a>
                </v-card-subtitle>
                <v-list-item-icon class="mb-0 ml-3">
                  <v-icon
                    v-for="link in socialLinks"
                    :key="link.icon"
                    :color="link.color"
                    size="20"
                    class="pr-1"
                    style="cursor: pointer"
                    @click="handleClickLink(link.url)"
                  >{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-card-subtitle class="pl-1">{{ post.createdAt | date }}</v-card-subtitle>
                <v-card-subtitle class="pl-0">{{ readTime }} min read</v-card-subtitle>
              </v-card-actions>
              <v-card-text style="margin-left: -25px" class="pt-3">
                <tag
                  v-for="tag in post.tags"
                  :key="tag._id"
                  class="ml-2"
                  :tagName="tag.tagName"
                  :style="tagStyle"
                ></tag>
              </v-card-text>
            </v-list-item-content>
          </v-list-item>
          <div v-html="contentMarkDown"></div>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3" xl="3" class="wrapper-author-follow">
      <author-follow-card
        class="author-follow"
        :githubLink="userGithub.url"
        :facebookLink="userFacebook.url"
        :linkedinLink="userLinkedin.url"
        :user="user"
        :description="user.description"
      ></author-follow-card>
    </v-col>
  </v-row>
</template>

<script>
import marked from "marked";
import LikeBtn from "@/components/Shared/LikeButton";
import CommentBtn from "@/components/Shared/CommentButton";
import FacebookBtn from "@/components/Shared/FacebookButton";
import ViewsBtn from "@/components/Shared/ViewsButton";
import Tag from "@/components/Shared/Tag";
import UserAvatar from "@/components/Shared/UserAvatar";
import UserSocialLinks from "@/components/Shared/UserSocialLinks";
import AuthorProfile from "@/components/User/Profile";
import AuthorFollowCard from "@/components/User/AuthorFollow";
export default {
  data() {
    return {
      post: {
        _id: "5e9ab00f0591fb40fc87faa2",
        tags: [
          {
            _id: "5e8ddf319ac8ee2dd68b1cd7",
            tagName: "coercion"
          },
          {
            _id: "5e8cb5562ded8236f29fc885",
            tagName: "nhatanh"
          }
        ],
        comments: [],
        likes: [],
        savedBy: [],
        userId: {
          _id: "5e8b577f1a2dde3229879524",
          username: "nhat_anh"
        },
        topic: "Bạn chưa hiểu JavaScript đâu kỳ 2 - Coercion",
        description:
          "Tại sao mọi người lại  thích rời khỏi nhà và vác ba lô đi khắp thế giới đến như vậy ? Lý do thì muôn trùng không thể đếm xuể. Đôi khi lý do cũng rất khác biệt. Nhưng hãy xem 10 lý do mà tôi liệt kê dưới đây,để xem cái nào đúng nhất với bạn nhé.",
        content:
          "[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\nHow To Use The Demo\n-------------------\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n",
        type: "blog",
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
        createdAt: "2020-04-18T07:45:19.846Z",
        updatedAt: "2020-04-18T07:45:19.846Z",
        metadata: {
          _id: "5e9494fe935dfb5ed30435",
          comments: 123,
          likes: 69,
          saves: 1,
          views: 30,
          facebookShares: 50
        }
      },
      user: {
        _id: "5e8b577f1a2dde32298795f4",
        hobbies: ["music, reading book"],
        username: "hongquang",
        password: "hell0aA@",
        email: "quang.dang@homa.company",
        socialLinks: [
          {
            _id: "5e8f536b0416274996f69e75",
            type: "Github",
            url: "https://github.com/hongquangraem"
          },
          {
            _id: "5e8f536b0416274996f69e76",
            type: "Facebook",
            url: "https://facebook.com/spaceraem"
          }
        ],
        createdAt: "2020-04-06T16:23:27.385Z",
        updatedAt: "2020-04-13T14:43:32.772Z",
        job: "Developer",
        sex: "Male",
        avatar: {
          secureURL:
            "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
        },
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vel eveniet eligendi sapiente earum nam omnis praesentium quidem. Iusto laboriosam ducimus quis tenetur earum alias sint perferendis commodi fugit sed?"
      },
      userGithub: {},
      userFacebook: {},
      userLinkedin: {},
      customizeStyle: {
        avatarSize: 80,
        iconSize: 28,
        usernameStyle: {
          fontSize: "15px"
        }
      },
      tagStyle: {
        fontSize: "0.975em !important",
        fontWeight: 300,
        padding: "5px 5px",
        height: "35px",
        letterSpacing: "0.0111333333em !important",
        marginLeft: "12px !important",
        borderRadius: "4px"
      },
      readTime: 0
    };
  },
  computed: {
    contentMarkDown() {
      return marked(this.post.content);
    },
    socialLinks() {
      let links = [];
      if (this.userGithub)
        links.push({
          url: this.userGithub.url,
          icon: "mdi-github",
          color: "black"
        });
      if (this.userFacebook)
        links.push({
          url: this.userFacebook.url,
          icon: "mdi-facebook",
          color: "primary"
        });
      if (this.userLinkedin)
        links.push({
          url: this.userLinkedin.url,
          icon: "mdi-linkedin",
          color: "#006699"
        });
      return links;
    }
  },
  created() {
    this.userGithub =
      this.user.socialLinks.find(link => link.type === "Github") || {};
    this.userFacebook =
      this.user.socialLinks.find(link => link.type === "Facebook") || {};
    this.userLinkedin =
      this.user.socialLinks.find(link => link.type === "Linkedin") || {};

    let blogLength = this.countWord(this.post.content);
    let wordsPerMinute = blogLength / 200;
    let splitRes = wordsPerMinute.toString().split(".");
    let minutes = Number(splitRes[0]);
    let seconds = Number(splitRes[1]) * 0.6;
    let totalTime = minutes + seconds;
    this.readTime = Math.round(totalTime);
  },
  methods: {
    handleClickLink(url) {
      return window.open(url, "_blank");
    },
    countWord(text) {
      let s = text;
      s = s.replace(/(^\s*)|(\s*$)/gi, "");
      s = s.replace(/[ ]{2,}/gi, " ");
      s = s.replace(/\n /, "\n");
      return s.split(" ").length;
    }
  },
  components: {
    Tag,
    UserSocialLinks,
    LikeBtn,
    CommentBtn,
    UserAvatar,
    FacebookBtn,
    ViewsBtn,
    AuthorProfile,
    AuthorFollowCard
  }
};
</script>

<style>
#blog-card {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.blog-title {
  text-align: left;
  white-space: initial;
  line-height: 1.3;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.wrapper-author-follow {
  position: relative;
  padding: 0 25px;
}

.author-follow {
  position: fixed;
  max-width: 325px;
  z-index: 0;
  top: 100px;
}

.icon {
  font-size: 40px;
  cursor: pointer;
  border-radius: 50%;
  padding: 6px;
}

/* .heart-icon:hover {
  border: 1.5px solid #f44336;
}

.saved-icon:hover {
  border: 1.5px solid #0288d1;
}

.coin-icon:hover {
  border: 1.5px solid #66bb6a;
} */

.wrapper-icon {
  position: relative;
}

.icon-container {
  position: fixed;
  top: 85px;
  left: 15px;
  padding: 20px 10px;
  height: 300px;
}

.counter {
  position: absolute;
  top: 40px;
  right: -8px;

}

</style>