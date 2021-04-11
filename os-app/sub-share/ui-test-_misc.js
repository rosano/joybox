const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlayShare_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JBXPlayShareItems: JSON.stringify([StubDocumentObjectValid()]),
		});
	});

});
