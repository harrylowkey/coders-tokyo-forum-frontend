export const movieDescription = {
  methods: {
    isStar(index) {
      if (index <= this.movie.stars) return "#FDD835";
      else return "";
    }
  },
  computed: {
    calMovieStatusColor() {
      if (this.movie.status !== "Finished") return { color: 'red' }
      else return { color: 'green' }
    },
    calMovieYearColor() {
      let oldYearCss = {
        border: "1px solid #D50000 !important",
        backgroundColor: "#EF9A9A !important"
      };
      let thisYearCss = {
        border: "1px solid #90d2a3 !important",
        backgroundColor: "#C5E1A5 !important"
      };
      if (this.movie.year < new Date().getYear() + 1900) {
        return oldYearCss;
      } else {
        return thisYearCss;
      }
    }
  },
  created() {
    this.movie = this.post.movie,
    this.director = this.post.authors.find(person => person.type === 'director')
  }
} 