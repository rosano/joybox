const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const JBXPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject').default;

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
		
		const item = StubDocumentObjectValid({
			JBXDocumentURL: Math.random().toString(),
			JBXDocumentName: Math.random().toString(),
		});
		const OLSKRoutingHash = {
			[JBXPlayLogic.JBXPlayInboxAnchor()]: encodeURIComponent(JSON.stringify([item].map(function (e) {
				return OLSKObject.OLSKObjectRemap(e, JBXPlayLogic.JBXPlayRemap(e));
			}))),
		};
		const OLSKRoutingLanguage = uRandomElement(kDefaultRoute.OLSKRouteLanguageCodes);

		const uLocalized = function (inputData) {
			return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
		};

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash,
				OLSKRoutingLanguage,
			});
		});

		it('adds item', function () {
			browser.assert.elements(JBXPlayListItem, 1);
		});

		it('chunks', function () {
			browser.assert.text('.OLSKCollectionChunkHeading', uLocalized('JBXPlayChunkInboxText'));
		});

		context('select', function () {

			before(function () {
				return browser.click(JBXPlayListItem);
			});

			it('binds JBXDocumentURL', function () {
				browser.assert.input(JBXPlayDetailMediaURLField, item.JBXDocumentURL);
			});

			it('binds JBXDocumentName', function () {
				browser.assert.input(JBXPlayDetailFormNameField, item.JBXDocumentName);
			});
		
		});
	
	});

});
