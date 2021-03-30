const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JBXPlayListItem: '.JBXPlayListItem',

	JBXPlayListItemTitle: '.JBXPlayListItemTitle',

	JBXPlayListItemSnippet: '.JBXPlayListItemSnippet',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('JBXPlayListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JBXPlayListItemObject: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows JBXPlayListItem', function () {
		browser.assert.elements(JBXPlayListItem, 1);
	});

	it('shows JBXPlayListItemTitle', function () {
		browser.assert.elements(JBXPlayListItemTitle, 1);
	});

	it('shows JBXPlayListItemSnippet', function () {
		browser.assert.elements(JBXPlayListItemSnippet, 1);
	});

});
