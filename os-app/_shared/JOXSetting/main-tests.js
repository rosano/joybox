const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('JOXSettingErrors', function test_JOXSettingErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.JOXSettingErrors(null);
		}, /JOXErrorInputNotValid/);
	});

	it('returns object if JOXSettingKey not string', function() {
		deepEqual(mod.JOXSettingErrors(StubSettingObjectValid({
			JOXSettingKey: null,
		})), {
			JOXSettingKey: [
				'JOXErrorNotString',
			],
		});
	});

	it('returns object if JOXSettingKey not filled', function() {
		deepEqual(mod.JOXSettingErrors(StubSettingObjectValid({
			JOXSettingKey: ' ',
		})), {
			JOXSettingKey: [
				'JOXErrorNotFilled',
			],
		});
	});

	it('returns object if JOXSettingValue not string', function() {
		deepEqual(mod.JOXSettingErrors(StubSettingObjectValid({
			JOXSettingValue: null,
		})), {
			JOXSettingValue: [
				'JOXErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.JOXSettingErrors(StubSettingObjectValid()), null);
	});

});

describe('JOXSettingDirectory', function test_JOXSettingDirectory() {

	it('returns string', function() {
		deepEqual(mod.JOXSettingDirectory(), 'jox_settings');
	});

});

describe('JOXSettingPath', function test_JOXSettingPath() {

	it('returns string', function() {
		const JOXSettingKey = Math.random().toString();
		deepEqual(mod.JOXSettingPath({
			JOXSettingKey,
		}), mod.JOXSettingDirectory() + '/' + JOXSettingKey);
	});

});

describe('JOXSettingStub', function test_JOXSettingStub() {

	it('returns string', function() {
		const JOXSettingKey = Math.random().toString();
		deepEqual(mod.JOXSettingStub(`${ mod.JOXSettingDirectory() }/${ JOXSettingKey }`), {
			JOXSettingKey,
		});
	});

});

describe('JOXSettingList', function test_JOXSettingActList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.JOXSetting.JOXSettingList(), []);
	});

	it('returns array with existing items', async function() {
		
		const item = await ZDRTestingWrap.App.JOXSetting.ZDRModelWriteObject(StubSettingObjectValid());
		deepEqual(await ZDRTestingWrap.App.JOXSetting.JOXSettingList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.JOXSettingErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.JOXSettingPath);
	});

});


describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.JOXSettingStub);
	});

});
	
