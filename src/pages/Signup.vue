<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <!-- Default form register -->
        <div class="text-center border border-light p-5">

            <p class="h4 mb-4">Sign up</p>

            <!-- First name -->
            <input v-model="firstname" type="text" id="defaultRegisterFormFirstName" class="form-control mb-4" placeholder="First name">
            
            <!-- Last name -->
            <input v-model="lastname" type="text" id="defaultRegisterFormLastName" class="form-control mb-4" placeholder="Last name">

            <!-- E-mail -->
            <input v-model="email" type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail">

            <!-- Password -->
            <input v-model="password" type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock">
            <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                At least 8 characters and 1 digit
            </small>

            <!-- Sign up button -->
            <button @click="_signup" class="btn btn-info my-4 btn-block">Sign up</button>

            <!-- Social register -->
            <p>or sign up with:</p>

            <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
            <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
            <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
            <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>

            <hr>

            <!-- Terms of service -->
            <p>By clicking
                <em>Sign up</em> you agree to our
                <a href="" target="_blank">terms of service</a>
            </p>

        </div>
        <!-- Default form register -->
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
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
