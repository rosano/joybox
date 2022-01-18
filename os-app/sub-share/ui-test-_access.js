const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JBXPlayShare: '.JBXPlayShare',
	
	JBXPlayShareLinkField: '.JBXPlayShareLinkField',
	JBXPlayShareCopyButton: '.JBXPlayShareCopyButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('JBXPlayShare_Access', function () {

	const count = Math.max(1, uRandomInt(10));

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JBXPlayShareItems: JSON.stringify(Array.from(Array(count)).map(function () {
				return StubDocumentObjectValid();
			})),
		});
	});

	it('shows JBXPlayShare', function () {
		browser.assert.elements(JBXPlayShare, 1);
	});

	it('shows JBXPlayListItem', function () {
		browser.assert.elements('.JBXPlayListItem', count);
	});

	it('shows JBXPlayShareLinkField', function () {
		browser.assert.elements(JBXPlayShareLinkField, 1);
	});

	it('shows JBXPlayShareCopyButton', function () {
		browser.assert.elements(JBXPlayShareCopyButton, 1);
	});

});
