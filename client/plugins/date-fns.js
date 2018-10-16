import Vue from 'vue';
import format from 'date-fns/format';

const VueDateFns = {
	install: (Vue, options) => {
		Vue.filter('format', (date, dateFormat, options) => {
			return format(date, dateFormat);
		});
	}
};

Vue.use(VueDateFns);
