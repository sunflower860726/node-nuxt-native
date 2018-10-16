import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven.config('https://6fb2925a91f84104b4bee37e16c97091@sentry.io/290603')
	.addPlugin(RavenVue, Vue)
	.install();
