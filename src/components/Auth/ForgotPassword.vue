<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <ValidationObserver ref="observer">
                <v-form>
                  <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                      <v-toolbar-title>Forgot Password</v-toolbar-title>
                      <v-spacer />
                    </v-toolbar>
                    <v-card-text class="pb-0">
                      <v-form>
                        <ValidationProvider
                          name="Password"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :error-messages="errors"
                            id="password"
                            v-model="newPassword"
                            hint="Password should contain at least 8 characters, a lowercase, uppercase character and contain at most 30 characters!"
                            label="New Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                          />
                        </ValidationProvider>
                        <ValidationProvider
                          name="Confirm password"
                          :rules="`required|samePassword:${newPassword}`"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :error-messages="errors"
                            v-model="confirmPassword"
                            label="Confirm password"
                            hint="Type new password again"
                            prepend-icon="lock"
                            type="password"
                            required
                          />
                        </ValidationProvider>

                        <v-row>
                          <v-col cols="9" sm="9" md="9">
                            <ValidationProvider
                              name="Email"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="email"
                                :error-messages="errors"
                                label="Email"
                                name="email"
                                prepend-icon="person"
                                type="text"
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
                              Get code
                            </v-btn>
                          </v-col>
                        </v-row>

                        <ValidationProvider
                          name="Code"
                          rules="required|numeric"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :error-messages="errors"
                            v-model="code"
                            id="code"
                            label="Code"
                            name="code"
                            prepend-icon="lock"
                            type="text"
                          />
                        </ValidationProvider>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                      <v-spacer />
                      <v-btn
                        :disabled="
                          !email || !newPassword || !confirmPassword || !code
                        "
                        color="primary"
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
          title: 'Change password success',
        });
        this.$router.push({ path: this.redirectLink });
      }
    },
    async getEmailCode() {
      if (!this.email) {
        return this.$notify({
          type: 'error',
          title: 'Please type email to get code',
        });
      }
      const res = await this.getCode(this.email);
      if (res.status === 200) {
        this.$notify({
          type: 'success',
          title: 'Code has been sent to your email',
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
};
</script>
