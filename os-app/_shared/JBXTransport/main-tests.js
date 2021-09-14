const { throws, rejects, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const JBXDocument = require('../JBXDocument/main.js').default;

describe('JBXTransportImport', function test_JBXTransportImport() {

	it('rejects if not object', async function () {
		await rejects(ZDRTestingWrap.App.JBXTransport.JBXTransportImport(null), /JBXErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.JBXTransport.JBXTransportImport({}), {});
	});

	context('JBXDocument', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.JBXTransport.JBXTransportImport({
				JBXDocument: null,
			}), /JBXErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.JBXTransport.JBXTransportImport({
				JBXDocument: [StubDocumentObjectValid({
					JBXDocumentNotes: null,
				})],
			}), /JBXErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubDocumentObjectValid()
			strictEqual((await ZDRTestingWrap.App.JBXTransport.JBXTransportImport({
				JBXDocument: [item],
			})).JBXDocument.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubDocumentObjectValid();

			await ZDRTestingWrap.App.JBXTransport.JBXTransportImport({
				JBXDocument: [item],
			});

			deepEqual(await ZDRTestingWrap.App.JBXDocument.JBXDocumentList(), [item]);
		});
	
	});

	context('JBXSetting', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.JBXTransport.JBXTransportImport({
				JBXSetting: null,
			}), /JBXErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.JBXTransport.JBXTransportImport({
				JBXSetting: [StubSettingObjectValid({
					JBXSettingKey: null,
				})],
			}), /JBXErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubSettingObjectValid()
			strictEqual((await ZDRTestingWrap.App.JBXTransport.JBXTransportImport({
				JBXSetting: [item],
			})).JBXSetting.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubSettingObjectValid();

			await ZDRTestingWrap.App.JBXTransport.JBXTransportImport({
				JBXSetting: [item],
			});

			deepEqual(await ZDRTestingWrap.App.JBXSetting.JBXSettingList(), [item]);
		});
	
	});

});

describe('JBXTransportExport', function test_JBXTransportExport() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.JBXTransport.JBXTransportExport(null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(ZDRTestingWrap.App.JBXTransport.JBXTransportExport({}), {});
	});

	context('JBXDocument', function () {

		it('throws if not array', function () {
			throws(function () {
				ZDRTestingWrap.App.JBXTransport.JBXTransportExport({
					JBXDocument: null,
				});
			}, /JBXErrorInputNotValid/);
		});

		it('copies input', function () {
			const item = StubDocumentObjectValid();
			notStrictEqual((ZDRTestingWrap.App.JBXTransport.JBXTransportExport({
				JBXDocument: [item],
			})).JBXDocument.shift(), item);
		});

		it('excludes if $JBXDocumentIsInbox', function () {
			deepEqual((ZDRTestingWrap.App.JBXTransport.JBXTransportExport({
				JBXDocument: [StubDocumentObjectValid({
					$JBXDocumentIsInbox: true,
				})],
			})).JBXDocument, []);
		});

		it('strips dynamic attributes', function () {
			const item = StubDocumentObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((ZDRTestingWrap.App.JBXTransport.JBXTransportExport({
				JBXDocument: [item],
			})).JBXDocument.shift().$alfa, undefined);
		});
	
	});

	context('JBXSetting', function () {

		it('throws if not array', function () {
			throws(function () {
				ZDRTestingWrap.App.JBXTransport.JBXTransportExport({
					JBXSetting: null,
				});
			}, /JBXErrorInputNotValid/);
		});

		it('copies input', function () {
			const item = StubSettingObjectValid();
			notStrictEqual((ZDRTestingWrap.App.JBXTransport.JBXTransportExport({
				JBXSetting: [item],
			})).JBXSetting.shift(), item);
		});

		it('strips dynamic attributes', function () {
			const item = StubSettingObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((ZDRTestingWrap.App.JBXTransport.JBXTransportExport({
				JBXSetting: [item],
			})).JBXSetting.shift().$alfa, undefined);
		});
	
	});

});
