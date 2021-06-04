<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <!-- Default form login -->
        <div class="text-center border border-light p-5">

          <p class="h4 mb-4">Sign in</p>

          <!-- Email -->
          <input v-model="email" type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail">

          <!-- Password -->
          <input v-model="password" type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password">

          <div class="d-flex justify-content-around">
              <div>
                  <!-- Remember me -->
                  <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                      <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                  </div>
              </div>
              <div>
                  <!-- Forgot password -->
                  <a href="">Forgot password?</a>
              </div>
          </div>

          <!-- Sign in button -->
          <button @click="_signin" class="btn btn-info btn-block my-4">Sign in</button>

          <!-- Register -->
          <p>Not a member?
            <router-link to="/signup">Register</router-link>
          </p>

          <!-- Social login -->
          <p>or sign in with:</p>

          <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
          <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
          <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
          <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>

        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Signin',
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    ...mapActions('auth', ['signin']),
    async _signin() {
      const user = {
        email: this.email,
        password: this.password
      };
      const response = await this.signin(user);
      if (response.data.success === true) {
        this.$router.push('/');
      }
    }
  }
};
</script>
