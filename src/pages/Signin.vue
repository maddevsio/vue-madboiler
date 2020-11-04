<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-layout row class="d-flex justify-center">
          <v-flex xs4 class="grey lighten-4 d-flex">
            <v-container class="text-xs-center my-auto">
              <v-card flat>
                <v-card-title primary-title>
                  <h4 class="px-2">Authtorization</h4>
                </v-card-title>
                <v-form class="pa-5">
                  <v-text-field v-model="email" name="Email" label="Email">
                  </v-text-field>
                  <v-text-field v-model="password" name="Password" label="Password"
                    type="password"></v-text-field>
                  <v-card-actions>
                    <v-btn primary large block @click="signin">Signin</v-btn>
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
export default {
  name: 'Signin',
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    signin() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('auth/signin', user).then(resp => {
        if (resp.data.success === true) {
          this.$router.push('/');
        }
      });
    }
  }
};
</script>
