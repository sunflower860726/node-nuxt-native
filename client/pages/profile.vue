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
            <h3 class="title is-5">PROFILE</h3>

          </div>
        </div>
        <div class="column">
          <b-field label="Name">
              <b-input v-model="profile.name" :disabled="!isEditing"></b-input>
          </b-field>
          <b-field label="Email">
              <b-input v-model="profile.email" :disabled="!isEditing"></b-input>
          </b-field>
          <b-field label="Office / Clinic Address">
              <b-input v-model="profile.streetAddress" :disabled="!isEditing"></b-input>
          </b-field>
          <!-- <b-field label="Password">
              <b-input type="password" v-model="profile.password" :disabled="!isEditing" password-reveal></b-input>
          </b-field> -->
          <div class="level is-mobile">
            <div class="level-left">
            </div>
            <div class="level-right">
              <div v-if="!isEditing" class="field is-grouped">
                <div class="control">
                  <a class="button is-primary" @click.stop="isEditing = !isEditing">Edit</a>
                </div>
              </div>
              <div v-if="isEditing" class="field is-grouped">
                <div class="control">
                  <a class="button is-primary" @click="save()">Save</a>
                </div>
                <div class="control">
                  <a class="button is-white" @click="isEditing = !isEditing">Cancel</a>
                </div>
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

export default {
	layout: 'authenticated',
	data() {
		return {
			isEditing: false,
			profile: {}
		};
	},
	mounted() {
		if (this.user) {
			this.getProfile(this.user.hcp._id);
		}
	},
	computed: {
		...mapGetters({
			hcp: 'hcps/current'
		}),
		user() {
			return this.$store.state.auth.user;
		}
	},
	watch: {
		user: function() {
			if (this.user) {
				this.getProfile(this.user.hcp._id);
			}
		},
		hcp: function() {
			this.profile = Object.assign({}, this.hcp);
		}
	},
	methods: {
		...mapActions({
			getProfile: 'hcps/get',
			updateProfile: 'hcps/patch',
			updateUser: 'users/patch'
		}),
		save() {
			let userValues = {};
			let hcpValues = {};

			if (this.user.email !== this.profile.email) {
				userValues.email = this.profile.email;
			}

			if (this.hcp.email !== this.profile.email) {
				hcpValues.email = this.profile.email;
			}

			if (this.hcp.name !== this.profile.name) {
				hcpValues.name = this.profile.name;
			}

			if (this.hcp.streetAddress !== this.profile.streetAddress) {
				hcpValues.streetAddress = this.profile.streetAddress;
			}

			let promises = [];
			if (Object.keys(userValues).length > 0) {
				promises.push(this.updateUser([this.user._id, userValues]));
			}

			if (Object.keys(hcpValues).length > 0) {
				promises.push(this.updateProfile([this.hcp._id, hcpValues]));
			}

			if (promises.length > 0) {
				Promise.all(promises).then(() => {
					this.isEditing = !this.isEditing;
				});
			} else {
				this.isEditing = !this.isEditing;
			}
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
