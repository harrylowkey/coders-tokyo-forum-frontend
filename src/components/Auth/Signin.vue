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
                      <v-toolbar-title>Sign in</v-toolbar-title>
                      <v-spacer />
                    </v-toolbar>
                    <v-card-text class="pb-0">
                      <v-form>
                        <ValidationProvider
                          name="Email"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :error-messages="errors"
                            label="Email"
                            v-model="email"
                            name="email"
                            prepend-icon="person"
                            type="text"
                          />
                        </ValidationProvider>
                        <ValidationProvider
                          name="Password"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            v-model="password"
                            type="password"
                            :error-messages="errors"
                            @keyup.enter="signIn({ email, password })"
                          />
                        </ValidationProvider>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                      <a
                        style="text-decoration: none; font-size: 14px"
                        class="font-italic"
                        :href="ROUTES.REGISTER"
                      >
                        Don't have an account yet?
                      </a>
                      <v-spacer />
                      <a
                        style="text-decoration: none; font-size: 14px; color: red; margin-left: 75px"
                        class="font-italic"
                        :href="ROUTES.FORGOT_PASSWORD"
                      >
                        Forgot password?
                      </a>
                      <v-spacer />
                      <v-btn
                        :disabled="!email || !password"
                        color="primary"
                        @click="signIn({ email, password })"
                      >
                        Login
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

import socket from '@/socket.js';
import { ROUTES } from '@/mixins/routes';

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
  data() {
    return {
      email: '',
      password: '',
      redirect: this.$route.query?.redirect || ROUTES.STREAM(),
    };
  },
  computed: {
    ...mapState('user', ['isAuthenticated', 'accessToken']),
    ...mapState('utils', ['errorMes']),
    ...mapState('socket', ['online']),
  },
  watch: {
    isAuthenticated(isAuth) {
      if (isAuth) {
        this.$notify({
          type: 'success',
          title: 'Login success',
        });
        socket.emit('auth', this.accessToken);
        
        setTimeout(() => window.open(this.redirect), 1000);
      }
    },
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          type: 'error',
          title: 'Login failed',
          text: newVal,
        });
      }
    },
  },
  methods: {
    ...mapActions('user', ['signIn']),
  },
  created() {
    this.ROUTES = ROUTES;
  },
};
</script>
