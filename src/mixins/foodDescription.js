export const foodDescription = {
  data() {
    return {
      maxSlice1: 1,
      maxSlice: 2
    };
  },
  methods: {
    isStar(index) {
      if (index <= this.food.stars) return "#FDD835";
      else return "";
    },
    calPointColor(point) {
      if (point < 5)
        return {
          border: "1px solid #D50000 !important",
          backgroundColor: "#EF9A9A !important"
        };
      if (point < 8)
        return {
          border: "1px solid #FBC02D !important",
          backgroundColor: "#fdd835 !important"
        };
      if (point >= 8)
        return {
          border: "1px solid #90d2a3 !important",
          backgroundColor: "#C5E1A5 !important"
        };
    }
  },
  created() {
    this.food = this.post ? this.post.food : this.food
  }
}