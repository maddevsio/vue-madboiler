<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-layout row class="d-flex justify-center">
          <v-flex xs4 class="grey lighten-4 d-flex">
            <v-container class="text-xs-center my-auto">
              <v-card flat>
                <v-card-title primary-title>
                  <h4 class="px-2">Login</h4>
                </v-card-title>
                <v-form class="pa-5">
                  <v-text-field prepend-icon="mdi-account" name="Username" label="Username">
                  </v-text-field>
                  <v-text-field prepend-icon="mdi-lock" name="Password" label="Password"
                    type="password"></v-text-field>
                  <v-card-actions>
                    <v-btn primary large block>Login</v-btn>
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
