const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const JBXPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

describe('JBXPlay_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});
	
	it('sets meta:mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=mobile-web-app-capable]', 'content', 'yes');
	});
	
	it('sets meta:apple-mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=apple-mobile-web-app-capable]', 'content', 'yes');
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('JBXPlay', function test_JBXPlay () {
		
		it('classes OLSKDecorFormBlend', function () {
			browser.assert.hasClass(JBXPlay, 'OLSKDecorFormBlend');
		});

	});

	describe('JBXPlayStashButton', function test_JBXPlayStashButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(JBXPlayStashButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(JBXPlayStashButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(JBXPlayStashButton, 'OLSKToolbarButton');
		});
		
	});

	describe('JBXPlayStashButtonImage', function test_JBXPlayStashButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ JBXPlayStashButtonImage } #_OLSKSharedStash`, 1);
		});
	
	});

	describe('JBXPlayToggleFormButton', function test_JBXPlayToggleFormButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(JBXPlayToggleFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(JBXPlayToggleFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(JBXPlayToggleFormButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(JBXPlayToggleFormButton, 'accesskey', 'n');
		});
	
	});

	describe('JBXPlayToggleFormButtonImage', function test_JBXPlayToggleFormButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ JBXPlayToggleFormButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});

	describe('JBXPlayForm', function test_JBXPlayForm () {

		before(function () {
			return browser.pressButton(JBXPlayToggleFormButton);
		});

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(JBXPlayForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(JBXPlayForm, 'OLSKDecorBigForm');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(JBXPlayForm, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('JBXPlayFormField', function test_JBXPlayFormField () {

		it('sets autofocus', function () {
			browser.assert.attribute(JBXPlayFormField, 'autofocus', '');
		});
	
	});

	describe('OLSKCollectionItem', function test_OLSKCollectionItem () {

		before(function () {
			browser.fill(JBXPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(JBXPlayFormSubmitButton);
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass('.OLSKCollectionItem', 'OLSKCommonEdgeBottom');
		});
	
	});

	context('select', function test_select () {
		
		before(function () {
			return browser.click(JBXPlayListItem);
		});

		it('sets JBXPlayListItemSelected', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

		it('sets JBXPlayDetailItem', function () {
			browser.assert.elements('.JBXPlayDetail', 1);
		});

	});

	describe('JBXPlayViewportFooter', function test_JBXPlayViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(JBXPlayViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKApropos', function test_OLSKApropos() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarAproposButton');
		});

		it('sets OLSKAproposFeedbackValue', function () {
			browser.assert.attribute('.OLSKAproposFeedbackButton', 'href', `javascript:window.location.href = window.atob('${ browser.window.btoa('mailto:' + OLSKTestingFormatted(process.env.OLSK_APROPOS_FEEDBACK_EMAIL, process.env.ROCO_SHARED_PROJECT_ID)) }')`);
		});

		after(function () {
			browser.pressButton('.OLSKModalViewCloseButton');
		});

	});

	describe('OLSKAppToolbarGuideLink', function test_OLSKAppToolbarGuideLink() {

		it('binds OLSKAppToolbarGuideURL', function () {
			browser.assert.attribute('.OLSKAppToolbarGuideLink', 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});

	});

	describe('JBXPlayCloudToolbar', function test_JBXPlayCloudToolbar () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(JBXPlayCloudToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(JBXPlayCloudToolbar, 'OLSKToolbarJustify');
		});
		
		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(JBXPlayCloudToolbar, 'OLSKCommonEdgeTop');
		});
	
	});

	context('JBXPlayClearInboxButton', function test_JBXPlayClearInboxButton () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash: {
					[JBXPlayLogic.JBXPlayInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
						JBXDocumentURL: Math.random().toString(),
					}), JBXPlayLogic.JBXPlayRemap())])),
				},
			});
		});

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(JBXPlayClearInboxButton, 'OLSKDecorPress');
		});

	});

});
