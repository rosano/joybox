exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/JBXRootLink',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'main'));
		},
		OLSKRouteSignature: 'JBXRootLinkStubRoute',
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
