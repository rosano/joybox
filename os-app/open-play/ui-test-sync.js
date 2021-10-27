const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlay_Sync', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('ZDRSchemaDispatchSyncCreateDocument', function test_ZDRSchemaDispatchSyncCreateDocument () {

		before(function () {
			browser.assert.elements('.JBXPlayListItem', 0);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		});

		it('adds item', function () {
			browser.assert.elements('.JBXPlayListItem', 1);
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateDocument', function test_ZDRSchemaDispatchSyncUpdateDocument () {

		before(function () {
			browser.assert.text('.JBXPlayListItem', 'FakeZDRSchemaDispatchSyncCreateDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		it('updates item', function () {
			browser.assert.text('.JBXPlayListItem', 'FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		context('selected same', function () {
			
			before(function () {
				return browser.click('.JBXPlayListItem');
			});

			before(function () {
				return browser.fill('.JBXPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
			});

			it('updates detail', function () {
				browser.assert.input('.JBXPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncUpdateDocument');
			});

		});

	});

	describe('ZDRSchemaDispatchSyncDeleteDocument', function test_ZDRSchemaDispatchSyncDeleteDocument () {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
		});

		it('removes item', function () {
			browser.assert.elements('.JBXPlayListItem', 0);
		});

		context('selected same', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.click('.JBXPlayListItem');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
			});

			it('clears detail', function () {
				browser.assert.elements('.JBXPlayDetail', 0);
			});
		
		});

	});

	describe.skip('ZDRSchemaDispatchSyncConflictDocument', function test_ZDRSchemaDispatchSyncConflictDocument () {

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
			return browser.click('.JBXPlayListItem');
		});

		before(function () {
			return browser.fill('.JBXPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncConflictDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncConflictDocument');
		});

		it('selects local', function () {
			browser.assert.text('.JBXPlayListItem', 'FakeZDRSchemaDispatchSyncConflictDocument-local');
		});

	});

});
