import Vue from 'vue';

import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest/client';
import auth from 'feathers-authentication-client';
import axios from 'axios';
import { CookieStorage } from 'cookie-storage';

const feathersClient = feathers()
	.configure(hooks())
	.configure(rest().axios(axios))
	.configure(
		auth({
			storage: new CookieStorage(),
			path: '/api/authentication'
		})
	);

const VueFeathers = {
	install: (Vue, options) => {
		Vue.prototype.$feathers = feathersClient;
	}
};

Vue.use(VueFeathers);

export default feathersClient;
