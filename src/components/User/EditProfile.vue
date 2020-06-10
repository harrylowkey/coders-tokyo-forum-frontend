<template>
  <v-form>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col col">
        <v-subheader class="pa-0">Username</v-subheader>
      </v-col>
      <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0;">
        <v-text-field
          :rules="[rules.required]"
          class="pt-0"
          readonly
          :value="user.username"
        />
      </v-col>

      <v-col v-if="isOwner" cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader class="pa-0">Email</v-subheader>
      </v-col>
      <v-col v-if="isOwner" class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0">
        <v-text-field readonly :value="user.email" class="pt-0" />
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader v-if="isOwner" @keyup.enter="handleUpdateProfile" class="pa-0">
          Password
        </v-subheader>
      </v-col>

      <v-col class="col" cols="12" sm="9" md="7" style="padding: 0">
        <v-text-field
          readonly
          :rules="[rules.required, rules.min]"
          :type="isEditPassword ? 'text' : 'password'"
          name="input-10-2"
          value="password"
          @click:append="isEditPassword = !isEditPassword"
          class="pt-0"
        />
      </v-col>
      <v-col class="col" cols="12" sm="3" md="2">
        <v-btn icon @click="dialogChangePassword = !dialogChangePassword">
          <v-icon size="20" color="red">lock</v-icon>
        </v-btn>
      </v-col>

      <v-dialog persistent max-width="600px" v-model="dialogChangePassword">
        <change-password
          :email="user.email"
          @hanldeCancelChangePassword="
            dialogChangePassword = !dialogChangePassword
          "
          @closeChangePasswordModel="handleCloseChangePasswordModel"
        />
      </v-dialog>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader class="pa-0">Github</v-subheader>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="9" class="social-links col">
        <v-text-field
          @keyup.enter="handleUpdateProfile"
          v-model="editGithub.url"
          class="pt-0"
        />
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader class="pa-0">Facebook</v-subheader>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="9" class="social-links col">
        <v-text-field
          @keyup.enter="handleUpdateProfile"
          v-model="editFacebook.url"
          class="pt-0"
        />
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader class="pa-0">Linkedin</v-subheader>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="9" class="social-links col">
        <v-text-field
          @keyup.enter="handleUpdateProfile"
          v-model="editLinkedin.url"
          class="pt-0"
        />
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader class="pa-0">Sex</v-subheader>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="9" style="padding: 0">
        <v-radio-group v-model="editSex" row>
          <v-radio label="Male" value="Male" />
          <v-radio label="Female" value="Female" />
          <v-radio label="Unknown" value="Unknown" />
        </v-radio-group>
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader class="pa-0">Job</v-subheader>
      </v-col>
      <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0">
        <v-text-field
          @keyup.enter="handleUpdateProfile"
          v-model="editJob"
          class="pt-0"
        />
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader class="pa-0">Date join</v-subheader>
      </v-col>
      <v-col class="col" cols="12" sm="12" md="12" lg="9">
        <p class="pt-0 user-info">{{ user.createdAt | date }}</p>
      </v-col>
      <v-card-actions
        style="width: 100%"
        class="pt-1 pb-0 d-flex justify-center"
      >
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn @click="handleUpdateProfile" small color="success">
              Update
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn @click="onCancel" dark small color="red">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

import ChangePassword from './ChangePassword';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    userGithub: {
      type: Object,
      default: () => {},
    },
    userLinkedin: {
      type: Object,
      default: () => {},
    },
    userFacebook: {
      type: Object,
      default: () => {},
    },
    isOwner: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    ChangePassword,
  },
  data() {
    return {
      valid: true,
      propertyUserInfoStyle: {},
      socialLinksStyle: {
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingBottom: '0px',
      },
      editGithub: { ...this.userGithub },
      editFacebook: { ...this.userFacebook },
      editLinkedin: { ...this.userLinkedin },
      editSex: this.user.sex,
      editJob: this.user.job,
      isEditPassword: false,
      dialogChangePassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  created() {},
  methods: {
    ...mapActions('user', ['updateProfile', 'signOut']),
    handleCloseChangePasswordModel() {
      this.dialogChangePassword = false;
      this.signOut();
      this.$router.push({ path: '/stream' });
    },
    async handleUpdateProfile() {
      const socialLinks = [
        this.editGithub,
        this.editFacebook,
        this.editLinkedin,
      ].filter(link => link.url !== '');
      const data = {
        socialLinks,
        sex: this.editSex,
        job: this.editJob,
      };
      const res = await this.updateProfile(data);
      this.$emit('handleUpdateProfile', res);
    },
    onCancel() {
      this.$emit('handleCancelEditProfile');
    },
  },
};
</script>

<style scoped>
.key-style {
  padding-left: 1px;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
}

.col {
  height: 45px !important;
}

.social-links {
  padding: 0;
}
</style>
