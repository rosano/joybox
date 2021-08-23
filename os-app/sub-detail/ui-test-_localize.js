const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('JBXPlayDetail_Localize-' + OLSKRoutingLanguage, function () {

		context('JBXPlayDetailItem', function() {
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
						JBXDocumentURL: Math.random().toString(),
					})),
				});
			});

			it('localizes JBXPlayDetailToolbarBackButton', function () {
				browser.assert.attribute(JBXPlayDetailToolbarBackButton, 'title', uLocalized('JBXPlayDetailToolbarBackButtonText'));
			});

			it('localizes JBXPlayDetailToolbarArchiveButton', function () {
				browser.assert.attribute(JBXPlayDetailToolbarArchiveButton, 'title', uLocalized('JBXPlayDetailToolbarArchiveButtonText'));
			});

			it('localizes JBXPlayDetailToolbarDiscardButton', function () {
				browser.assert.attribute(JBXPlayDetailToolbarDiscardButton, 'title', uLocalized('JBXPlayDetailToolbarDiscardButtonText'));
			});

			it('localizes JBXPlayDetailMediaURLField', function () {
				browser.assert.attribute(JBXPlayDetailMediaURLField, 'placeholder', uLocalized('JBXPlayDetailMediaURLFieldText'));
			});

			it('localizes JBXPlayDetailMediaOpenButton', function () {
				browser.assert.text(JBXPlayDetailMediaOpenButton, uLocalized('JBXPlayDetailMediaOpenButtonText'));
			});

			it('localizes JBXPlayDetailMediaFetchButton', function () {
				browser.assert.text(JBXPlayDetailMediaFetchButton, uLocalized('JBXPlayDetailMediaFetchButtonText'));
			});

			it('localizes JBXPlayDetailFormNameField', function () {
				browser.assert.attribute(JBXPlayDetailFormNameField, 'placeholder', uLocalized('JBXPlayDetailFormNameFieldText'));
			});

			it('localizes JBXPlayDetailFormNotesField', function () {
				browser.assert.attribute(JBXPlayDetailFormNotesField, 'placeholder', uLocalized('JBXPlayDetailFormNotesFieldText'));
			});

			it('localizes JBXPlayDetailLauncherItemArchive', function () {
				return browser.assert.OLSKLauncherItemText('JBXPlayDetailLauncherItemArchive', uLocalized('JBXPlayDetailToolbarArchiveButtonText'));
			});

			context('discard', function () {
			
				it('localizes JBXPlayDetailDiscardConfirm', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(JBXPlayDetailToolbarDiscardButton);
					}, uLocalized('OLSKWordingConfirmText'));
				});
		
			});

			context('JBXDocumentArchiveDate', function() {

				before(function() {
					return browser.OLSKVisit(kDefaultRoute, {
						OLSKRoutingLanguage,
						JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
							JBXDocumentArchiveDate: new Date(),
						})),
					});
				});

				it('localizes JBXPlayDetailToolbarUnarchiveButton', function () {
					browser.assert.attribute(JBXPlayDetailToolbarUnarchiveButton, 'title', uLocalized('JBXPlayDetailToolbarUnarchiveButtonText'));
				});

				it('localizes JBXPlayDetailLauncherItemUnarchive', function () {
					return browser.assert.OLSKLauncherItemText('JBXPlayDetailLauncherItemUnarchive', uLocalized('JBXPlayDetailToolbarUnarchiveButtonText'));
				});

			});

			context('$JBXDocumentIsInbox', function() {

				before(function() {
					return browser.OLSKVisit(kDefaultRoute, {
						OLSKRoutingLanguage,
						JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
							$JBXDocumentIsInbox: true,
						})),
					});
				});

				it('localizes JBXPlayDetailToolbarQueueButton', function () {
					browser.assert.attribute(JBXPlayDetailToolbarQueueButton, 'title', uLocalized('JBXPlayDetailToolbarQueueButtonText'));
				});

			});
		
		});

	});

});
