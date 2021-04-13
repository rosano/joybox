const { rejects, throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const OLSKObject = require('OLSKObject').default;

describe('JBXDocumentErrors', function test_JBXDocumentErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.JBXDocumentErrors(null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns object if JBXDocumentID not string', function() {
		deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
			JBXDocumentID: null,
		})), {
			JBXDocumentID: [
				'JBXErrorNotString',
			],
		});
	});

	it('returns object if JBXDocumentID not filled', function() {
		deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
			JBXDocumentID: ' ',
		})), {
			JBXDocumentID: [
				'JBXErrorNotFilled',
			],
		});
	});

	it('returns object if JBXDocumentCreationDate not date', function() {
		deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
			JBXDocumentCreationDate: new Date('alfa'),
		})), {
			JBXDocumentCreationDate: [
				'JBXErrorNotDate',
			],
		});
	});

	it('returns object if JBXDocumentModificationDate not date', function() {
		deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
			JBXDocumentModificationDate: new Date('alfa'),
		})), {
			JBXDocumentModificationDate: [
				'JBXErrorNotDate',
			],
		});
	});

	it('returns object if JBXDocumentNotes not string', function() {
		deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
			JBXDocumentNotes: null,
		})), {
			JBXDocumentNotes: [
				'JBXErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid()), null);
	});

	context('JBXDocumentURL', function() {

		it('returns object if not string', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentURL: null,
			})), {
				JBXDocumentURL: [
					'JBXErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentURL: Math.random().toString(),
			})), null);
		});

	});

	context('JBXDocumentName', function() {

		it('returns object if not string', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentName: null,
			})), {
				JBXDocumentName: [
					'JBXErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentName: Math.random().toString(),
			})), null);
		});

	});

	context('JBXDocumentEmbedURL', function() {

		it('returns object if not string', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentEmbedURL: null,
			})), {
				JBXDocumentEmbedURL: [
					'JBXErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentEmbedURL: Math.random().toString(),
			})), null);
		});

	});

	context('JBXDocumentImageURL', function() {

		it('returns object if not string', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentImageURL: null,
			})), {
				JBXDocumentImageURL: [
					'JBXErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentImageURL: Math.random().toString(),
			})), null);
		});

	});

	context('JBXDocumentDidFetch', function() {

		it('returns object if not boolean', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentDidFetch: null,
			})), {
				JBXDocumentDidFetch: [
					'JBXErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentDidFetch: true,
			})), null);
		});

	});

	context('JBXDocumentIsArchived', function() {

		it('returns object if not boolean', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentIsArchived: null,
			})), {
				JBXDocumentIsArchived: [
					'JBXErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentIsArchived: true,
			})), null);
		});

	});

	context('JBXDocumentTags', function () {

		it('returns object if not array', function () {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentTags: null,
			})), {
				JBXDocumentTags: [
					'JBXErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.JBXDocumentErrors(StubDocumentObjectValid({
				JBXDocumentTags: [],
			})), null);
		});

	});	

});

describe('JBXDocumentDirectory', function test_JBXDocumentDirectory() {

	it('returns string', function() {
		deepEqual(mod.JBXDocumentDirectory(), 'jbx_documents');
	});

});

describe('JBXDocumentObjectPath', function test_JBXDocumentObjectPath() {

	it('returns string', function() {
		const item = {
			JBXDocumentID: Math.random().toString(),
		};
		deepEqual(mod.JBXDocumentObjectPath(item), mod.JBXDocumentDirectory(item) + '/' + item.JBXDocumentID);
	});

});

describe('JBXDocumentStub', function test_JBXDocumentStub() {

	it('returns string', function() {
		const JBXDocumentID = Math.random().toString();
		deepEqual(mod.JBXDocumentStub(`${ mod.JBXDocumentDirectory() }/${ JBXDocumentID }`), {
			JBXDocumentID,
		});
	});

});

describe('JBXDocumentCreate', function test_JBXDocumentCreate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(null)
		}, /JBXErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(StubDocumentObject({
			JBXDocumentNotes: null,
		})), {
			JBXDocumentNotes: [
				'JBXErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = StubDocumentObjectValid();
		strictEqual(await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(item), item);
	});

	it('sets JBXDocumentID to unique value', async function() {
		const items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(StubDocumentObject())).JBXDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets JBXDocumentCreationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(StubDocumentObject())).JBXDocumentCreationDate < 100, true);
	});

	it('sets JBXDocumentModificationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(StubDocumentObject())).JBXDocumentModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const item = StubDocumentObjectValid();
		deepEqual(await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(Object.assign({}, item)), item);
	});

	context('relations', function () {

		const memory = StubDocumentObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.JBXDocument.JBXDocumentList();
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, [OLSKObject.OLSKObjectSafeCopy(memory)]);
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('JBXDocumentUpdate', function test_JBXDocumentUpdate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.JBXDocument.JBXDocumentUpdate(null)
		}, /JBXErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.JBXDocument.JBXDocumentUpdate(Object.assign(await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(StubDocumentObject()), {
			JBXDocumentID: null,
		})), {
			JBXDocumentID: [
				'JBXErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(StubDocumentObject());
		strictEqual(await ZDRTestingWrap.App.JBXDocument.JBXDocumentUpdate(item), item);
	});

	it('sets JBXDocumentModificationDate', async function() {
		const item = await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(StubDocumentObject());
		const date = item.JBXDocumentModificationDate;

		await ZDRTestingWrap.App.JBXDocument.JBXDocumentUpdate(item);
		
		notStrictEqual(item.JBXDocumentModificationDate, date);
		deepEqual(new Date() - item.JBXDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		const item = await ZDRTestingWrap.App.JBXDocument.JBXDocumentUpdate(StubDocumentObjectValid());
		deepEqual(await ZDRTestingWrap.App.JBXDocument.JBXDocumentList(), [item]);
	});

	context('relations', function () {

		const memory = StubDocumentObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.JBXDocument.JBXDocumentUpdate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.JBXDocument.JBXDocumentList();
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, [OLSKObject.OLSKObjectSafeCopy(memory)]);
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('JBXDocumentList', function test_JBXDocumentList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.JBXDocument.JBXDocumentList(), []);
	});

	it('returns array with existing items', async function() {
		const item = await ZDRTestingWrap.App.JBXDocument.JBXDocumentCreate(StubDocumentObjectValid());

		deepEqual(await ZDRTestingWrap.App.JBXDocument.JBXDocumentList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.JBXDocumentErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.JBXDocumentObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.JBXDocumentStub);
	});

});
