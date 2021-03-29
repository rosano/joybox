const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JOXPlay_Catalog', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton(JOXPlayToggleFormButton);
		});

		before(function () {
			browser.fill(JOXPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(JOXPlayFormSubmitButton);
		});

		it('adds item', function () {
			browser.assert.elements(JOXPlayListItem, 1);
		});
	
	});

	context('OLSKCatalogDispatchClick', function test_OLSKCatalogDispatchClick () {
		
		before(function () {
			browser.assert.elements('.JOXPlayDetail', 0);
		});

		before(function () {
			return browser.click(JOXPlayListItem);
		});

		it('selects item', function () {
			browser.assert.elements('.JOXPlayDetail', 1);
		});
	
	});

	context('back', function test_back () {

		before(function () {
			return browser.pressButton('.JOXPlayDetailToolbarBackButton');
		});

		it('sets focus', function () {
			browser.assert.hasClass('.OLSKCatalogDetail', 'OLSKMobileViewInactive');
		});

	});

	context('discard', function test_discard () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.JOXPlayDetailToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.JOXPlayDetail', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.JOXPlayDetailToolbarDiscardButton');
				});
			});

			it('removes item', function () {
				browser.assert.elements(JOXPlayListItem, 0);
			});
		
		});
		
	});

	context('OLSKCatalogDispatchArrow', function test_OLSKCatalogDispatchArrow () {
		
		before(function () {
			return browser.pressButton(JOXPlayToggleFormButton);
		});

		before(function () {
			browser.fill(JOXPlayFormField, Math.random().toString() + '\n' + Math.random().toString());
		});

		before(function () {
			return browser.pressButton(JOXPlayFormSubmitButton);
		});

		before(function () {
			return browser.click(JOXPlayListItem);
		});

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('binds OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});
	
	});

});
