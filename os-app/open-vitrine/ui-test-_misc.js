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

		it('classes OLSKDecorNoTopPad', function () {
			browser.assert.hasClass(JBXVitrine, 'OLSKDecorNoTopPad');
		});
	
	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			browser.assert.attribute('.OLSKCrownCardImage', 'src', '/_shared/JBXRootLink/ui-assets/identity.svg');
		});
	
	});

	describe('JBXVitrineVideo', function () {

		it('sets src', function () {
			browser.assert.attribute(JBXVitrineVideo, 'src', process.env.JBX_VITRINE_VIDEO_URL);
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(JBXVitrineVideo, 'allowfullscreen', '');
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

	describe('JBXVitrineGlossary', function test_JBXVitrineGlossary () {

		it('classes OLSKDecorGlossary', function () {
			browser.assert.hasClass(JBXVitrineGlossary, 'OLSKDecorGlossary');
		});
		
	});

	describe('JBXVitrineGlossaryEphemerataLink', function test_JBXVitrineGlossaryEphemerataLink () {

		it('sets href', function () {
			browser.assert.attribute(JBXVitrineGlossaryEphemerataLink, 'href', process.env.JBX_VITRINE_EPHEMERATA_URL);
		});

		it('sets target', function () {
			browser.assert.attribute(JBXVitrineGlossaryEphemerataLink, 'target', 	'_blank');
		});

		it('sets text', function () {
			browser.assert.text(JBXVitrineGlossaryEphemerataLink, 'Ephemerata');
		});
	
	});

	describe('ROCOGazette', function test_ROCOGazette () {

		it('sets ROCOBulletinProject', function () {
			browser.assert.attribute('.ROCOBulletinProjectField', 'value', process.env.ROCO_SHARED_PROJECT_ID);
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
		});

	});

});
