<template>
  <div class="is-auth-form">
    <div class="container">
      <div style="text-align:center;padding:50px">
        <img src="/img/logo.png" width="128"/>
      </div>
      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal></b-input>
      </b-field>
      <b-field label="Verify Password">
        <b-input type="password" v-model="confirmPassword" password-reveal></b-input>
      </b-field>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="control">
            <a class="button is-primary" @click="reset()">Update</a>
          </div>
        </div>
        <div class="level-right">
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
			password: null,
			confirmPassword: null
		};
	},
	methods: {
		...mapActions({
			resetPassword: 'management/create'
		}),
		reset() {
			let resetToken = this.$route.params.token;
			if (this.password === null || this.password.length === 0) {
				this.$toast.open({
					duration: 2000,
					message: 'Missing password',
					position: 'is-bottom',
					type: 'is-danger'
				});
				return;
			}

			if (this.password !== this.confirmPassword) {
				this.$toast.open({
					duration: 2000,
					message: 'Passwords do not match',
					position: 'is-bottom',
					type: 'is-danger'
				});
				return;
			}

			this.resetPassword({
				action: 'resetPwdLong',
				value: {
					token: resetToken,
					password: this.password
				}
			})
				.then(result => {
					this.$router.push('/login');
				})
				.catch(error => {
					this.$toast.open({
						duration: 2000,
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
