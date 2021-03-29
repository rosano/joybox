exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/JOXPlayDetail',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'JOXPlayDetailStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en'],
	}];
};
