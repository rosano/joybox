const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('JBXPlayListItemHumanURL', function test_JBXPlayListItemHumanURL() {

	it('throws if not string', function () {
		throws(function () {
			mod.JBXPlayListItemHumanURL(null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = Math.random().toString();
		deepEqual(mod.JBXPlayListItemHumanURL(item), item);
	});

	it('strips protocol', function() {
		const item = Math.random().toString();
		deepEqual(mod.JBXPlayListItemHumanURL(uRandomElement('http', 'https') + '://' + item), item);
	});

	it('strips www', function() {
		const item = Math.random().toString();
		deepEqual(mod.JBXPlayListItemHumanURL('https://www.' + item), item);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.JBXPlayListItemHumanURL(item), require('OLSKString').OLSKStringSnippet(item));
	});

});
