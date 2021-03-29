import RollupStart from './main.svelte';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const JOXPlayDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		JOXPlayDetailDispatchBack: (function  () {
			window.TestJOXPlayDetailDispatchBack.innerHTML = parseInt(window.TestJOXPlayDetailDispatchBack.innerHTML) + 1;
		}),
		JOXPlayDetailDispatchArchive: (function  () {
			window.TestJOXPlayDetailDispatchArchive.innerHTML = parseInt(window.TestJOXPlayDetailDispatchArchive.innerHTML) + 1;
		}),
		JOXPlayDetailDispatchUnarchive: (function  () {
			window.TestJOXPlayDetailDispatchUnarchive.innerHTML = parseInt(window.TestJOXPlayDetailDispatchUnarchive.innerHTML) + 1;
		}),
		JOXPlayDetailDispatchUpdate: (function  () {
			window.TestJOXPlayDetailDispatchUpdate.innerHTML = parseInt(window.TestJOXPlayDetailDispatchUpdate.innerHTML) + 1;
		}),
		JOXPlayDetailDispatchDiscard: (function  () {
			window.TestJOXPlayDetailDispatchDiscard.innerHTML = parseInt(window.TestJOXPlayDetailDispatchDiscard.innerHTML) + 1;
		}),
		_DebugLauncher: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['JOXPlayDetailItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'JOXPlayDetailItem') {
			e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
		}

		return e;
	}))),
});

export default JOXPlayDetail;
