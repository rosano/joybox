const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const JBXPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

Object.entries({
	JBXPlay: '.JBXPlay',
	
	JBXPlayStashButton: '.JBXPlayStashButton',
	JBXPlayStashButtonImage: '.JBXPlayStashButtonImage',
	
	JBXPlayToggleFormButton: '.JBXPlayToggleFormButton',
	JBXPlayToggleFormButtonImage: '.JBXPlayToggleFormButtonImage',

	JBXPlayForm: '.JBXPlayForm',
	JBXPlayFormField: '.JBXPlayFormField',
	JBXPlayFormTaxonomy: '.JBXPlayForm .OLSKTaxonomy',
	JBXPlayFormSubmitButton: '.JBXPlayFormSubmitButton',

	JBXPlayClearInboxButton: '.JBXPlayClearInboxButton',

	JBXPlayListItem: '.JBXPlayListItem',

	JBXPlayRevealArchiveButton: '.JBXPlayRevealArchiveButton',

	JBXPlayViewportFooter: '.JBXPlayViewportFooter',
	
	JBXPlayCloudToolbar: '.JBXPlayCloudToolbar',
	
	JBXPlayShareModal: '.OLSKModalView .JBXPlayShare',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('JBXPlay_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows JBXPlay', function () {
		browser.assert.elements(JBXPlay, 1);
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
	});

	it('shows JBXPlayStashButton', function () {
		browser.assert.elements(JBXPlayStashButton, 1);
	});

	it('shows JBXPlayStashButtonImage', function () {
		browser.assert.elements(JBXPlayStashButtonImage, 1);
	});

	it('shows JBXPlayToggleFormButton', function () {
		browser.assert.elements(JBXPlayToggleFormButton, 1);
	});

	it('shows JBXPlayToggleFormButtonImage', function () {
		browser.assert.elements(JBXPlayToggleFormButtonImage, 1);
	});

	it('hides JBXPlayForm', function () {
		browser.assert.elements(JBXPlayForm, 0);
	});

	it('hides JBXPlayClearInboxButton', function () {
		browser.assert.elements(JBXPlayClearInboxButton, 0);
	});

	it('hides JBXPlayListItem', function () {
		browser.assert.elements(JBXPlayListItem, 0);
	});

	it('hides JBXPlayRevealArchiveButton', function () {
		browser.assert.elements(JBXPlayRevealArchiveButton, 0);
	});

	it('shows JBXPlayViewportFooter', function () {
		browser.assert.elements(JBXPlayViewportFooter, 1);
	});

	it('hides JBXPlayCloudToolbar', function () {
		browser.assert.elements(JBXPlayCloudToolbar, 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows OLSKAppToolbarAproposButton', function () {
		browser.assert.elements('.OLSKAppToolbarAproposButton', 1);
	});

	it('shows OLSKAppToolbarLanguageButton', function () {
		browser.assert.elements('.OLSKAppToolbarLanguageButton', 1);
	});

	it('shows OLSKAppToolbarGuideLink', function () {
		browser.assert.elements('.OLSKAppToolbarGuideLink', 1);
	});

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows OLSKInstall', function () {
		browser.assert.elements('.OLSKInstall', 1);
	});

	it('hides JBXPlayShareModal', function () {
		browser.assert.elements(JBXPlayShareModal, 0);
	});

	it('hides JBXPlayDetailLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherFakeItemProxy', 0);
	});

	it('shows ZDRLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('ZDRLauncherFakeItemProxy', 1);
	});

	it('shows OLSKTransportLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKTransportLauncherFakeItemProxy', 1);
	});

	it('shows OLSKRemoteStorageLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKRemoteStorageLauncherFakeItemProxy', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	describe('tongue', function test_tongue() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLanguageButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKLanguageSwitcherLauncherFakeItemProxy');
		});

		it('shows OLSKLanguageSwitcherLauncherFakeItemProxy', function () {
			browser.assert.elements('.LCHLauncherPipeItem', 1);
		});

		after(function () {
			browser.pressButton('#TestLCHDebugCloseButton');
		});

	});

	describe('OLSKAppToolbarCloudButton', function test_OLSKAppToolbarCloudButton () {
		
		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('shows JBXPlayCloudToolbar', function () {
			browser.assert.elements(JBXPlayCloudToolbar, 1);
		});

		it('shows OLSKCloud', function () {
			browser.assert.elements('.OLSKCloud', 1);
		});
	
	});

	describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		it('shows LCHLauncher', function() {
			browser.assert.elements('.LCHLauncher', 1);
		});

		context('AltSpace', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Space', {
					altKey: true,
				});
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements('.LCHLauncher', 0);
			});

		});

	}); 

	context('toggle_form', function test_toggle_form () {

		before(function () {
			return browser.pressButton(JBXPlayToggleFormButton);
		});

		it('shows JBXPlayForm', function () {
			browser.assert.elements(JBXPlayForm, 1);
		});

		it('shows JBXPlayFormField', function () {
			browser.assert.elements(JBXPlayFormField, 1);
		});

		it('shows JBXPlayFormTaxonomy', function () {
			browser.assert.elements(JBXPlayFormTaxonomy, 1);
		});

		it('shows JBXPlayFormSubmitButton', function () {
			browser.assert.elements(JBXPlayFormSubmitButton, 1);
		});

		context('create', function test_create() {

			const count = Math.max(1, Date.now() % 10);
			
			before(function () {
				browser.pressButton(JBXPlayToggleFormButton);
			});

			before(function () {
				browser.fill(JBXPlayFormField, Array.from(Array(count)).map(Math.random).join('\n\n'));
			});

			before(function () {
				return browser.pressButton(JBXPlayFormSubmitButton);
			});

			it('hides JBXPlayForm', function () {
				browser.assert.elements(JBXPlayForm, 0);
			});

			it('shows JBXPlayListItem', function () {
				browser.assert.elements(JBXPlayListItem, count);
			});
		
		});

	});

	context('select', function test_select() {

		before(function () {
			return browser.click(JBXPlayListItem);
		});

		it('shows JBXPlayDetailLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('JBXPlayDetailLauncherFakeItemProxy', 1);
		});
	
	});

	context('archive', function test_archive () {

		before(function () {
			return browser.pressButton('.JBXPlayDetailToolbarArchiveButton');
		});

		it('hides JBXPlayRevealArchiveButton', function () {
			browser.assert.elements('.JBXPlayRevealArchiveButton', 0);
		});

		it('hides JBXPlayLauncherItemRevealArchive', function () {
			return browser.assert.OLSKLauncherItems('JBXPlayLauncherItemRevealArchive', 0);
		});

		context('clear_selection', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('shows JBXPlayRevealArchiveButton', function () {
				browser.assert.elements('.JBXPlayRevealArchiveButton', 1);
			});

			it('shows JBXPlayLauncherItemRevealArchive', function () {
				return browser.assert.OLSKLauncherItems('JBXPlayLauncherItemRevealArchive', 1);
			});
		
		});

	});

	context('stash', function test_stash () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton(JBXPlayToggleFormButton);
		});

		before(function () {
			browser.fill(JBXPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(JBXPlayFormSubmitButton);
		});

		before(function () {
			return browser.pressButton(JBXPlayStashButton);
		});

		before(function () {
			return browser.click('.OLSKCollectionItem');
		});

		before(function () {
			return browser.click('.OLSKCatalogStashDoneButton');
		});

		it('shows JBXPlayShareModal', function () {
			browser.assert.elements(JBXPlayShareModal, 1);
		});
	
	});

	context('inbox', function test_inbox () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash: {
					[JBXPlayLogic.JBXPlayInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
						JBXDocumentURL: Math.random().toString(),
					}), JBXPlayLogic.JBXPlayRemap())])),
				},
			});
		});

		it('shows JBXPlayClearInboxButton', function () {
			browser.assert.elements(JBXPlayClearInboxButton, 1);
		});

		it('shows JBXPlayListItem', function () {
			browser.assert.elements(JBXPlayListItem, 1);
		});

		context('click', function () {
			
			before(function () {
				return browser.pressButton(JBXPlayClearInboxButton);
			});

			it('hides JBXPlayClearInboxButton', function () {
				browser.assert.elements(JBXPlayClearInboxButton, 0);
			});

			it('hides JBXPlayListItem', function () {
				browser.assert.elements(JBXPlayListItem, 0);
			});
		
		});
	
	});

});
