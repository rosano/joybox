exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/JOXRootLink',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'main'));
		},
		OLSKRouteSignature: 'JOXRootLinkStubRoute',
		OLSKRouteLanguageCodes: ['en'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
