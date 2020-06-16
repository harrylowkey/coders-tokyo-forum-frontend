<template>
  <ValidationObserver ref="observer">
    <v-form>
      <v-card class="pb-1">
        <v-card-title>
          <span class="headline">{{ $t('Change Password') }}</span>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-container>
            <v-row>
              <v-col cols="12" sm="11">
                <ValidationProvider
                  name="Old password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :error-messages="$t(errors)"
                    v-model="oldPassword"
                    :label="$t('Old Password*')"
                    type="password"
                    required
                  />
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="11">
                <ValidationProvider
                  name="New password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :error-messages="$t(errors)"
                    v-model="newPassword"
                    :label="$t('New password*')"
                    type="password"
                    :hint="
                      $t(
                        'Password should contain at least 8 characters, a lowercase, uppercase character and contain at most 20 characters!',
                      )
                    "
                    required
                  />
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="11">
                <ValidationProvider
                  name="Confirm password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :error-messages="$t(errors)"
                    v-model="confirmPassword"
                    :label="$t('Confirm password*')"
                    hint="Type new password again"
                    type="password"
                    required
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" sm="9" md="9">
                <ValidationProvider
                  name="Code"
                  rules="required|numeric"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    type="text"
                    :error-messages="$t(errors)"
                    id="code"
                    label="Code"
                    name="code"
                    prepend-icon="lock"
                    v-model="code"
                  />
                </ValidationProvider>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                md="3"
                class="d-flex justify-center align-center pt-4"
              >
                <v-btn
                  :disabled="isLoadingAPI"
                  @click="getEmailCode"
                  small
                  class="success"
                >
                  {{ $t('Get code') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0 pr-5 pb-0">
          <v-spacer />
          <v-btn class="white--text" small color="red" @click="onClickCancel">
            {{ $t('Cancel') }}
          </v-btn>
          <v-btn
            class="white--text ml-3"
            small
            color="green"
            @click="onClickSubmit"
          >
            {{ $t('Change password') }}
          </v-btn>
        </v-card-actions>
        <p />
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, numeric } from 'vee-validate/dist/rules';
import { extend, setInteractionMode } from 'vee-validate';

setInteractionMode('eager');
extend('required', {
  ...required,
  message: '{_field_} is required',
});

extend('numeric', {
  ...numeric,
  message: '{_field_} must be a number',
});

export default {
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      code: '',
    };
  },
  computed: {
    ...mapState('utils', ['isLoadingAPI']),
  },
  methods: {
    ...mapActions('user', ['getCode', 'changePassword']),
    onClickCancel() {
      this.$emit('hanldeCancelChangePassword');
    },
    async onClickSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      const data = {
        email: this.email,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
        code: Number(this.code),
      };
      const response = await this.changePassword(data);
      if (response.status === 200) {
        this.$notify({
          type: 'success',
          title: `${this.$t('notifications.title.Success')}!`,
          text: this.$t('Change password success'),
        });
        this.$emit('closeChangePasswordModel');
      }
    },
    async getEmailCode() {
      const res = await this.getCode(this.email);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: `${this.$t('notifications.title.Success')}!`,
          text: 'Code has been sent to your email',
        });
      }
    },
  },
};
</script>
