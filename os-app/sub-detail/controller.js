exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/JBXPlayDetail',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'JBXPlayDetailStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
