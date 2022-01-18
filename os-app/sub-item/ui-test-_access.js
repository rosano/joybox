const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JBXPlayListItem: '.JBXPlayListItem',

	JBXPlayListItemImage: '.JBXPlayListItemImage',

	JBXPlayListItemTitle: '.JBXPlayListItemTitle',

	JBXPlayListItemSnippet: '.JBXPlayListItemSnippet',

	JBXPlayListItemTags: '.JBXPlayListItemTags',
}).map(function (e) {
	return global[e.shift()] = e.pop();
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

	it('hides JBXPlayListItemImage', function () {
		browser.assert.elements(JBXPlayListItemImage, 0);
	});

	it('shows JBXPlayListItemTitle', function () {
		browser.assert.elements(JBXPlayListItemTitle, 1);
	});

	it('shows JBXPlayListItemSnippet', function () {
		browser.assert.elements(JBXPlayListItemSnippet, 1);
	});

	it('shows JBXPlayListItemTags', function () {
		browser.assert.elements(JBXPlayListItemTags, 1);
	});

	context('JBXDocumentImageURL', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayListItemObject: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentImageURL: Math.random().toString(),
				})),
			});
		});

		it('shows JBXPlayListItemImage', function () {
			browser.assert.elements(JBXPlayListItemImage, 1);
		});
	
	});

});
