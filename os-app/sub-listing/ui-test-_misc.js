const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JOXPlayListItem_Misc', function () {

	const JOXDocumentName = uRandomElement(undefined, Math.random().toString());

	const item = StubDocumentObjectValid({
		JOXDocumentName,
		JOXDocumentNotes: Math.random().toString(),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JOXPlayListItemObject: JSON.stringify(item),
		});
	});

	describe('JOXPlayListItem', function test_JOXPlayListItem () {

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(JOXPlayListItem, 'OLSKCommonEdgeBottom');
		});
		
	});

	describe('JOXPlayListItemTitle', function test_JOXPlayListItemTitle () {
		
		it('binds JOXDocumentNotes', function () {
			browser.assert.text(JOXPlayListItemTitle, item.JOXDocumentName || '');
		});
	
	});

	describe('JOXPlayListItemSnippet', function test_JOXPlayListItemSnippet () {
		
		it('binds JOXDocumentNotes', function () {
			browser.assert.text(JOXPlayListItemSnippet, item.JOXDocumentNotes);
		});
	
	});

	context('JOXDocumentIsArchived', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JOXPlayListItemObject: JSON.stringify(StubDocumentObjectValid({
					JOXDocumentIsArchived: true,
				})),
			});
		});

		it('classes JOXPlayListItemArchived', function () {
			browser.assert.hasClass(JOXPlayListItem, 'JOXPlayListItemArchived');
		});
	
	});

});
