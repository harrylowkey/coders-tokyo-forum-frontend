import UserAvatar from "@/components/Shared/UserAvatar";
import CreateTagBlog from "@/components/Shared/CreateTagBlog";
import myUpload from "vue-image-crop-upload";
import { uploadBanner } from "@/mixins/uploadBanner";
import ToggleTag from "@/components/Shared/ToggleTag";
import { extend, setInteractionMode } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { mapActions, mapState } from "vuex";
import CreateTag from "@/components/Shared/CreateTag";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required"
});
export const createPost = {
  mixins: [uploadBanner],
  data() {
    return {
      imgDataUrl: "",
      isPreviewing: false,
      isUploadBanner: false
    }
  },
  methods: {
    ...mapActions("post", ["createPost"]),
    handleAddTag(tag) {
      this.data.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.data.tags.splice(tagIndex, 1);
    },
    togglePreviewContent() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.data.content.trim() !== "") {
        return (this.isPreviewing = true);
      }
    },
    async submit() {
      if (this.data.banner === "") {
        this.$notify({
          type: "error",
          title: "Let's upload the banner"
        });
        return;
      }

      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      const res = await this.createPost(this.data);
      if (res.status === 200) {
        this.$notify({
          type: "success",
          title: "Success"
        });
      }
      if (res.status === 400) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: res.message
        });
      }

      setTimeout(() => {
        return this.$router.push({
          path: `/${this.data.type}/${res.data._id}?type=${this.data.type.slice(0, this.data.type.length - 1)}`
        });
      }, 1000);
    }
  },
  computed: {
    ...mapState("utils", ["errorMes", "isLoading"]),
    ...mapState("user", ["accessToken", "user"]),
    headers() {
      return {
        Authorization: `Bearer ${this.accessToken}`
      };
    }
  },
  watch: {
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          type: "error",
          title: newVal
        });
      }
    }
  },
  components: {
    UserAvatar,
    CreateTagBlog,
    CreateTag,
    myUpload,
    ToggleTag
  },
}