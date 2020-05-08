import LikeBtn from "@/components/Shared/LikeButton";
import CommentBtn from "@/components/Shared/CommentButton";
import FacebookBtn from "@/components/Shared/FacebookButton";
import ViewsBtn from "@/components/Shared/ViewsButton";
import Tag from "@/components/Shared/Tag";
import UserAvatar from "@/components/Shared/UserAvatar";
import UserSocialLinks from "@/components/Shared/UserSocialLinks";
import AuthorProfile from "@/components/User/Profile";
import AuthorFollowCard from "@/components/User/AuthorFollow";
import Comment from "@/components/Comment/Comment";
import PostReactions from "@/components/Shared/PostReactions";
import OtherPostsOfAuthor from "@/components/Shared/OtherPostsOfAuthor";
import ReadTime from "@/components/Shared/readTime";
import WriteComment from "@/components/Comment/WriteComment";
import EditDeleteBtns from "@/components/Post/EditDeleteBtns";

import { mapActions, mapState } from "vuex";
import { userSocialLinks } from "@/mixins/userSocialLinks";

export const crudPost = {
  mixins: [userSocialLinks],
  data() {
    return {
      post: null,
      tagStyle: {
        fontSize: "0.975em !important",
        fontWeight: 300,
        padding: "5px 5px",
        height: "35px",
        letterSpacing: "0.0111333333em !important",
        marginLeft: "12px !important",
        borderRadius: "4px"
      },
    }
  },
  methods: {
    ...mapActions("post", ["getPostById", "deletePostById"]),
    async handleDeletePost() {
      const response = await this.deletePostById({
        id: this.post._id,
        typeQuery: this.post.type
      });
      if (response.status === 200) {
        this.$notify({
          type: "success",
          title: response.data.message
        });
      }
      if (response.status === 400) {
        this.$notify({
          type: "error",
          title: response.message
        });
      }
      setTimeout(() => {
        return this.$router.push({ path: "/stream" });
      }, 1000);
    },
    async fetchPost() {
      this.getPostById({
        id: this.$route.params.id,
        typeQuery: this.$route.query.type
      }).then(data => (this.post = data));
    },
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("utils", ["isLoading", "errorMes"]),
    isAuthor() {
      return this.post ? this.user._id === this.post.user._id : false;
    }
  },
  created() {
    this.fetchPost();
  },
  components: {
    Tag,
    ReadTime,
    UserSocialLinks,
    LikeBtn,
    CommentBtn,
    EditDeleteBtns,
    UserAvatar,
    FacebookBtn,
    ViewsBtn,
    Comment,
    WriteComment,
    AuthorProfile,
    AuthorFollowCard,
    PostReactions,
    OtherPostsOfAuthor,
    VBoilerplate: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          "v-skeleton-loader",
          {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props
            }
          },
          children
        );
      }
    }
  }
}