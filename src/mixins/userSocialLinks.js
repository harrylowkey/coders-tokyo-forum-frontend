export const userSocialLinks = {
  computed: {
    socialLinks() {
      const userSocialLinks = this.post
        ? this.post.user.socialLinks
        : this.author.socialLinks;
      const links = userSocialLinks.map(link => {
        const obj = {
          _id: link._id,
          url: link.url,
          type: link.type,
        };
        if (link.type === 'Github') {
          obj.color = 'black';
          obj.icon = 'mdi-github';
        }
        if (link.type === 'Facebook') {
          obj.color = 'primary';
          obj.icon = 'mdi-facebook';
        }
        if (link.type === 'Linkedin') {
          obj.color = '#006699';
          obj.icon = 'mdi-linkedin';
        }
        return obj;
      });
      return links;
    },
  },
  methods: {
    handleClickLink(url) {
      return window.open(url, '_blank');
    },
  },
};
