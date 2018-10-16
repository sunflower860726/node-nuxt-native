<template>
  <div class="is-auth-form">
    <div class="container">
      <div style="text-align:center;padding:50px">
        <img src="/img/logo.png" width="128"/>
      </div>
      <b-field label="Email">
        <b-input v-model="email"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal></b-input>
      </b-field>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="control">
            <a class="button is-primary" @click="login()">Login</a>
          </div>
        </div>
        <div class="level-right">
          <div>
            <div style="text-align:right;">
              <nuxt-link to="reset-password">RESET PASSWORD</nuxt-link>
            </div>
            <div style="text-align:right;">
              <nuxt-link to="signup">SIGN UP</nuxt-link>
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
			email: null,
			password: null
		};
	},
	computed: {
		user() {
			return this.$store.state.auth.user;
		}
	},
	watch: {
		user: function() {
			if (this.user && this.user.roles.indexOf('hcp') !== -1) {
				if (this.user.isVerified) {
					this.$router.push('/');
				} else {
					this.signout();
					this.$toast.open({
						duration: 5000,
						message: 'Please verify your e-mail first',
						position: 'is-bottom',
						type: 'is-danger'
					});
				}
			} else {
				this.signout();
				this.$toast.open({
					duration: 5000,
					message: 'You are not authorized to access this page',
					position: 'is-bottom',
					type: 'is-danger'
				});
			}
		}
	},
	methods: {
		...mapActions({
			signout: 'auth/logout',
			authenticate: 'auth/authenticate'
		}),
		login() {
			if (this.password === null || this.password.length === 0) {
				this.$toast.open({
					duration: 5000,
					message: 'Missing password',
					position: 'is-bottom',
					type: 'is-danger'
				});
				return;
			}

			this.authenticate({
				strategy: 'local',
				email: this.email,
				password: this.password
			})
				.then(result => {})
				.catch(error => {
					this.$toast.open({
						duration: 5000,
						message: error.message,
						position: 'is-bottom',
						type: 'is-danger'
					});
				});
		}
	}
};
</script>

<style>
</style>
