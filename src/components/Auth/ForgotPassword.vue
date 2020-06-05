<template>
  <div id="app">
    <v-app id="inspire">
      <v-content class="grey lighten-5">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <ValidationObserver ref="observer">
                <v-form>
                  <v-card class="elevation-12 px-5 pt-2 pb-8">
                    <v-toolbar flat>
                      <v-toolbar-title>Forgot Password</v-toolbar-title>
                      <v-spacer />
                    </v-toolbar>
                    <v-card-text class="py-6 px-10">
                      <v-form>
                        <ValidationProvider
                          name="Password"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <div>New Password</div>
                          <v-text-field
                            :error-messages="errors"
                            id="password"
                            v-model="newPassword"
                            hint="Password should contain at least 8 characters, a lowercase, uppercase character and contain at most 30 characters!"
                            class="pt-0"
                            name="password"
                            type="password"
                          />
                        </ValidationProvider>
                        <ValidationProvider
                          name="Confirm password"
                          :rules="`required|samePassword:${newPassword}`"
                          v-slot="{ errors }"
                        >
                          <div>Confirm password</div>
                          <v-text-field
                            :error-messages="errors"
                            v-model="confirmPassword"
                            hint="Type new password again"
                            type="password"
                            class="pt-0"
                            required
                          />
                        </ValidationProvider>
                        <div>Email</div>
                        <v-row class="d-flex justify-center align-baseline">
                          <v-col cols="8" sm="8" md="8">
                            <ValidationProvider
                              name="Email"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="email"
                                :error-messages="errors"
                                name="email"
                                class="pt-0"
                                type="text"
                              />
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4" sm="4" md="4" class="text-right">
                            <v-btn
                              :disabled="isLoadingAPI"
                              @click="getEmailCode"
                              small
                              class="success"
                            >
                              Get code
                            </v-btn>
                          </v-col>
                        </v-row>
                        <ValidationProvider
                          name="Code"
                          rules="required|numeric"
                          v-slot="{ errors }"
                        >
                          <div>Code</div>
                          <v-text-field
                            :error-messages="errors"
                            v-model="code"
                            id="code"
                            name="code"
                            type="text"
                            class="pt-0"
                          />
                        </ValidationProvider>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                      <v-spacer />
                      <v-btn
                        :tile="true"
                        :disabled="
                          !email || !newPassword || !confirmPassword || !code
                        "
                        color="success"
                        @click="register"
                      >
                        Change Password
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </ValidationObserver>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, numeric } from 'vee-validate/dist/rules';
import { extend, setInteractionMode } from 'vee-validate';

import { ROUTES } from '@/mixins/routes';

setInteractionMode('eager');
extend('required', {
  ...required,
  message: '{_field_} is required',
});

extend('number', {
  ...required,
  message: '{_field_} is required',
});

extend('numeric', {
  ...numeric,
  message: '{_field_} must be a number',
});

extend('minmax', {
  validate(username, { min, max }) {
    return username.length >= Number(min) && username.length <= Number(max);
  },
  message:
    'Username should be greater than 5 and less than or equal 20 characters',
  params: ['min', 'max'],
});

extend('samePassword', {
  validate(confirmPassword, { newPassword }) {
    return confirmPassword === newPassword;
  },
  message: 'Confirm password is not matched',
  params: ['newPassword'],
});

export default {
  data() {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
      code: '',
      redirectLink: ROUTES.LOGIN,
    };
  },
  computed: {
    ...mapState('utils', ['errorMes', 'isLoadingAPI']),
  },
  methods: {
    ...mapActions('user', ['forgotPassword', 'getCode']),
    async register() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      const data = {
        email: this.email,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
        code: Number(this.code),
      };

      const res = await this.forgotPassword(data);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Success!',
          text: 'Change password success',
        });
        this.$router.push({ path: this.redirectLink });
      }
    },
    async getEmailCode() {
      if (!this.email) {
        return this.$notify({
          type: 'error',
          title: 'Error!',
          text: 'Please type email to get code',
        });
      }
      const res = await this.getCode(this.email);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Success!',
          text: 'Code has been sent to your email',
        });
      }
    },
  },
  watch: {
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          type: 'error',
          text: newVal,
        });
      }
    },
  },
  created() {
    this.ROUTES = ROUTES;
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>
