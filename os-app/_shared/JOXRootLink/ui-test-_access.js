const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JOXRootLink: '.JOXRootLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('JOXRootLink_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows JOXRootLink', function() {
		browser.assert.elements(JOXRootLink, 1);
	});
	
	it('shows OLSKRootLink', function() {
		browser.assert.elements('.OLSKRootLink', 1);
	})
	
});
