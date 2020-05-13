export const movieDescription = {
  methods: {
    isStar(index) {
      const movieStars = this.post ? this.post.movie.stars : this.movie.stars;
      if (index <= movieStars) return '#FDD835';
      else return '';
    },
    isAddComma(index, dataLength) {
      return index + 1 < dataLength ? ', ' : '';
    },
  },
  computed: {
    calMovieStatusColor() {
      const movieStatus = this.post
        ? this.post.movie.status
        : this.movie.status;
      if (movieStatus !== 'Finished') return { color: 'red' };
      else return { color: 'green' };
    },
    calMovieYearColor() {
      const oldYearCss = {
        border: '1px solid #D50000 !important',
        backgroundColor: '#EF9A9A !important',
      };
      const thisYearCss = {
        border: '1px solid #90d2a3 !important',
        backgroundColor: '#C5E1A5 !important',
      };

      const movieYear = this.post ? this.post.movie.year : this.movie.year;
      if (movieYear < new Date().getYear() + 1900) {
        return oldYearCss;
      } else {
        return thisYearCss;
      }
    },
    slicedActors() {
      let actors = this.post
        ? this.post.authors.filter(
            person => person.type === 'actor' || person.type === 'actress',
          )
        : this.authors.filter(
            person => person.type === 'actor' || person.type === 'actress',
          );

      if (!this.post) actors = actors.slice(0, 3);
      return actors;
    },
    slicedDirectors() {
      let directors = this.post
        ? this.post.authors.filter(person => person.type === 'director')
        : this.authors.filter(person => person.type === 'director');
      if (!this.post) directors = directors.slice(0, 1);
      return directors;
    },
  },
};
