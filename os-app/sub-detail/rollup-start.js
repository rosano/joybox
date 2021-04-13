import RollupStart from './main.svelte';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const JBXPlayDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		JBXPlayDetailDispatchBack: (function  () {
			window.TestJBXPlayDetailDispatchBack.innerHTML = parseInt(window.TestJBXPlayDetailDispatchBack.innerHTML) + 1;
		}),
		JBXPlayDetailDispatchArchive: (function  () {
			window.TestJBXPlayDetailDispatchArchive.innerHTML = parseInt(window.TestJBXPlayDetailDispatchArchive.innerHTML) + 1;
		}),
		JBXPlayDetailDispatchUnarchive: (function  () {
			window.TestJBXPlayDetailDispatchUnarchive.innerHTML = parseInt(window.TestJBXPlayDetailDispatchUnarchive.innerHTML) + 1;
		}),
		JBXPlayDetailDispatchFetch: (function  () {
			window.TestJBXPlayDetailDispatchFetch.innerHTML = parseInt(window.TestJBXPlayDetailDispatchFetch.innerHTML) + 1;
		}),
		JBXPlayDetailDispatchUpdate: (function  () {
			window.TestJBXPlayDetailDispatchUpdate.innerHTML = parseInt(window.TestJBXPlayDetailDispatchUpdate.innerHTML) + 1;
		}),
		JBXPlayDetailDispatchDiscard: (function  () {
			window.TestJBXPlayDetailDispatchDiscard.innerHTML = parseInt(window.TestJBXPlayDetailDispatchDiscard.innerHTML) + 1;
		}),
		JBXPlayDetailDispatchQueue: (function  () {
			window.TestJBXPlayDetailDispatchQueue.innerHTML = parseInt(window.TestJBXPlayDetailDispatchQueue.innerHTML) + 1;
		}),
		_DebugLauncher: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['JBXPlayDetailItem', 'OLSKTaxonomySuggestionItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'JBXPlayDetailItem') {
			e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
		}

		return e;
	}))),
});

export default JBXPlayDetail;
