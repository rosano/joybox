const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('JBXVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(JBXVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(JBXVitrine, 'OLSKDecorCapped');
		});
	
	});

	describe('JBXVitrineToolbar', function () {
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(JBXVitrineToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(JBXVitrineToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKStickyHeader', function () {
			browser.assert.hasClass(JBXVitrineToolbar, 'OLSKStickyHeader');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(JBXVitrineToolbar, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('JBXVitrineCrown', function test_JBXVitrineCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(JBXVitrineCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCardMini', function () {
			browser.assert.hasClass(JBXVitrineCrown, 'OLSKCommonCrownCardMini');
		});
		
	});

	describe('JBXVitrineCrownIcon', function () {

		it('sets role', function () {
			browser.assert.attribute(JBXVitrineCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(JBXVitrineCrownIcon, 'src', '/_shared/JBXRootLink/ui-assets/identity.svg');
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

	describe('JBXVitrineGuideButton', function test_JBXVitrineGuideButton () {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(JBXVitrineGuideButton, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(JBXVitrineGuideButton, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(JBXVitrineGuideButton, 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('OLSKGazette', function test_OLSKGazette () {

		it('sets src', function () {
			browser.assert.attribute('.OLSKGazetteProjectField', 'value', 'RP_X');
		});

	});

});
