const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('JBXGuide', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(JBXGuide, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(JBXGuide, 'OLSKDecorCapped');
		});
	
	});

	describe('JBXGuideCrown', function test_JBXGuideCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(JBXGuideCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(JBXGuideCrown, 'OLSKCommonCrownCard');
		});
		
	});

});
