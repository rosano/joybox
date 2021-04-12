<script>
export let JBXPlayShareItems;

import { OLSKLocalized } from 'OLSKInternational';

import OLSKHash from 'OLSKHash';
import JBXPlayLogic from '../open-play/ui-logic.js';

const mod = {

	// VALUE

	_ValueLink: '',

	// INTERFACE

	InterfaceCopyButtonDidClick () {
		return Launchlet.LCHTasksRun([{
			LCHRecipeCallback () {
				return this.api.LCHCopyToClipboard(Math.random().toString());
			},
			LCHRecipeURLFilter: '*',
		  LCHRecipeIsAutomatic: true,
		}]);
	},

	// CONTROL

	ControlUpdateLink (inputData) {
		mod._ValueLink = window.location.origin + window.OLSKCanonical('JBXPlayRoute') + '/#' + OLSKHash.OLSKHashString({
			[JBXPlayLogic.JBXPlayInboxAnchor()]: encodeURIComponent(JSON.stringify(inputData))
		});
	},

	// REACT

	ReactItems (inputData) {
		mod.ControlUpdateLink(inputData);
	},

	// LIFECYCLE

	LifecycleModuleDidMount () {
		new Clipboard('.JBXPlayShareCopyButton');
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidMount);

$: {
	mod.ReactItems(JBXPlayShareItems);
}

import Clipboard from 'clipboard';
import DragDrop from "svelte-dragdroplist";
import JBXPlayListItem from '../sub-listing/main.svelte';
</script>

<div class="JBXPlayShare">

<div class="JBXPlayShareList">
	<DragDrop bind:data={ JBXPlayShareItems } objectKey={ 'JBXDocumentID' }>
		<div class="OLSKDecorTappable" slot="customView" let:item>
			<JBXPlayListItem JBXPlayListItemObject={ item } />
		</div>
	</DragDrop>
</div>

<div class="JBXPlayShareToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop OLSKDecor">
	<div class="OLSKToolbarElementGroup">
	</div>

	<div class="OLSKToolbarElementGroup">
		<input class="JBXPlayShareLinkField" placeholder={ OLSKLocalized('JBXPlayShareLinkFieldText') } type="text" bind:value={ mod._ValueLink } onClick="this.select()" />

		<button class="JBXPlayShareCopyButton" data-clipboard-target=".JBXPlayShareLinkField">{ OLSKLocalized('JBXPlayShareCopyButtonText') }</button>
	</div>
</div>

</div>

<style>
.JBXPlayShare {
	background: var(--OLSKCommonBackground);
	height: 100%;

	display: flex;
	flex-direction: column;
}

.JBXPlayShare :global(.content) {
	margin: unset;
}

.JBXPlayShare :global(.item) {
	background: unset;
	border: unset;

	border-bottom: var(--OLSKCommonEdgeBorder);
}

.JBXPlayShare :global(.item svg *) {
	stroke: unset;
}

.JBXPlayShare :global(.item svg > path) {
	fill: var(--OLSKCommonForeground);
}

.JBXPlayShare :global(.item svg > path:first-child) {
	display: none;
}

.JBXPlayShareList {
	flex-grow: 1;
}
</style>