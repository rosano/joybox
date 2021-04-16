const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlay_Fund', function () {

	require('OLSKFund/ui-test_template').default({
		kDefaultRoute,

		ParamProject: 'RP_009',
		
		ParamTriggerGate () {
			return browser.pressButton('.JBXPlayToggleFormButton');
		},

		async ParamCreateDocument () {
			await browser.pressButton('.JBXPlayToggleFormButton');
			
			browser.fill('.JBXPlayFormField', Math.random().toString());
			
			await browser.pressButton('.JBXPlayFormSubmitButton');
		},

		async ParamDeleteDocument () {
			await browser.click('.OLSKCollectionItem');

			return browser.OLSKConfirm(function () {
				return browser.pressButton('.JBXPlayDetailToolbarDiscardButton');
			});
		},

		ParamCreateDocumentSync () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		},

	});
	
});
