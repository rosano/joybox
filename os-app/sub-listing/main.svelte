<script>
export let JOXPlayListItemObject;
</script>

<div class="JOXPlayListItem OLSKCommonEdgeBottom" class:JOXPlayListItemArchived={ JOXPlayListItemObject.JOXDocumentIsArchived }>

<span class="JOXPlayListItemSnippet">{ JOXPlayListItemObject.JOXDocumentNotes }</span>

</div>

<style>
.JOXPlayListItem {
	min-height: 46px;
	padding: 10px;

	overflow: hidden;
	text-overflow: ellipsis;
}

.JOXPlayListItemSnippet {
	display: block;
	margin-top: 5px;
	
	color: var(--OLSKCommonForeground);
}
</style>
