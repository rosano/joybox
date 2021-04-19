const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const JBXPlayListItemLogic = require('./ui-logic.js').default;

describe('JBXPlayListItem_Misc', function () {

	const JBXDocumentName = uRandomElement(undefined, Array.from(Array(Math.max(2, uRandomInt(100)))).map(Math.random).toString());

	const item = StubDocumentObjectValid({
		JBXDocumentName,
		JBXDocumentURL: 'https://www.example.com/' + Math.random().toString(),
		JBXDocumentImageURL: 'https://www.example.com/' + Math.random().toString(),
		JBXDocumentNotes: Array.from(Array(Math.max(2, uRandomInt(100)))).map(Math.random).toString(),
		JBXDocumentTags: Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
			return Math.random().toString();
		}),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JBXPlayListItemObject: JSON.stringify(item),
		});
	});

	describe('JBXPlayListItem', function test_JBXPlayListItem () {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(JBXPlayListItem, 'OLSKCommonCard');
		});
		
	});

	describe('JBXPlayListItemImage', function test_JBXPlayListItemImage () {
		
		it('sets role', function () {
			browser.assert.attribute(JBXPlayListItemImage, 'role', 'presentation');
		});
		
		it('binds JBXDocumentImageURL', function () {
			browser.assert.attribute(JBXPlayListItemImage, 'src', item.JBXDocumentImageURL);
		});
	
	});

	describe('JBXPlayListItemTitle', function test_JBXPlayListItemTitle () {
		
		it('binds JBXDocumentName', function () {
			browser.assert.text(JBXPlayListItemTitle, require('OLSKString').OLSKStringSnippet(item.JBXDocumentName || JBXPlayListItemLogic.JBXPlayListItemHumanURL(item.JBXDocumentURL)));
		});
	
	});

	describe('JBXPlayListItemSnippet', function test_JBXPlayListItemSnippet () {
		
		it('binds JBXDocumentNotes', function () {
			browser.assert.text(JBXPlayListItemSnippet, require('OLSKString').OLSKStringSnippet(item.JBXDocumentNotes));
		});
	
	});

	describe('JBXPlayListItemTags', function test_JBXPlayListItemTags () {
		
		it('binds JBXDocumentTags', function () {
			browser.assert.text(JBXPlayListItemTags, item.JBXDocumentTags.join(', '));
		});
	
	});

	context('JBXDocumentArchiveDate', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayListItemObject: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentArchiveDate: new Date(),
				})),
			});
		});

		it('classes JBXPlayListItemArchived', function () {
			browser.assert.hasClass(JBXPlayListItem, 'JBXPlayListItemArchived');
		});
	
	});

});
