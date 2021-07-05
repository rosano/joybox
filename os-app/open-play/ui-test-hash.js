const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const JBXPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

describe('JBXPlay_Hash', function () {

	describe('JBXPlayCaptureAnchor', function test_JBXPlayCaptureAnchor () {
		
		const OLSKRoutingHash = {
			[JBXPlayLogic.JBXPlayCaptureAnchor()]: uLink(Math.random().toString()),
			[JBXPlayLogic.JBXPlayNameAnchor()]: Math.random().toString(),
		};

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash,
			});
		});

		it('adds item', function () {
			browser.assert.elements(JBXPlayListItem, 1);
		});

		context('select', function () {

			before(function () {
				return browser.click(JBXPlayListItem);
			});

			it('binds JBXDocumentURL', function () {
				browser.assert.input(JBXPlayDetailMediaURLField, OLSKRoutingHash[JBXPlayLogic.JBXPlayCaptureAnchor()]);
			});

			it('binds JBXDocumentName', function () {
				browser.assert.input(JBXPlayDetailFormNameField, OLSKRoutingHash[JBXPlayLogic.JBXPlayNameAnchor()]);
			});
		
		});
	
	});

	describe('JBXPlayInboxAnchor', function test_JBXPlayInboxAnchor () {
		
		const items = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
			return StubDocumentObjectValid({
				JBXDocumentURL: uLink(),
				JBXDocumentName: Math.random().toString(),
			});
		});
		const OLSKRoutingHash = {
			[JBXPlayLogic.JBXPlayInboxAnchor()]: encodeURIComponent(JSON.stringify(items.map(function (e) {
				return OLSKObject.OLSKObjectRemap(e, JBXPlayLogic.JBXPlayRemap());
			}))),
		};
		const OLSKRoutingLanguage = uRandomElement(kDefaultRoute.OLSKRouteLanguageCodes);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash,
				OLSKRoutingLanguage,
			});
		});

		it('adds items', function () {
			browser.assert.elements(JBXPlayListItem, items.length);
		});

		it('chunks', function () {
			browser.assert.text('.OLSKCollectionChunkHeading', OLSKTestingLocalized('JBXPlayChunkInboxText', OLSKRoutingLanguage));
		});

		context('select', function () {

			before(function () {
				return browser.click(JBXPlayListItem);
			});

			it('binds JBXDocumentURL', function () {
				browser.assert.input('.JBXPlayDetailMediaURLField', items[0].JBXDocumentURL);
			});

			it('binds JBXDocumentName', function () {
				browser.assert.input('.JBXPlayDetailFormNameField', items[0].JBXDocumentName);
			});
		
		});

		context('JBXPlayDetailDispatchQueue', function () {
			
			before(function () {
				return browser.pressButton('.JBXPlayDetailToolbarQueueButton');
			});

			it('adds item', function () {
				browser.assert.elements(JBXPlayListItem, items.length + 1);
			});

			context('select', function () {

				before(function () {
					return browser.click('.OLSKCollectionChunk:nth-child(2) .OLSKCollectionItem');
				});

				it('binds JBXDocumentURL', function () {
					browser.assert.input('.JBXPlayDetailMediaURLField', items[0].JBXDocumentURL);
				});

				it('binds JBXDocumentName', function () {
					browser.assert.input('.JBXPlayDetailFormNameField', items[0].JBXDocumentName);
				});
			
			});
		
		});

		context('JBXPlayClearInboxButton', function () {
			
			before(function () {
				return browser.pressButton(JBXPlayClearInboxButton);
			});

			it('clears hash', function () {
				browser.assert.deepEqual(browser.location.hash, '');
			});
		
		});
	
	});

});
