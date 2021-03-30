const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlay_Transport', function () {	

	const json = {};

	describe('JBXPlayLauncherItemImportJSON', function test_JBXPlayLauncherItemImportJSON() {

		const JBXDocumentNotes = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'JBXPlayLauncherItemDebug_PromptFakeImportSerialized');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				dialog.response = JSON.stringify({
					JBXDocument: [StubDocumentObjectValid({
						JBXDocumentNotes,
					})],
					JBXSetting: [StubSettingObjectValid()],
				});

				Object.assign(json, JSON.parse(dialog.response));

				return dialog;
			});
		});

		it('creates note', function () {
			browser.assert.text('.JBXPlayListItemSnippet', JBXDocumentNotes);
		});

	});

	describe('LCHComposeLauncherItemExportJSON', function test_LCHComposeLauncherItemExportJSON() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'JBXPlayLauncherItemDebug_AlertFakeExportSerialized');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: json,
    	});
    });

	});

});
