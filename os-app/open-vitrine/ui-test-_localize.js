const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('JBXVitrine_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('JBXVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('JBXVitrineDescription'));
		});

		it('localizes JBXVitrineFeaturesHeading', function () {
			browser.assert.text(JBXVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes JBXVitrineGuideButton', function () {
			browser.assert.text(JBXVitrineGuideButton, uLocalized('OLSKWordingOpenGuide'));
		});

		it('localizes JBXVitrineDeeperHeading', function () {
			browser.assert.text(JBXVitrineDeeperHeading, uLocalized('OLSKWordingDeeperHeading'));
		});

		it('localizes JBXVitrineGlossaryEphemerataBlurb', function () {
			browser.assert.text(JBXVitrineGlossaryEphemerataBlurb, uLocalized('JBXVitrineGlossaryEphemerataBlurbText'));
		});

		it('localizes JBXVitrineSupportHeading', function () {
			browser.assert.text(JBXVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
		});

		it('localizes JBXVitrineSupportBlurb', function () {
			browser.assert.text(JBXVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
		});

		context('OLSKCrown', function test_OLSKCrown () {

			it('localizes OLSKCrownCardName', function () {
				browser.assert.text('.OLSKCrownCardName', uLocalized('JBXVitrineTitle'));
			});
		
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				browser.assert.text('.OLSKLandingHeading', uLocalized('JBXVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it('localizes OLSKLandingActionText', function () {
				browser.assert.text('.OLSKLandingAction', uLocalized('OLSKWordingOpenApp'));
			});

			it('localizes OLSKLandingActionHref', function () {
				browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-play/controller.js').OLSKControllerRoutes().shift(), {
					OLSKRoutingLanguage,
				}));
			});
		
		});


	});

});
