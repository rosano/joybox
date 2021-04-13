const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlay_Tag', function () {

	const item = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.pressButton('.OLSKAppToolbarLauncherButton');
	});

	before(function () {
		return browser.fill('.LCHLauncherFilterInput', 'OLSKPlayLauncherFakeCreateTaggedItem');
	});

	before(function () {
		return browser.OLSKPrompt(function () {
			return browser.click('.LCHLauncherPipeItem');
		}, function (dialog) {
			return Object.assign(dialog, {
				response: item,
			});
		});
	});

	context('create', function () {

		before(function () {
			return browser.pressButton(JBXPlayToggleFormButton);
		});

		it('binds OLSKTaxonomySuggestionItems', function () {
			browser.assert.text('.OLSKTaxonomySuggestion', item);
		});
	
	});

	context('select', function () {

		before(function () {
			browser.fill(JBXPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(JBXPlayFormSubmitButton);
		});

		before(function () {
			return browser.click(JBXPlayListItem);
		});

		it('binds OLSKTaxonomySuggestionItems', function () {
			browser.assert.text('.OLSKTaxonomySuggestion', item);
		});
	
	});
	
});
