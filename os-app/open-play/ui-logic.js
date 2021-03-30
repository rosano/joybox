import OLSKString from 'OLSKString';
import JOXDocument from '../_shared/JOXDocument/main.js';

const uAscending = function (a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	JOXPlayAccessibilitySummary (inputData) {
		if (JOXDocument.JOXDocumentErrors(inputData)) {
			throw new Error('JOXErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.JOXDocumentNotes);
	},

	JOXPlaySortFunction (a, b, log) {
		if (a.JOXDocumentIsArchived !== b.JOXDocumentIsArchived) {
			return uAscending(!!a.JOXDocumentIsArchived, !!b.JOXDocumentIsArchived);
		}

		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['JOXDocumentCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
	},

	JOXPlayIsMatch (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('JOXErrorInputNotValid');
		}

		return OLSKString.OLSKStringMatch(param2, param1.JOXDocumentNotes);
	},

	JOXPlayExactSortFunction (needle, a, b) {
		if (typeof needle !== 'string') {
			throw new Error('JOXErrorInputNotValid');
		}

		return ['startsWith', undefined].map(function (e) {
			return uDescending(OLSKString.OLSKStringMatch(needle, a.JOXDocumentNotes, e), OLSKString.OLSKStringMatch(needle, b.JOXDocumentNotes, e));
		}).filter(function (e) {
			return e !== 0;
		}).shift();
	},

	JOXPlayDocuments (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('JOXErrorInputNotValid');
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
					JOXDocumentURL: urls[0],
				});
			};

			return Object.assign(outputData, {
				JOXDocumentNotes: text,
			});
		});
	},

	async JOXPlayFetch (inputData, debug = {}) {
		if (JOXDocument.JOXDocumentErrors(inputData)) {
			throw new Error('JOXErrorInputNotValid');
		}

		if (inputData.JOXDocumentURL) {
			const html = (await (await (debug.window || window).fetch('JBX_PLAY_PROXY_URL_TEMPLATE_SWAP_TOKEN' + encodeURIComponent(inputData.JOXDocumentURL))).text());
			const doc = debug.JSDOM ? debug.JSDOM(html) : new DOMParser().parseFromString(html, 'text/html');

			const metadata = Array.from(doc.querySelectorAll('[property],[itemprop]')).reduce(function (coll, item) {
				const key = item.getAttribute('property') || item.getAttribute('itemprop');

				if (!key) {
					return coll;
				}

				return Object.assign(coll, {
					[key]: item.getAttribute('content') || item.getAttribute('href'),
				})
			}, [].concat.apply([], [JSON.parse((doc.querySelector('script[type="application/ld+json"]') || {}).innerHTML || '[]')]).reduce(function (coll, item) {
				return coll || (item.embedUrl ? item : coll);
			}, undefined) || {});

			Object.assign(inputData, {
				JOXDocumentName: (doc.querySelector('title') || {}).innerHTML,
				JOXDocumentEmbedURL: [
					'og:video:secure_url',
					'og:video:url',
					'og:video',
					'embedUrl',
				].reduce(function (coll, item) {
					return coll || metadata[item];
				}, undefined),
				JOXDocumentDidFetch: true,
			});
		}

		return inputData;
	},

};

export default mod;
