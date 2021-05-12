<script>
export let JBXPlayShareItems;

import { OLSKLocalized } from 'OLSKInternational';

import JBXPlayLogic from '../open-play/ui-logic.js';
import OLSKString from 'OLSKString';
import OLSKHash from 'OLSKHash';
import OLSKObject from 'OLSKObject';

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
			[JBXPlayLogic.JBXPlayInboxAnchor()]: OLSKString.OLSKStringEncode(JSON.stringify(inputData.map(function (e) {
				return OLSKObject.OLSKObjectRemap(e, JBXPlayLogic.JBXPlayRemap(e));
			}))),
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
import JBXPlayListItem from '../sub-item/main.svelte';
</script>

<div class="JBXPlayShare">

<div class="JBXPlayShareList">
	<DragDrop bind:data={ JBXPlayShareItems } objectKey={ 'JBXDocumentID' }>
		<div class="OLSKDecorTappable" slot="customView" let:item>
			<JBXPlayListItem JBXPlayListItemObject={ item } />
		</div>
	</DragDrop>
</div>

<div class="JBXPlayShareToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop OLSKDecor OLSKDecorFixedHeader">
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
	background: var(--OLSKCommonBackground);
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
	padding-bottom: 65px;

	flex-grow: 1;
}

.JBXPlayShareToolbar {
	width: calc(100vw - 15px);
	top: unset;
	bottom: 0;
	background: var(--OLSKCommonBackground);
	z-index: 50;
	display: flex;
}

.OLSKToolbarElementGroup {
	flex-grow: 1;
	display: flex;
	justify-content: center;
}

.JBXPlayShareLinkField {
	flex-grow: 1;
	max-width: 400px;
	margin-right: 10px;
}
</style>
