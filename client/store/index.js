import Vuex from 'vuex';
import feathers from '../plugins/feathers';
import feathersVuex, { initAuth } from 'feathers-vuex';

const { service, auth } = feathersVuex(feathers, {
	idField: '_id',
	autoRemove: true
});

const createStore = () => {
	return new Vuex.Store({
		plugins: [
			auth({
				userService: 'api/users',
				state: {
					publicPages: ['login', 'signup']
				}
			}),
			service('api/users'),
			service('api/hcp-signup'),
			service('api/hcps'),
			service('api/patients'),
			service('api/invites'),
			service('api/reports/medications', {
				idField: 'date'
			}),
			service('api/reports/uas', {
				idField: 'date'
			}),
			service('api/reports/aas', {
				idField: 'date'
			}),
			service('api/reports/uas-week', {
				idField: 'date'
			}),
			service('api/reports/aas-week', {
				idField: 'date'
			}),
			service('api/reports/ct', {
				idField: 'date'
			}),
			service('api/reports/aqol', {
				idField: 'date'
			}),
			service('api/reports/uqol', {
				idField: 'date'
			}),
			service('api/management', {})
		],
		state: {},
		mutations: {},
		actions: {
			nuxtServerInit({ commit, dispatch, state }, { req }) {
				return initAuth({
					commit,
					dispatch,
					req,
					moduleName: 'auth',
					cookieName: 'feathers-jwt'
				});
			}
		}
	});
};

export default createStore;
