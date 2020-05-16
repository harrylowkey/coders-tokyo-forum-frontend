/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthGuard from './auth-guard';

const SignIn = () => import('@/components/Auth/Signin');
const SignUp = () => import('@/components/Auth/Signup');
const Profile = () => import('@/components/User/Profile');
const Stream = () => import('@/components/Stream/Stream');
const CreatePost = () => import('@/components/Post/CreatePost');
const CreateDiscussion = () =>
  import('@/components/Post/Discussion/CreateDiscussion');
const CreateBlog = () => import('@/components/Post/Blog/CreateBlog');
const CreateBookReview = () =>
  import('@/components/Post/Review/Book/CreateBook');
const CreateFoodReview = () =>
  import('@/components/Post/Review/Food/CreateFood');
const CreateMovieReview = () =>
  import('@/components/Post/Review/Movie/CreateMovie');
const CreateAudio = () => import('@/components/Post/Audio/CreateAudio');
const EditAudio = () => import('@/components/Post/Audio/EditAudio');
const EditBlog = () => import('@/components/Post/Blog/EditBlog');
const EditDiscussion = () =>
  import('@/components/Post/Discussion/EditDiscussion');
const EditBook = () => import('@/components/Post/Review/Book/EditBook');
const EditMovie = () => import('@/components/Post/Review/Movie/EditMovie');
const EditFood = () => import('@/components/Post/Review/Food/EditFood');
const BlogDetails = () => import('@/components/ChildPage/Blog');
const BookDetails = () => import('@/components/ChildPage/Book');
const MovieDetails = () => import('@/components/ChildPage/Movie');
const FoodDetails = () => import('@/components/ChildPage/Food');
const SongDetails = () => import('@/components/ChildPage/Song');
const PodcastDetails = () => import('@/components/ChildPage/Podcast');
const DiscussionDetails = () => import('@/components/ChildPage/Discussion');

Vue.use(VueRouter);

const routes = [
  {
    path: '/signin',
    component: SignIn,
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '/',
    component: Stream,
  },
  {
    path: '/stream',
    name: 'stream',
    component: Stream,
  },
  {
    path: '/writePost',
    component: CreatePost,
    beforeEnter: AuthGuard,
  },
  {
    path: '/writePost/discussion',
    component: CreateDiscussion,
    beforeEnter: AuthGuard,
  },
  {
    path: '/writePost/blog',
    component: CreateBlog,
    beforeEnter: AuthGuard,
  },
  {
    path: '/writePost/bookReview',
    component: CreateBookReview,
    beforeEnter: AuthGuard,
  },
  {
    path: '/writePost/movieReview',
    component: CreateMovieReview,
    beforeEnter: AuthGuard,
  },
  {
    path: '/writePost/foodReview',
    component: CreateFoodReview,
    beforeEnter: AuthGuard,
  },
  {
    path: '/writePost/song',
    component: CreateAudio,
    beforeEnter: AuthGuard,
  },
  {
    path: '/writePost/podcast',
    component: CreateAudio,
    beforeEnter: AuthGuard,
  },
  {
    path: '/stream#discussions',
    component: Stream,
  },
  {
    path: '/stream#songs',
    component: Stream,
  },
  {
    path: '/stream#podcasts',
    component: Stream,
  },
  {
    path: '/stream#foodReviews',
    component: Stream,
  },
  {
    path: '/stream#movieReviews',
    component: Stream,
  },
  {
    path: '/stream#bookReviews',
    component: Stream,
  },
  {
    path: '/stream#blogs',
    component: Stream,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: AuthGuard,
  },
  {
    path: '/discussions/:id',
    name: 'discussionDetails',
    component: DiscussionDetails,
  },
  {
    path: '/blogs/:id',
    name: 'blogDetails',
    component: BlogDetails,
  },
  {
    path: '/bookReviews/:id',
    name: 'bookDetails',
    component: BookDetails,
  },
  {
    path: '/movieReviews/:id',
    name: 'movieDetails',
    component: MovieDetails,
  },
  {
    path: '/foodReviews/:id',
    name: 'foodDetails',
    component: FoodDetails,
  },
  {
    path: '/songs/:id',
    name: 'songDetails',
    component: SongDetails,
  },
  {
    path: '/podcasts/:id',
    name: 'podcastDetails',
    component: PodcastDetails,
  },
  {
    path: '/edit/podcast/:id',
    name: 'editAudio',
    component: EditAudio,
    beforeEnter: AuthGuard,
  },
  {
    path: '/edit/song/:id',
    name: 'editAudio',
    component: EditAudio,
    beforeEnter: AuthGuard,
  },
  {
    path: '/edit/discussion/:id',
    name: 'editDiscussion',
    component: EditDiscussion,
    beforeEnter: AuthGuard,
  },
  {
    path: '/edit/blog/:id',
    name: 'editBlog',
    component: EditBlog,
    beforeEnter: AuthGuard,
  },
  {
    path: '/edit/book/:id',
    name: 'editBook',
    component: EditBook,
  },
  {
    path: '/edit/movie/:id',
    name: 'editMovie',
    component: EditMovie,
    beforeEnter: AuthGuard,
  },
  {
    path: '/edit/food/:id',
    name: 'editFood',
    component: EditFood,
    beforeEnter: AuthGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
