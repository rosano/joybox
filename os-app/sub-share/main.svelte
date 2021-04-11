<script>
export let JBXPlayShareItems;

import DragDrop from "svelte-dragdroplist";
import JBXPlayListItem from '../sub-listing/main.svelte';
</script>

<div class="JBXPlayShare">

<DragDrop bind:data={ JBXPlayShareItems } objectKey={ 'JBXDocumentID' }>
	<div class="OLSKDecorTappable" slot="customView" let:item>
		<JBXPlayListItem JBXPlayListItemObject={ item } />
	</div>
</DragDrop>

</div>

<style>
.JBXPlayShare {
	background: var(--OLSKCommonBackground);
	height: 100%;
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
</style>