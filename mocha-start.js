(function JBXMochaWrap() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
		return;
	}

	before(async function() {
		global.ZDRTestingWrap = await require('zerodatawrap').ZDRWrap({
			ZDRParamLibrary: require('remotestoragejs'),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'joybox',
				ZDRScopeSchemas: [
					require('./os-app/_shared/JBXDocument/main.js').default,
					require('./os-app/_shared/JBXSetting/main.js').default,
					require('./os-app/_shared/JBXTransport/main.js').default,
					],
			}],
			_ZDRParamDispatchJSONPreStringify: require('OLSKObject').OLSKObjectSafeCopy,
		});
	});

	beforeEach(function() {
		return ZDRTestingWrap.App.ZDRStorageDeleteFolderRecursive('');
	});
})();

(function JBXMochaStubs() {
	Object.entries({

		StubDocumentObject(inputData) {
			return Object.assign({
				JBXDocumentNotes: Math.random().toString(),
			}, inputData);
		},

		StubDocumentObjectValid(inputData) {
			return StubDocumentObject(Object.assign({
				JBXDocumentID: Math.random().toString(),
				JBXDocumentCreationDate: new Date(),
				JBXDocumentModificationDate: new Date(),
			}, inputData));
		},

		StubSettingObjectValid (inputData = {}) {
			return Object.assign({
				JBXSettingKey: Math.random().toString(),
				JBXSettingValue: Math.random().toString(),
			}, inputData);
		},

	}).map(function (e) {
		return global[e.shift()] = e.pop();
	});
})();
