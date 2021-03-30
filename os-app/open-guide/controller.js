exports.OLSKControllerUseLivereload = function () {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/guide',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'JBXGuideRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
				JBXGuideContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), {}),
			});
		},
		_OLSKRouteLanguageCodes: ['en'],
	}];
};
