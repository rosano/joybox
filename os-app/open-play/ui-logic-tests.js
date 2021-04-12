const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;
const OLSKMoment = require('OLSKMoment');
import { JSDOM } from 'jsdom';

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
};

describe('JBXPlayAccessibilitySummary', function test_JBXPlayAccessibilitySummary() {

	it('throws if not valid', function () {
		throws(function () {
			mod.JBXPlayAccessibilitySummary({});
		}, /JBXErrorInputNotValid/);
	});

	it('returns string', function() {
		const JBXDocumentNotes = Math.random().toString();
		deepEqual(mod.JBXPlayAccessibilitySummary(StubDocumentObjectValid({
			JBXDocumentNotes,
		})), JBXDocumentNotes);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.JBXPlayAccessibilitySummary(StubDocumentObjectValid({
			JBXDocumentNotes: item,
		})), require('OLSKString').OLSKStringSnippet(item));
	});

});

describe('JBXPlaySortFunction', function test_JBXPlaySortFunction() {

	it('sorts by JBXDocumentCreationDate descending', function() {
		const item1 = {
			JBXDocumentCreationDate: new Date(0),
		};
		const item2 = {
			JBXDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.JBXPlaySortFunction), [item2, item1]);
	});

	it('sorts JBXDocumentIsArchived below others', function() {
		const item1 = {
			JBXDocumentCreationDate: new Date(0),
			JBXDocumentIsArchived: true,
		};
		const item2 = {
			JBXDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.JBXPlaySortFunction), [item2, item1]);
	});

	it('sorts $JBXDocumentIsInbox above others', function() {
		const item1 = {
			JBXDocumentCreationDate: new Date(1),
		};
		const item2 = {
			JBXDocumentCreationDate: new Date(0),
			$JBXDocumentIsInbox: true,
		};

		deepEqual([item1, item2].sort(mod.JBXPlaySortFunction), [item2, item1]);
	});

});

