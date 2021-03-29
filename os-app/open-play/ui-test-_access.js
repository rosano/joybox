const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	JOXPlay: '.JOXPlay',
	
	JOXPlayToggleFormButton: '.JOXPlayToggleFormButton',
	JOXPlayToggleFormButtonImage: '.JOXPlayToggleFormButtonImage',

	JOXPlayForm: '.JOXPlayForm',
	JOXPlayFormField: '.JOXPlayFormField',
	JOXPlayFormSubmitButton: '.JOXPlayFormSubmitButton',

	JOXPlayListItem: '.JOXPlayListItem',

	JOXPlayRevealArchiveButton: '.JOXPlayRevealArchiveButton',

	JOXPlayViewportFooter: '.JOXPlayViewportFooter',
	
	JOXPlayCloudToolbar: '.JOXPlayCloudToolbar',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('JOXPlay_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows JOXPlay', function () {
		browser.assert.elements(JOXPlay, 1);
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
	});

	it('shows JOXPlayToggleFormButton', function () {
		browser.assert.elements(JOXPlayToggleFormButton, 1);
	});

	it('shows JOXPlayToggleFormButtonImage', function () {
		browser.assert.elements(JOXPlayToggleFormButtonImage, 1);
	});

	it('hides JOXPlayForm', function () {
		browser.assert.elements(JOXPlayForm, 0);
	});

	it('hides JOXPlayListItem', function () {
		browser.assert.elements(JOXPlayListItem, 0);
	});

	it('hides JOXPlayRevealArchiveButton', function () {
		browser.assert.elements(JOXPlayRevealArchiveButton, 0);
	});

	it('shows JOXPlayViewportFooter', function () {
		browser.assert.elements(JOXPlayViewportFooter, 1);
	});

	it('hides JOXPlayCloudToolbar', function () {
		browser.assert.elements(JOXPlayCloudToolbar, 0);
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

	it('shows ZDRLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('ZDRLauncherFakeItemProxy', 1);
	});

	it('shows OLSKRemoteStorageLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKRemoteStorageLauncherFakeItemProxy', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	it('hides JOXPlayDetailLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('JOXPlayDetailLauncherFakeItemProxy', 0);
	});

	it('shows JOXPlayLauncherItemImportJSON', function () {
		return browser.assert.OLSKLauncherItems('JOXPlayLauncherItemImportJSON', 1);
	});

	it('shows JOXPlayLauncherItemExportJSON', function () {
		return browser.assert.OLSKLauncherItems('JOXPlayLauncherItemExportJSON', 1);
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

		it('shows JOXPlayCloudToolbar', function () {
			browser.assert.elements(JOXPlayCloudToolbar, 1);
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
			return browser.pressButton(JOXPlayToggleFormButton);
		});

		it('shows JOXPlayForm', function () {
			browser.assert.elements(JOXPlayForm, 1);
		});

		it('shows JOXPlayFormField', function () {
			browser.assert.elements(JOXPlayFormField, 1);
		});

		it('shows JOXPlayFormSubmitButton', function () {
			browser.assert.elements(JOXPlayFormSubmitButton, 1);
		});

		context('create', function test_create() {

			const count = Math.max(1, Date.now() % 10);
			
			before(function () {
				browser.pressButton(JOXPlayToggleFormButton);
			});

			before(function () {
				browser.fill(JOXPlayFormField, Array.from(Array(count)).map(Math.random).join('\n'));
			});

			before(function () {
				return browser.pressButton(JOXPlayFormSubmitButton);
			});

			it('hides JOXPlayForm', function () {
				browser.assert.elements(JOXPlayForm, 0);
			});

			it('shows JOXPlayListItem', function () {
				browser.assert.elements(JOXPlayListItem, count);
			});
		
		});

	});

	context('select', function test_select() {

		before(function () {
			return browser.click(JOXPlayListItem);
		});

		it('shows JOXPlayDetailLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('JOXPlayDetailLauncherFakeItemProxy', 1);
		});
	
	});

	context('archive', function test_archive () {

		before(function () {
			return browser.pressButton('.JOXPlayDetailToolbarArchiveButton');
		});

		it('hides JOXPlayRevealArchiveButton', function () {
			browser.assert.elements('.JOXPlayRevealArchiveButton', 0);
		});

		it('hides JOXPlayLauncherItemRevealArchive', function () {
			return browser.assert.OLSKLauncherItems('JOXPlayLauncherItemRevealArchive', 0);
		});

		context('clear_selection', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('shows JOXPlayRevealArchiveButton', function () {
				browser.assert.elements('.JOXPlayRevealArchiveButton', 1);
			});

			it('shows JOXPlayLauncherItemRevealArchive', function () {
				return browser.assert.OLSKLauncherItems('JOXPlayLauncherItemRevealArchive', 1);
			});
		
		});

	});

});
