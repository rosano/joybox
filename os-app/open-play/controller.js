exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/play',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'JOXPlayRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view.ejs'));
		},
		OLSKRouteLanguageCodes: ['en'],
	}];
};
