export const userSocialLinks = {
  data() {
    return {
      userGithub: {},
      userFacebook: {},
      userLinkedin: {},
    }
  },
  computed: {
    socialLinks() {
      let links = [];
      if (this.userGithub)
        links.push({
          url: this.userGithub.url,
          icon: "mdi-github",
          color: "black"
        });
      if (this.userFacebook)
        links.push({
          url: this.userFacebook.url,
          icon: "mdi-facebook",
          color: "primary"
        });
      if (this.userLinkedin)
        links.push({
          url: this.userLinkedin.url,
          icon: "mdi-linkedin",
          color: "#006699"
        });
      return links;
    }
  },
  created() {
    this.userGithub =
      this.user.socialLinks.find(link => link.type === "Github") || {};
    this.userFacebook =
      this.user.socialLinks.find(link => link.type === "Facebook") || {};
    this.userLinkedin =
      this.user.socialLinks.find(link => link.type === "Linkedin") || {};
  },
  methods: {
    handleClickLink(url) {
      return window.open(url, "_blank");
    }
  }
}