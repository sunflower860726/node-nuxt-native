<template>
	<div class="outer">
		<div class="row" v-for="(value, key) in medications" :key="key">
				<span class="drug-label">{{ key }}</span>
				<template v-for="data in value.data">
					<div class="line" v-if="data.state === 1" :style="{ left: (data.day / range) * 100 + '%', width: (data.range / range) * 100 + '%' }" :key="data.day">
						<span class="line-label">{{ data.data.dose * data.data.quantity + " (" + data.data.frequency + ")" }}</span>
					</div>
					<div class="blank" v-if="data.state === 0" :style="{ left: (data.day / range) * 100 + '%', width: (data.range / range) * 100 + '%' }" :key="data.day"/>
				</template>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		labels: Array,
		range: Number,
		medications: Object
	},
	watch: {
		labels: function() {}
	}
};
</script>

<style>
.outer {
	display: flex;
	flex-direction: column;
}
.row {
	height: 50px;
	margin-left: 50px;
	margin-top: 5px;
	position: relative;
}
.line {
	display: flex;
	position: absolute;
	height: 25px;
	border-top: 5px solid #95989a;
	top: 10;
}
.blank {
	display: flex;
	position: absolute;
	height: 25px;
	border-top: 5px solid #f0f0f0;
	top: 10;
}
.drug-label {
	font-size: 14pt;
	color: #5d5d5d;
}
.line-label {
	font-size: 10pt;
	color: #95989a;
}
</style>
