const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JOXPlayListItem_Misc', function () {

	const JOXDocumentNotes = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JOXPlayListItemObject: JSON.stringify(StubNoteObjectValid({
				JOXDocumentNotes,
			})),
		});
	});

	describe('JOXPlayListItem', function test_JOXPlayListItem () {

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(JOXPlayListItem, 'OLSKCommonEdgeBottom');
		});
		
	});

	describe('JOXPlayListItemSnippet', function test_JOXPlayListItemSnippet () {
		
		it('binds JOXDocumentNotes', function () {
			browser.assert.text(JOXPlayListItemSnippet, JOXDocumentNotes);
		});
	
	});

	context('JOXDocumentIsArchived', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JOXPlayListItemObject: JSON.stringify(StubNoteObjectValid({
					JOXDocumentIsArchived: true,
				})),
			});
		});

		it('classes JOXPlayListItemArchived', function () {
			browser.assert.hasClass(JOXPlayListItem, 'JOXPlayListItemArchived');
		});
	
	});

});
