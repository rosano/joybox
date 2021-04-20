import OLSKString from 'OLSKString';
import OLSKDOM from 'OLSKDOM';
import OLSKEmbed from 'OLSKEmbed';
import OLSKMoment from 'OLSKMoment';
import JBXDocument from '../_shared/JBXDocument/main.js';

const kJBXPlayCaptureAnchor = 'capture';
const kJBXPlayNameAnchor = 'name';
const kJBXPlayImageAnchor = 'image';
const kJBXPlayInboxAnchor = 'inbox';

const uAscending = function (a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	JBXPlayAccessibilitySummary (inputData) {
		if (JBXDocument.JBXDocumentErrors(inputData)) {
			throw new Error('JBXErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.JBXDocumentNotes);
	},

	JBXPlaySortFunction (a, b, log) {
		if (a.$JBXDocumentIsInbox !== b.$JBXDocumentIsInbox) {
			return uDescending(!!a.$JBXDocumentIsInbox, !!b.$JBXDocumentIsInbox);
		}

		if ([a.JBXDocumentArchiveDate, b.JBXDocumentArchiveDate].filter(function (e) {
			return !e;
		}) === 1) {
			return uAscending(!!a.JBXDocumentArchiveDate, !!b.JBXDocumentArchiveDate);
		}

		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['JBXDocumentArchiveDate', 'JBXDocumentCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
	},

	JBXPlayIsMatch (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('JBXErrorInputNotValid');
		}

		return [param1.JBXDocumentURL, param1.JBXDocumentName, param1.JBXDocumentNotes].concat(param1.JBXDocumentTags).filter(function (e) {
			return !!e && OLSKString.OLSKStringMatch(param2, e);
		}).length;
	},

	_JBXPlayChunk (inputData, OLSKLocalized) {
		const today = OLSKMoment.OLSKMomentPerceptionDate(new Date());

		if (inputData.JBXDocumentArchiveDate) {
			return OLSKLocalized('JBXPlayChunkArchiveText');
		}

		if (inputData.$JBXDocumentIsInbox) {
			return OLSKLocalized('JBXPlayChunkInboxText');
		}

		if (inputData.JBXDocumentCreationDate >= today) {
			return OLSKLocalized('JBXPlayChunkTodayText');
		}

		if (inputData.JBXDocumentCreationDate >= (new Date(today - 1000 * 60 * 60 * 24))) {
			return OLSKLocalized('JBXPlayChunkYesterdayText');
		}

		return OLSKMoment.OLSKMomentPerceptionDate(inputData.JBXDocumentCreationDate).toLocaleDateString();
	},

	JBXPlayChunkFunction (inputData, OLSKLocalized) {
		if (!Array.isArray(inputData)) {
			throw new Error('JBXErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			const group = mod._JBXPlayChunk(item, OLSKLocalized);
			return Object.assign(coll, {
				[group]: (coll[group] || []).concat(item),
			});
		}, {});
	},

	JBXPlayChunkKeySortFunction (OLSKLocalized) {
		if (typeof OLSKLocalized !== 'function') {
			throw new Error('JBXErrorInputNotValid');
		}

		return function (a, b) {
			return uAscending(a === OLSKLocalized('JBXPlayChunkArchiveText'), b === OLSKLocalized('JBXPlayChunkArchiveText'));
		};
	},

	JBXPlayDocuments (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('JBXErrorInputNotValid');
		}

		const recurse = function (coll, item) {
			const urls = item.split(/\s/).filter(function (e) {
				try {
					const item = new URL('', e);
					if (item.hostname) {
						return true;
					}
				} catch (err) {
					return false;
				}
			});

			if (urls.length > 1 && item.includes('\n')) {
				return item.split('\n').reduce(recurse, coll);
			}

			const JBXDocumentNotes = urls.reduce(function (coll, item) {
				return coll.split(item).join(' ');
			}, item).trim();

			if (!urls.length) {
				return coll.concat({
					JBXDocumentNotes,
				});
			}

			return coll.concat(urls.map(function (JBXDocumentURL) {
				return {
					JBXDocumentNotes,
					JBXDocumentURL,
				};
			}));
		};

		return inputData.split('\n\n').filter(function (e) {
			return !!e.trim();
		}).reduce(recurse, []);
	},

	async JBXPlayFetch (inputData, debug = {}) {
		if (JBXDocument.JBXDocumentErrors(inputData)) {
			throw new Error('JBXErrorInputNotValid');
		}

		if (!inputData.JBXDocumentURL) {
			return inputData;
		}

		const embed = OLSKEmbed.OLSKEmbedEndpointURL(inputData.JBXDocumentURL);

		const metadata = {};

		try {
			Object.assign(metadata, await (await (debug.window || window).fetch(OLSKEmbed.OLSKEmbedFetchURL(embed, inputData.JBXDocumentURL))).json());
		} catch {};

		if (Object.keys(metadata).length <= 1) {
			Object.assign(metadata, OLSKDOM.OLSKDOMMetadata(await (await (debug.window || window).fetch('JBX_PLAY_PROXY_URL_TEMPLATE_SWAP_TOKEN' + encodeURIComponent(inputData.JBXDocumentURL))).text(), debug));
		}

		return Object.assign(inputData, {
			JBXDocumentName: inputData.JBXDocumentName || metadata.title,
			JBXDocumentEmbedURL: metadata.html ? metadata.html.match(/src=\u0022(\S*)\u0022/)[1] : [
				'og:video:secure_url',
				'og:video:url',
				'og:video',
				'embedUrl',
			].reduce(function (coll, item) {
				return coll || metadata[item];
			}, undefined),
			JBXDocumentImageURL: [
				'thumbnail_url',
				'og:image',
			].reduce(function (coll, item) {
				return coll || metadata[item];
			}, undefined),
			JBXDocumentDidFetch: true,
		});
	},

	JBXPlayCaptureAnchor () {
		return kJBXPlayCaptureAnchor;
	},

	JBXPlayNameAnchor () {
		return kJBXPlayNameAnchor;
	},

	JBXPlayImageAnchor () {
		return kJBXPlayImageAnchor;
	},

	JBXPlayInboxAnchor () {
		return kJBXPlayInboxAnchor;
	},

	JBXPlayRemap () {
		return {
			JBXDocumentNotes: 'description',
			JBXDocumentURL: 'url',
			JBXDocumentName: 'name',
			JBXDocumentEmbedURL: 'embedUrl',
			JBXDocumentImageURL: 'image',
			JBXDocumentDidFetch: 'didFetch',
		};
	},

	JBXPlayDocumentCount (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('JBXErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			if (!item || item.$JBXDocumentIsInbox) {
				return coll;
			}

			return coll + 1;
		}, 0);
	},

};

export default mod;
