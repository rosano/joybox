<script>
export let JBXPlayListItemObject;
</script>

<div class="JBXPlayListItem OLSKCommonEdgeBottom" class:JBXPlayListItemArchived={ JBXPlayListItemObject.JBXDocumentIsArchived }>

<span class="JBXPlayListItemTitle">{ JBXPlayListItemObject.JBXDocumentName || '' }</span>

<span class="JBXPlayListItemSnippet">{ JBXPlayListItemObject.JBXDocumentNotes }</span>

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
