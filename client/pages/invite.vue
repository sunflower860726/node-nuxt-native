<template>
	<section class="section">
    <div class="container">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <nuxt-link to="/" class="button is-rounded">
              <b-icon icon="arrow-left"></b-icon>
            </nuxt-link>
          </div>
        </div>
        <div class="level-right"></div>
      </div>
      <div class="columns">
        <div class="column is-one-quarter" style="border-right: 1px #f0f0f0 solid">
          <div class="has-text-right">
            <h3 class="title is-5">INVITE</h3>

          </div>
        </div>
        <div class="column">
          <b-field label="Email">
              <b-input v-model="invite.patientEmail"></b-input>
          </b-field>
          <b-field label="Message">
              <b-input v-model="invite.message"></b-input>
          </b-field>
          <div class="level is-mobile">
            <div class="level-left">
            </div>
            <div class="level-right">
							<div class="control">
								<a class="button is-primary" :disabled="!isValid" @click="save()">Save</a>
							</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import format from 'date-fns/format';

export default {
	layout: 'authenticated',
	data() {
		return {
			invite: {}
		};
	},
	computed: {
		isValid() {
			let invite = this.invite;
			let hasEmail =
				invite && invite.patientEmail && invite.patientEmail.length > 0;
			let hasMessage = invite && invite.message && invite.message.length > 0;
			return hasEmail && hasMessage;
		}
	},
	methods: {
		...mapActions({
			createInvite: 'invites/create'
		}),
		save() {
			this.invite.sent = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
			this.createInvite(this.invite)
				.then(invite => {
					this.$router.push('/');
				})
				.catch(error => {
					alert(error.message);
				});
		}
	}
};
</script>

<style>
a.button.is-rounded {
	height: 40px;
	width: 40px;
	border-radius: 20px;
}
</style>
