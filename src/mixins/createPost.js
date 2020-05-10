import UserAvatar from "@/components/Shared/UserAvatar";
import CreateTagBlog from "@/components/Shared/CreateTagBlog";
import myUpload from "vue-image-crop-upload";
import ToggleTag from "@/components/Shared/ToggleTag";
import CreateTag from "@/components/Shared/CreateTag";
import AttachImageDialog from '@/components/Shared/AttachImage'
import CoppyClipboard  from '@/components/Shared/CoppyClipboard'

import { extend, setInteractionMode } from "vee-validate";
import { required, numeric } from "vee-validate/dist/rules";
import { mapActions, mapState } from "vuex";

import { uploadBanner } from "@/mixins/uploadBanner";
import { attachImage } from '@/mixins/attachImage'

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required"
});

extend("minmax", {
  validate(value, { min, max }) {
    return value >= Number(min) && value <= Number(max);
  },
  message: "Valid range: 1 - 10",
  params: ["min", "max"]
});

extend("numeric", {
  ...numeric,
  message: "{_field_} must be a number"
});
export const createPost = {
  mixins: [uploadBanner, attachImage],
  methods: {
    ...mapActions("post", ["createPost", 'uploadFiles', 'deleteFile', 'uploadPhoto']),
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
    ToggleTag,
    AttachImageDialog,
    CoppyClipboard
  },
}