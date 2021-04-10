const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlay_Chunk', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
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

	it('binds OLSKCollectionChunkFunction', function () {
		browser.assert.element('.OLSKCollectionChunkHeading');
	});
	
});
