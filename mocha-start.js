(function JOXMochaWrap() {
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
					require('./os-app/_shared/JOXDocument/main.js').default,
					],
			}],
			_ZDRParamDispatchJSONPreStringify: require('OLSKObject').default.OLSKObjectSafeCopy,
		});
	});

	beforeEach(function() {
		return ZDRTestingWrap.App.ZDRStorageDeleteFolderRecursive('');
	});
})();

(function JOXMochaStubs() {
	Object.entries({

		StubDocumentObject(inputData) {
			return Object.assign({
				JOXDocumentNotes: Math.random().toString(),
			}, inputData);
		},

		StubDocumentObjectValid(inputData) {
			return StubDocumentObject(Object.assign({
				JOXDocumentID: Math.random().toString(),
				JOXDocumentCreationDate: new Date(),
				JOXDocumentModificationDate: new Date(),
			}, inputData));
		},

	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
