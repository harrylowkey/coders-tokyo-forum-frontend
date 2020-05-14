<template>
  <v-form>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col col">
        <v-subheader class="pa-0">Username</v-subheader>
      </v-col>
      <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0;">
        <v-text-field
          @keyup.enter="handleUpdateProfile"
          :rules="[rules.required]"
          v-model="editUsername"
          class="pt-0"
        />
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader class="pa-0">Email</v-subheader>
      </v-col>
      <v-col class="col" cols="12" sm="12" md="12" lg="9" style="padding: 0">
        <v-text-field
          @keyup.enter="handleUpdateProfile"
          readonly
          :value="user.email"
          class="pt-0"
        />
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="3" class="key-style col">
        <v-subheader @keyup.enter="handleUpdateProfile" class="pa-0">
          Password
        </v-subheader>
      </v-col>

      <v-col class="col" cols="12" sm="9" md="7" style="padding: 0">
        <v-text-field
          readonly
          :rules="[rules.required, rules.min]"
          :type="isEditPassword ? 'text' : 'password'"
          name="input-10-2"
          :value="'password'"
          @click:append="isEditPassword = !isEditPassword"
          class="pt-0"
        />
      </v-col>
      <v-col class="col" cols="12" sm="3" md="2">
        <v-btn icon @click="dialogChangePassword = !dialogChangePassword">
          <v-icon size="20" color="red">lock</v-icon>
        </v-btn>
      </v-col>
      <v-dialog v-model="dialogChangePassword" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Change Password</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container>
              <v-row>
                <v-col cols="12" sm="11">
                  <v-text-field
                    v-model="oldPassword"
                    label="Old Password*"
                    type="password"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="11">
                  <v-text-field
                    v-model="newPassword"
                    label="New password*"
                    type="password"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="11">
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm password*"
                    type="password"
                    required
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="dialogChangePassword = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogChangePassword = false"
            >
              Save
            </v-btn>
          </v-card-actions>
          <p></p>
        </v-card>
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

export default {
  props: ['user', 'userGithub', 'userLinkedin', 'userFacebook'],
  data() {
    return {
      valid: true,
      propertyUserInfoStyle: {},
      socialLinksStyle: {
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingBottom: '0px',
      },
      editUsername: this.user.username,
      editGithub: { ...this.userGithub },
      editFacebook: { ...this.userFacebook },
      editLinkedin: { ...this.userLinkedin },
      editSex: this.user.sex,
      editJob: this.user.job,
      isEditPassword: false,
      dialogChangePassword: false,
      newPassword: '',
      confirmPassword: '',
      oldPassword: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  created() {},
  methods: {
    ...mapActions('user', ['updateProfile']),
    async handleUpdateProfile() {
      const socialLinks = [
        this.editGithub,
        this.editFacebook,
        this.editLinkedin,
      ].filter(link => link.url !== '');
      const data = {
        username: this.editUsername,
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

<style>
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
