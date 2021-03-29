const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JOXRootLink_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('OLSKRootLink', function () {
		
		it('sets OLSKRootLinkImageURL', function () {
			browser.assert.attribute('.OLSKRootLinkImage', 'src', '/_shared/JOXRootLink/ui-assets/identity.svg');
		});
	
	});

});
