import myUpload from 'vue-image-crop-upload';
import { extend, setInteractionMode } from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';
import { mapActions, mapState } from 'vuex';
import DOMPurify from 'dompurify';

import { ROUTES } from '@/mixins/routes';
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
  data() {
    return {
      langExtVN: {
        hint: 'Nhấp hoặc kéo tệp vào đây để tải lên',
        loading: 'Đang tải lên…',
        noSupported:
          'Trình duyệt không được hỗ trợ, vui lòng sử dụng IE10 + hoặc các trình duyệt khác',
        success: 'Tải lên thành công',
        fail: 'Tải lên thất bại',
        preview: 'Xem trước',
        btn: {
          off: 'Hủy',
          close: 'Đóng',
          back: 'Trở lại',
          save: 'Xác nhận',
        },
        error: {
          onlyImg: 'Chỉ chọn hình ảnh',
          outOfSize: 'Kích thước ảnh quả lớn: ',
          lowestPx: 'Kích thước ảnh quá nhỏ. Kích thước nhỏ nhất từ: ',
        },
      },
    };
  },
  methods: {
    ...mapActions('post', [
      'createPost',
      'uploadFiles',
      'deleteFile',
      'uploadFile',
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
    sanitizeContent(text) {
      return DOMPurify.sanitize(
        text,
        {
          FORBID_TAGS: ['style', 'marquee'],
        },
        {
          FORBID_ATTR: ['style'],
        },
      );
    },
    getNumberOfLines(text, minLines) {
      if (text && typeof text === 'string') {
        const lines = text.replace(/\r\n/g, '\n').split('\n').length;
        return lines > minLines ? lines : minLines; // replace makes sure, that this works with line breaks of different OS
      }
    },
    async submit() {
      if (this.data.cover === '') {
        this.$notify({
          type: 'error',
          title: `${this.$t('notifications.title.Error')}!`,
          text: this.$t("Let's upload the banner"),
        });
        return;
      }

      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      this.data.content = this.sanitizeContent(this.data.content);
      const res = await this.createPost(this.data);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: this.$t('Create post success'),
        });

        setTimeout(() => {
          return this.$router.push({ path: ROUTES.BLOG(res.data._id) });
        }, 1000);
      }
      if (res.status === 400) {
        this.$notify({
          type: 'error',
          title: 'Failed',
          text: this.$t(res.message),
        });
      }
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
          title: this.$t(newVal),
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
