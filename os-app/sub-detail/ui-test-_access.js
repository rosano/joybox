const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JOXPlayDetail: '.JOXPlayDetail',

	JOXPlayDetailToolbar: '.JOXPlayDetailToolbar',
	
	JOXPlayDetailToolbarBackButton: '.JOXPlayDetailToolbarBackButton',
	JOXPlayDetailToolbarBackButtonImage: '.JOXPlayDetailToolbarBackButtonImage',
	
	JOXPlayDetailToolbarArchiveButton: '.JOXPlayDetailToolbarArchiveButton',
	JOXPlayDetailToolbarArchiveButtonImage: '.JOXPlayDetailToolbarArchiveButtonImage',
	JOXPlayDetailToolbarUnarchiveButton: '.JOXPlayDetailToolbarUnarchiveButton',
	JOXPlayDetailToolbarUnarchiveButtonImage: '.JOXPlayDetailToolbarUnarchiveButtonImage',

	JOXPlayDetailToolbarDiscardButton: '.JOXPlayDetailToolbarDiscardButton',	
	JOXPlayDetailToolbarDiscardButtonImage: '.JOXPlayDetailToolbarDiscardButtonImage',

	JOXPlayDetailForm: '.JOXPlayDetailForm',
	JOXPlayDetailFormNotesField: '.JOXPlayDetailFormNotesField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('JOXPlayDetail_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JOXPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows JOXPlayDetail', function () {
		browser.assert.elements(JOXPlayDetail, 1);
	});

	it('shows JOXPlayDetailToolbar', function () {
		browser.assert.elements(JOXPlayDetailToolbar, 1);
	});

	it('shows JOXPlayDetailToolbarBackButton', function () {
		browser.assert.elements(JOXPlayDetailToolbarBackButton, 1);
	});

	it('shows JOXPlayDetailToolbarBackButtonImage', function () {
		browser.assert.elements(JOXPlayDetailToolbarBackButtonImage, 1);
	});

	it('shows JOXPlayDetailToolbarArchiveButton', function () {
		browser.assert.elements(JOXPlayDetailToolbarArchiveButton, 1);
	});

	it('shows JOXPlayDetailToolbarArchiveButtonImage', function () {
		browser.assert.elements(JOXPlayDetailToolbarArchiveButtonImage, 1);
	});

	it('hides JOXPlayDetailToolbarUnarchiveButton', function () {
		browser.assert.elements(JOXPlayDetailToolbarUnarchiveButton, 0);
	});

	it('shows JOXPlayDetailToolbarDiscardButton', function () {
		browser.assert.elements(JOXPlayDetailToolbarDiscardButton, 1);
	});

	it('shows JOXPlayDetailToolbarDiscardButtonImage', function () {
		browser.assert.elements(JOXPlayDetailToolbarDiscardButtonImage, 1);
	});

	it('shows JOXPlayDetailForm', function () {
		browser.assert.elements(JOXPlayDetailForm, 1);
	});

	it('shows JOXPlayDetailFormNotesField', function () {
		browser.assert.elements(JOXPlayDetailFormNotesField, 1);
	});

	it('shows JOXPlayDetailLauncherItemArchive', function () {
		return browser.assert.OLSKLauncherItems('JOXPlayDetailLauncherItemArchive', 1);
	});

	it('hides JOXPlayDetailLauncherItemUnarchive', function () {
		return browser.assert.OLSKLauncherItems('JOXPlayDetailLauncherItemUnarchive', 0);
	});

	context('JOXDocumentIsArchived', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JOXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					JOXDocumentIsArchived: true,
				})),
			});
		});

		it('hides JOXPlayDetailToolbarArchiveButton', function () {
			browser.assert.elements(JOXPlayDetailToolbarArchiveButton, 0);
		});

		it('shows JOXPlayDetailToolbarUnarchiveButton', function () {
			browser.assert.elements(JOXPlayDetailToolbarUnarchiveButton, 1);
		});

		it('shows JOXPlayDetailToolbarUnarchiveButtonImage', function () {
			browser.assert.elements(JOXPlayDetailToolbarUnarchiveButtonImage, 1);
		});

		it('hides JOXPlayDetailLauncherItemArchive', function () {
			return browser.assert.OLSKLauncherItems('JOXPlayDetailLauncherItemArchive', 0);
		});

		it('shows JOXPlayDetailLauncherItemUnarchive', function () {
			return browser.assert.OLSKLauncherItems('JOXPlayDetailLauncherItemUnarchive', 1);
		});

	});

});
