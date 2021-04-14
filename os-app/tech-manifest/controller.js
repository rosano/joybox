exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/manifest.json',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'JBXManifestRoute',
		OLSKRouteFunction (req, res, next) {
			return res.json({
				name: 'Joybox',
				short_name: 'Joybox',
				start_url: res.locals.OLSKCanonical('JBXPlayRoute'),
				display: 'standalone',
				background_color: 'black',
				theme_color: 'black',
				icons: [{
					src: process.env.OLSK_LAYOUT_TOUCH_ICON_URL,
					sizes: '600x600',
					type: 'image/png',
					purpose: 'any maskable',
				}],
			});
		},
	}];
};
