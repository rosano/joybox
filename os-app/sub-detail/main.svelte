<script>
export let JBXPlayDetailItem;
export let JBXPlayDetailDispatchBack;
export let JBXPlayDetailDispatchArchive;
export let JBXPlayDetailDispatchUnarchive;
export let JBXPlayDetailDispatchFetch;
export let JBXPlayDetailDispatchUpdate;
export let JBXPlayDetailDispatchDiscard;
export let JBXPlayDetailDispatchQueue;
export let OLSKTaxonomySuggestionItems = [];
export let _DebugLauncher = false;

export const modPublic = {

	JBXPlayDetailRecipes () {
		return mod.DataPlayDetailRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	__HOTFIX_ITEM_IDS: [],

	// DATA

	DataPlayDetailRecipes () {
		const outputData = [];

		if (!JBXPlayDetailItem.$JBXDocumentIsInbox && !JBXPlayDetailItem.JBXDocumentArchiveDate) {
			outputData.push({
				LCHRecipeSignature: 'JBXPlayDetailLauncherItemArchive',
				LCHRecipeName: OLSKLocalized('JBXPlayDetailToolbarArchiveButtonText'),
				LCHRecipeCallback: function JBXPlayDetailLauncherItemArchive () {
					JBXPlayDetailDispatchArchive()
				},
			})
		}

		if (!JBXPlayDetailItem.$JBXDocumentIsInbox && JBXPlayDetailItem.JBXDocumentArchiveDate) {
			outputData.push({
				LCHRecipeSignature: 'JBXPlayDetailLauncherItemUnarchive',
				LCHRecipeName: OLSKLocalized('JBXPlayDetailToolbarUnarchiveButtonText'),
				LCHRecipeCallback: function JBXPlayDetailLauncherItemUnarchive () {
					JBXPlayDetailDispatchUnarchive()
				},
			})
		}

		if (OLSK_SPEC_UI()) {
			outputData.push({
				LCHRecipeName: 'JBXPlayDetailLauncherFakeItemProxy',
				LCHRecipeCallback: function JBXPlayDetailLauncherFakeItemProxy () {},
			});
		}

		return outputData;
	},

	// MESSAGE

	OLSKTaxonomyDispatchUpdate (inputData) {
		JBXPlayDetailItem.JBXDocumentTags = inputData;

		JBXPlayDetailDispatchUpdate();
	},

	// REACT

	ReactItem (inputData) {
		if (mod.__HOTFIX_ITEM_IDS.includes(inputData)) {
			return;
		}

		mod.__HOTFIX_ITEM_IDS = [];

		setTimeout(function () {
			mod.__HOTFIX_ITEM_IDS = [inputData];
		})
	},

};

$: {
	mod.ReactItem(JBXPlayDetailItem.JBXDocumentID)
}

import OLSKUIAssets from 'OLSKUIAssets';
import OLSKTaxonomy from 'OLSKTaxonomy';
import { fade } from 'svelte/transition';
</script>

<div class="JBXPlayDetail ROCOStandardView">

<header class="JBXPlayDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader OLSKCommonEdgeBottom ROCOStandardViewHead">
	<div class="OLSKToolbarElementGroup">
		<button class="JBXPlayDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile OLSKVisibilityDesktopScreenreader" title={ OLSKLocalized('JBXPlayDetailToolbarBackButtonText') } on:click={ JBXPlayDetailDispatchBack }>
			<div class="JBXPlayDetailToolbarBackButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	{#if JBXPlayDetailItem.$JBXDocumentIsInbox }

	<div class="OLSKToolbarElementGroup">
		<button class="JBXPlayDetailToolbarQueueButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JBXPlayDetailToolbarQueueButtonText') } on:click={ JBXPlayDetailDispatchQueue }>
			<div class="JBXPlayDetailToolbarQueueButtonImage">{@html OLSKUIAssets._OLSKSharedClone }</div>
		</button>
	</div>

	{/if}

	{#if !JBXPlayDetailItem.$JBXDocumentIsInbox }

	<div class="OLSKToolbarElementGroup">
		{#if !JBXPlayDetailItem.JBXDocumentArchiveDate }
			<button class="JBXPlayDetailToolbarArchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JBXPlayDetailToolbarArchiveButtonText') } on:click={ JBXPlayDetailDispatchArchive }>
				<div class="JBXPlayDetailToolbarArchiveButtonImage">{@html OLSKUIAssets._OLSKSharedArchive }</div>
			</button>
		{/if}

		{#if JBXPlayDetailItem.JBXDocumentArchiveDate }
			<button class="JBXPlayDetailToolbarUnarchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JBXPlayDetailToolbarUnarchiveButtonText') } on:click={ JBXPlayDetailDispatchUnarchive }>
				<div class="JBXPlayDetailToolbarUnarchiveButtonImage">{@html OLSKUIAssets._OLSKSharedUnarchive }</div>
			</button>
		{/if}

		<button class="JBXPlayDetailToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JBXPlayDetailToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('OLSKWordingConfirmText')) && JBXPlayDetailDispatchDiscard() }>
			<div class="JBXPlayDetailToolbarDiscardButtonImage">{@html OLSKUIAssets._OLSKSharedDiscard }</div>
		</button>
	</div>
	
	{/if}
</header>

<div class="ROCOStandardViewBody">

{#if JBXPlayDetailItem.JBXDocumentURL }

{#if JBXPlayDetailItem.JBXDocumentEmbedURL }
	{#key JBXPlayDetailItem.JBXDocumentEmbedURL}
		<div in:fade="{{ delay: OLSK_SPEC_UI() ? 0 : 250, duration: OLSK_SPEC_UI() ? 0 : 300 }}">
			<iframe class="JBXPlayDetailMediaPlayer" width="100%" height="280" src={ JBXPlayDetailItem.JBXDocumentEmbedURL } frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	{/key}
{/if}

<div class="JBXPlayDetailMedia OLSKDecor OLSKDecorBigForm">

	<p class="JBXPlayDetailLink">
		<input class="JBXPlayDetailMediaURLField" placeholder={ OLSKLocalized('JBXPlayDetailMediaURLFieldText') } type="text" disabled bind:value={ JBXPlayDetailItem.JBXDocumentURL } />

		<a class="JBXPlayDetailMediaOpenButton OLSKDecorPress" href={ JBXPlayDetailItem.JBXDocumentURL } target="_blank">{ OLSKLocalized('JBXPlayDetailMediaOpenButtonText') }</a>

		{#if !JBXPlayDetailItem.$JBXDocumentIsInbox }
			<button class="JBXPlayDetailMediaFetchButton" on:click={ JBXPlayDetailDispatchFetch }>{ OLSKLocalized('JBXPlayDetailMediaFetchButtonText') }</button>
		{/if}
	</p>

	<hr role="presentation" />

</div>
{/if}

<div class="JBXPlayDetailForm OLSKDecor OLSKDecorBigForm">

<p>
	<input class="JBXPlayDetailFormNameField" placeholder={ OLSKLocalized('JBXPlayDetailFormNameFieldText') } type="text" bind:value={ JBXPlayDetailItem.JBXDocumentName } on:input={ JBXPlayDetailDispatchUpdate } disabled={ JBXPlayDetailItem.$JBXDocumentIsInbox ? true : null } />
</p>

<p>
	<textarea class="JBXPlayDetailFormNotesField" placeholder="{ OLSKLocalized('JBXPlayDetailFormNotesFieldText') }" bind:value={ JBXPlayDetailItem.JBXDocumentNotes } on:input={ JBXPlayDetailDispatchUpdate } disabled={ JBXPlayDetailItem.$JBXDocumentIsInbox ? true : null }></textarea>
</p>

{#if !JBXPlayDetailItem.$JBXDocumentIsInbox }
<hr role="presentation" />

<p>
	{#each mod.__HOTFIX_ITEM_IDS as item }
		<OLSKTaxonomy
			OLSKTaxonomyItems={ JBXPlayDetailItem.JBXDocumentTags || [] }
			OLSKTaxonomySuggestionItems={ OLSKTaxonomySuggestionItems }
			OLSKTaxonomyDispatchUpdate={ mod.OLSKTaxonomyDispatchUpdate }
			/>
	{/each}
</p>
{/if}

</div>

</div>
	
</div>

{#if _DebugLauncher && OLSK_SPEC_UI() }
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataPlayDetailRecipes() }) }></button>	
{/if}

<style>
.JBXPlayDetailLink {
	display: flex;
	width: 90%;

	align-items: center;
}

.JBXPlayDetailLink *:not(.JBXPlayDetailMediaURLField) {
	margin-left: 10px;
}
</style>