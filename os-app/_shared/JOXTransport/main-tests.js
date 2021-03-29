const { throws, rejects, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const JOXDocument = require('../JOXDocument/main.js').default;

describe('JOXTransportImport', function test_JOXTransportImport() {

	it('rejects if not object', async function () {
		await rejects(ZDRTestingWrap.App.JOXTransport.JOXTransportImport(null), /JOXErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.JOXTransport.JOXTransportImport({}), {});
	});

	context('JOXDocument', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.JOXTransport.JOXTransportImport({
				JOXDocument: null,
			}), /JOXErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.JOXTransport.JOXTransportImport({
				JOXDocument: [StubDocumentObjectValid({
					JOXDocumentNotes: null,
				})],
			}), /JOXErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubDocumentObjectValid()
			strictEqual((await ZDRTestingWrap.App.JOXTransport.JOXTransportImport({
				JOXDocument: [item],
			})).JOXDocument.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubDocumentObjectValid();

			await ZDRTestingWrap.App.JOXTransport.JOXTransportImport({
				JOXDocument: [item],
			});

			deepEqual(await ZDRTestingWrap.App.JOXDocument.JOXDocumentList(), [item]);
		});
	
	});

	context('JOXSetting', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.JOXTransport.JOXTransportImport({
				JOXSetting: null,
			}), /JOXErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.JOXTransport.JOXTransportImport({
				JOXSetting: [StubSettingObjectValid({
					JOXSettingKey: null,
				})],
			}), /JOXErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubSettingObjectValid()
			strictEqual((await ZDRTestingWrap.App.JOXTransport.JOXTransportImport({
				JOXSetting: [item],
			})).JOXSetting.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubSettingObjectValid();

			await ZDRTestingWrap.App.JOXTransport.JOXTransportImport({
				JOXSetting: [item],
			});

			deepEqual(await ZDRTestingWrap.App.JOXSetting.JOXSettingList(), [item]);
		});
	
	});

});

describe('JOXTransportExport', function test_JOXTransportExport() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.JOXTransport.JOXTransportExport(null);
		}, /JOXErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(ZDRTestingWrap.App.JOXTransport.JOXTransportExport({}), {});
	});

	context('JOXDocument', function () {

		it('throws if not array', function () {
			throws(function () {
				ZDRTestingWrap.App.JOXTransport.JOXTransportExport({
					JOXDocument: null,
				});
			}, /JOXErrorInputNotValid/);
		});

		it('copies input', function () {
			const item = StubDocumentObjectValid();
			notStrictEqual((ZDRTestingWrap.App.JOXTransport.JOXTransportExport({
				JOXDocument: [item],
			})).JOXDocument.shift(), item);
		});

		it('strips dynamic attributes', function () {
			const item = StubDocumentObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((ZDRTestingWrap.App.JOXTransport.JOXTransportExport({
				JOXDocument: [item],
			})).JOXDocument.shift().$alfa, undefined);
		});
	
	});

	context('JOXSetting', function () {

		it('throws if not array', function () {
			throws(function () {
				ZDRTestingWrap.App.JOXTransport.JOXTransportExport({
					JOXSetting: null,
				});
			}, /JOXErrorInputNotValid/);
		});

		it('copies input', function () {
			const item = StubSettingObjectValid();
			notStrictEqual((ZDRTestingWrap.App.JOXTransport.JOXTransportExport({
				JOXSetting: [item],
			})).JOXSetting.shift(), item);
		});

		it('strips dynamic attributes', function () {
			const item = StubSettingObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((ZDRTestingWrap.App.JOXTransport.JOXTransportExport({
				JOXSetting: [item],
			})).JOXSetting.shift().$alfa, undefined);
		});
	
	});

});
