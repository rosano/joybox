const { rejects, throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const OLSKObject = require('OLSKObject').default;

describe('JOXDocumentErrors', function test_JOXDocumentErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.JOXDocumentErrors(null);
		}, /JOXErrorInputNotValid/);
	});

	it('returns object if JOXDocumentID not string', function() {
		deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
			JOXDocumentID: null,
		})), {
			JOXDocumentID: [
				'JOXErrorNotString',
			],
		});
	});

	it('returns object if JOXDocumentID not filled', function() {
		deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
			JOXDocumentID: ' ',
		})), {
			JOXDocumentID: [
				'JOXErrorNotFilled',
			],
		});
	});

	it('returns object if JOXDocumentCreationDate not date', function() {
		deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
			JOXDocumentCreationDate: new Date('alfa'),
		})), {
			JOXDocumentCreationDate: [
				'JOXErrorNotDate',
			],
		});
	});

	it('returns object if JOXDocumentModificationDate not date', function() {
		deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
			JOXDocumentModificationDate: new Date('alfa'),
		})), {
			JOXDocumentModificationDate: [
				'JOXErrorNotDate',
			],
		});
	});

	it('returns object if JOXDocumentNotes not string', function() {
		deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
			JOXDocumentNotes: null,
		})), {
			JOXDocumentNotes: [
				'JOXErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid()), null);
	});

	context('JOXDocumentURL', function() {

		it('returns object if not string', function() {
			deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
				JOXDocumentURL: null,
			})), {
				JOXDocumentURL: [
					'JOXErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
				JOXDocumentURL: Math.random().toString(),
			})), null);
		});

	});

	context('JOXDocumentName', function() {

		it('returns object if not string', function() {
			deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
				JOXDocumentName: null,
			})), {
				JOXDocumentName: [
					'JOXErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
				JOXDocumentName: Math.random().toString(),
			})), null);
		});

	});

	context('JOXDocumentDidFetch', function() {

		it('returns object if not boolean', function() {
			deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
				JOXDocumentDidFetch: null,
			})), {
				JOXDocumentDidFetch: [
					'JOXErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
				JOXDocumentDidFetch: true,
			})), null);
		});

	});

	context('JOXDocumentIsArchived', function() {

		it('returns object if not boolean', function() {
			deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
				JOXDocumentIsArchived: null,
			})), {
				JOXDocumentIsArchived: [
					'JOXErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.JOXDocumentErrors(StubDocumentObjectValid({
				JOXDocumentIsArchived: true,
			})), null);
		});

	});

});

describe('JOXDocumentDirectory', function test_JOXDocumentDirectory() {

	it('returns string', function() {
		deepEqual(mod.JOXDocumentDirectory(), 'jox_documents');
	});

});

describe('JOXDocumentObjectPath', function test_JOXDocumentObjectPath() {

	it('returns string', function() {
		const item = {
			JOXDocumentID: Math.random().toString(),
		};
		deepEqual(mod.JOXDocumentObjectPath(item), mod.JOXDocumentDirectory(item) + '/' + item.JOXDocumentID);
	});

});

describe('JOXDocumentStub', function test_JOXDocumentStub() {

	it('returns string', function() {
		const JOXDocumentID = Math.random().toString();
		deepEqual(mod.JOXDocumentStub(`${ mod.JOXDocumentDirectory() }/${ JOXDocumentID }`), {
			JOXDocumentID,
		});
	});

});

describe('JOXDocumentCreate', function test_JOXDocumentCreate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(null)
		}, /JOXErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(StubDocumentObject({
			JOXDocumentNotes: null,
		})), {
			JOXDocumentNotes: [
				'JOXErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = StubDocumentObjectValid();
		strictEqual(await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(item), item);
	});

	it('sets JOXDocumentID to unique value', async function() {
		const items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(StubDocumentObject())).JOXDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets JOXDocumentCreationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(StubDocumentObject())).JOXDocumentCreationDate < 100, true);
	});

	it('sets JOXDocumentModificationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(StubDocumentObject())).JOXDocumentModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const item = StubDocumentObjectValid();
		deepEqual(await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(Object.assign({}, item)), item);
	});

	context('relations', function () {

		const memory = StubDocumentObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.JOXDocument.JOXDocumentList();
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

describe('JOXDocumentUpdate', function test_JOXDocumentUpdate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.JOXDocument.JOXDocumentUpdate(null)
		}, /JOXErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.JOXDocument.JOXDocumentUpdate(Object.assign(await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(StubDocumentObject()), {
			JOXDocumentID: null,
		})), {
			JOXDocumentID: [
				'JOXErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(StubDocumentObject());
		strictEqual(await ZDRTestingWrap.App.JOXDocument.JOXDocumentUpdate(item), item);
	});

	it('sets JOXDocumentModificationDate', async function() {
		const item = await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(StubDocumentObject());
		const date = item.JOXDocumentModificationDate;

		await ZDRTestingWrap.App.JOXDocument.JOXDocumentUpdate(item);
		
		notStrictEqual(item.JOXDocumentModificationDate, date);
		deepEqual(new Date() - item.JOXDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		const item = await ZDRTestingWrap.App.JOXDocument.JOXDocumentUpdate(StubDocumentObjectValid());
		deepEqual(await ZDRTestingWrap.App.JOXDocument.JOXDocumentList(), [item]);
	});

	context('relations', function () {

		const memory = StubDocumentObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.JOXDocument.JOXDocumentUpdate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.JOXDocument.JOXDocumentList();
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

describe('JOXDocumentList', function test_JOXDocumentList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.JOXDocument.JOXDocumentList(), []);
	});

	it('returns array with existing items', async function() {
		const item = await ZDRTestingWrap.App.JOXDocument.JOXDocumentCreate(StubDocumentObjectValid());

		deepEqual(await ZDRTestingWrap.App.JOXDocument.JOXDocumentList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.JOXDocumentErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.JOXDocumentObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.JOXDocumentStub);
	});

});
