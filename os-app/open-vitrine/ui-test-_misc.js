const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JOXVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('JOXVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(JOXVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(JOXVitrine, 'OLSKDecorCapped');
		});
	
	});

	describe('JOXVitrineToolbar', function () {
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(JOXVitrineToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(JOXVitrineToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKStickyHeader', function () {
			browser.assert.hasClass(JOXVitrineToolbar, 'OLSKStickyHeader');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(JOXVitrineToolbar, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('JOXVitrineCrown', function test_JOXVitrineCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(JOXVitrineCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCardMini', function () {
			browser.assert.hasClass(JOXVitrineCrown, 'OLSKCommonCrownCardMini');
		});
		
	});

	describe('JOXVitrineCrownIcon', function () {

		it('sets role', function () {
			browser.assert.attribute(JOXVitrineCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(JOXVitrineCrownIcon, 'src', '/_shared/JOXRootLink/ui-assets/identity.svg');
		});

	});

	describe('OLSKLanding', function test_OLSKLanding () {

		it('sets OLSKLandingActionHref', function () {
			browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-play/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('OLSKAppFeaturesList', function test_OLSKAppFeaturesList () {

		it('shows OLSKAppFeatureOpenSource', function () {
			browser.assert.attribute('.OLSKAppFeatureListItemOpenSource a', 'href', process.env.OLSK_REPO_URL);
		});
	
	});

	describe('JOXVitrineGuideButton', function test_JOXVitrineGuideButton () {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(JOXVitrineGuideButton, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(JOXVitrineGuideButton, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(JOXVitrineGuideButton, 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('OLSKGazette', function test_OLSKGazette () {

		it('sets src', function () {
			browser.assert.attribute('.OLSKGazetteProjectField', 'value', 'RP_007');
		});

	});

});
