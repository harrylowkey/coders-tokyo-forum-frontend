<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Sign up</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text class="pb-0">
                  <v-form>
                    <v-text-field
                      label="Username"
                      name="username"
                      prepend-icon="person"
                      type="text"
                    />
                    <v-row>
                      <v-col cols="9" sm="9" md="9">
                        <v-text-field
                          label="Email"
                          name="email"
                          prepend-icon="person"
                          type="text"
                        />
                      </v-col>
                      <v-col
                        cols="3"
                        sm="3"
                        md="3"
                        class="d-flex justify-center align-center pt-4"
                      >
                        <v-btn small class="success">Get code</v-btn>
                      </v-col>
                    </v-row>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                    />
                    <v-text-field
                      id="code"
                      label="Code"
                      name="code"
                      prepend-icon="lock"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions class="pa-4">
                  <v-spacer />
                  <v-btn color="primary">Register</v-btn>
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
export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      code: '',
    };
  },
};
</script>
