<template>
  <div>
    <v-app id="inspire">
      <v-content class="grey lighten-5">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <ValidationObserver ref="observer">
                <v-form>
                  <v-card class="elevation-12 px-5 pt-2 pb-8">
                    <v-toolbar flat>
                      <v-toolbar-title>{{ $t('Login') }}</v-toolbar-title>
                      <v-spacer />
                    </v-toolbar>
                    <v-card-text class="py-6 px-10">
                      <v-form>
                        <ValidationProvider
                          name="Email"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <div>Email</div>
                          <v-text-field
                            :error-messages="$t(errors)"
                            v-model="email"
                            name="email"
                            type="text"
                            class="pt-0"
                          />
                        </ValidationProvider>
                        <ValidationProvider
                          name="Password"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <div>{{ $t('Password') }}</div>
                          <v-text-field
                            class="pt-0"
                            id="password"
                            name="password"
                            v-model="password"
                            type="password"
                            :error-messages="$t(errors)"
                            @keyup.enter="signIn({ email, password })"
                          />
                        </ValidationProvider>
                        <div class="text-right">
                          <v-btn
                            :tile="true"
                            :disabled="!email || !password"
                            color="primary"
                            class="mt-4"
                            @click="signIn({ email, password })"
                          >
                            {{ $t('Login') }}
                          </v-btn>
                        </div>
                      </v-form>
                    </v-card-text>
                    <div class="px-10">
                      <div class="text-right">
                        <router-link :to="ROUTES.REGISTER">
                          {{ $t("Don't have an account yet?") }}
                        </router-link>
                      </div>
                      <div class="text-right">
                        <router-link
                          class="red--text"
                          :to="ROUTES.FORGOT_PASSWORD"
                        >
                          {{ $t('Forgot password?') }}
                        </router-link>
                      </div>
                    </div>
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
    ...mapState('socket', ['online']),
  },
  watch: {
    async isAuthenticated(isAuth) {
      if (isAuth) {
        this.$notify({
          type: 'success',
          title: this.$t('notifications.login.Success'),
        });
        await socket.emit('auth', this.accessToken);

        this.$router.push(this.redirect);
      }
    },
  },
  methods: {
    ...mapActions('user', ['signIn']),
  },
  created() {
    this.ROUTES = ROUTES;
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
