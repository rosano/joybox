exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/JBXPlayListItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'JBXPlayListItemStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
