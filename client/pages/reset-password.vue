<template>
  <div class="is-auth-form">
    <div class="container">
      <div style="text-align:center;padding:50px">
        <img src="/img/logo.png" width="128"/>
      </div>
      <b-field label="Email">
        <b-input type="email" v-model="email"></b-input>
      </b-field>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="control">
            <a class="button is-primary" @click="reset()">Reset</a>
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
			email: null
		};
	},
	methods: {
		...mapActions({
			requestReset: 'management/create'
		}),
		reset() {
			this.requestReset({
				action: 'sendResetPwd',
				value: {
					email: this.email
				}
			})
				.then(result => {
					this.$toast.open({
						duration: 5000,
						message: 'Please check your e-mail for further instructions.',
						position: 'is-bottom'
					});
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
