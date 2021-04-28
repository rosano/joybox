const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute._OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('JBXGuide_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('JBXGuideTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('JBXGuideDescription'));
		});

		it('localizes JBXGuideCrownName', function () {
			browser.assert.text(JBXGuideCrownName, uLocalized('JBXGuideTitle'));
		});

	});

});
