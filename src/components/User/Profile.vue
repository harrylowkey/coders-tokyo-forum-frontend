<template>
  <div>
    <v-container class="mt-12">
      <v-row>
        <v-col cols="12" sm="8">
          <profile-tabs
            v-if="!isLoading"
            :isOwner="isOwner"
            :user="profileUser"
          />
        </v-col>
        <v-col cols="12" sm="4" v-if="!isLoading">
          <v-container class="profile-details">
            <v-hover v-slot:default="{ hover }">
              <v-card
                max-width="344"
                class="mx-auto"
                shaped
                :elevation="hover ? 15 : 5"
              >
                <v-list-item-content
                  class="text-center pt-5 pb-3"
                  style=" postition: relative"
                >
                  <v-avatar size="70" style="cursor: pointer;">
                    <img
                      @click="showAvatar = !showAvatar"
                      :src="profileUser.avatar.secureURL"
                      alt="Avatar"
                    />
                  </v-avatar>
                  <v-card-actions style="position: absolute; top: 0; left: 53%">
                    <v-spacer />
                    <v-btn
                      icon
                      v-if="isOwner"
                      @click="dialogUploadAvatar = !dialogUploadAvatar"
                    >
                      <v-icon size="15" color="primary">party_mode</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-list-item-content>
                <my-upload
                  field="avatar"
                  @crop-upload-success="cropUploadSuccess"
                  @crop-upload-fail="cropUploadFail"
                  v-model="dialogUploadAvatar"
                  :width="400"
                  :height="400"
                  :headers="headers"
                  method="POST"
                  :url="APIS.UPLOAD_AVATAR"
                  img-format="jpg"
                  langType="en"
                />
                <v-dialog v-model="showAvatar" max-width="400">
                  <v-card
                    style="height: 400 !important:"
                    class="d-flex jutify-center"
                  >
                    <v-img
                      :src="profileUser.avatar.secureURL"
                      height="80%"
                      width="80%"
                      class="avatar"
                      style="cursor: pointer"
                      @click="showAvatar = !showAvatar"
                    />
                  </v-card>
                </v-dialog>
                <v-card-text class="px-8 py-1">
                  <v-form v-if="!isEdit">
                    <v-row>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Username</v-subheader>
                      </v-col>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="9"
                        style="padding: 0;"
                      >
                        <p class="mb-0 user-info">{{ profileUser.username }}</p>
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Email</v-subheader>
                      </v-col>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="9"
                        style="padding: 0"
                      >
                        <p class="mb-0 user-info">{{ profileUser.email }}</p>
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Password</v-subheader>
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="9"
                        md="7"
                        style="padding: 0"
                      >
                        <v-text-field
                          readonly
                          type="password"
                          name="input-10-2"
                          :value="'password'"
                          class="pt-0"
                        />
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Github</v-subheader>
                      </v-col>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="9"
                        :style="socialLinksStyle"
                      >
                        <a :href="userGithub.url" target="_blank">
                          {{ userGithub.url }}
                        </a>
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Facebook</v-subheader>
                      </v-col>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="9"
                        :style="socialLinksStyle"
                      >
                        <a :href="userFacebook.url" target="_blank">
                          {{ userFacebook.url }}
                        </a>
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Linkedin</v-subheader>
                      </v-col>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="9"
                        :style="socialLinksStyle"
                      >
                        <a :href="userLinkedin.url" target="_blank">
                          {{ userLinkedin.url }}
                        </a>
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Sex</v-subheader>
                      </v-col>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="9"
                        style="padding: 0"
                      >
                        <p class="user-info">{{ profileUser.sex }}</p>
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Job</v-subheader>
                      </v-col>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="9"
                        style="padding: 0"
                      >
                        <p class="user-info">{{ profileUser.job }}</p>
                      </v-col>

                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                        :style="propertyUserInfoStyle"
                      >
                        <v-subheader class="pa-0">Date join</v-subheader>
                      </v-col>
                      <v-col
                        class="col"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="9"
                        style="padding: 0"
                      >
                        <p class="pt-0 user-info">
                          {{ profileUser.createdAt | date }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-form>
                  <edit-profile
                    v-else
                    :user="profileUser"
                    :userGithub="userGithub"
                    :userFacebook="userFacebook"
                    :userLinkedin="userLinkedin"
                    @handleUpdateProfile="handleUpdateProfile"
                    @handleCancelEditProfile="handleCancelEditProfile"
                  />
                </v-card-text>
                <v-card-actions class="pt-0 pb-5 d-flex justify-end">
                  <v-btn
                    class="edit-btn-profile"
                    icon
                    v-if="isOwner && !isEdit"
                    @click="isEdit = !isEdit"
                  >
                    <v-icon color="primary">edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-container>
          <v-container class="profile-introduction">
            <v-hover v-slot:default="{ hover }">
              <v-card
                max-width="344"
                class="mx-auto"
                shaped
                :elevation="hover ? 15 : 5"
              >
                <v-card-title class="text-center pl-4">
                  Introduction
                </v-card-title>
                <v-divider />
                <v-card-text class="px-8 py-1">
                  <v-form v-if="!isEditDescription">
                    <v-row>
                      <v-col cols="12" sm="12" md="12" style="padding: 0;">
                        <v-textarea
                          auto-grow
                          class="pt-0"
                          :value="profileUser.description"
                          readonly
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                  <edit-description
                    v-else
                    @handleUpdateDescription="handleUpdateDescription"
                    @handleCancelEditDescription="handleCancelEditDescription"
                    :description="profileUser.description"
                  />
                </v-card-text>
                <v-card-actions class="pt-0 pb-5 d-flex justify-end">
                  <v-btn
                    class="edit-btn-description"
                    icon
                    v-if="isOwner && !isEditDescription"
                    @click="isEditDescription = !isEditDescription"
                  >
                    <v-icon color="primary">edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload';
import { mapActions, mapState } from 'vuex';

import { APIS } from '@/mixins/api-endpoints';

import ProfileTabs from './ProfileTabs';
import EditProfile from './EditProfile';
import EditDescription from './EditDescription';

export default {
  data() {
    return {
      propertyUserInfoStyle: {
        paddingLeft: '1px',
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
      },
      isEdit: false,
      isEditDescription: false,
      dialogUploadAvatar: false,
      loadingImageUpload: false,
      src: '',
      imgDataUrl: '',
      dataUpdate: {},
      showAvatar: false,
      userGithub: {
        type: 'Github',
        url: '',
      },
      userFacebook: {
        type: 'Facebook',
        url: '',
      },
      userLinkedin: {
        type: 'Linkedin',
        url: '',
      },
    };
  },
  computed: {
    ...mapState('utils', ['errorMes', 'isLoading']),
    ...mapState('user', ['accessToken', 'user']),
    isOwner() {
      return this.user.username === this.$route.params.username;
    },
    socialLinksStyle() {
      if (!this.isEdit) {
        return {
          paddingLeft: '0px',
          paddingRight: '0px',
        };
      } else {
        return {
          paddingTop: '0px',
          paddingLeft: '0px',
          paddingBottom: '0px',
        };
      }
    },
    headers() {
      return {
        Authorization: `Bearer ${this.accessToken}`,
      };
    },
  },
  watch: {
    $route(to) {
      this.fetchUserProfile(to.params.username);
    },
  },
  methods: {
    ...mapActions('user', [
      'uploadAvatar',
      'updateProfile',
      'getByUsername',
      'fetchFollowersAndFollowing',
    ]),
    onPickFile() {
      this.$refs.fileInput.click();
    },
    async cropUploadSuccess(res) {
      const response = await this.uploadAvatar({ avatar: res.data });
      if (response.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Update avatar success',
        });
        this.profileUser.avatar.secureURL = response.data.secureURL;
      }
    },
    cropUploadFail() {
      this.$notify({
        type: 'error',
        title: 'Upload avatar failed',
      });
    },
    handleUpdateProfile(res) {
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Update profile success',
        });

        const socialLinks = res.data.socialLinks;
        this.userGithub =
          socialLinks.find(link => link.type === 'Github') || this.userGithub;
        this.userFacebook =
          socialLinks.find(link => link.type === 'Facebook') ||
          this.userFacebook;
        this.userLinkedin =
          socialLinks.find(link => link.type === 'Linkedin') ||
          this.userLinkedin;
        this.profileUser = res.data;
      }
      this.isEdit = false;
    },
    handleUpdateDescription(res) {
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Update description success',
        });
        this.profileUser.description = res.data.description;
      }
      this.isEditDescription = false;
    },
    handleCancelEditProfile() {
      this.isEdit = false;
    },
    handleCancelEditDescription() {
      this.isEditDescription = false;
    },
    async fetchUserProfile(username) {
      this.getByUsername({ username }).then(data => {
        this.profileUser = data;
        this.fetchFollowersAndFollowing(data._id);
        this.userGithub =
          this.profileUser.socialLinks.find(link => link.type === 'Github') ||
          this.userGithub;
        this.userFacebook =
          this.profileUser.socialLinks.find(link => link.type === 'Facebook') ||
          this.userFacebook;
        this.userLinkedin =
          this.profileUser.socialLinks.find(link => link.type === 'Linkedin') ||
          this.userLinkedin;
      });
    },
  },
  created() {
    window.scrollTo(0, 0);
    this.APIS = APIS;
    this.fetchUserProfile(this.$route.params.username);
  },
  components: {
    ProfileTabs,
    myUpload,
    EditProfile,
    EditDescription,
  },
};
</script>

<style scoped>
.profile-detail {
  border: 1px solid lightgrey;
}

#image-placeholder {
  padding-top: 8em;
  padding-bottom: 8em;
  border: 2px dashed rgb(209, 209, 209);
}

.user-info {
  margin-top: 13px;
  color: #000;
}

.edit-btn-description {
  opacity: 0;
  transition: 600ms;
  position: absolute;
  top: 5px;
  right: 5px;
}

.edit-btn-profile {
  opacity: 0;
  transition: 600ms;
  transition: 600ms;
  position: absolute;
  top: 5px;
  right: 5px;
}

.profile-details:hover .edit-btn-profile {
  opacity: 1;
}

.profile-introduction:hover .edit-btn-description {
  opacity: 1;
}

.col {
  height: 40px !important;
}
</style>
