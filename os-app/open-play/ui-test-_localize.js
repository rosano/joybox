const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const JOXPlayLogic = require('./ui-logic.js').default;

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`JOXPlay_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('JOXPlayTitle'));
		});

		it('localizes JOXPlayToggleFormButton', function () {
			browser.assert.attribute(JOXPlayToggleFormButton, 'title', uLocalized('JOXPlayToggleFormButtonText'));
		});

		it('localizes JOXPlayLauncherItemImportJSON', function () {
			return browser.assert.OLSKLauncherItemText('JOXPlayLauncherItemImportJSON', uLocalized('JOXPlayLauncherItemImportJSONText'));
		});

		it('localizes JOXPlayLauncherItemExportJSON', function () {
			return browser.assert.OLSKLauncherItemText('JOXPlayLauncherItemExportJSON', uLocalized('JOXPlayLauncherItemExportJSONText'));
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

		describe('JOXPlayFormField', function test_JOXPlayFormField () {

			before(function () {
				return browser.pressButton(JOXPlayToggleFormButton);
			});

			it('localizes JOXPlayFormField', function () {
				browser.assert.attribute(JOXPlayFormField, 'placeholder', uLocalized('JOXPlayFormFieldText'));
			});
			
		});

		describe('JOXPlayFormSubmitButton', function test_JOXPlayFormSubmitButton () {

			it('localizes JOXPlayFormSubmitButton', function () {
				browser.assert.text(JOXPlayFormSubmitButton, uLocalized('JOXPlayFormSubmitButtonText'));
			});
			
		});

		context('archive', function test_archive () {

			before(function () {
				browser.fill(JOXPlayFormField, Math.random().toString());
			});

			before(function () {
				return browser.pressButton(JOXPlayFormSubmitButton);
			});

			before(function () {
				return browser.click(JOXPlayListItem);
			});

			before(function () {
				return browser.pressButton('.JOXPlayDetailToolbarArchiveButton');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('localizes JOXPlayRevealArchiveButton', function () {
				browser.assert.text(JOXPlayRevealArchiveButton, uLocalized('JOXPlayRevealArchiveButtonText'));
			});

			it('localizes JOXPlayLauncherItemRevealArchive', function () {
				return browser.assert.OLSKLauncherItemText('JOXPlayLauncherItemRevealArchive', uLocalized('JOXPlayRevealArchiveButtonText'));
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

		describe('JOXPlayLauncherItemImportJSON', function test_JOXPlayLauncherItemImportJSON() {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
				});
			});

			context('not filled', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'JOXPlayLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not filled', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = ' ';

							return dialog;
						});
					}, uLocalized('JOXPlayLauncherItemImportJSONErrorNotFilledAlertText'));
				});
			
			});

			context('not json', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'JOXPlayLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not json', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = 'alfa';

							return dialog;
						});
					}, uLocalized('JOXPlayLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});

			context('not valid', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'JOXPlayLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not valid', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = JSON.stringify({
								[Math.random().toString()]: Math.random().toString(),
							});

							return dialog;
						});
					}, uLocalized('JOXPlayLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});
			
		});

	});

});
