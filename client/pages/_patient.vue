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
        <div class="level-right">
          <div class="field has-addons">
            <p class="control">
              <a class="button" :class="{ 'is-primary': date.months === 3 }" @click="toggleMonth()">
                <span>3 Month</span>
              </a>
            </p>
            <p class="control">
              <a class="button" :class="{ 'is-primary': date.months === 6 }" @click="toggleMonth()">
                <span>6 Month</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-quarter" style="border-right: 1px #f0f0f0 solid">
          <div class="has-text-right">
            <h3 class="title is-5">{{ patient.name }}</h3>
            <h2 class="subtitle is-6">{{ patient.email }}</h2>
          </div>
        </div>
        <div class="column">
          <uas-chart :chart-data="uasChartData"></uas-chart>
          <aas-chart :chart-data="aasChartData"></aas-chart>
					<medication-chart :labels="labels" :medications="medications" :range="date.range" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import startOfWeek from 'date-fns/start_of_week';
import subMonths from 'date-fns/sub_months';
import format from 'date-fns/format';
import addWeeks from 'date-fns/add_weeks';
import isEqual from 'date-fns/is_equal';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import parse from 'date-fns/parse';

import UASChart from '../components/uas-chart.vue';
import AASChart from '../components/aas-chart.vue';
import MedicationChart from '../components/medication-chart.vue';

