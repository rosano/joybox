<script>
export let JOXPlayListItemObject;
</script>

<div class="JOXPlayListItem OLSKCommonEdgeBottom" class:JOXPlayListItemArchived={ JOXPlayListItemObject.JOXDocumentIsArchived }>

<span class="JOXPlayListItemTitle">{ JOXPlayListItemObject.JOXDocumentName || '' }</span>

<span class="JOXPlayListItemSnippet">{ JOXPlayListItemObject.JOXDocumentNotes }</span>

</div>

<style>
.JOXPlayListItem {
	min-height: 46px;
	padding: 10px;

	color: var(--OLSKCommonForeground);
	overflow: hidden;
	text-overflow: ellipsis;
}

.JOXPlayListItemTitle {
	font-weight: bold;
}

.JOXPlayListItemSnippet {
	display: block;
	
	margin-top: 5px;

	opacity: 0.5;
}
</style>
