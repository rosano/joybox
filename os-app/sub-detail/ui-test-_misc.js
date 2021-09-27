const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('JBXPlayDetail_Misc', function () {

	const item = StubDocumentObjectValid({
		JBXDocumentURL: Math.random().toString(),
		JBXDocumentName: Math.random().toString(),
		JBXDocumentURL: '/?' + Math.random().toString(),
		JBXDocumentEmbedURL: '/?' + Math.random().toString(),
		JBXDocumentTags: Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
			return Math.random().toString();
		}),
	});

	const OLSKTaxonomySuggestionItems = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
		return Math.random().toString();
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	describe('JBXPlayDetail', function test_JBXPlayDetail () {

		it('classes ROCOStandardView', function () {
			browser.assert.hasClass(JBXPlayDetail, 'ROCOStandardView');
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
		
		it('classes ROCOStandardViewHead', function () {
			browser.assert.hasClass(JBXPlayDetailToolbar, 'ROCOStandardViewHead');
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

		it('classes OLSKVisibilityDesktopScreenreader', function () {
			browser.assert.hasClass(JBXPlayDetailToolbarBackButton, 'OLSKVisibilityDesktopScreenreader');
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
					JBXDocumentArchiveDate: new Date(),
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

	describe('JBXPlayDetailMedia', function test_JBXPlayDetailMedia () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(item),
				OLSKTaxonomySuggestionItems: JSON.stringify(OLSKTaxonomySuggestionItems),
			});
		});

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(JBXPlayDetailMedia, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(JBXPlayDetailMedia, 'OLSKDecorBigForm');
		});
	
	});

	describe('JBXPlayDetailMediaPlayer', function test_JBXPlayDetailMediaPlayer () {

		it('binds JBXDocumentEmbedURL', function () {
			browser.assert.attribute(JBXPlayDetailMediaPlayer, 'src', item.JBXDocumentEmbedURL);
		});

	});

	describe('JBXPlayDetailMediaURLField', function test_JBXPlayDetailMediaURLField () {

		it('sets type', function () {
			browser.assert.attribute(JBXPlayDetailMediaURLField, 'type', 	'text');
		});

		it('sets disabled', function () {
			browser.assert.attribute(JBXPlayDetailMediaURLField, 'disabled', 	'');
		});

		it('binds JBXDocumentURL', function () {
			browser.assert.input(JBXPlayDetailMediaURLField, item.JBXDocumentURL);
		});
	
	});

	describe('JBXPlayDetailMediaOpenButton', function test_JBXPlayDetailMediaOpenButton () {

		it('sets href', function () {
			browser.assert.attribute(JBXPlayDetailMediaOpenButton, 'href', item.JBXDocumentURL);
		});
		
		it('sets target', function () {
			browser.assert.attribute(JBXPlayDetailMediaOpenButton, 'target', 	'_blank');
		});

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(JBXPlayDetailMediaOpenButton, 'OLSKDecorPress');
		});
	
	});

	describe('JBXPlayDetailMediaFetchButton', function test_JBXPlayDetailMediaFetchButton () {
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestJBXPlayDetailDispatchFetch', '0');
			});
			
			before(function () {
				return browser.pressButton(JBXPlayDetailMediaFetchButton);
			});

			it('sends JBXPlayDetailDispatchFetch', function () {
				browser.assert.text('#TestJBXPlayDetailDispatchFetch', '1');
			});
		
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

	describe('JBXPlayDetailFormNameField', function test_JBXPlayDetailFormNameField () {

		it('sets type', function () {
			browser.assert.attribute(JBXPlayDetailFormNameField, 'type', 	'text');
		});

		it('binds JBXDocumentName', function () {
			browser.assert.input(JBXPlayDetailFormNameField, item.JBXDocumentName);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestJBXPlayDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(JBXPlayDetailFormNameField, Math.random().toString());
			});

			it('sends JBXPlayDetailDispatchUpdate', function () {
				browser.assert.text('#TestJBXPlayDetailDispatchUpdate', '1');
			});
		
		});
	
	});

	describe('JBXPlayDetailFormNotesField', function test_JBXPlayDetailFormNotesField () {

		it('binds JBXDocumentNotes', function () {
			browser.assert.input(JBXPlayDetailFormNotesField, item.JBXDocumentNotes);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestJBXPlayDetailDispatchUpdate', '1');
			});

			before(function () {
				browser.fill(JBXPlayDetailFormNotesField, Math.random().toString());
			});

			it('sends JBXPlayDetailDispatchUpdate', function () {
				browser.assert.text('#TestJBXPlayDetailDispatchUpdate', '2');
			});
		
		});
	
	});

	describe('OLSKTaxonomy', function test_OLSKTaxonomy () {

		it.skip('binds JBXDocumentTags', function () {
			browser.assert.text('.OLSKTaxonomyItem', item.JBXDocumentTags.join(' '));
		});

		it('binds OLSKTaxonomySuggestionItems', function () {
			browser.assert.text('.OLSKTaxonomySuggestion', OLSKTaxonomySuggestionItems.join(''));
		});

		context.skip('input', function () {

			before(function () {
				browser.fill('.OLSKTaxonomyField', Math.random().toString());
			});

			before(function () {
				return browser.fire('.OLSKTaxonomyField', 'submit');
			});

			it('sends JBXPlayDetailDispatchUpdate', function () {
				browser.assert.text('#TestJBXPlayDetailDispatchUpdate', '2');
			});
		
		});
	
	});

	describe('JBXPlayDetailLauncherItemArchive', function test_JBXPlayDetailLauncherItemArchive() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
			});
		});

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
					JBXDocumentArchiveDate: new Date(),
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

	context('$JBXDocumentIsInbox', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				JBXPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					$JBXDocumentIsInbox: true,
				})),
			});
		});

		it('disables JBXPlayDetailFormNameField', function () {
			browser.assert.attribute(JBXPlayDetailFormNameField, 'disabled', '');
		});

		it('disables JBXPlayDetailFormNotesField', function () {
			browser.assert.attribute(JBXPlayDetailFormNotesField, 'disabled', '');
		});

		describe('JBXPlayDetailToolbarQueueButton', function test_JBXPlayDetailToolbarQueueButton () {
			
			it('classes OLSKDecorButtonNoStyle', function () {
				browser.assert.hasClass(JBXPlayDetailToolbarQueueButton, 'OLSKDecorButtonNoStyle');
			});

			it('classes OLSKDecorTappable', function () {
				browser.assert.hasClass(JBXPlayDetailToolbarQueueButton, 'OLSKDecorTappable');
			});

			it('classes OLSKToolbarButton', function () {
				browser.assert.hasClass(JBXPlayDetailToolbarQueueButton, 'OLSKToolbarButton');
			});

			context('click', function () {
				
				before(function () {
					browser.assert.text('#TestJBXPlayDetailDispatchQueue', '0');
				});
				
				before(function () {
					return browser.pressButton(JBXPlayDetailToolbarQueueButton);
				});

				it('sends JBXPlayDetailDispatchQueue', function () {
					browser.assert.text('#TestJBXPlayDetailDispatchQueue', '1');
				});
			
			});
		
		});

		describe('JBXPlayDetailToolbarQueueButtonImage', function test_JBXPlayDetailToolbarQueueButtonImage () {

			it('sets src', function () {
				browser.assert.elements(`${ JBXPlayDetailToolbarQueueButtonImage } #_OLSKSharedClone`, 1);
			});
		
		});

	});

});
