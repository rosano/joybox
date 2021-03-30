const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlayDetail_Misc', function () {

	const item = StubDocumentObjectValid({
		JBXDocumentURL: Math.random().toString(),
		JBXDocumentName: Math.random().toString(),
		JBXDocumentEmbedURL: '/?' + Math.random().toString(),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	describe('JBXPlayDetailToolbar', function test_JBXPlayDetailToolbar () {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(JBXPlayDetailToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(JBXPlayDetailToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(JBXPlayDetailToolbar, 'OLSKMobileViewHeader');
		});
		
		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(JBXPlayDetailToolbar, 'OLSKCommonEdgeBottom');
		});
		
	});

	describe('JBXPlayDetailToolbarBackButton', function test_JBXPlayDetailToolbarBackButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarBackButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarBackButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarBackButton, 'OLSKToolbarButton');
		});

		it('classes OLSKVisibilityMobile', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarBackButton, 'OLSKVisibilityMobile');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestJBXPlayDetailDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(JBXPlayDetailToolbarBackButton);
			});

			it('sends JBXPlayDetailDispatchBack', function () {
				browser.assert.text('#TestJBXPlayDetailDispatchBack', '1');
			});
		
		});
	
	});

	describe('JBXPlayDetailToolbarBackButtonImage', function test_JBXPlayDetailToolbarBackButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ JBXPlayDetailToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});
	
	});

	describe('JBXPlayDetailToolbarArchiveButton', function test_JBXPlayDetailToolbarArchiveButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarArchiveButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarArchiveButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarArchiveButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestJBXPlayDetailDispatchArchive', '0');
			});
			
			before(function () {
				return browser.pressButton(JBXPlayDetailToolbarArchiveButton);
			});

			it('sends JBXPlayDetailDispatchArchive', function () {
				browser.assert.text('#TestJBXPlayDetailDispatchArchive', '1');
			});
		
		});
	
	});

	describe('JBXPlayDetailToolbarArchiveButtonImage', function test_JBXPlayDetailToolbarArchiveButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ JBXPlayDetailToolbarArchiveButtonImage } #_OLSKSharedArchive`, 1);
		});
	
	});

	describe('JBXPlayDetailToolbarUnarchiveButton', function test_JBXPlayDetailToolbarUnarchiveButton () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentIsArchived: true,
				})),
			});
		});

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarUnarchiveButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarUnarchiveButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarUnarchiveButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestJBXPlayDetailDispatchUnarchive', '0');
			});
			
			before(function () {
				return browser.pressButton(JBXPlayDetailToolbarUnarchiveButton);
			});

			it('sends JBXPlayDetailDispatchUnarchive', function () {
				browser.assert.text('#TestJBXPlayDetailDispatchUnarchive', '1');
			});
		
		});
	
	});

	describe('JBXPlayDetailToolbarUnarchiveButtonImage', function test_JBXPlayDetailToolbarUnarchiveButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ JBXPlayDetailToolbarUnarchiveButtonImage } #_OLSKSharedUnarchive`, 1);
		});
	
	});

	describe('JBXPlayDetailToolbarDiscardButton', function test_JBXPlayDetailToolbarDiscardButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarDiscardButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarDiscardButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarDiscardButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			context('cancel', function () {
				
				before(function () {
					browser.assert.text('#TestJBXPlayDetailDispatchDiscard', '0');
				});

				return browser.OLSKConfirm(function () {
					return browser.pressButton(JBXPlayDetailToolbarDiscardButton);
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});

				it('does nothing', function () {
					browser.assert.text('#TestJBXPlayDetailDispatchDiscard', '0');
				});
			
			});
			
			context('confirm', function () {
				
				before(function () {
					return browser.pressButton(JBXPlayDetailToolbarDiscardButton);
				});

				it('sends JBXPlayDetailDispatchDiscard', function () {
					browser.assert.text('#TestJBXPlayDetailDispatchDiscard', '1');
				});
			
			});

		});
	
	});

	describe('JBXPlayDetailToolbarDiscardButtonImage', function test_JBXPlayDetailToolbarDiscardButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ JBXPlayDetailToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});
	
	});

	describe('JBXPlayDetailPlayer', function test_JBXPlayDetailPlayer () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(item),
			});
		});

		it('sets binds JBXDocumentEmbedURL', function () {
			browser.assert.attribute(JBXPlayDetailPlayer, 'src', item.JBXDocumentEmbedURL);
		});

	});

	describe('JBXPlayDetailForm', function test_JBXPlayDetailForm () {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(JBXPlayDetailForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(JBXPlayDetailForm, 'OLSKDecorBigForm');
		});
	
	});

	describe('JBXPlayDetailFormNotesField', function test_JBXPlayDetailFormNotesField () {

		it('sets binds JBXDocumentNotes', function () {
			browser.assert.input(JBXPlayDetailFormNotesField, item.JBXDocumentNotes);
		});
	
	});

	describe('JBXPlayDetailFormURLField', function test_JBXPlayDetailFormURLField () {

		it('sets type', function () {
			browser.assert.attribute(JBXPlayDetailFormURLField, 'type', 	'text');
		});

		it('sets disabled', function () {
			browser.assert.attribute(JBXPlayDetailFormURLField, 'disabled', 	'');
		});

		it('sets binds JBXDocumentURL', function () {
			browser.assert.input(JBXPlayDetailFormURLField, item.JBXDocumentURL);
		});
	
	});

	describe('JBXPlayDetailFormFetchButton', function test_JBXPlayDetailFormFetchButton () {
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestJBXPlayDetailDispatchFetch', '0');
			});
			
			before(function () {
				return browser.pressButton(JBXPlayDetailFormFetchButton);
			});

			it('sends JBXPlayDetailDispatchFetch', function () {
				browser.assert.text('#TestJBXPlayDetailDispatchFetch', '1');
			});
		
		});
	
	});

	describe('JBXPlayDetailFormNameField', function test_JBXPlayDetailFormNameField () {

		it('sets type', function () {
			browser.assert.attribute(JBXPlayDetailFormNameField, 'type', 	'text');
		});

		it('sets binds JBXDocumentName', function () {
			browser.assert.input(JBXPlayDetailFormNameField, item.JBXDocumentName);
		});
	
	});

	describe('JBXPlayDetailLauncherItemArchive', function test_JBXPlayDetailLauncherItemArchive() {
		
		before(function () {
			browser.assert.text('#TestJBXPlayDetailDispatchArchive', '0');
		});
		
		before(function () {
			return browser.OLSKLauncherRun('JBXPlayDetailLauncherItemArchive');
		});

		it('sends JBXPlayDetailDispatchArchive', function () {
			browser.assert.text('#TestJBXPlayDetailDispatchArchive', '1');
		});

	});

	describe('JBXPlayDetailLauncherItemUnarchive', function test_JBXPlayDetailLauncherItemUnarchive() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					JBXDocumentIsArchived: true,
				})),
			});
		});

		before(function () {
			browser.assert.text('#TestJBXPlayDetailDispatchUnarchive', '0');
		});
		
		before(function () {
			return browser.OLSKLauncherRun('JBXPlayDetailLauncherItemUnarchive');
		});

		it('sends JBXPlayDetailDispatchUnarchive', function () {
			browser.assert.text('#TestJBXPlayDetailDispatchUnarchive', '1');
		});

	});

});
