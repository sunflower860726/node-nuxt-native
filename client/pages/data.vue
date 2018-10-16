<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div style="background-color: #f4f4f4;padding: 10px">
            <b-field label="Patients">
              <b-taginput autocomplete :disabled="aggregate" v-model="selectedPatients" :data="filteredPatients" icon="label" placeholder="Add a tag" field="title" :open-on-focus="openOnFocus" @typing="getFilteredPatients"/>
            </b-field>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div style="background-color: #f4f4f4;padding: 10px">
            <b-field label="Start date">
                <b-datepicker placeholder="Click to select..." icon="calendar-today" v-model="startDate"></b-datepicker>
            </b-field>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div style="background-color: #f4f4f4;padding: 10px">
            <b-field label="End date">
              <b-datepicker placeholder="Click to select..." icon="calendar-today" position="is-bottom-left" v-model="endDate"></b-datepicker>
            </b-field>
          </div>
        </div>
      </div>
			<div class="columns">
				<div class="column">
					<b-checkbox v-model="aggregate">Aggregate</b-checkbox>
				</div>
			</div>
    </div>
    <div class="container">
      <div v-if="allowDownload" class="level is-mobile" style="min-height: 200px;line-height:200px">
        <div class="level-item has-text-centered">
          <a class="button is-primary" @click="downloadUAS()">UAS</a>
          <a class="button is-primary" style="margin-left: 10px" @click="downloadAAS()">AAS</a>
          <a class="button is-primary" style="margin-left: 10px" @click="downloadCT()">Control Test</a>
          <a class="button is-primary" style="margin-left: 10px" @click="downloadUQOL()">Urticaria Quality of life</a>
          <a class="button is-primary" style="margin-left: 10px" @click="downloadAQOL()">Angioedema Quality of life</a>
        </div>
      </div>
      <div v-else class="has-text-centered" style="min-height: 200px;line-height:200px">
        Select information to retrieve data.
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import format from 'date-fns/format';
import * as FS from 'file-saver';

