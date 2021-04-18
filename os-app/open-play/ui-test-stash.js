const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlay_Stash', function () {

	const count = Math.max(1, uRandomInt(10));
	const items = Array.from(Array(count)).map(Math.random);
	const stash = Math.max(1, uRandomInt(count));

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.pressButton(JBXPlayToggleFormButton);
	});

	before(function () {
		browser.fill(JBXPlayFormField, items.join('\n\n'));
	});

	before(function () {
		return browser.pressButton(JBXPlayFormSubmitButton);
	});

	before(function () {
		return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
	});

	before(function () {
		return browser.pressButton(JBXPlayStashButton);
	});

	it('calls OLSKCatalogStashEnabled', function () {
		browser.assert.elements('.OLSKCollectionItemStashStatus', count);
	});

	context('OLSKCatalogDispatchStash', function () {
		
		Array.from(Array(stash)).forEach(function (e, i) {
			
			before(function () {
				return browser.click(`.OLSKCollectionItem:nth-child(${ i + 1 })`);
			});

		});
		
		before(function () {
			return browser.click('.OLSKCatalogStashDoneButton');
		});

		it('shows JBXPlayListItem', function () {
			browser.assert.elements(`${ JBXPlayShareModal } .JBXPlayListItem`, stash);
		});
	
	});
	
});
