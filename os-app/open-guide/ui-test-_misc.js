const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JOXGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('JOXGuide', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(JOXGuide, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(JOXGuide, 'OLSKDecorCapped');
		});
	
	});

	describe('JOXGuideCrown', function test_JOXGuideCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(JOXGuideCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(JOXGuideCrown, 'OLSKCommonCrownCard');
		});
		
	});

});
