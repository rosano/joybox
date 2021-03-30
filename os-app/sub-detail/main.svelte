<script>
export let JBXPlayDetailItem;
export let JBXPlayDetailDispatchBack;
export let JBXPlayDetailDispatchArchive;
export let JBXPlayDetailDispatchUnarchive;
export let JBXPlayDetailDispatchFetch;
export let JBXPlayDetailDispatchUpdate;
export let JBXPlayDetailDispatchDiscard;
export let _DebugLauncher = false;

export const modPublic = {

	JBXPlayDetailRecipes () {
		return mod.DataPlayDetailRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	// DATA

	DataPlayDetailRecipes () {
		const outputData = [];

		if (!JBXPlayDetailItem.JBXDocumentIsArchived) {
			outputData.push({
				LCHRecipeSignature: 'JBXPlayDetailLauncherItemArchive',
				LCHRecipeName: OLSKLocalized('JBXPlayDetailToolbarArchiveButtonText'),
				LCHRecipeCallback: function JBXPlayDetailLauncherItemArchive () {
					JBXPlayDetailDispatchArchive()
				},
			})
		}

		if (JBXPlayDetailItem.JBXDocumentIsArchived) {
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

};
import OLSKUIAssets from 'OLSKUIAssets';
</script>

<div class="JBXPlayDetail">

<header class="JBXPlayDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader OLSKCommonEdgeBottom">
	<div class="OLSKToolbarElementGroup">
		<button class="JBXPlayDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile" title={ OLSKLocalized('JBXPlayDetailToolbarBackButtonText') } on:click={ JBXPlayDetailDispatchBack }>
			<div class="JBXPlayDetailToolbarBackButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		{#if !JBXPlayDetailItem.JBXDocumentIsArchived }
			<button class="JBXPlayDetailToolbarArchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JBXPlayDetailToolbarArchiveButtonText') } on:click={ JBXPlayDetailDispatchArchive }>
				<div class="JBXPlayDetailToolbarArchiveButtonImage"></div>
			</button>
		{/if}

		{#if JBXPlayDetailItem.JBXDocumentIsArchived }
			<button class="JBXPlayDetailToolbarUnarchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JBXPlayDetailToolbarUnarchiveButtonText') } on:click={ JBXPlayDetailDispatchUnarchive }>
				<div class="JBXPlayDetailToolbarUnarchiveButtonImage"></div>
			</button>
		{/if}

		<button class="JBXPlayDetailToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JBXPlayDetailToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('JBXPlayDetailDiscardConfirmText')) && JBXPlayDetailDispatchDiscard() }>
			<div class="JBXPlayDetailToolbarDiscardButtonImage">{@html OLSKUIAssets._OLSKSharedDiscard }</div>
		</button>
	</div>
</header>

</div>

{#if JBXPlayDetailItem.JBXDocumentEmbedURL }
	<iframe class="JBXPlayDetailPlayer" width="100%" height="280" src={ JBXPlayDetailItem.JBXDocumentEmbedURL } frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{/if}

<div class="JBXPlayDetailForm OLSKDecor OLSKDecorBigForm">

<p>
	<input class="JBXPlayDetailFormURLField" placeholder={ OLSKLocalized('JBXPlayDetailFormURLFieldText') } type="text" disabled bind:value={ JBXPlayDetailItem.JBXDocumentURL } />
</p>

<p>
	<button class="JBXPlayDetailFormFetchButton" on:click={ JBXPlayDetailDispatchFetch }>{ OLSKLocalized('JBXPlayDetailFormFetchButtonText') }</button>
</p>

<p>
	<input class="JBXPlayDetailFormNameField" placeholder={ OLSKLocalized('JBXPlayDetailFormNameFieldText') } type="text" bind:value={ JBXPlayDetailItem.JBXDocumentName } />
</p>

<textarea class="JBXPlayDetailFormNotesField" placeholder="{ OLSKLocalized('JBXPlayDetailFormNotesFieldText') }" bind:value={ JBXPlayDetailItem.JBXDocumentNotes } on:input={ JBXPlayDetailDispatchUpdate }></textarea>

</div>

{#if _DebugLauncher && OLSK_SPEC_UI() }
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataPlayDetailRecipes() }) }></button>	
{/if}
