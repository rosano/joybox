const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JOXPlay_Sync', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('ZDRSchemaDispatchSyncCreateDocument', function test_ZDRSchemaDispatchSyncCreateDocument () {

		before(function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		});

		it('adds item', function () {
			browser.assert.elements('.OLSKResultsListItem', 1);
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateDocument', function test_ZDRSchemaDispatchSyncUpdateDocument () {

		before(function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeZDRSchemaDispatchSyncCreateDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		it('updates item', function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		context('selected same', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem');
			});

			before(function () {
				return browser.fill('.JOXPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
			});

			it('updates detail', function () {
				browser.assert.input('.JOXPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncUpdateDocument');
			});

		});

	});

	describe('ZDRSchemaDispatchSyncDeleteDocument', function test_ZDRSchemaDispatchSyncDeleteDocument () {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
		});

		it('removes item', function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		context('selected same', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.click('.OLSKResultsListItem');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
			});

			it('clears detail', function () {
				browser.assert.elements('.JOXPlayDetail', 0);
			});
		
		});

	});

	describe('ZDRSchemaDispatchSyncConflictDocument', function test_ZDRSchemaDispatchSyncConflictDocument () {

		before(function () {
			return browser.pressButton(JOXPlayToggleFormButton);
		});

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
			return browser.fill('.JOXPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncConflictDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncConflictDocument');
		});

		it('selects local', function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeZDRSchemaDispatchSyncConflictDocument-local');
		});

	});

});
