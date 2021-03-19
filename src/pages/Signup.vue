<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-layout row class="d-flex justify-center">
          <v-flex lg6 md8 xs10 class="grey lighten-4 d-flex">
            <v-container class="text-xs-center my-auto">
              <v-card flat>
                <v-card-title primary-title>
                  <h4 class="px-2">Registration</h4>
                </v-card-title>
                <v-form class="pa-5">
                  <v-text-field v-model="firstname" name="Firstname" label="Firstname">
                  </v-text-field>
                  <v-text-field v-model="lastname" name="Lastname" label="Lastname"> </v-text-field>
                  <v-text-field v-model="email" name="Email" label="Email"> </v-text-field>
                  <v-text-field
                    v-model="password"
                    name="Password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn primary large block @click="_signup">Signup</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Signup',
  data() {
    return {
      firstname: null,
      lastname: null,
      email: null,
      password: null
    };
  },
  methods: {
    ...mapActions('auth', ['signup']),
    async _signup() {
      const newUser = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      };
      const response = await this.signup(newUser);
      if (response.data.success === true) {
        this.$router.push('/signin');
      }
    }
  }
};
</script>
