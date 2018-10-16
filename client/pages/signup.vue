<template>
	<div class="is-auth-form">
    <div class="container">
      <div style="text-align:center;padding:50px">
				<h3 class="title is-3">Welcome to Urtic</h3>
      </div>
      <b-field label="Invite Code">
        <b-input></b-input>
      </b-field>
			<b-field label="Email">
        <b-input v-model="email"></b-input>
      </b-field>
			<b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>
			<b-field label="Office / Clinic Address">
        <b-input v-model="streetAddress"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal></b-input>
      </b-field>
			<b-field label="Confirm Password">
        <b-input type="password" v-model="confirmPassword" password-reveal></b-input>
      </b-field>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="control">
            <a class="button is-primary" @click="signup()">SIGN UP</a>
          </div>
        </div>
        <div class="level-right">
					<div>
            <div style="text-align:right;">
              <nuxt-link to="login">LOGIN</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			name: null,
			email: null,
			streetAddress: null,
			password: null,
			confirmPassword: null
		};
	},
	methods: {
		...mapActions({
			hcpSignup: 'hcp-signup/create'
		}),
		signup() {
			if (this.password === this.confirmPassword) {
				this.hcpSignup({
					name: this.name,
					email: this.email,
					streetAddress: this.streetAddress,
					password: this.password
				})
					.then(result => {
						this.$router.push('login');
					})
					.catch(error => {
						console.log(error.message);
					});
			}
		}
	}
};
</script>

<style>

</style>
