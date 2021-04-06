<script>
export let JBXPlayListItemObject;

import JBXPlayListItemLogic from './ui-logic.js';
</script>

<div class="JBXPlayListItem OLSKCommonCard OLSKCommonEdgeBottom" class:JBXPlayListItemArchived={ JBXPlayListItemObject.JBXDocumentIsArchived }>

{#if JBXPlayListItemObject.JBXDocumentImageURL }
	<img class="JBXPlayListItemImage" src={ JBXPlayListItemObject.JBXDocumentImageURL } aria-role="presentation" />
{/if}

<section>
	<span class="JBXPlayListItemTitle">{ JBXPlayListItemObject.JBXDocumentName || JBXPlayListItemLogic.JBXPlayListItemHumanURL(JBXPlayListItemObject.JBXDocumentURL || '') }</span>

	<span class="JBXPlayListItemSnippet">{ JBXPlayListItemObject.JBXDocumentNotes }</span>
</section>

</div>

<style>
.JBXPlayListItem {
	min-height: 46px;
	padding: 10px;

	color: var(--OLSKCommonForeground);
	overflow: hidden;
	text-overflow: ellipsis;
}

.JBXPlayListItemArchived {
	border-left: 10px solid var(--OLSKCommonForeground);
	opacity: 0.8;
}

.JBXPlayListItemTitle {
	font-weight: bold;
}

.JBXPlayListItemSnippet {
	display: block;
	
	margin-top: 5px;

	opacity: 0.5;
}
</style>
