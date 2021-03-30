const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;
import { JSDOM } from 'jsdom';

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
};

describe('JOXPlayAccessibilitySummary', function test_JOXPlayAccessibilitySummary() {

	it('throws if not valid', function () {
		throws(function () {
			mod.JOXPlayAccessibilitySummary({});
		}, /JOXErrorInputNotValid/);
	});

	it('returns string', function() {
		const JOXDocumentNotes = Math.random().toString();
		deepEqual(mod.JOXPlayAccessibilitySummary(StubDocumentObjectValid({
			JOXDocumentNotes,
		})), JOXDocumentNotes);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.JOXPlayAccessibilitySummary(StubDocumentObjectValid({
			JOXDocumentNotes: item,
		})), require('OLSKString').OLSKStringSnippet(item));
	});

});

describe('JOXPlaySortFunction', function test_JOXPlaySortFunction() {

	it('sorts by JOXDocumentCreationDate descending', function() {
		const item1 = {
			JOXDocumentCreationDate: new Date(0),
		};
		const item2 = {
			JOXDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.JOXPlaySortFunction), [item2, item1]);
	});

	it('sorts JOXDocumentIsArchived below others', function() {
		const item1 = {
			JOXDocumentCreationDate: new Date(0),
			JOXDocumentIsArchived: true,
		};
		const item2 = {
			JOXDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.JOXPlaySortFunction), [item2, item1]);
	});

});

describe('JOXPlayIsMatch', function test_JOXPlayIsMatch() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.JOXPlayIsMatch({}, null);
		}, /JOXErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		deepEqual(mod.JOXPlayIsMatch({
			JOXDocumentNotes: 'alfa',
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.JOXPlayIsMatch({
			JOXDocumentNotes: uRandomElement('alfa', 'álfa'),
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('JOXPlayExactSortFunction', function test_JOXPlayExactSortFunction() {

	it('throws if param1 not string', function () {
		throws(function () {
			mod.JOXPlayExactSortFunction(null, Math.random().toString(), Math.random().toString());
		}, /JOXErrorInputNotValid/);
	});

	it('bumps startsWith', function() {
		const item = Math.random().toString();
		deepEqual(mod.JOXPlayExactSortFunction(item, {
			JOXDocumentNotes: Math.random().toString() + item,
		}, {
			JOXDocumentNotes: item + Math.random().toString(),
		}), 1);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.JOXPlayExactSortFunction(uRandomElement('alf', 'alfa', 'ALF'), {
			JOXDocumentNotes: Math.random().toString(),
		}, {
			JOXDocumentNotes: uRandomElement('alfa', 'álfa'),
		}), 1);
	});

});

describe('JOXPlayDocuments', function test_JOXPlayDocuments () {

	const uItems = function (inputData) {
		return Array.from(Array(Math.max(1, Date.now() % 10))).map(inputData);
	};

	it('throws if not string', function () {
		throws(function () {
			mod.JOXPlayDocuments(null);
		}, /JOXErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.JOXPlayDocuments(''), []);
	});

	it('parses strings', function () {
		const item = uItems(function () {
			return Math.random().toString();
		});
		deepEqual(mod.JOXPlayDocuments(item.join('\n')), item.map(function (e) {
			return {
				JOXDocumentNotes: e,
			};
		}));
	});

	it('parses urls', function () {
		const item = uItems(function () {
			return uRandomElement('http', 'https') + '://example.com/' + Math.random().toString();
		});
		deepEqual(mod.JOXPlayDocuments(item.join('\n')), item.map(function (e) {
			return {
				JOXDocumentURL: e,
				JOXDocumentNotes: '',
			};
		}));
	});

	it('parses combined', function () {
		const textFirst = uRandomElement(true, false);

		const item = uItems(function () {
			const text = Math.random().toString();
			const link = 'https://example.com';
			return (textFirst ? [text, link] : [link, text]).join(' ');
		});

		deepEqual(mod.JOXPlayDocuments(item.join('\n')), item.map(function (e) {
			const [ text, link ] = textFirst ? e.split(' ') : e.split(' ').reverse();
			return {
				JOXDocumentURL: link,
				JOXDocumentNotes: text,
			};
		}));
	});

});

describe('JOXPlayFetch', function test_JOXPlayFetch () {

	it('rejects if not valid', async function () {
		await rejects(mod.JOXPlayFetch({}), /JOXErrorInputNotValid/);
	});

	it('returns inputData', async function () {
		const item = StubDocumentObjectValid();
		deepEqual(await mod.JOXPlayFetch(item), item);
	});

	it('calls window.fetch', function () {
		const JOXDocumentURL = Math.random().toString();
		deepEqual(uCapture(function (fetch) {
			mod.JOXPlayFetch(StubDocumentObjectValid({
				JOXDocumentURL,
			}), {
				window: {
					fetch,
				},
			});
		}), ['JBX_PLAY_PROXY_URL_TEMPLATE_SWAP_TOKEN' + JOXDocumentURL]);
	});

	it('sets JOXDocumentName', async function () {
		const item = Math.random().toString();
		deepEqual((await mod.JOXPlayFetch(StubDocumentObjectValid({
			JOXDocumentURL: Math.random().toString(),
		}), {
			window: {
				fetch: (function () {
					return {
						text: (function () {
							return `<title>${ item }</title>`;
						}),
					};
				}),
			},
			JSDOM: JSDOM.fragment,
		})).JOXDocumentName, item);
	});

	it('sets JOXDocumentDidFetch', async function () {
		const item = Math.random().toString();
		deepEqual((await mod.JOXPlayFetch(StubDocumentObjectValid({
			JOXDocumentURL: Math.random().toString(),
		}), {
			window: {
				fetch: (function () {
					return {
						text: (function () {
							return Math.random().toString();
						}),
					};
				}),
			},
			JSDOM: JSDOM.fragment,
		})).JOXDocumentDidFetch, true);
	});

});
