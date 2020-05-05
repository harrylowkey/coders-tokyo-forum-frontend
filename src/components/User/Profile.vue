<template>
  <v-container>
    <notifications class="notif" group="upload" />
    <v-row>
      <v-col cols="12" sm="8">
        <profile-tabs></profile-tabs>
      </v-col>
      <v-col cols="12" sm="4">
        <v-container class="profile-details">
          <v-hover v-slot:default="{ hover }">
            <v-card max-width="344" class="mx-auto" shaped :elevation="hover ? 15 : 5">
              <v-list-item-content class="text-center pt-5 pb-3" style=" postition: relative">
                <v-avatar size="70" style="cursor: pointer;">
                  <img @click="showAvatar =! showAvatar" :src="user.avatar.secureURL" alt="Avatar" />
                </v-avatar>
                <v-card-actions style="position: absolute; top: 0; left: 53%">
                  <v-spacer></v-spacer>
                  <v-btn icon v-if="isOwner" @click="dialogUploadAvatar = !dialogUploadAvatar">
                    <v-icon size="15" color="primary">party_mode</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-list-item-content>
              <my-upload
                field="path"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="dialogUploadAvatar"
                :width="400"
                :height="400"
                url="http://localhost:3000/api/v1/users/avatars"
                :headers="headers"
                img-format="jpg"
                langType="en"
              ></my-upload>
              <v-dialog v-model="showAvatar" max-width="400">
                <v-card style="height: 400 !important:" class="d-flex jutify-center">
                  <v-img
                    :src="user.avatar.secureURL"
                    height="80%"
                    width="80%"
                    class="avatar"
                    style="cursor: pointer"
                    @click="showAvatar =! showAvatar"
                  ></v-img>
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
                    <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0;">
                      <p class="mb-0 user-info">{{ user.username }}</p>
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
                    <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0">
                      <p class="mb-0 user-info">{{ user.email }}</p>
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

                    <v-col class="col" cols="12" sm="9" md="7" style="padding: 0">
                      <v-text-field
                        readonly
                        type="password"
                        name="input-10-2"
                        :value="'password'"
                        class="pt-0"
                      ></v-text-field>
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
                    <v-col class="col" cols="12" sm="12" md="12" lg="9" :style="socialLinksStyle">
                      <a :href="userGithub.url" target="_blank">{{ userGithub.url }}</a>
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
                    <v-col class="col" cols="12" sm="12" md="12" lg="9" :style="socialLinksStyle">
                      <a :href="userFacebook.url" target="_blank">{{ userFacebook.url }}</a>
                    </v-col>

                    <v-col
                      class="col"
                      cols="12"
                      sm="12"
                      md="12"
                      lg="3"
                      :style="propertyUserInfoStyle"
                    >
                      <v-subheader class="pa-0">Linked</v-subheader>
                    </v-col>
                    <v-col class="col" cols="12" sm="12" md="12" lg="9" :style="socialLinksStyle">
                      <a :href="userLinkedin.url" target="_blank">{{ userLinkedin.url }}</a>
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
                    <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0">
                      <p class="user-info">{{ user.sex }}</p>
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
                    <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0">
                      <p class="user-info">{{ user.job }}</p>
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
                    <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0">
                      <p class="pt-0 user-info">{{ user.createdAt | date }}</p>
                    </v-col>
                  </v-row>
                </v-form>
                <edit-profile
                  v-else
                  :user="user"
                  :userGithub="userGithub"
                  :userFacebook="userFacebook"
                  :userLinkedin="userLinkedin"
                  @handleUpdateProfile="handleUpdateProfile"
                  @handleCancelEditProfile="handleCancelEditProfile"
                ></edit-profile>
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
            <v-card max-width="344" class="mx-auto" shaped :elevation="hover ? 15 : 5">
              <v-card-title class="text-center pl-4">Introduction</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="px-8 py-1">
                <v-form>
                  <v-row>
                    <v-col cols="12" sm="12" md="12" style="padding: 0;">
                      <v-textarea
                        auto-grow
                        class="pt-0"
                        :value="user.description"
                        :readonly="!isUpdateDescription"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer v-if="!isUpdateDescription"></v-spacer>
                <v-btn
                  class="edit-btn-description"
                  icon
                  v-if="isOwner && !isUpdateDescription"
                  @click="isUpdateDescription = !isUpdateDescription"
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
</template>