export default {
	layout: 'authenticated',
	data() {
		return {
			filteredPatients: [],
			selectedPatients: [],
			selectedPatientsMap: {},
			startDate: null,
			endDate: null,
			openOnFocus: true,
			aggregate: false
		};
	},
	mounted() {
		this.findPatients()
			.then(patients => {
				this.filteredPatients = this.formattedPatients;
			})
			.catch(error => {
				console.log(error.message);
				if (error && error.code === 401) {
					this.$router.push('login');
				}
			});
	},
	computed: {
		...mapGetters({
			patients: 'patients/list'
		}),
		formattedPatients() {
			let data = this.patients
				.filter(patient => {
					return patient.generalConsent;
				})
				.map(patient => {
					return {
						patient: patient,
						title: patient.name + '<' + patient.email + '>'
					};
				});
			return data;
		},
		allowDownload() {
			return (
				(this.selectedPatients.length > 0 || this.aggregate) &&
				this.startDate &&
				this.endDate
			);
		}
	},
	methods: {
		...mapActions({
			findPatients: 'patients/find',
			getUAS: 'uas/find',
			getAAS: 'aas/find',
			getCT: 'ct/find',
			getUQOL: 'uqol/find',
			getAQOL: 'aqol/find'
		}),
		getFilteredPatients(text) {
			this.filteredPatients = this.formattedPatients
				.filter(patient => {
					return patient.generalConsent;
				})
				.filter(patient => {
					return patient.title.indexOf(text) > -1;
				});
		},
		downloadUAS() {
			let patientIds = this.selectedPatients.map(data => {
				return data.patient._id;
			});

			let query = {
				startDate: format(this.startDate, 'YYYY-MM-DD'),
				endDate: format(this.endDate, 'YYYY-MM-DD')
			};

			if (this.aggregate) {
				query.aggregate = true;
			} else {
				query.patients = patientIds;
			}

			this.getUAS({ query: query }).then(data => {
				this.uasToCSV(data, this.aggregate);
			});
		},
		downloadAAS() {
			let patientIds = this.selectedPatients.map(data => {
				return data.patient._id;
			});

			let query = {
				startDate: format(this.startDate, 'YYYY-MM-DD'),
				endDate: format(this.endDate, 'YYYY-MM-DD')
			};

			if (this.aggregate) {
				query.aggregate = true;
			} else {
				query.patients = patientIds;
			}

			this.getAAS({ query: query }).then(data => {
				this.aasToCSV(data, this.aggregate);
			});
		},
		downloadCT() {
			let patientIds = this.selectedPatients.map(data => {
				return data.patient._id;
			});

			let query = {
				startDate: format(this.startDate, 'YYYY-MM-DD'),
				endDate: format(this.endDate, 'YYYY-MM-DD')
			};

			if (this.aggregate) {
				query.aggregate = true;
			} else {
				query.patients = patientIds;
			}

			this.getCT({ query: query }).then(data => {
				this.resultsToCSV(data, 'ct.csv', this.aggregate);
			});
		},
		downloadUQOL() {
			let patientIds = this.selectedPatients.map(data => {
				return data.patient._id;
			});

			let query = {
				startDate: format(this.startDate, 'YYYY-MM-DD'),
				endDate: format(this.endDate, 'YYYY-MM-DD')
			};

			if (this.aggregate) {
				query.aggregate = true;
			} else {
				query.patients = patientIds;
			}

			this.getUQOL({ query: query }).then(data => {
				this.resultsToCSV(data, 'uqol.csv', this.aggregate);
			});
		},
		downloadAQOL() {
			let patientIds = this.selectedPatients.map(data => {
				return data.patient._id;
			});

			let query = {
				startDate: format(this.startDate, 'YYYY-MM-DD'),
				endDate: format(this.endDate, 'YYYY-MM-DD')
			};

			if (this.aggregate) {
				query.aggregate = true;
			} else {
				query.patients = patientIds;
			}

			this.getAQOL({ query: query }).then(data => {
				this.resultsToCSV(data, 'aqol.csv', this.aggregate);
			});
		},
		objectToCSV(data, transformer) {
			let result = '';
			let lineDelimiter = '\n';
			data.forEach(value => {
				result += transformer(value) + lineDelimiter;
			});
			return result;
		},
		uasToCSV(data, aggregate) {
			let columnDelimiter = ',';
			let csv = '';

			if (aggregate) {
				csv = 'Date,Hive,Itch\n';
			} else {
				csv = 'Patient,Date,Hive,Itch\n';
			}

			csv += this.objectToCSV(data, value => {
				let row = '';
				if (!aggregate) {
					let patient = this.selectedPatientsMap[value.patientId].name;
					row = patient + columnDelimiter;
				}

				return (
					row +
					value.date +
					columnDelimiter +
					value.hive +
					columnDelimiter +
					value.itch
				);
			});
			const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
			FS.saveAs(blob, 'uas.csv');
		},
		aasToCSV(data, aggregate) {
			let columnDelimiter = ',';
			let csv = '';

			if (aggregate) {
				csv = 'Date,Q1,Q2,Q3,Q4\n';
			} else {
				csv = 'Patient,Date,Q1,Q2,Q3,Q4\n';
			}

			csv += this.objectToCSV(data, value => {
				let row = '';
				if (!aggregate) {
					let patient = this.selectedPatientsMap[value.patientId].name;
					row = patient + columnDelimiter;
				}

				return (
					row +
					value.date +
					columnDelimiter +
					value.results[0] +
					columnDelimiter +
					value.results[1] +
					columnDelimiter +
					value.results[2] +
					columnDelimiter +
					value.results[3]
				);
			});
			const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
			FS.saveAs(blob, 'aas.csv');
		},
		resultsToCSV(data, filename, aggregate) {
			let csv = '';
			if (aggregate) {
				csv = 'Date,Results\n';
			} else {
				csv = 'Patient,Date,Results\n';
			}

			if (data.length > 0) {
				let columnDelimiter = ',';
				csv += this.objectToCSV(data, value => {
					let row = '';
					if (!aggregate) {
						let patient = this.selectedPatientsMap[value.patientId].name;
						row = patient + columnDelimiter;
					}
					return row + value.date + columnDelimiter + value.results;
				});
			}
			const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
			FS.saveAs(blob, filename);
		}
	},
	watch: {
		selectedPatients: function() {
			let patientsMap = {};
			this.selectedPatients.forEach(data => {
				patientsMap[data.patient._id] = data.patient;
			});
			this.selectedPatientsMap = patientsMap;
		},
		startDate: function() {},
		endDate: function() {}
	}
};
</script>

<style>
.input,
.taginput .taginput-container.is-focusable,
.textarea {
	box-shadow: none;
}
.taginput .taginput-container.is-focusable {
	height: 2.25em;
	padding-top: 0px;
	padding-bottom: 0px;
}
</style>
