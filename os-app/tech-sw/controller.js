const kJOXServiceWorkerVersionID = Date.now().toString();

const OLSKServiceWorker = require('../_shared/__external/OLSKServiceWorker/main.js');

exports.OLSKControllerRoutes = function() {
	return {
		JOXServiceWorkerRoute: {
			OLSKRoutePath: '/sw.js',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.type('js').send(OLSKServiceWorker.OLSKServiceWorkerView({
					VERSION_ID_TOKEN: kJOXServiceWorkerVersionID,
					ORIGIN_PAGE_PATH_TOKEN: res.locals.OLSKCanonical('JOXPlayRoute'),
				}));
			},
		},
	};
};
