import OLSKRemoteStorage from 'OLSKRemoteStorage';

export default {
	ZDRSchemaKey: 'JBXTransport',
	ZDRSchemaDispatchValidate: (function () {}),
	ZDRSchemaPath: (function () {}),
	ZDRSchemaStub: (function () {}),
	ZDRSchemaMethods: {

		async JBXTransportImport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('JBXErrorInputNotValid');
			}

			const _this = this;

			return Object.fromEntries(await Promise.all(Object.entries(inputData).map(async function ([key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('JBXErrorInputNotValid');
				}

				return [key, await ({
					JBXDocument: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.JBXDocument.JBXDocumentCreate(e).catch(function () {
								throw new Error('JBXErrorInputNotValid');
							});
						}));
					}),
					JBXSetting: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.JBXSetting.ZDRModelWriteObject(e).catch(function () {
								throw new Error('JBXErrorInputNotValid');
							});
						}));
					}),
				}[key]())];
			})));
		},

		JBXTransportExport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('JBXErrorInputNotValid');
			}

			return Object.entries(inputData).reduce(function (coll, [key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('JBXErrorInputNotValid');
				}

				if (!value.length) {
					return coll;
				}
				
				return Object.assign(coll, {
					[key]: value.filter(function (e) {
						return !e.$JBXDocumentIsInbox;
					}).map(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy),
				});
			}, {});
		},

	},
};
