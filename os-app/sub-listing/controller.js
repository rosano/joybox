exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/JOXPlayListItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'JOXPlayListItemStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
