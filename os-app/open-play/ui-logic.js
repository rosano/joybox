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

};

export default mod;
