const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JOXPlayListItem: '.JOXPlayListItem',

	JOXPlayListItemTitle: '.JOXPlayListItemTitle',

	JOXPlayListItemSnippet: '.JOXPlayListItemSnippet',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('JOXPlayListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JOXPlayListItemObject: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows JOXPlayListItem', function () {
		browser.assert.elements(JOXPlayListItem, 1);
	});

	it('shows JOXPlayListItemTitle', function () {
		browser.assert.elements(JOXPlayListItemTitle, 1);
	});

	it('shows JOXPlayListItemSnippet', function () {
		browser.assert.elements(JOXPlayListItemSnippet, 1);
	});

});
