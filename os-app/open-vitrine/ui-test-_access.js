const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	JBXVitrine: '.JBXVitrine',
	
	JBXVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.JBXVitrineVideo iframe',

	JBXVitrineFeaturesHeading: '.JBXVitrineFeaturesHeading',

	JBXVitrineGuideButton: '.JBXVitrineGuideButton',

	JBXVitrineGazetteHeading: '.JBXVitrineGazetteHeading',

	JBXVitrineJarHeading: '.JBXVitrineJarHeading',

	JBXVitrineSupportHeading: '.JBXVitrineSupportHeading',
	JBXVitrineSupportBlurb: '.JBXVitrineSupportBlurb',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
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

	it('shows JBXVitrineGazetteHeading', function () {
		browser.assert.elements(JBXVitrineGazetteHeading, 1);
	});

	it('shows JBXVitrineJarHeading', function () {
		browser.assert.elements(JBXVitrineJarHeading, 1);
	});

	it('shows OLSKJar', function () {
		browser.assert.elements('.OLSKJar', 1);
	});

	it('shows JBXVitrineSupportHeading', function () {
		browser.assert.elements(JBXVitrineSupportHeading, 1);
	});

	it('shows JBXVitrineSupportBlurb', function () {
		browser.assert.elements(JBXVitrineSupportBlurb, 1);
	});

	it('shows OLSKFollow', function () {
		browser.assert.elements('.OLSKFollow', 1);
	});

	it('shows OLSKGazette', function () {
		browser.assert.elements('.OLSKGazette', 1);
	});

	it('shows SWARLink', function () {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
