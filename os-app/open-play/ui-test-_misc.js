const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JOXPlay_Misc', function () {

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

	describe('JOXPlayToggleFormButton', function test_JOXPlayToggleFormButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(JOXPlayToggleFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(JOXPlayToggleFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(JOXPlayToggleFormButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(JOXPlayToggleFormButton, 'accesskey', 'n');
		});
	
	});

	describe('JOXPlayToggleFormButtonImage', function test_JOXPlayToggleFormButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ JOXPlayToggleFormButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});

	describe('JOXPlayForm', function test_JOXPlayForm () {

		before(function () {
			return browser.pressButton(JOXPlayToggleFormButton);
		});

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(JOXPlayForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(JOXPlayForm, 'OLSKDecorBigForm');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(JOXPlayForm, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('JOXPlayFormField', function test_JOXPlayFormField () {

		it('sets autofocus', function () {
			browser.assert.attribute(JOXPlayFormField, 'autofocus', '');
		});
	
	});

	context('select', function test_select () {
		
		before(function () {
			browser.fill(JOXPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(JOXPlayFormSubmitButton);
		});

		before(function () {
			return browser.click(JOXPlayListItem);
		});

		it('sets JOXPlayListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets JOXPlayDetailItem', function () {
			browser.assert.elements('.JOXPlayDetail', 1);
		});

	});

	describe('JOXPlayViewportFooter', function test_JOXPlayViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(JOXPlayViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKApropos', function test_OLSKApropos() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarAproposButton');
		});

		it('sets OLSKAproposFeedbackValue', function () {
			browser.assert.attribute('.OLSKAproposFeedbackButton', 'href', `javascript:window.location.href = window.atob('${ browser.window.btoa('mailto:' + OLSKTestingFormatted(process.env.OLSK_APROPOS_FEEDBACK_EMAIL, 'RP_X')) }')`);
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

	describe('JOXPlayCloudToolbar', function test_JOXPlayCloudToolbar () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(JOXPlayCloudToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(JOXPlayCloudToolbar, 'OLSKToolbarJustify');
		});
		
		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(JOXPlayCloudToolbar, 'OLSKCommonEdgeTop');
		});
	
	});

});
