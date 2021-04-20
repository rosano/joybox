const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;
const OLSKMoment = require('OLSKMoment');
const OLSKEmbed = require('OLSKEmbed');
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

	it('sorts JBXDocumentArchiveDate below others', function() {
		const item1 = {
			JBXDocumentCreationDate: new Date(0),
			JBXDocumentArchiveDate: new Date(),
		};
		const item2 = {
			JBXDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.JBXPlaySortFunction), [item2, item1]);
	});

	it('sorts by JBXDocumentArchiveDate descending', function() {
		const item1 = {
			JBXDocumentCreationDate: new Date(1),
			JBXDocumentArchiveDate: new Date(0),
		};
		const item2 = {
			JBXDocumentCreationDate: new Date(0),
			JBXDocumentArchiveDate: new Date(1),
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
		const key = uRandomElement('JBXDocumentURL', 'JBXDocumentName', 'JBXDocumentNotes', 'JBXDocumentTags');
		const haystack = 'alfa';
		deepEqual(mod.JBXPlayIsMatch({
			[key]: key === 'JBXDocumentTags' ? [haystack] : haystack,
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		const key = uRandomElement('JBXDocumentURL', 'JBXDocumentName', 'JBXDocumentNotes', 'JBXDocumentTags');
		const haystack = uRandomElement('alfa', 'álfa');
		deepEqual(mod.JBXPlayIsMatch({
			[key]: key === 'JBXDocumentTags' ? [haystack] : haystack,
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
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

	it('groups if archive', function() {
		const item = {
			JBXDocumentCreationDate: new Date(),
			JBXDocumentArchiveDate: new Date(),
		};
		deepEqual(mod.JBXPlayChunkFunction([item], uLocalized), {
			[uLocalized('JBXPlayChunkArchiveText')]: [item],
		});
	});

});

describe('JBXPlayChunkKeySortFunction', function test_JBXPlayChunkKeySortFunction() {

	it('throws if not function', function () {
		throws(function () {
			mod.JBXPlayChunkKeySortFunction(null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mod.JBXPlayChunkKeySortFunction(function () {}), 'function');
	});

	it('sorts JBXPlayChunkArchiveText below others', function() {
		const item1 = uLocalized('JBXPlayChunkArchiveText');
		const item2 = Math.random().toString();

		deepEqual([item1, item2].sort(mod.JBXPlayChunkKeySortFunction(uLocalized)), [item2, item1]);
	});

});

describe('JBXPlayDocuments', function test_JBXPlayDocuments () {

	const uItems = function (inputData) {
		return Array.from(Array(Math.max(2, uRandomInt(10)))).map(inputData);
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
		deepEqual(mod.JBXPlayDocuments(item.join('\n\n')), item.map(function (e) {
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

	it('parses multi-url line', function () {
		const JBXDocumentNotes = Math.random().toString();
		const links = uItems(function () {
			return uLink();
		});

		deepEqual(mod.JBXPlayDocuments([JBXDocumentNotes].concat(links).join(' ')), links.map(function (JBXDocumentURL) {
			return {
				JBXDocumentURL,
				JBXDocumentNotes,
			};
		}));
	});

	it('parses multi-url block', function () {
		const items = uItems(function () {
			return [Math.random().toString(), uLink()];
		});

		deepEqual(mod.JBXPlayDocuments(items.map(function ([text, link]) {
			return [text, link].join(' ');
		}).join('\n')), items.map(function ([JBXDocumentNotes, JBXDocumentURL]) {
			return {
				JBXDocumentURL,
				JBXDocumentNotes,
			};
		}));
	});

	it('parses single-url block', function () {
		const JBXDocumentNotes = uItems(function () {
			return Math.random().toString();
		}).join('\n');
		const JBXDocumentURL = uLink();

		deepEqual(mod.JBXPlayDocuments([JBXDocumentURL, JBXDocumentNotes].join('\n')), [{
			JBXDocumentURL,
			JBXDocumentNotes,
		}]);
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

	context('oembed', function () {

		it('fetch embed url', function () {
			const JBXDocumentURL = OLSKEmbed._OLSKEmbedCanonicalURL();
			deepEqual(uCapture(function (fetch) {
				mod.JBXPlayFetch(StubDocumentObjectValid({
					JBXDocumentURL,
				}), {
					window: {
						fetch,
					},
				});
			}), [OLSKEmbed.OLSKEmbedFetchURL(OLSKEmbed.OLSKEmbedEndpointURL(JBXDocumentURL), JBXDocumentURL)]);
		});

		it('sets JBXDocumentName', async function () {
			const title = Math.random().toString();
			deepEqual((await mod.JBXPlayFetch(StubDocumentObjectValid({
				JBXDocumentURL: OLSKEmbed._OLSKEmbedCanonicalURL(),
			}), {
				window: {
					fetch: (function () {
						return {
							json: (function () {
								return {
									[Math.random().toString()]: Math.random().toString(),
									title,
								};
							}),
						};
					}),
				},
				JSDOM: JSDOM.fragment,
			})).JBXDocumentName, title);
		});

		it('sets JBXDocumentImageURL', async function () {
			const thumbnail_url = Math.random().toString();
			deepEqual((await mod.JBXPlayFetch(StubDocumentObjectValid({
				JBXDocumentURL: OLSKEmbed._OLSKEmbedCanonicalURL(),
			}), {
				window: {
					fetch: (function () {
						return {
							json: (function () {
								return {
									[Math.random().toString()]: Math.random().toString(),
									thumbnail_url,
								};
							}),
						};
					}),
				},
				JSDOM: JSDOM.fragment,
			})).JBXDocumentImageURL, thumbnail_url);
		});

		it('sets JBXDocumentEmbedURL', async function () {
			const url = 'https://www.youtube.com/embed/oKjXqck4AS8?feature=oembed';
			const html = `"html":"\u003ciframe width=\u0022200\u0022 height=\u0022113\u0022 src=\u0022${ url }\u0022 frameborder=\u00220\u0022 allow=\u0022accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\u0022 allowfullscreen\u003e\u003c/iframe\u003e"}`;
			deepEqual((await mod.JBXPlayFetch(StubDocumentObjectValid({
				JBXDocumentURL: OLSKEmbed._OLSKEmbedCanonicalURL(),
			}), {
				window: {
					fetch: (function () {
						return {
							json: (function () {
								return {
									[Math.random().toString()]: Math.random().toString(),
									html,
								};
							}),
						};
					}),
				},
				JSDOM: JSDOM.fragment,
			})).JBXDocumentEmbedURL, url);
		});
	
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

describe('JBXPlayImageAnchor', function test_JBXPlayImageAnchor() {

	it('returns string', function() {
		deepEqual(mod.JBXPlayImageAnchor(), 'image');
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
			JBXDocumentNotes: 'description',
			JBXDocumentURL: 'url',
			JBXDocumentName: 'name',
			JBXDocumentEmbedURL: 'embedUrl',
			JBXDocumentImageURL: 'image',
			JBXDocumentDidFetch: 'didFetch',
		});
	});

});

describe('JBXPlayDocumentCount', function test_JBXPlayDocumentCount() {

	it('throws if not array', function () {
		throws(function () {
			mod.JBXPlayDocumentCount(null);
		}, /JBXErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.JBXPlayDocumentCount([]), 0);
	});

	it('excludes if not invalid', function () {
		deepEqual(mod.JBXPlayDocumentCount([null]), 0);
	});

	it('includes if valid', function () {
		const item = uRandomInt();
		deepEqual(mod.JBXPlayDocumentCount(Array.from(Array(item)).map(function () {
			return StubDocumentObjectValid();
		})), item);
	});

	it('excludes if $JBXDocumentIsInbox', function () {
		deepEqual(mod.JBXPlayDocumentCount(Array.from(Array(uRandomInt())).map(function () {
			return StubDocumentObjectValid({
				$JBXDocumentIsInbox: true,
			});
		})), 0);
	});

});
