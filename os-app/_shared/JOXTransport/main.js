import OLSKRemoteStorage from 'OLSKRemoteStorage';

export default {
	ZDRSchemaKey: 'JOXTransport',
	ZDRSchemaDispatchValidate: (function () {}),
	ZDRSchemaPath: (function () {}),
	ZDRSchemaStub: (function () {}),
	ZDRSchemaMethods: {

		async JOXTransportImport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('JOXErrorInputNotValid');
			}

			const _this = this;

			return Object.fromEntries(await Promise.all(Object.entries(inputData).map(async function ([key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('JOXErrorInputNotValid');
				}

				return [key, await ({
					JOXDocument: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.JOXDocument.JOXDocumentCreate(e).catch(function () {
								throw new Error('JOXErrorInputNotValid');
							});
						}));
					}),
					JOXSetting: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.JOXSetting.ZDRModelWriteObject(e).catch(function () {
								throw new Error('JOXErrorInputNotValid');
							});
						}));
					}),
				}[key]())];
			})));
		},

		JOXTransportExport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('JOXErrorInputNotValid');
			}

			return Object.entries(inputData).reduce(function (coll, [key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('JOXErrorInputNotValid');
				}

				if (!value.length) {
					return coll;
				}
				
				return Object.assign(coll, {
					[key]: value.map(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy),
				});
			}, {});
		},

	},
};
