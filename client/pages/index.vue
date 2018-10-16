<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <div class="level-item">
            <nuxt-link class="button is-primary" to="invite">Invite</nuxt-link>
          </div>
        </div>
      </div>
      <b-table :data="tableData" hoverable>
        <template slot-scope="props">
					<b-table-column label="Name" height="60"  v-if="props.row.patientEmail">
						<span>{{ props.row.token }}</span>
					</b-table-column>
          <b-table-column label="Name" height="60" v-else>
              <nuxt-link v-if="props.row.generalConsent" :to="{ path: props.row._id }">{{ props.row.name }}</nuxt-link>
              <span v-else>{{ props.row.name }}</span>
          </b-table-column>

					<b-table-column label="Email" height="60"  v-if="props.row.patientEmail">
						<span>{{ props.row.patientEmail }}</span>
					</b-table-column>
          <b-table-column label="Email" v-else>
              <nuxt-link v-if="props.row.generalConsent" :to="{ path: props.row._id }">{{ props.row.email }}</nuxt-link>
              <span v-else>{{ props.row.email }}</span>
          </b-table-column>

					<b-table-column label="Status" height="60"  v-if="props.row.patientEmail">
						{{ 'Invited ' + props.row.sent }}
					</b-table-column>
          <b-table-column label="Status" v-else>
            {{ props.row.generalConsent ? 'Consented' : 'Declined' }}
          </b-table-column>

          <b-table-column label="" numeric style="padding: 0px">
						<a class="button is-primary" v-if="props.row.patientEmail" @click="resend(props.row._id)" style="margin-right: 10px">Re-Send</a>
						<a class="button is-danger" v-if="props.row.patientEmail" @click="deleteInvite(props.row._id)">Delete</a>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import format from 'date-fns/format';

export default {
	layout: 'authenticated',
	data() {
		return {};
	},
	mounted() {
		Promise.all([this.findPatients(), this.findInvites()]).catch(error => {
			console.log(error.message);
			if (error && error.code === 401) {
				this.$router.push('login');
			}
		});
	},
	computed: {
		...mapGetters({
			patients: 'patients/list',
			invites: 'invites/list'
		}),
		tableData() {
			let data = this.patients;
			let tableData = data.concat(this.invites);
			return tableData;
		}
	},
	methods: {
		...mapActions({
			findPatients: 'patients/find',
			findInvites: 'invites/find',
			patchInvite: 'invites/patch',
			deleteInvite: 'invites/remove'
		}),
		resend(id) {
			this.patchInvite([
				id,
				{
					sent: format(new Date(), 'YYYY-MM-DD HH:mm:ss')
				}
			]);
		}
	}
};
</script>

<style>
.table th,
.table td {
	vertical-align: middle;
}
</style>
