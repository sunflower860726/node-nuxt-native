<template>
  <div class="is-auth-form">
    <div class="container">
      <div style="text-align:center;padding:50px">
        <img src="/img/logo.png" width="128"/>
      </div>
      <b-field label="Email" v-if="!verifying">
        <b-input type="email" v-model="email"></b-input>
      </b-field>
      <div class="level is-mobile" v-if="!verifying">
        <div class="level-left">
          <div class="control">
            <a class="button is-primary" @click="sendVerification()">Send veritifcation</a>
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
			verifying: false,
			email: null
		};
	},
	mounted() {
		let verifyToken = this.$route.params.token;
		if (verifyToken) {
			this.management({
				action: 'verifySignupLong',
				value: verifyToken
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
		} else {
			this.$router.push('/verify-email');
		}
	},
	methods: {
		...mapActions({
			management: 'management/create'
		})
	}
};
</script>

<style>
</style>
