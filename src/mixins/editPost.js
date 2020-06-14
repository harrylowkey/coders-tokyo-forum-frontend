import myUpload from 'vue-image-crop-upload';
import { extend, setInteractionMode } from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';
import { mapActions, mapState } from 'vuex';
import DOMPurify from 'dompurify';

import UserAvatar from '@/components/Shared/UserAvatar';
import CreateTagBlog from '@/components/Shared/CreateTagBlog';
import ToggleTag from '@/components/Shared/ToggleTag';
import CreateTag from '@/components/Shared/CreateTag';
import AttachImageDialog from '@/components/Shared/AttachImage';
import CoppyClipboard from '@/components/Shared/CoppyClipboard';
import { updateBanner } from '@/mixins/updateBanner';
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
export const editPost = {
  mixins: [updateBanner, attachImage],
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
      'editPost',
    ]),
    handleAddTag(tag) {
      this.post.tags.push(tag);
    },
    handleRemoveTag(tagIndex) {
      this.post.tags.splice(tagIndex, 1);
    },
    togglePreviewContent() {
      if (this.isPreviewing) {
        return (this.isPreviewing = false);
      }
      if (!this.isPreviewing && this.post.content.trim() !== '') {
        return (this.isPreviewing = true);
      }
    },
    sanitizeContent(text) {
      return DOMPurify.sanitize(text);
    },
    getNumberOfLines(text, minLines) {
      if (text && typeof text === 'string') {
        const lines = text.replace(/\r\n/g, '\n').split('\n').length;
        return lines > minLines ? lines : minLines; // replace makes sure, that this works with line breaks of different OS
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
