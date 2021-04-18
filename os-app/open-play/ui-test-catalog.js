const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlay_Catalog', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton(JBXPlayToggleFormButton);
		});

		before(function () {
			browser.fill(JBXPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(JBXPlayFormSubmitButton);
		});

		it('adds item', function () {
			browser.assert.elements(JBXPlayListItem, 1);
		});
	
	});

	context('OLSKCollectionDispatchClick', function test_OLSKCollectionDispatchClick () {
		
		before(function () {
			browser.assert.elements('.JBXPlayDetail', 0);
		});

		before(function () {
			return browser.click(JBXPlayListItem);
		});

		it('selects item', function () {
			browser.assert.elements('.JBXPlayDetail', 1);
		});
	
	});

	context('back', function test_back () {

		before(function () {
			return browser.pressButton('.JBXPlayDetailToolbarBackButton');
		});

		it('sets focus', function () {
			browser.assert.hasClass('.OLSKCatalogDetail', 'OLSKMobileViewInactive');
		});

	});

	context('discard', function test_discard () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.JBXPlayDetailToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.JBXPlayDetail', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.JBXPlayDetailToolbarDiscardButton');
				});
			});

			it('removes item', function () {
				browser.assert.elements(JBXPlayListItem, 0);
			});
		
		});
		
	});

	context('OLSKCollectionDispatchArrow', function test_OLSKCollectionDispatchArrow () {
		
		before(function () {
			return browser.pressButton(JBXPlayToggleFormButton);
		});

		before(function () {
			browser.fill(JBXPlayFormField, Math.random().toString() + '\n\n' + Math.random().toString());
		});

		before(function () {
			return browser.pressButton(JBXPlayFormSubmitButton);
		});

		before(function () {
			return browser.click(JBXPlayListItem);
		});

		before(function () {
			return browser.focus('.OLSKNarrowFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});
	
	});

});
