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
      commentMetadata: {},
    };
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('utils', [
      'isLoading',
      'isLoadingUpload',
      'isLoadingAPI',
      'isLoadmore',
      'errorMes',
    ]),
    isAuthor() {
      return this.post ? this.post.user._id === this.user._id : false;
    },
    isUserLiked() {
      const isUserLiked = this.post.likes.find(
        user => user._id === this.user._id,
      );
      return Boolean(isUserLiked);
    },
    isUserSaved() {
      const isUserSaved = this.post.savedBy.find(
        user => user._id === this.user._id,
      );
      return Boolean(isUserSaved);
    },
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
  methods: {
    ...mapActions('post', [
      'getPostById',
      'deletePostById',
      'likePost',
      'unlikePost',
      'loadmoreComments',
    ]),
    handleCommentPost({ newComment }) {
      newComment.user = this.user;
      this.post.comments.unshift(newComment);
    },
    async handleLoadmoreComments() {
      const response = await this.loadmoreComments({
        postId: this.post._id,
        limit: 5,
        page: this.commentMetadata.page + 1,
      });
      if (response.status === 200) {
        this.post.comments.push(...response.data);
        this.commentMetadata = response.metadata;
      }
    },
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

        let type = `${this.post.type}s`;
        if (
          this.post.type === 'book' ||
          this.post.type === 'food' ||
          this.post.type === 'movie'
        ) {
          type = `${this.post.type}Reviews`;
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
        this.commentMetadata = data.metadata.comment;
        this.authorProfileLink = ROUTES.USER_PROFILE({
          username: this.post.user.username,
        });
      });
    },
    hanldeClickCommentBtn() {
      const triggerScrollToComment = document.querySelector(
        '#trigger-scroll-comments',
      );
      triggerScrollToComment.click();
    },
    async onClickLikePost({ postId }) {
      const response = await this.likePost(postId);
      if (!response) {
        return this.$router.push({ path: ROUTES.LOGIN });
      }
      if (response.status === 200) {
        const post = this.otherPostsOfAuthor.find(post => post._id === postId);
        post.likes.push({ username: this.user.username, _id: this.user._id });
      }
      if (response.status === 409) {
        this.$notify({
          type: 'error',
          title: response.data.message,
        });
      }

      if (response.status === 401) {
        this.$router.push({ path: ROUTES.LOGIN });
      }
    },
    async onClickUnlikePost({ postId }) {
      const response = await this.unlikePost(postId);
      if (!response) {
        return this.$router.push({ path: ROUTES.LOGIN });
      }
      if (response.status === 200) {
        const post = this.otherPostsOfAuthor.find(post => post._id === postId);
        post.likes = post.lcommentIdikes.filter(
          _user => _user._id !== this.user._id,
        );
      }
      if (response.status === 409) {
        this.$notify({
          type: 'error',
          title: response.data.message,
        });
      }
    },
    isUserLikedAnotherPost(index) {
      const isUserLiked = this.otherPostsOfAuthor[index].likes.find(
        user => user._id === this.user._id,
      );
      return Boolean(isUserLiked);
    },
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
