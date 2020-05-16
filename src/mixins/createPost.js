import myUpload from 'vue-image-crop-upload';
import { extend, setInteractionMode } from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';
import { mapActions, mapState } from 'vuex';

import UserAvatar from '@/components/Shared/UserAvatar';
import CreateTagBlog from '@/components/Shared/CreateTagBlog';
import ToggleTag from '@/components/Shared/ToggleTag';
import CreateTag from '@/components/Shared/CreateTag';
import AttachImageDialog from '@/components/Shared/AttachImage';
import CoppyClipboard from '@/components/Shared/CoppyClipboard';
import { uploadBanner } from '@/mixins/uploadBanner';
import { attachImage } from '@/mixins/attachImage';

setInteractionMode('eager');
extend('required', {
  ...required,
  message: '{_field_} is required',
});

extend('minmax', {
  validate(value, { min, max }) {
    return value >= Number(min) && value <= Number(max);
  },
  message: 'Valid range: 1 - 10',
  params: ['min', 'max'],
});

extend('numeric', {
  ...numeric,
  message: '{_field_} must be a number',
});
export const createPost = {
  mixins: [uploadBanner, attachImage],
  methods: {
    ...mapActions('post', [
      'createPost',
      'uploadFiles',
      'deleteFile',
      'uploadPhoto',
    ]),
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
      if (!this.isPreviewing && this.data.content.trim() !== '') {
        return (this.isPreviewing = true);
      }
    },
    async submit() {
      if (this.data.cover === '') {
        this.$notify({
          type: 'error',
          title: "Let's upload the banner",
        });
        return;
      }

      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      const res = await this.createPost(this.data);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Success',
        });
      }
      if (res.status === 400) {
        this.$notify({
          type: 'error',
          title: 'Failed',
          text: res.message,
        });
      }

      setTimeout(() => {
        return this.$router.push({
          path: `/${this.data.type}/${res.data._id}?type=${this.data.type.slice(
            0,
            this.data.type.length - 1,
          )}`,
        });
      }, 1000);
    },
  },
  computed: {
    ...mapState('utils', ['errorMes', 'isLoading', 'isLoadingUpload']),
    ...mapState('user', ['accessToken', 'user']),
    headers() {
      return {
        Authorization: `Bearer ${this.accessToken}`,
      };
    },
  },
  watch: {
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          type: 'error',
          title: newVal,
        });
      }
    },
  },
  components: {
    UserAvatar,
    CreateTagBlog,
    CreateTag,
    myUpload,
    ToggleTag,
    AttachImageDialog,
    CoppyClipboard,
  },
};
