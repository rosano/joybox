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
				JBXGuideContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), Object.assign(require('OLSKDisk').OLSKDiskReadFile(require('path').join(__dirname, '../open-play/ui-logic.js')).split('\n').reduce(function (coll, item) {
					const match = item.match(/const k(.*) = '(.*)';/);
					return !match ? coll : Object.assign(coll, {
						[match[1]]: match[2],
					});
				}, {}), {
					JBXPlayRoute: res.locals.OLSKCanonical('JBXPlayRoute'),
					JBXGuideTokenOrigin: req.protocol + '://' + req.get('host'),
				})),
			});
		},
		_OLSKRouteLanguageCodes: ['en'],
	}];
};
