<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation" style="background-color: #f4f4f4">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <img src="/img/logo.png" alt="Urtic: Quality of life tracker" height="60" style="max-height: 50px">
          </a>
          <button class="button navbar-burger" @click="menuVisible = !menuVisible">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': menuVisible }">
          <div class="navbar-start">
            <nuxt-link class="navbar-item" to="/" exact>
              PATIENTS
            </nuxt-link>
            <nuxt-link class="navbar-item" to="data">
              DATA
            </nuxt-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                {{ hcp ? hcp.name : '' }}
              </a>

              <div class="navbar-dropdown is-right">
                <nuxt-link to="/profile" class="navbar-item">
                  Profile
                </nuxt-link>
                <a class="navbar-item" @click="logout()"> 
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
	data() {
		return {
			menuVisible: null
		};
	},
	mounted() {
		this.authenticate();
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
				if (this.user.roles.indexOf('hcp') < 0) {
					this.$router.push('not-authorized');
				} else {
					this.getProfile(this.user.hcp._id).then(hcp => {
						this.profile = hcp;
					});
				}
			}
		}
	},
	methods: {
		...mapActions({
			signout: 'auth/logout',
			authenticate: 'auth/authenticate',
			getProfile: 'hcps/get'
		}),
		...mapMutations({
			clearPatients: 'patients/clearAll',
			clearInvites: 'invites/clearAll',
			clearHcps: 'hcps/clearAll',
			clearUAS: 'uas/clearAll',
			clearAAS: 'aas/clearAll'
		}),
		logout() {
			this.clearPatients();
			this.clearInvites();
			this.clearHcps();
			this.clearUAS();
			this.clearAAS();
			this.signout()
				.then(result => {
					this.$router.push('login');
				})
				.catch(error => {
					console.log(error.message);
				});
		}
	}
};
</script>

<style>

</style>
