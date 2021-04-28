const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('JBXShare_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes JBXPlayShareLinkField', function () {
			browser.assert.attribute(JBXPlayShareLinkField, 'placeholder', uLocalized('JBXPlayShareLinkFieldText'));
		});

		it('localizes JBXPlayShareCopyButton', function () {
			browser.assert.text(JBXPlayShareCopyButton, uLocalized('JBXPlayShareCopyButtonText'));
		});

	});

});
