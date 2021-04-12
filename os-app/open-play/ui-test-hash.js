const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const JBXPlayLogic = require('./ui-logic.js').default;

describe('JBXPlay_Hash', function () {

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
