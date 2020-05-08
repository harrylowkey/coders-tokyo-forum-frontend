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