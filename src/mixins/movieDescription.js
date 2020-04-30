export const movieDescription = {
  methods: {
    isStar(index) {
      if (index <= this.movie.stars) return "#FDD835";
      else return "";
    },
    isAddComma(index, dataLength) {
      return (index + 1) < dataLength ? ', ' : ''
    },
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
    this.movie = this.post ? this.post.movie : this.movie

    let directors = 
      this.post ? 
      this.post.authors.filter(person => person.type === 'director') :
      this.authors.filter(person => person.type === 'director')
    if (!this.post) directors = directors.slice(0, 1)      
    this.directors = directors
      
    
    let actors = 
      this.post ? 
      this.post.authors.filter(person => person.type === 'actor' || person.type === 'actress') :
      this.authors.filter(person => person.type === 'actor' || person.type === 'actress')

    if (!this.post) actors = actors.slice(0, 3)
    this.actors = actors
      
  }
} 