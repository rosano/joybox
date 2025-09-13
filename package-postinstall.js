(function OLSKPostinstallHotfix() {
	Object.entries(Object.assign(require('OLSKHotfix').OLSKHotfixPatches(process.env.NODE_ENV), {
		'./node_modules/OLSKAppToolbar/node_modules/OLSKReloadButton/main.svelte': {
			"from '../OLSKUIAssets/_OLSKSharedReload.svg'": "from '../../../OLSKUIAssets/_OLSKSharedReload.svg'",
		},
		'./node_modules/OLSKNarrow/node_modules/OLSKInputWrapper/main.svelte': {
			"from '../OLSKUIAssets/_OLSKInputClear.svg'": "from '../../../OLSKUIAssets/_OLSKInputClear.svg'",
		},
	})).forEach(function ([path, patches]) {
		if (!require('fs').existsSync(path)) {
			return;
		}
		
		Object.entries(patches).forEach(function ([search, replace]) {
			require('fs').writeFileSync(path, require('OLSKString').OLSKStringPatch(
				require('fs').readFileSync(path, 'utf8'), search, replace));
		});
	});
})();

(function OLSKPostinstallExternalAssets() {
	require('./node_modules/OLSKExpress/modules/OLSKAssets/main.js').OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'OLSKDecor',
		'OLSKRouting',
		'OLSKUIAssets',
		'launchlet',
		'ROCORootLink',
		'choices.js',
	], require('path').join(__dirname, 'node_modules'), require('path').join(__dirname, 'os-app/_shared/__external'));
})();
