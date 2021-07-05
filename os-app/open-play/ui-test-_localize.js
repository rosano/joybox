const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const JBXPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('JBXPlay_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('JBXPlayTitle'));
		});

		it('localizes JBXPlayStashButton', function () {
			browser.assert.attribute(JBXPlayStashButton, 'title', uLocalized('JBXPlayStashButtonText'));
		});

		it('localizes JBXPlayToggleFormButton', function () {
			browser.assert.attribute(JBXPlayToggleFormButton, 'title', uLocalized('JBXPlayToggleFormButtonText'));
		});

		describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton () {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			it('localizes LCHLauncherFilterInput', function () {
				browser.assert.attribute('.LCHLauncherFilterInput', 'placeholder', uLocalized('OLSKWordingTypeToSearch'));
			});

			after(function () {
				return browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		describe('OLSKAppToolbarLanguageButton', function test_OLSKAppToolbarLanguageButton () {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLanguageButton');
			});

			it('localizes LCHLauncherFilterInput', function () {
				browser.assert.attribute('.LCHLauncherFilterInput', 'placeholder', uLocalized('OLSKWordingTypeToFilter'));
			});

			after(function () {
				return browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		describe('JBXPlayFormField', function test_JBXPlayFormField () {

			before(function () {
				return browser.pressButton(JBXPlayToggleFormButton);
			});

			it('localizes JBXPlayFormField', function () {
				browser.assert.attribute(JBXPlayFormField, 'placeholder', uLocalized('JBXPlayFormFieldText'));
			});
			
		});

		describe('JBXPlayFormSubmitButton', function test_JBXPlayFormSubmitButton () {

			it('localizes JBXPlayFormSubmitButton', function () {
				browser.assert.text(JBXPlayFormSubmitButton, uLocalized('JBXPlayFormSubmitButtonText'));
			});
			
		});

		context('archive', function test_archive () {

			before(function () {
				browser.fill(JBXPlayFormField, Math.random().toString());
			});

			before(function () {
				return browser.pressButton(JBXPlayFormSubmitButton);
			});

			before(function () {
				return browser.click(JBXPlayListItem);
			});

			before(function () {
				return browser.pressButton('.JBXPlayDetailToolbarArchiveButton');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('localizes JBXPlayRevealArchiveButton', function () {
				browser.assert.text(JBXPlayRevealArchiveButton, uLocalized('JBXPlayRevealArchiveButtonText'));
			});

			it('localizes JBXPlayLauncherItemRevealArchive', function () {
				return browser.assert.OLSKLauncherItemText('JBXPlayLauncherItemRevealArchive', uLocalized('JBXPlayRevealArchiveButtonText'));
			});

		});

		describe('OLSKApropos', function test_OLSKApropos() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarAproposButton');
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('OLSKAproposHeadingText'));
			});

			after(function () {
				browser.pressButton('.OLSKModalViewCloseButton');
			});

		});

		describe('tongue', function test_tongue() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLanguageButton');
			});

			kDefaultRoute.OLSKRouteLanguageCodes.filter(function (e) {
				return e !== OLSKRoutingLanguage;
			}).forEach(function (e) {

				const signature = 'OLSKLanguageSwitcherLauncherItemSwitch-' + e;

				before(function () {
					return browser.fill('.LCHLauncherFilterInput', signature);
				});

				it(`shows ${ signature }`, function () {
					browser.assert.elements('.LCHLauncherPipeItem', 1);
				});

			});

			after(function () {
				browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		describe('JBXPlayShareModal', function test_JBXPlayShareModal() {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
				});
			});

			before(function () {
				return browser.pressButton(JBXPlayToggleFormButton);
			});

			before(function () {
				browser.fill(JBXPlayFormField, Math.random().toString());
			});

			before(function () {
				return browser.pressButton(JBXPlayFormSubmitButton);
			});

			before(function () {
				return browser.pressButton(JBXPlayStashButton);
			});

			before(function () {
				return browser.click('.OLSKCollectionItem');
			});

			before(function () {
				return browser.click('.OLSKCatalogStashDoneButton');
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('JBXPlayShareModalTitleText'));
			});

		});

		context('inbox', function test_inbox () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKRoutingHash: {
						[JBXPlayLogic.JBXPlayInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
							JBXDocumentURL: Math.random().toString(),
						}), JBXPlayLogic.JBXPlayRemap())])),
					},
				});
			});

			it('localizes JBXPlayClearInboxButton', function () {
				browser.assert.text(JBXPlayClearInboxButton, uLocalized('JBXPlayClearInboxButtonText'));
			});
		
		});

	});

});
