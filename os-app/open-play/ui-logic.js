import OLSKString from 'OLSKString';
import OLSKDOM from 'OLSKDOM';
import OLSKMoment from 'OLSKMoment';
import JBXDocument from '../_shared/JBXDocument/main.js';

const kJBXPlayCaptureAnchor = 'capture';
const kJBXPlayNameAnchor = 'name';
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

		if (a.JBXDocumentIsArchived !== b.JBXDocumentIsArchived) {
			return uAscending(!!a.JBXDocumentIsArchived, !!b.JBXDocumentIsArchived);
		}

		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['JBXDocumentCreationDate'].filter(function (e) {
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

	JBXPlayDocuments (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('JBXErrorInputNotValid');
		}

		return inputData.split('\n').filter(function (e) {
			return !!e.trim();
		}).reduce(function (coll, item) {
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
		}, []);
	},

	async JBXPlayFetch (inputData, debug = {}) {
		if (JBXDocument.JBXDocumentErrors(inputData)) {
			throw new Error('JBXErrorInputNotValid');
		}

		if (!inputData.JBXDocumentURL) {
			return inputData;
		}

		const metadata = OLSKDOM.OLSKDOMMetadata((await (await (debug.window || window).fetch('JBX_PLAY_PROXY_URL_TEMPLATE_SWAP_TOKEN' + encodeURIComponent(inputData.JBXDocumentURL))).text()), debug);

		return Object.assign(inputData, {
			JBXDocumentName: inputData.JBXDocumentName || metadata.title,
			JBXDocumentEmbedURL: [
				'og:video:secure_url',
				'og:video:url',
				'og:video',
				'embedUrl',
			].reduce(function (coll, item) {
				return coll || metadata[item];
			}, undefined),
			JBXDocumentImageURL: [
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
