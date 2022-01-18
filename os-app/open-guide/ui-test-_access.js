const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JBXGuide: '.JBXGuide',

	JBXGuideCrown: '.JBXGuideCrown',
	JBXGuideCrownName: '.JBXGuideCrownName',

	JBXGuideContent: '.JBXGuideContent',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('JBXGuide_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows JBXGuide', function () {
		browser.assert.elements(JBXGuide, 1);
	});

	it('shows JBXGuideCrown', function () {
		browser.assert.elements(JBXGuideCrown, 1);
	});

	it('shows JBXGuideCrownName', function () {
		browser.assert.elements(JBXGuideCrownName, 1);
	});

	it('shows JBXGuideContent', function () {
		browser.assert.elements(JBXGuideContent, 1);
	});

	it('shows JBXRootLink', function () {
		browser.assert.elements('.JBXRootLink', 1);
	});

});
