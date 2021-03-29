const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	JOXVitrine: '.JOXVitrine',
	
	JOXVitrineToolbar: '.JOXVitrineToolbar',
	
	JOXVitrineCrown: '.JOXVitrineCrown',
	JOXVitrineCrownIcon: '.JOXVitrineCrownIcon',
	JOXVitrineCrownName: '.JOXVitrineCrownName',

	JOXVitrineFeaturesHeading: '.JOXVitrineFeaturesHeading',

	JOXVitrineGuideButton: '.JOXVitrineGuideButton',

	JOXVitrineGazetteHeading: '.JOXVitrineGazetteHeading',

	JOXVitrineSupportHeading: '.JOXVitrineSupportHeading',
	JOXVitrineSupportBlurb: '.JOXVitrineSupportBlurb',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('JOXVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows JOXVitrine', function() {
		browser.assert.elements(JOXVitrine, 1);
	});
	
	it('shows OLSKLanguageSwitcher', function() {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});
	
	it('shows JOXVitrineCrown', function() {
		browser.assert.elements(JOXVitrineCrown, 1);
	});
	
	it('shows JOXVitrineCrownIcon', function() {
		browser.assert.elements(JOXVitrineCrownIcon, 1);
	});
	
	it('shows JOXVitrineCrownName', function() {
		browser.assert.elements(JOXVitrineCrownName, 1);
	});

	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows JOXVitrineFeaturesHeading', function () {
		browser.assert.elements(JOXVitrineFeaturesHeading, 1);
	});

	it('shows JOXFeatureList', function () {
		browser.assert.elements('.JOXFeatureList', 1);
	});

	it('shows OLSKAppFeatureList', function () {
		browser.assert.elements('.OLSKAppFeatureList', 1);
	});

	it('shows OLSKAppFeatureOpenSource', function () {
		browser.assert.elements('.OLSKAppFeatureListItemOpenSource', 1);
	});

	it('shows JOXVitrineGuideButton', function () {
		browser.assert.elements(JOXVitrineGuideButton, 1);
	});

	it('shows JOXVitrineGazetteHeading', function () {
		browser.assert.elements(JOXVitrineGazetteHeading, 1);
	});

	it('shows JOXVitrineSupportHeading', function () {
		browser.assert.elements(JOXVitrineSupportHeading, 1);
	});

	it('shows JOXVitrineSupportBlurb', function () {
		browser.assert.elements(JOXVitrineSupportBlurb, 1);
	});

	it('shows OLSKGazette', function () {
		browser.assert.elements('.OLSKGazette', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
