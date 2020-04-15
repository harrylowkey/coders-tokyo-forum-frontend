<template>
  <div>
    <app-banner></app-banner>
    <v-container height="100px">
      <v-row>
        <v-col cols="12" sm="7" style="background-color: lightblue">Post</v-col>
        <v-col cols="12" sm="4" offset-sm="1">
          <v-container class="profile-details">
            <v-hover v-slot:default="{ hover }">
              <v-card max-width="344" class="mx-auto" shaped :elevation="hover ? 15 : 5">
                <v-list-item-content class="text-center pt-3 pb-6">
                  <v-avatar size="70" style="cursor: pointer">
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/muslim_man_avatar-128.png"
                      alt="Avatar"
                    />
                  </v-avatar>
                </v-list-item-content>
                <v-card-text class="px-8 py-1">
                  <v-row>
                    <v-col cols="12" sm="12" md="3" :style="propertyUserInfoStyle">
                      <v-subheader class="pa-0">Username</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="12" md="9" style="padding: 0;">
                      <v-text-field :value="user.username" :disabled="!isEdit" class="pt-0"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="3" :style="propertyUserInfoStyle">
                      <v-subheader class="pa-0">Email</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="12" md="9" style="padding: 0">
                      <v-text-field :value="user.email" disabled class="pt-0"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="3" :style="propertyUserInfoStyle">
                      <v-subheader class="pa-0">Password</v-subheader>
                    </v-col>

                    <v-col cols="12" sm="12" md="9" style="padding: 0">
                      <v-text-field
                      readonly
                        :append-icon="isEditPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="isEditPassword ? 'text' : 'password'"
                        name="input-10-2"
                        hint="At least 8 characters"
                        :value="user.password"
                        @click:append="isEditPassword = !isEditPassword"
                        class="pt-0"
                        counter
                      ></v-text-field>
                    </v-col>

                    <v-row class="px-3" v-for="link in user.socialLinks" :key="link._id">
                      <v-col cols="12" sm="12" md="3" :style="propertyUserInfoStyle">
                        <v-subheader class="pa-0">{{ link.type }}</v-subheader>
                      </v-col>
                      <v-col cols="12" sm="12" md="9" :style="socialLinksStyle">
                        <v-text-field
                          v-if="isEdit"
                          :value="link.url"
                          :disabled="!isEdit"
                          class="pt-0"
                        ></v-text-field>
                        <a v-else :href="link.url" target="_blank">{{ link.url }}</a>
                      </v-col>
                    </v-row>

                    <v-col cols="12" sm="12" md="3" :style="propertyUserInfoStyle">
                      <v-subheader class="pa-0">Sex</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="12" md="9" style="padding: 0">
                      <v-radio-group v-if="isEdit" v-model="user.sex" row>
                        <v-radio label="Male" value="Male"></v-radio>
                        <v-radio label="Female" value="Female"></v-radio>
                        <v-radio label="Unknown" value="Unknown"></v-radio>
                      </v-radio-group>
                      <v-text-field v-else :value="user.sex" :disabled="!isEdit" class="pt-0"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="3" :style="propertyUserInfoStyle">
                      <v-subheader class="pa-0">Job</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="12" md="9" style="padding: 0">
                      <v-text-field :value="user.job" :disabled="!isEdit" class="pt-0"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="3" :style="propertyUserInfoStyle">
                      <v-subheader class="pa-0">Date join</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="12" md="9" style="padding: 0">
                      <v-text-field :value="user.createdAt | date" disabled class="pt-0"></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon v-if="isOwner" @click="isEdit = !isEdit">
                    <v-icon color="primary">edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        _id: "5e8b577f1a2dde32298795f4",
        hobbies: ["music, reading book"],
        username: "hongquang",
        password: "hell0aA@",
        email: "quang.dang@homa.company",
        socialLinks: [
          {
            _id: "5e8f536b0416274996f69e75",
            type: "Github",
            url: "https://github.com/hongquangraem"
          },
          {
            _id: "5e8f536b0416274996f69e76",
            type: "Facebook",
            url: "https://facebook.com/spaceraem"
          }
        ],
        createdAt: "2020-04-06T16:23:27.385Z",
        updatedAt: "2020-04-13T14:43:32.772Z",
        job: "Developer",
        sex: "Male",
        avatar: null
      },
      propertyUserInfoStyle: {
        paddingLeft: "1px",
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0
      },
      isEdit: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },
      isEditPassword: false,
    };
  },
  computed: {
    isOwner() {
      return true;
    },
    socialLinksStyle() {
      if (!this.isEdit) {
        return { 
          paddingLeft: '0px',
          paddingRight: '0px'
        };
      }
      else return {
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingBottom: '0px'
      };
    }
  }
};
</script>

<style scoped>
.profile-detail {
  border: 1px solid lightgrey;
}
</style>