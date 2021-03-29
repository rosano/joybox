const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`JOXVitrine_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('JOXVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('JOXVitrineDescription'));
		});

		it('localizes JOXVitrineCrownName', function () {
			browser.assert.text(JOXVitrineCrownName, uLocalized('JOXVitrineTitle'));
		});

		it('localizes JOXVitrineFeaturesHeading', function () {
			browser.assert.text(JOXVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes JOXVitrineGuideButton', function () {
			browser.assert.text(JOXVitrineGuideButton, uLocalized('OLSKWordingOpenGuide'));
		});

		it('localizes JOXVitrineGazetteHeading', function () {
			browser.assert.text(JOXVitrineGazetteHeading, uLocalized('OLSKGazetteHeadingText'));
		});

		it('localizes JOXVitrineSupportHeading', function () {
			browser.assert.text(JOXVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
		});

		it('localizes JOXVitrineSupportBlurb', function () {
			browser.assert.text(JOXVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				browser.assert.text('.OLSKLandingHeading', uLocalized('JOXVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it('localizes OLSKLandingActionText', function () {
				browser.assert.text('.OLSKLandingAction', uLocalized('OLSKWordingOpenApp'));
			});
		
		});


	});

});
