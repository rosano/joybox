const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('JBXSettingErrors', function test_JBXSettingErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.JBXSettingErrors(null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns object if JBXSettingKey not string', function() {
		deepEqual(mod.JBXSettingErrors(StubSettingObjectValid({
			JBXSettingKey: null,
		})), {
			JBXSettingKey: [
				'JBXErrorNotString',
			],
		});
	});

	it('returns object if JBXSettingKey not filled', function() {
		deepEqual(mod.JBXSettingErrors(StubSettingObjectValid({
			JBXSettingKey: ' ',
		})), {
			JBXSettingKey: [
				'JBXErrorNotFilled',
			],
		});
	});

	it('returns object if JBXSettingValue not string', function() {
		deepEqual(mod.JBXSettingErrors(StubSettingObjectValid({
			JBXSettingValue: null,
		})), {
			JBXSettingValue: [
				'JBXErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.JBXSettingErrors(StubSettingObjectValid()), null);
	});

});

describe('JBXSettingDirectory', function test_JBXSettingDirectory() {

	it('returns string', function() {
		deepEqual(mod.JBXSettingDirectory(), 'jbx_settings');
	});

});

describe('JBXSettingPath', function test_JBXSettingPath() {

	it('returns string', function() {
		const JBXSettingKey = Math.random().toString();
		deepEqual(mod.JBXSettingPath({
			JBXSettingKey,
		}), mod.JBXSettingDirectory() + '/' + JBXSettingKey);
	});

});

describe('JBXSettingStub', function test_JBXSettingStub() {

	it('returns string', function() {
		const JBXSettingKey = Math.random().toString();
		deepEqual(mod.JBXSettingStub(`${ mod.JBXSettingDirectory() }/${ JBXSettingKey }`), {
			JBXSettingKey,
		});
	});

});

describe('JBXSettingList', function test_JBXSettingActList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.JBXSetting.JBXSettingList(), []);
	});

	it('returns array with existing items', async function() {
		
		const item = await ZDRTestingWrap.App.JBXSetting.ZDRModelWriteObject(StubSettingObjectValid());
		deepEqual(await ZDRTestingWrap.App.JBXSetting.JBXSettingList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.JBXSettingErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.JBXSettingPath);
	});

});


describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.JBXSettingStub);
	});

});
	
