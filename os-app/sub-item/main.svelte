<script>
export let JBXPlayListItemObject;

import OLSKString from 'OLSKString';
import JBXPlayListItemLogic from './ui-logic.js';
</script>

<div class="JBXPlayListItem OLSKCommonCard" class:JBXPlayListItemArchived={ JBXPlayListItemObject.JBXDocumentArchiveDate }>

{#if JBXPlayListItemObject.JBXDocumentImageURL }
	<img class="JBXPlayListItemImage" src={ JBXPlayListItemObject.JBXDocumentImageURL } role="presentation" />
{/if}

<section>
	<span class="JBXPlayListItemTitle">{ OLSKString.OLSKStringSnippet(JBXPlayListItemObject.JBXDocumentName || JBXPlayListItemLogic.JBXPlayListItemHumanURL(JBXPlayListItemObject.JBXDocumentURL || '')) }</span>

	<span class="JBXPlayListItemSnippet">{ OLSKString.OLSKStringSnippet(JBXPlayListItemObject.JBXDocumentNotes) }</span>

	<span class="JBXPlayListItemTags">{ (JBXPlayListItemObject.JBXDocumentTags || []).join(', ') }</span>
</section>

</div>

<style>
.JBXPlayListItem {
	min-height: 46px;
	padding: 10px;

	color: var(--OLSKCommonForeground);
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

.JBXPlayListItemTags {
	opacity: 0.4;
}
</style>
