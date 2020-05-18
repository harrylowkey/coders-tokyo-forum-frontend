import { mapActions, mapState } from 'vuex';

import LikeBtn from '@/components/Shared/LikeButton';
import CommentBtn from '@/components/Shared/CommentButton';
import FacebookBtn from '@/components/Shared/FacebookButton';
import ViewsBtn from '@/components/Shared/ViewsButton';
import Tag from '@/components/Shared/Tag';
import UserAvatar from '@/components/Shared/UserAvatar';
import UserSocialLinks from '@/components/Shared/UserSocialLinks';
import AuthorProfile from '@/components/User/Profile';
import AuthorFollowCard from '@/components/User/AuthorFollow';
import Comment from '@/components/Comment/Comment';
import PostReactions from '@/components/Shared/PostReactions';
import OtherPostsOfAuthor from '@/components/Shared/OtherPostsOfAuthor';
import ReadTime from '@/components/Shared/readTime';
import WriteComment from '@/components/Comment/WriteComment';
import EditDeleteBtns from '@/components/Post/EditDeleteBtns';
import { userSocialLinks } from '@/mixins/userSocialLinks';
import { toggleFollow } from '@/mixins/toggleFollow';
import { ROUTES } from '@/mixins/routes';

export const crudPost = {
  mixins: [userSocialLinks, toggleFollow],
  data() {
    return {
      post: null,
      tagStyle: {
        fontSize: '0.975em !important',
        fontWeight: 300,
        padding: '5px 5px',
        height: '35px',
        letterSpacing: '0.0111333333em !important',
        marginLeft: '12px !important',
        borderRadius: '4px',
      },
    };
  },
  methods: {
    ...mapActions('post', ['getPostById', 'deletePostById']),
    async handleDeletePost() {
      const response = await this.deletePostById({
        id: this.post._id,
        typeQuery: this.post.type,
      });
      if (response.status === 200) {
        this.$notify({
          type: 'success',
          title: response.data.message,
        });

        let type = this.post.type + 's';
        if (this.post.type === 'book' || this.post.type === 'food' || this.post.type === 'movie') {
          type = this.post.type + 'Reviews';
        }
        return this.$router.push({
          path: ROUTES.STREAM(`#${type}`),
        });
      }
      if (response.status === 400) {
        this.$notify({
          type: 'error',
          title: response.message,
        });
      }
    },
    async fetchPost() {
      this.getPostById({
        id: this.$route.params.id,
        typeQuery: this.$route.query.type,
      }).then(data => {
        this.post = data;
        console.log(data);
      });
    },
    hanldeClickCommentBtn() {
      const triggerScrollToComment = document.querySelector(
        '#trigger-scroll-comments',
      );
      triggerScrollToComment.click();
    },

  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('utils', ['isLoading', 'isLoadingUpload', 'isLoadingAPI', 'errorMes']),
    isAuthor() {
      return this.post ? this.post.user._id === this.user._id : false;
    },
    isUserLiked() {
      const isUserLiked = this.post.likes.find(user => user._id === this.user._id);
      return Boolean(isUserLiked);
    },
    isUserSaved() {
      const isUserSaved = this.post.savedBy.find(user => user._id === this.user._id);
      return Boolean(isUserSaved);
    }
  },
  async created() {
    await this.fetchPost();
  },
  mounted() {
    if (this.$route.hash === '#comment') {
      const triggerScrollToComment = document.querySelector(
        '#trigger-scroll-comments',
      );
      triggerScrollToComment.click();
    } else {
      window.scrollTo(0, 0);
    }
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
          'v-skeleton-loader',
          {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props,
            },
          },
          children,
        );
      },
    },
  },
};
