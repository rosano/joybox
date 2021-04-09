import OLSKString from 'OLSKString';
import OLSKDOM from 'OLSKDOM';
import JBXDocument from '../_shared/JBXDocument/main.js';

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

		return ['JBXDocumentURL', 'JBXDocumentName', 'JBXDocumentNotes'].filter(function (e) {
			return param1[e] && OLSKString.OLSKStringMatch(param2, param1[e]);
		}).length;
	},

	JBXPlayExactSortFunction (needle, a, b) {
		if (typeof needle !== 'string') {
			throw new Error('JBXErrorInputNotValid');
		}

		return ['JBXDocumentName', 'JBXDocumentNotes'].reduce(function (coll, item) {
			return coll.concat(uDescending(OLSKString.OLSKStringMatch(needle, a[item] || '', 'startsWith'), OLSKString.OLSKStringMatch(needle, b[item] || '', 'startsWith')));
		}, []).filter(function (e) {
			return e !== 0;
		}).shift();
	},

	JBXPlayDocuments (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('JBXErrorInputNotValid');
		}

		return inputData.split('\n').filter(function (e) {
			return !!e.trim();
		}).map(function (e) {
			const outputData = {};

			const urls = e.split(/\s/).filter(function (e) {
				try {
					const item = new URL('', e);
					if (item.hostname) {
						return true;
					}
				} catch (err) {
					return false;
				}
			});

			const text = urls.reduce(function (coll, item) {
				return coll.split(item).join(' ');
			}, e).trim();

			if (urls.length) {
				Object.assign(outputData, {
					JBXDocumentURL: urls[0],
				});
			};

			return Object.assign(outputData, {
				JBXDocumentNotes: text,
			});
		});
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
			JBXDocumentName: metadata.title,
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

	JBXPlayDataAnchor () {
		return 'data';
	},

	JBXPlayNameAnchor () {
		return 'name';
	},

};

export default mod;
