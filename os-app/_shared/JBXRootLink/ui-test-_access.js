const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JBXRootLink: '.JBXRootLink',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('JBXRootLink_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows JBXRootLink', function() {
		browser.assert.elements(JBXRootLink, 1);
	});
	
	it('shows OLSKRootLink', function() {
		browser.assert.elements('.OLSKRootLink', 1);
	})
	
});