<script>
import ProfileTabs from "./ProfileTabs";
import myUpload from "vue-image-crop-upload";
import EditProfile from "./EditProfile";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      user: {},
      propertyUserInfoStyle: {
        paddingLeft: "1px",
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0
      },
      isEdit: false,
      dialogUploadAvatar: false,
      loadingImageUpload: false,
      src: "",
      isUpdateDescription: false,
      imgDataUrl: "",
      dataUpdate: {},
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGI1NzdmMWEyZGRlMzIyOTg3OTVmNCIsImVtYWlsIjoicXVhbmcuZGFuZ0Bob21hLmNvbXBhbnkiLCJpYXQiOjE1ODg2NTMxODMsImV4cCI6MTU4ODY2MDM4M30.voYkKVUkSFvkIWdmIqfS-cXu91oa1r5pfbaflUnduBQ"
      },
      showAvatar: false,
      avatarImg: "",
      userGithub: {
        type: "Github",
        url: ""
      },
      userFacebook: {
        type: "Facebook",
        url: ""
      },
      userLinkedin: {
        type: "Linkedin",
        url: ""
      }
    };
  },
  created() {
    this.user = this.$store.getters.user;
    this.userGithub =
      this.user.socialLinks.find(link => link.type === "Github") ||
      this.userGithub;
    this.userFacebook =
      this.user.socialLinks.find(link => link.type === "Facebook") ||
      this.userFacebook;
    this.userLinkedin =
      this.user.socialLinks.find(link => link.type === "Linkedin") ||
      this.userLinkedin;
  },
  computed: {
    ...mapState("utils", ["errorMes", "isLoading"]),
    ...mapState("users", ["accessToken"]),
    bindHeader() {
      this.headers = { Authorization: `Bearer ${this.accessToken}` };
    },
    isOwner() {
      return true;
    },
    socialLinksStyle() {
      if (!this.isEdit) {
        return {
          paddingLeft: "0px",
          paddingRight: "0px"
        };
      } else
        return {
          paddingTop: "0px",
          paddingLeft: "0px",
          paddingBottom: "0px"
        };
    },
    loading() {
      return this.loadingImageUpload;
    }
  },
  watch: {
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          group: "auth",
          type: "error",
          title: "Update failed",
          text: newVal
        });
      }
    }
  },
  methods: {
    ...mapActions("user", ["uploadAvatar", "updateProfile"]),
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onPickedFile(event) {
      this.loadingImageUpload = true;
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a vaid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.src = fileReader.result;
        this.loadingImageUpload = false;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      console.log("image", this.image);
    },
    cropSuccess(imgDataUrl, field) {
      this.avatarImg = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      this.$notify({
        group: "upload",
        type: "success",
        title: "Update avatar success"
      });
      this.uploadAvatar({ data: jsonData.data });
    },
    cropUploadFail(status, field) {
      this.$notify({
        group: "upload",
        type: "error",
        title: "Update avatar failed"
      });
    },
    async handleUpdateProfile(res) {
      if (res.status === 200) {
        this.$notify({
          group: "upload",
          type: "success",
          title: "Update profile success"
        });
      }
      if (res.status === 400) {
        this.$notify({
          group: "upload",
          type: "error",
          title: "Update profile failed"
        });
      }
      this.user = res.data
      this.isEdit = false;
    },
    handleCancelEditProfile() {
      this.isEdit = false;
    }
  },
  components: {
    ProfileTabs,
    myUpload,
    EditProfile
  }
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