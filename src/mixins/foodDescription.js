export const foodDescription = {
  data() {
    return {
      maxSlice1: 1,
      maxSlice: 2,
    };
  },
  methods: {
    isStar(index) {
      const foodStars = this.post ? this.post.food.stars : this.food.stars;
      if (index <= foodStars) return '#FDD835';
      else return '';
    },
    calPointColor(point) {
      if (point < 5) {
        return {
          border: '1px solid #D50000 !important',
          backgroundColor: '#EF9A9A !important',
        };
      }
      if (point < 8) {
        return {
          border: '1px solid #FBC02D !important',
          backgroundColor: '#fdd835 !important',
        };
      }
      if (point >= 8) {
        return {
          border: '1px solid #90d2a3 !important',
          backgroundColor: '#C5E1A5 !important',
        };
      }
    },
  },
};
