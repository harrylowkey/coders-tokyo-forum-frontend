<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Sign in</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text class="pb-0">
                  <v-form>
                    <v-text-field
                      label="Email"
                      v-model="email"
                      name="email"
                      prepend-icon="person"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      v-model="password"
                      type="password"
                      @keyup.enter="signIn({ email, password})"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pa-4">
                  <a
                    style="text-decoration: none; font-size: 14px"
                    class="font-italic"
                    href="/signup"
                  >Don't have an account yet?</a>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!email || !password"
                    color="primary"
                    @click="signIn({ email, password })"
                  >Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      alert: false,
      alertMessage: "",
      email: "",
      password: "",
      redirect: "/stream"
    };
  },
  computed: {
    ...mapState("user", ["isAuthenticated"]),
    ...mapState("utils", ["errorMes"])
  },
  watch: {
    isAuthenticated(isAuthen) {
      if (isAuthen) {
        this.$notify({
          type: "success",
          title: "Login success"
        });
        setTimeout(() => this.$router.push({ path: this.redirect }), 500);
      }
    },
    errorMes(newVal) {
      if (newVal.length) {
        this.$notify({
          group: "auth",
          type: "error",
          title: "Login failed",
          text: newVal
        });
      }
    }
  },
  methods: {
    ...mapActions("user", ["signIn"])
  }
};
</script>

<style>
</style>