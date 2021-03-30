const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`JOXPlayDetail_Localize-${ OLSKRoutingLanguage }`, function () {

		context('JOXPlayDetailItem', function() {
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					JOXPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
				});
			});

			it('localizes JOXPlayDetailToolbarBackButton', function () {
				browser.assert.attribute(JOXPlayDetailToolbarBackButton, 'title', uLocalized('JOXPlayDetailToolbarBackButtonText'));
			});

			it('localizes JOXPlayDetailToolbarArchiveButton', function () {
				browser.assert.attribute(JOXPlayDetailToolbarArchiveButton, 'title', uLocalized('JOXPlayDetailToolbarArchiveButtonText'));
			});

			it('localizes JOXPlayDetailToolbarDiscardButton', function () {
				browser.assert.attribute(JOXPlayDetailToolbarDiscardButton, 'title', uLocalized('JOXPlayDetailToolbarDiscardButtonText'));
			});

			it('localizes JOXPlayDetailFormURLField', function () {
				browser.assert.attribute(JOXPlayDetailFormURLField, 'placeholder', uLocalized('JOXPlayDetailFormURLFieldText'));
			});

			it('localizes JOXPlayDetailFormFetchButton', function () {
				browser.assert.text(JOXPlayDetailFormFetchButton, uLocalized('JOXPlayDetailFormFetchButtonText'));
			});

			it('localizes JOXPlayDetailFormNameField', function () {
				browser.assert.attribute(JOXPlayDetailFormNameField, 'placeholder', uLocalized('JOXPlayDetailFormNameFieldText'));
			});

			it('localizes JOXPlayDetailFormNotesField', function () {
				browser.assert.attribute(JOXPlayDetailFormNotesField, 'placeholder', uLocalized('JOXPlayDetailFormNotesFieldText'));
			});

			it('localizes JOXPlayDetailLauncherItemArchive', function () {
				return browser.assert.OLSKLauncherItemText('JOXPlayDetailLauncherItemArchive', uLocalized('JOXPlayDetailToolbarArchiveButtonText'));
			});

			context('discard', function () {
			
				it('localizes JOXPlayDetailDiscardConfirm', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(JOXPlayDetailToolbarDiscardButton);
					}, uLocalized('JOXPlayDetailDiscardConfirmText'));
				});
		
			});

			context('JOXDocumentIsArchived', function() {

				before(function() {
					return browser.OLSKVisit(kDefaultRoute, {
						OLSKRoutingLanguage,
						JOXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
							JOXDocumentIsArchived: true,
						})),
					});
				});

				it('localizes JOXPlayDetailToolbarUnarchiveButton', function () {
					browser.assert.attribute(JOXPlayDetailToolbarUnarchiveButton, 'title', uLocalized('JOXPlayDetailToolbarUnarchiveButtonText'));
				});

				it('localizes JOXPlayDetailLauncherItemUnarchive', function () {
					return browser.assert.OLSKLauncherItemText('JOXPlayDetailLauncherItemUnarchive', uLocalized('JOXPlayDetailToolbarUnarchiveButtonText'));
				});

			});
		
		});

	});

});
