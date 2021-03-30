const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlayListItem_Misc', function () {

	const JBXDocumentName = uRandomElement(undefined, Math.random().toString());

	const item = StubDocumentObjectValid({
		JBXDocumentName,
		JBXDocumentNotes: Math.random().toString(),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JBXPlayListItemObject: JSON.stringify(item),
		});
	});

	describe('JBXPlayListItem', function test_JBXPlayListItem () {

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(JBXPlayListItem, 'OLSKCommonEdgeBottom');
		});
		
	});

	describe('JBXPlayListItemTitle', function test_JBXPlayListItemTitle () {
		
		it('binds JBXDocumentNotes', function () {
			browser.assert.text(JBXPlayListItemTitle, item.JBXDocumentName || '');
		});
	
	});

	describe('JBXPlayListItemSnippet', function test_JBXPlayListItemSnippet () {
		
		it('binds JBXDocumentNotes', function () {
			browser.assert.text(JBXPlayListItemSnippet, item.JBXDocumentNotes);
		});
	
	});

	context('JBXDocumentIsArchived', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayListItemObject: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentIsArchived: true,
				})),
			});
		});

		it('classes JBXPlayListItemArchived', function () {
			browser.assert.hasClass(JBXPlayListItem, 'JBXPlayListItemArchived');
		});
	
	});

});
