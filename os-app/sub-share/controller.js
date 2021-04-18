exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/JBXPlayShare',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'JBXPlayShareStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