describe('JBXPlayIsMatch', function test_JBXPlayIsMatch() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.JBXPlayIsMatch({}, null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		deepEqual(mod.JBXPlayIsMatch({
			[uRandomElement('JBXDocumentURL', 'JBXDocumentName', 'JBXDocumentNotes')]: 'alfa',
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.JBXPlayIsMatch({
			[uRandomElement('JBXDocumentURL', 'JBXDocumentName', 'JBXDocumentNotes')]: uRandomElement('alfa', 'álfa'),
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('JBXPlayExactSortFunction', function test_JBXPlayExactSortFunction() {

	it('throws if param1 not string', function () {
		throws(function () {
			mod.JBXPlayExactSortFunction(null, Math.random().toString(), Math.random().toString());
		}, /JBXErrorInputNotValid/);
	});

	it('bumps startsWith', function() {
		const item = Math.random().toString();
		deepEqual(mod.JBXPlayExactSortFunction(item, {
			[uRandomElement('JBXDocumentName', 'JBXDocumentNotes')]: Math.random().toString() + item,
		}, {
			[uRandomElement('JBXDocumentName', 'JBXDocumentNotes')]: item + Math.random().toString(),
		}), 1);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.JBXPlayExactSortFunction(uRandomElement('alf', 'alfa', 'ALF'), {
			[uRandomElement('JBXDocumentName', 'JBXDocumentNotes')]: Math.random().toString(),
		}, {
			[uRandomElement('JBXDocumentName', 'JBXDocumentNotes')]: uRandomElement('alfa', 'álfa'),
		}), 1);
	});

});

describe('JBXPlayChunkFunction', function test_JBXPlayChunkFunction() {

	const _JBXPlayChunkFunction = function (inputData) {
		return mod.JBXPlayChunkFunction([stub], uLocalized);
	};

	it('throws if not array', function () {
		throws(function () {
			mod.JBXPlayChunkFunction(null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(mod.JBXPlayChunkFunction([]), {});
	});

	it('groups if inbox', function() {
		const item = {
			$JBXDocumentIsInbox: true,
		};
		deepEqual(mod.JBXPlayChunkFunction([item], uLocalized), {
			[uLocalized('JBXPlayChunkInboxText')]: [item],
		});
	});

	it('groups if today', function() {
		const item = {
			JBXDocumentCreationDate: OLSKMoment.OLSKMomentPerceptionDate(new Date()),
		};
		deepEqual(mod.JBXPlayChunkFunction([item], uLocalized), {
			[uLocalized('JBXPlayChunkTodayText')]: [item],
		});
	});

	it('groups if yesterday', function() {
		const item = {
			JBXDocumentCreationDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - 1),
		};
		deepEqual(mod.JBXPlayChunkFunction([item], uLocalized), {
			[uLocalized('JBXPlayChunkYesterdayText')]: [item],
		});
	});

	it('groups if before yesterday', function() {
		const item = {
			JBXDocumentCreationDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - 1000 * 60 * 60 * 24 - 1),
		};
		deepEqual(mod.JBXPlayChunkFunction([item], uLocalized), {
			[OLSKMoment.OLSKMomentPerceptionDate(item.JBXDocumentCreationDate).toLocaleDateString()]: [item],
		});
	});

});

describe('JBXPlayDocuments', function test_JBXPlayDocuments () {

	const uItems = function (inputData) {
		return Array.from(Array(Math.max(1, Date.now() % 10))).map(inputData);
	};

	it('throws if not string', function () {
		throws(function () {
			mod.JBXPlayDocuments(null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.JBXPlayDocuments(''), []);
	});

	it('parses strings', function () {
		const item = uItems(function () {
			return Math.random().toString();
		});
		deepEqual(mod.JBXPlayDocuments(item.join('\n')), item.map(function (e) {
			return {
				JBXDocumentNotes: e,
			};
		}));
	});

	it('parses urls', function () {
		const item = uItems(function () {
			return uRandomElement('http', 'https') + '://example.com/' + Math.random().toString();
		});
		deepEqual(mod.JBXPlayDocuments(item.join('\n')), item.map(function (e) {
			return {
				JBXDocumentURL: e,
				JBXDocumentNotes: '',
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

		deepEqual(mod.JBXPlayDocuments(item.join('\n')), item.map(function (e) {
			const [ text, link ] = textFirst ? e.split(' ') : e.split(' ').reverse();
			return {
				JBXDocumentURL: link,
				JBXDocumentNotes: text,
			};
		}));
	});

});

describe('JBXPlayFetch', function test_JBXPlayFetch () {

	it('rejects if not valid', async function () {
		await rejects(mod.JBXPlayFetch({}), /JBXErrorInputNotValid/);
	});

	it('returns inputData', async function () {
		const item = StubDocumentObjectValid();
		deepEqual(await mod.JBXPlayFetch(item), item);
	});

	it('calls window.fetch', function () {
		const JBXDocumentURL = Math.random().toString();
		deepEqual(uCapture(function (fetch) {
			mod.JBXPlayFetch(StubDocumentObjectValid({
				JBXDocumentURL,
			}), {
				window: {
					fetch,
				},
			});
		}), ['JBX_PLAY_PROXY_URL_TEMPLATE_SWAP_TOKEN' + JBXDocumentURL]);
	});

	it('sets JBXDocumentName', async function () {
		const item = Math.random().toString();
		deepEqual((await mod.JBXPlayFetch(StubDocumentObjectValid({
			JBXDocumentURL: Math.random().toString(),
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
		})).JBXDocumentName, item);
	});

	it('keeps existing JBXDocumentName', async function () {
		const JBXDocumentName = Math.random().toString();
		deepEqual((await mod.JBXPlayFetch(StubDocumentObjectValid({
			JBXDocumentName,
			JBXDocumentURL: Math.random().toString(),
		}), {
			window: {
				fetch: (function () {
					return {
						text: (function () {
							return `<title>${ Math.random().toString() }</title>`;
						}),
					};
				}),
			},
			JSDOM: JSDOM.fragment,
		})).JBXDocumentName, JBXDocumentName);
	});

	context('JBXDocumentEmbedURL', function () {

		const item = Math.random().toString();
		Object.entries({
			'og:video': `<meta property="og:video" content="${ item }" />`,
			'og:video:url': `<meta property="og:video:url" content="${ item }" />`,
			'og:video:secure_url': `<meta property="og:video:secure_url" content="${ item }" />`,
			'meta embedUrl': `<meta itemprop="embedUrl" content="${ item }"/>`,
			'link embedUrl': `<link itemprop="embedUrl" href="${ item }"/>`,
			'json-ld': `<script type="application/ld+json">[{"embedUrl":"${ item }"}]</script>`,
		}).forEach(function ([key, value]) {

			it('extracts ' + key, async function () {
				deepEqual((await mod.JBXPlayFetch(StubDocumentObjectValid({
					JBXDocumentURL: Math.random().toString(),
				}), {
					window: {
						fetch: (function () {
							return {
								text: (function () {
									return key === 'og:video:secure_url' ? [
										`<meta property="og:video" content="${ item }" />`,
										value,
									].join('') : value;
								}),
							};
						}),
					},
					JSDOM: JSDOM.fragment,
				})).JBXDocumentEmbedURL, item);
			});

		});
	
	});

	context('JBXDocumentImageURL', function () {
		
		const item = Math.random().toString();
		Object.entries({
			'og:image': `<meta property="og:image" content="${ item }" />`,
		}).forEach(function ([key, value]) {

			it('extracts ' + key, async function () {
				deepEqual((await mod.JBXPlayFetch(StubDocumentObjectValid({
					JBXDocumentURL: Math.random().toString(),
				}), {
					window: {
						fetch: (function () {
							return {
								text: (function () {
									return value;
								}),
							};
						}),
					},
					JSDOM: JSDOM.fragment,
				})).JBXDocumentImageURL, item);
			});

		});
	
	});

	it('sets JBXDocumentDidFetch', async function () {
		const item = Math.random().toString();
		deepEqual((await mod.JBXPlayFetch(StubDocumentObjectValid({
			JBXDocumentURL: Math.random().toString(),
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
		})).JBXDocumentDidFetch, true);
	});

});

describe('JBXPlayCaptureAnchor', function test_JBXPlayCaptureAnchor() {

	it('returns string', function() {
		deepEqual(mod.JBXPlayCaptureAnchor(), 'capture');
	});

});

describe('JBXPlayNameAnchor', function test_JBXPlayNameAnchor() {

	it('returns string', function() {
		deepEqual(mod.JBXPlayNameAnchor(), 'name');
	});

});

describe('JBXPlayInboxAnchor', function test_JBXPlayInboxAnchor() {

	it('returns string', function() {
		deepEqual(mod.JBXPlayInboxAnchor(), 'inbox');
	});

});

describe('JBXPlayRemap', function test_JBXPlayRemap() {

	it('returns object', function() {
		deepEqual(mod.JBXPlayRemap(), {
			JBXDocumentID: 'id',
			JBXDocumentCreationDate: 'dateCreated	',
			JBXDocumentModificationDate: 'dateModified',
			JBXDocumentNotes: 'description',
			JBXDocumentURL: 'url',
			JBXDocumentName: 'name',
			JBXDocumentEmbedURL: 'embedUrl',
			JBXDocumentImageURL: 'image',
			JBXDocumentDidFetch: 'didFetch',
			JBXDocumentIsArchived: 'isArchived',
		});
	});

});
