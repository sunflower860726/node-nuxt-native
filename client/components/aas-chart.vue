<script>
import { Bar, mixins } from 'vue-chartjs';

export default {
	extends: Bar,
	mixins: [mixins.reactiveProp],
	props: ['chartData'],
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [
						{
							gridLines: {
								display: false
							},
							ticks: {
								display: false
							}
						}
					],
					yAxes: [
						{
							ticks: {
								max: 84,
								min: 0,
								stepSize: 12
							},
							gridLines: {
								display: false
							}
						}
					]
				},
				layout: {
					padding: {
						left: 20,
						right: 0
					}
				}
			}
		};
	},
	mounted() {
		this.renderChart(this.chartData, this.options);
	}
};
</script>

<style>

</style>