export default {
	layout: 'authenticated',
	components: {
		'uas-chart': UASChart,
		'aas-chart': AASChart,
		'medication-chart': MedicationChart
	},
	data() {
		let end = new Date();
		let start = subMonths(end, 3);
		let range = differenceInCalendarDays(end, start);
		return {
			date: {
				months: 3,
				startDate: start,
				endDate: end,
				range: range
			},
			patient: {},
			labels: []
		};
	},
	computed: {
		...mapGetters({
			rawUAS: 'uas-week/list',
			rawAAS: 'aas-week/list',
			rawMedications: 'medications/list'
		}),
		uas() {
			let uas = this.rawUAS;
			let labels = this.labels;
			let uasMap = {};
			uas.forEach(data => {
				uasMap[data.date] = data.total;
			});
			let uasData = [];
			labels.forEach(label => {
				let data = uasMap[label] || 0;
				uasData.push(data);
			});
			return uasData;
		},
		aas() {
			let aas = this.rawAAS;
			let labels = this.labels;
			let aasMap = {};
			aas.forEach(data => {
				aasMap[data.date] = data.total;
			});
			let aasData = [];
			labels.forEach(label => {
				let data = aasMap[label] || 0;
				aasData.push(data);
			});
			return aasData;
		},
		medications() {
			let medications = this.rawMedications;
			let fullRange = this.date.range;
			let medicationRanges = {};
			let medicationData = {};
			medications.forEach(medication => {
				let date = parse(medication.date);
				let duration = differenceInCalendarDays(date, this.date.startDate);
				if (duration < 1) {
					duration = 0;
				}
				let medicationModel = medicationRanges[duration] || {
					drugs: {}
				};
				medication.medications.forEach(drug => {
					medicationModel.drugs[drug.name] = drug;
					if (!medicationData[drug.name]) {
						medicationData[drug.name] = {
							data: []
						};
					}
				});
				medicationRanges[duration] = medicationModel;
			});

			console.log(fullRange);
			console.log(medicationRanges);

			for (var ii = 0; ii < fullRange; ii++) {
				let names = Object.keys(medicationData);
				names.forEach(name => {
					let range = medicationRanges[ii];
					let data = medicationData[name].data;
					let previousState = 0;
					let previousDay = 0;
					let previousData = null;
					if (data.length > 0) {
						// Has previous data
						previousData = data[data.length - 1];
						previousState = previousData.state;
						previousDay = previousData.day;
					}

					let rangeValue = ii - previousDay;
					console.log(name, '[' + previousDay, '-', ii + ']');

					if (range) {
						let drug = range.drugs[name];
						if (drug) {
							if (previousState === 0) {
								// Added
								console.log('Add');
								if (previousData) {
									previousData.range = rangeValue;
									let newData = {
										day: ii,
										state: 1,
										range: 0,
										data: drug
									};
									data.push(newData);
								} else {
									let previousData = {
										day: previousDay,
										state: 0,
										range: rangeValue
									};
									let newData = {
										day: ii,
										state: 1,
										range: 0,
										data: drug
									};
									data.push(previousData);
									data.push(newData);
								}
							} else {
								// Extended
								console.log('Extend');
								previousData.range = rangeValue;
							}
						} else {
							if (previousState === 0) {
								// Extended
								if (previousData) {
									console.log('Extend');
									previousData.range = rangeValue;
								} else {
									console.log('Add');
									let newData = {
										day: ii,
										state: 0,
										range: rangeValue
									};
									data.push(newData);
								}
							} else {
								// Removed
								console.log('Remove');
								previousData.range = rangeValue;
								let newData = {
									day: ii,
									state: 0,
									range: 0
								};
								data.push(newData);
							}
						}
					} else {
						console.log('Extend');
						if (previousData) {
							previousData.range = rangeValue;
						} else {
							let newData = {
								day: previousDay,
								state: 0,
								range: rangeValue
							};
							data.push(newData);
						}
					}
				});
			}
			console.log(medicationData);

			return medicationData;
		},
		uasChartData() {
			let chartData = {
				labels: this.labels,
				datasets: [
					{
						fill: false,
						label: 'UAS Weekly Score',
						borderColor: '#9BD2DC',
						backgroundColor: '#9BD2DC',
						lineTension: 0,
						data: this.uas,
						type: 'line'
					}
				]
			};
			return chartData;
		},
		aasChartData() {
			return {
				labels: this.labels,
				datasets: [
					{
						label: 'AAS Weekly Score',
						borderColor: '#EE7444',
						backgroundColor: '#EE7444',
						data: this.aas
					}
				]
			};
		}
	},
	mounted() {
		this.reloadData();
	},
	methods: {
		...mapActions({
			getPatient: 'patients/get',
			getUAS: 'uas-week/find',
			getAAS: 'aas-week/find',
			getMedications: 'medications/find'
		}),
		toggleMonth() {
			let end = new Date();
			let start = null;
			let months = null;
			if (this.date.months === 3) {
				months = 6;
				start = subMonths(end, 6);
			} else {
				months = 3;
				start = subMonths(end, 3);
			}
			this.date = {
				startDate: start,
				endDate: end,
				months: months,
				range: differenceInCalendarDays(end, start)
			};
			this.reloadData();
		},
		reloadData() {
			let patientId = this.$route.params.patient;
			this.getPatient(patientId)
				.then(patient => {
					this.patient = patient;
					let endDate = startOfWeek(this.date.endDate);
					let startDate = startOfWeek(this.date.startDate);
					let start = startDate;
					let labels = [];
					while (!isEqual(start, endDate)) {
						labels.push(format(start, 'YYYY-MM-DD'));
						start = addWeeks(start, 1);
					}
					this.labels = labels;
					return Promise.all([
						this.getUAS({
							query: {
								startDate: format(startDate, 'YYYY-MM-DD'),
								endDate: format(endDate, 'YYYY-MM-DD'),
								patients: patientId
							}
						}),
						this.getAAS({
							query: {
								startDate: format(startDate, 'YYYY-MM-DD'),
								endDate: format(endDate, 'YYYY-MM-DD'),
								patients: patientId
							}
						}),
						this.getMedications({
							query: {
								startDate: format(startDate, 'YYYY-MM-DD'),
								endDate: format(endDate, 'YYYY-MM-DD'),
								patients: patientId
							}
						})
					]);
				})
				.catch(error => {
					console.log(error.message);
					if (error && error.code === 401) {
						this.$router.push('login');
					}
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
