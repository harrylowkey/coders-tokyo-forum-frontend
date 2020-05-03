import Vue from 'vue'
import VueRouter from 'vue-router'

const Profile = () => import('@/components/User/Profile')
const Stream = () => import('@/components/Stream/Stream')
const Discussions = () => import('@/components/Post/Discussion/Discussions')
const Songs = () => import('@/components/Post/Audio/Song/SongList')
const Podcasts = () => import('@/components/Post/Audio/Podcast/PodcastList')
const Blogs = () => import('@/components/Post/Blog/BlogList')
const Food = () => import('@/components/Post/Review/Food/FoodList')
const Books = () => import('@/components/Post/Review/Book/BookList')
const Movies = () => import('@/components/Post/Review/Movie/MovieList')
const BlogDetails = () => import('@/components/ChildPage/Blog')
const BookDetails = () => import('@/components/ChildPage/Book')
const MovieDetails = () => import('@/components/ChildPage/Movie')
const FoodDetails = () => import('@/components/ChildPage/Food')
const SongDetails = () => import('@/components/ChildPage/Song')
const PodcastDetails = () => import('@/components/ChildPage/Podcast')
const DiscussionDetails = () => import('@/components/ChildPage/Discussion')
const CreatePost = () => import('@/components/Post/CreatePost')
const EditAudio = () => import('@/components/Post/Audio/EditAudio')
const EditBlog = () => import('@/components/Post/Blog/EditBlog')
const EditDiscussion = () => import('@/components/Post/Discussion/EditDiscussion')
const EditBook = () => import('@/components/Post/Review/Book/EditBook')
const EditMovie = () => import('@/components/Post/Review/Movie/EditMovie')
const EditFood = () => import('@/components/Post/Review/Food/EditFood')
const SignIn = () => import('@/components/Auth/Signin')
const SignUp = () => import('@/components/Auth/Signup')

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/signup',
    component: SignUp
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
    path: '/post-create',
    name: 'createPost',
    component: CreatePost,
  },
  {
    path: '/stream/discussions',
    name: 'discussion',
    component: Discussions,
  },
  {
    path: '/stream/songs',
    name: 'song',
    component: Songs,
  },
  {
    path: '/stream/podcasts',
    name: 'podcast',
    component: Podcasts,
  },
  {
    path: '/stream/food',
    name: 'food',
    component: Food,
  },
  {
    path: '/stream/movies',
    name: 'movie',
    component: Movies,
  },
  {
    path: '/stream/books',
    name: 'book',
    component: Books,
  },
  {
    path: '/stream/blogs',
    name: 'blog',
    component: Blogs,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/discussions/:id',
    name: 'discussionDetails',
    component: DiscussionDetails
  },
  {
    path: '/blogs/:id',
    name: 'blogDetails',
    component: BlogDetails
  },
  {
    path: '/bookReviews/:id',
    name: 'bookDetails',
    component: BookDetails
  },
  {
    path: '/movieReviews/:id',
    name: 'movieDetails',
    component: MovieDetails
  },
  {
    path: '/foodReviews/:id',
    name: 'foodDetails',
    component: FoodDetails
  },
  {
    path: '/songs/:id',
    name: 'songDetails',
    component: SongDetails
  },
  {
    path: '/podcasts/:id',
    name: 'podcastDetails',
    component: PodcastDetails
  },
  {
    path: '/edit/audio/:postId',
    name: 'editAudio',
    component: EditAudio
  },
  {
    path: '/edit/discussion/:postId',
    name: 'editDiscussion',
    component: EditDiscussion
  },
  {
    path: '/edit/blog/:postId',
    name: 'editBlog',
    component: EditBlog
  },
  {
    path: '/edit/book/:postId',
    name: 'editBook',
    component: EditBook
  },
  {
    path: '/edit/movie/:postId',
    name: 'editMovie',
    component: EditMovie
  },
  {
    path: '/edit/food/:postId',
    name: 'editFood',
    component: EditFood
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
