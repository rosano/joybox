const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JOXGuide: '.JOXGuide',

	JOXGuideCrown: '.JOXGuideCrown',
	JOXGuideCrownName: '.JOXGuideCrownName',

	JOXGuideContent: '.JOXGuideContent',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('JOXGuide_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows JOXGuide', function () {
		browser.assert.elements(JOXGuide, 1);
	});

	it('shows JOXGuideCrown', function () {
		browser.assert.elements(JOXGuideCrown, 1);
	});

	it('shows JOXGuideCrownName', function () {
		browser.assert.elements(JOXGuideCrownName, 1);
	});

	it('shows JOXGuideContent', function () {
		browser.assert.elements(JOXGuideContent, 1);
	});

	it('shows JOXRootLink', function () {
		browser.assert.elements('.JOXRootLink', 1);
	});

});
