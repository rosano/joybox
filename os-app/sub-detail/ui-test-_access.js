const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JBXPlayDetail: '.JBXPlayDetail',

	JBXPlayDetailToolbar: '.JBXPlayDetailToolbar',
	
	JBXPlayDetailToolbarBackButton: '.JBXPlayDetailToolbarBackButton',
	JBXPlayDetailToolbarBackButtonImage: '.JBXPlayDetailToolbarBackButtonImage',

	JBXPlayDetailToolbarQueueButton: '.JBXPlayDetailToolbarQueueButton',	
	JBXPlayDetailToolbarQueueButtonImage: '.JBXPlayDetailToolbarQueueButtonImage',
	
	JBXPlayDetailToolbarArchiveButton: '.JBXPlayDetailToolbarArchiveButton',
	JBXPlayDetailToolbarArchiveButtonImage: '.JBXPlayDetailToolbarArchiveButtonImage',
	JBXPlayDetailToolbarUnarchiveButton: '.JBXPlayDetailToolbarUnarchiveButton',
	JBXPlayDetailToolbarUnarchiveButtonImage: '.JBXPlayDetailToolbarUnarchiveButtonImage',

	JBXPlayDetailToolbarDiscardButton: '.JBXPlayDetailToolbarDiscardButton',	
	JBXPlayDetailToolbarDiscardButtonImage: '.JBXPlayDetailToolbarDiscardButtonImage',

	JBXPlayDetailMedia: '.JBXPlayDetailMedia',
	JBXPlayDetailMediaPlayer: '.JBXPlayDetailMediaPlayer',
	JBXPlayDetailMediaURLField: '.JBXPlayDetailMediaURLField',
	JBXPlayDetailMediaOpenButton: '.JBXPlayDetailMediaOpenButton',
	JBXPlayDetailMediaFetchButton: '.JBXPlayDetailMediaFetchButton',

	JBXPlayDetailForm: '.JBXPlayDetailForm',
	JBXPlayDetailFormNameField: '.JBXPlayDetailFormNameField',
	JBXPlayDetailFormNotesField: '.JBXPlayDetailFormNotesField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('JBXPlayDetail_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows JBXPlayDetail', function () {
		browser.assert.elements(JBXPlayDetail, 1);
	});

	it('shows JBXPlayDetailToolbar', function () {
		browser.assert.elements(JBXPlayDetailToolbar, 1);
	});

	it('shows JBXPlayDetailToolbarBackButton', function () {
		browser.assert.elements(JBXPlayDetailToolbarBackButton, 1);
	});

	it('shows JBXPlayDetailToolbarBackButtonImage', function () {
		browser.assert.elements(JBXPlayDetailToolbarBackButtonImage, 1);
	});

	it('hides JBXPlayDetailToolbarQueueButton', function () {
		browser.assert.elements(JBXPlayDetailToolbarQueueButton, 0);
	});

	it('shows JBXPlayDetailToolbarArchiveButton', function () {
		browser.assert.elements(JBXPlayDetailToolbarArchiveButton, 1);
	});

	it('shows JBXPlayDetailToolbarArchiveButtonImage', function () {
		browser.assert.elements(JBXPlayDetailToolbarArchiveButtonImage, 1);
	});

	it('hides JBXPlayDetailToolbarUnarchiveButton', function () {
		browser.assert.elements(JBXPlayDetailToolbarUnarchiveButton, 0);
	});

	it('shows JBXPlayDetailToolbarDiscardButton', function () {
		browser.assert.elements(JBXPlayDetailToolbarDiscardButton, 1);
	});

	it('shows JBXPlayDetailToolbarDiscardButtonImage', function () {
		browser.assert.elements(JBXPlayDetailToolbarDiscardButtonImage, 1);
	});

	it('hides JBXPlayDetailMedia', function () {
		browser.assert.elements(JBXPlayDetailMedia, 0);
	});

	it('shows JBXPlayDetailForm', function () {
		browser.assert.elements(JBXPlayDetailForm, 1);
	});

	it('shows JBXPlayDetailFormNameField', function () {
		browser.assert.elements(JBXPlayDetailFormNameField, 1);
	});

	it('shows JBXPlayDetailFormNotesField', function () {
		browser.assert.elements(JBXPlayDetailFormNotesField, 1);
	});

	it('shows OLSKTaxonomy', function () {
		browser.assert.elements('.OLSKTaxonomy', 1);
	});

	it('shows JBXPlayDetailLauncherItemArchive', function () {
		return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherItemArchive', 1);
	});

	it('hides JBXPlayDetailLauncherItemUnarchive', function () {
		return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherItemUnarchive', 0);
	});

	context('JBXDocumentURL', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentURL: Math.random().toString(),
				})),
			});
		});

		it('shows JBXPlayDetailMedia', function () {
			browser.assert.elements(JBXPlayDetailMedia, 1);
		});

		it('hides JBXPlayDetailMediaPlayer', function () {
			browser.assert.elements(JBXPlayDetailMediaPlayer, 0);
		});

		it('shows JBXPlayDetailMediaURLField', function () {
			browser.assert.elements(JBXPlayDetailMediaURLField, 1);
		});

		it('shows JBXPlayDetailMediaOpenButton', function () {
			browser.assert.elements(JBXPlayDetailMediaOpenButton, 1);
		});

		it('shows JBXPlayDetailMediaFetchButton', function () {
			browser.assert.elements(JBXPlayDetailMediaFetchButton, 1);
		});

	});

	context('JBXDocumentEmbedURL', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentURL: Math.random().toString(),
					JBXDocumentEmbedURL: '/?' + Math.random().toString(),
				})),
			});
		});

		it('shows JBXPlayDetailMediaPlayer', function () {
			browser.assert.elements(JBXPlayDetailMediaPlayer, 1);
		});

	});

	context('JBXDocumentArchiveDate', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentArchiveDate: new Date(),
				})),
			});
		});

		it('hides JBXPlayDetailToolbarArchiveButton', function () {
			browser.assert.elements(JBXPlayDetailToolbarArchiveButton, 0);
		});

		it('shows JBXPlayDetailToolbarUnarchiveButton', function () {
			browser.assert.elements(JBXPlayDetailToolbarUnarchiveButton, 1);
		});

		it('shows JBXPlayDetailToolbarUnarchiveButtonImage', function () {
			browser.assert.elements(JBXPlayDetailToolbarUnarchiveButtonImage, 1);
		});

		it('hides JBXPlayDetailLauncherItemArchive', function () {
			return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherItemArchive', 0);
		});

		it('shows JBXPlayDetailLauncherItemUnarchive', function () {
			return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherItemUnarchive', 1);
		});

	});

	context('$JBXDocumentIsInbox', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					$JBXDocumentIsInbox: true,
				})),
			});
		});

		it('shows JBXPlayDetailToolbarQueueButton', function () {
			browser.assert.elements(JBXPlayDetailToolbarQueueButton, 1);
		});

		it('shows JBXPlayDetailToolbarQueueButtonImage', function () {
			browser.assert.elements(JBXPlayDetailToolbarQueueButtonImage, 1);
		});

		it('hides JBXPlayDetailToolbarArchiveButton', function () {
			browser.assert.elements(JBXPlayDetailToolbarArchiveButton, 0);
		});

		it('hides JBXPlayDetailToolbarUnarchiveButton', function () {
			browser.assert.elements(JBXPlayDetailToolbarUnarchiveButton, 0);
		});

		it('hides JBXPlayDetailToolbarDiscardButton', function () {
			browser.assert.elements(JBXPlayDetailToolbarDiscardButton, 0);
		});

		it('hides JBXPlayDetailMediaFetchButton', function () {
			browser.assert.elements(JBXPlayDetailMediaFetchButton, 0);
		});

		it('hides OLSKTaxonomy', function () {
			browser.assert.elements('.OLSKTaxonomy', 0);
		});

		it('hides JBXPlayDetailLauncherItemArchive', function () {
			return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherItemArchive', 0);
		});

		it('hides JBXPlayDetailLauncherItemUnarchive', function () {
			return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherItemUnarchive', 0);
		});

	});

});
