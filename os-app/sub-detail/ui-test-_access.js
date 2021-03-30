const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JBXPlayDetail: '.JBXPlayDetail',

	JBXPlayDetailToolbar: '.JBXPlayDetailToolbar',
	
	JBXPlayDetailToolbarBackButton: '.JBXPlayDetailToolbarBackButton',
	JBXPlayDetailToolbarBackButtonImage: '.JBXPlayDetailToolbarBackButtonImage',
	
	JBXPlayDetailToolbarArchiveButton: '.JBXPlayDetailToolbarArchiveButton',
	JBXPlayDetailToolbarArchiveButtonImage: '.JBXPlayDetailToolbarArchiveButtonImage',
	JBXPlayDetailToolbarUnarchiveButton: '.JBXPlayDetailToolbarUnarchiveButton',
	JBXPlayDetailToolbarUnarchiveButtonImage: '.JBXPlayDetailToolbarUnarchiveButtonImage',

	JBXPlayDetailToolbarDiscardButton: '.JBXPlayDetailToolbarDiscardButton',	
	JBXPlayDetailToolbarDiscardButtonImage: '.JBXPlayDetailToolbarDiscardButtonImage',

	JBXPlayDetailPlayer: '.JBXPlayDetailPlayer',

	JBXPlayDetailForm: '.JBXPlayDetailForm',
	JBXPlayDetailFormURLField: '.JBXPlayDetailFormURLField',
	JBXPlayDetailFormFetchButton: '.JBXPlayDetailFormFetchButton',
	JBXPlayDetailFormNameField: '.JBXPlayDetailFormNameField',
	JBXPlayDetailFormNotesField: '.JBXPlayDetailFormNotesField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
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

	it('hides JBXPlayDetailPlayer', function () {
		browser.assert.elements(JBXPlayDetailPlayer, 0);
	});

	it('shows JBXPlayDetailForm', function () {
		browser.assert.elements(JBXPlayDetailForm, 1);
	});

	it('shows JBXPlayDetailFormURLField', function () {
		browser.assert.elements(JBXPlayDetailFormURLField, 1);
	});

	it('shows JBXPlayDetailFormFetchButton', function () {
		browser.assert.elements(JBXPlayDetailFormFetchButton, 1);
	});

	it('shows JBXPlayDetailFormNameField', function () {
		browser.assert.elements(JBXPlayDetailFormNameField, 1);
	});

	it('shows JBXPlayDetailFormNotesField', function () {
		browser.assert.elements(JBXPlayDetailFormNotesField, 1);
	});

	it('shows JBXPlayDetailLauncherItemArchive', function () {
		return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherItemArchive', 1);
	});

	it('hides JBXPlayDetailLauncherItemUnarchive', function () {
		return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherItemUnarchive', 0);
	});

	context('JBXDocumentEmbedURL', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentEmbedURL: '/?' + Math.random().toString(),
				})),
			});
		});

		it('shows JBXPlayDetailPlayer', function () {
			browser.assert.elements(JBXPlayDetailPlayer, 1);
		});

	});

	context('JBXDocumentIsArchived', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentIsArchived: true,
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

});
