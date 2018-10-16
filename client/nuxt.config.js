module.exports = {
	/*
  ** Headers of the page
  */
	head: {
		title: 'urtic',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Urtic Web App' }
		],
		link: [
			// <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
			// <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
			// <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
			// <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
			// <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
			// <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
			// <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
			// <link rel="manifest" href="/manifest.json">
			// <meta name="msapplication-TileColor" content="#ffffff">
			// <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
			// <meta name="theme-color" content="#ffffff">
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '96x96',
				href: '/favicon-96x96.png'
			},
			{
				rel: 'apple-touch-icon',
				sizes: '57x57',
				href: '/apple-icon-57x57.png'
			},
			{
				rel: 'apple-touch-icon',
				sizes: '60x60',
				href: '/apple-icon-60x60.png'
			},
			{
				rel: 'apple-touch-icon',
				sizes: '72x72',
				href: '/apple-icon-72x72.png'
			},
			{
				rel: 'stylesheet',
				href:
					'//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css'
			}
		],
		script: [
			{
				type: 'text/javascript',
				src:
					'https://cdn.polyfill.io/v2/polyfill.min.js?features=es6,Array.prototype.find,Array.prototype.includes,Array.prototype.values,Object.keys,Object.values&flags=gated'
			}
		]
	},
	/*
  ** Customize the progress bar color
  */
	mode: 'spa',
	extractCSS: true,
	loading: { color: '#3B8070' },

	/**
	 * Proxy API for development
	 */
	modules: ['@nuxtjs/proxy'],
	proxy: {
		// Simple proxy
		'/api': 'http://localhost:8000'
	},
	/**
	 * Router config
	 */
	router: {
		linkActiveClass: 'is-active'
		// middleware: ['auth']
	},

	vendor: ['buefy', 'chart.js', 'vue-chartjs', 'feathers-vuex', 'axios'],
	plugins: [
		'~/plugins/buefy.js',
		'~/plugins/date-fns.js',
		'~/plugins/sentry.js'
	],
	css: ['~/assets/app.scss'],

	/*
  ** Build configuration
  */
	build: {
		/*
    ** Run ESLint on save
    */
		extend(config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	}
};
