const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	JBXVitrine: '.JBXVitrine',
	
	JBXVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.JBXVitrineVideo iframe',

	JBXVitrineFeaturesHeading: '.JBXVitrineFeaturesHeading',

	JBXVitrineGuideButton: '.JBXVitrineGuideButton',

	JBXVitrineDeeperHeading: '.JBXVitrineDeeperHeading',
	JBXVitrineGlossary: '.JBXVitrineGlossary',
	JBXVitrineGlossaryEphemerataLink: '.JBXVitrineGlossaryEphemerataLink',
	JBXVitrineGlossaryEphemerataBlurb: '.JBXVitrineGlossaryEphemerataBlurb',

	JBXVitrineSupportHeading: '.JBXVitrineSupportHeading',
	JBXVitrineSupportBlurb: '.JBXVitrineSupportBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('JBXVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows JBXVitrine', function() {
		browser.assert.elements(JBXVitrine, 1);
	});
	
	it('shows OLSKCrown', function() {
		browser.assert.elements('.OLSKCrown', 1);
	});
	
	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows JBXVitrineVideo', function () {
		browser.assert.elements(JBXVitrineVideo, 1);
	});

	it('shows JBXVitrineFeaturesHeading', function () {
		browser.assert.elements(JBXVitrineFeaturesHeading, 1);
	});

	it('shows OLSKAppFeatureList', function () {
		browser.assert.elements('.OLSKAppFeatureList', 1);
	});

	it('shows OLSKAppFeatureOpenSource', function () {
		browser.assert.elements('.OLSKAppFeatureListItemOpenSource', 1);
	});

	it('shows JBXVitrineGuideButton', function () {
		browser.assert.elements(JBXVitrineGuideButton, 1);
	});

	it('shows JBXVitrineDeeperHeading', function () {
		browser.assert.elements(JBXVitrineDeeperHeading, 1);
	});

	it('shows JBXVitrineGlossary', function () {
		browser.assert.elements(JBXVitrineGlossary, 1);
	});

	it('shows JBXVitrineGlossaryEphemerataLink', function () {
		browser.assert.elements(JBXVitrineGlossaryEphemerataLink, 1);
	});

	it('shows JBXVitrineGlossaryEphemerataBlurb', function () {
		browser.assert.elements(JBXVitrineGlossaryEphemerataBlurb, 1);
	});

	it('shows ROCOGlossary', function () {
		browser.assert.elements('.ROCOGlossary', 1);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKEdit', function () {
		browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows JBXVitrineSupportHeading', function () {
		browser.assert.elements(JBXVitrineSupportHeading, 1);
	});

	it('shows JBXVitrineSupportBlurb', function () {
		browser.assert.elements(JBXVitrineSupportBlurb, 1);
	});

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
