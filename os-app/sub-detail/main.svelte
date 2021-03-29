<script>
export let JOXPlayDetailItem;
export let JOXPlayDetailDispatchBack;
export let JOXPlayDetailDispatchArchive;
export let JOXPlayDetailDispatchUnarchive;
export let JOXPlayDetailDispatchUpdate;
export let JOXPlayDetailDispatchDiscard;
export let _DebugLauncher = false;

export const modPublic = {

	JOXPlayDetailRecipes () {
		return mod.DataPlayDetailRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	// DATA

	DataPlayDetailRecipes () {
		const outputData = [];

		if (!JOXPlayDetailItem.JOXDocumentIsArchived) {
			outputData.push({
				LCHRecipeSignature: 'JOXPlayDetailLauncherItemArchive',
				LCHRecipeName: OLSKLocalized('JOXPlayDetailToolbarArchiveButtonText'),
				LCHRecipeCallback: function JOXPlayDetailLauncherItemArchive () {
					JOXPlayDetailDispatchArchive()
				},
			})
		}

		if (JOXPlayDetailItem.JOXDocumentIsArchived) {
			outputData.push({
				LCHRecipeSignature: 'JOXPlayDetailLauncherItemUnarchive',
				LCHRecipeName: OLSKLocalized('JOXPlayDetailToolbarUnarchiveButtonText'),
				LCHRecipeCallback: function JOXPlayDetailLauncherItemUnarchive () {
					JOXPlayDetailDispatchUnarchive()
				},
			})
		}

		if (OLSK_SPEC_UI()) {
			outputData.push({
				LCHRecipeName: 'JOXPlayDetailLauncherFakeItemProxy',
				LCHRecipeCallback: function JOXPlayDetailLauncherFakeItemProxy () {},
			});
		}

		return outputData;
	},

};
import OLSKUIAssets from 'OLSKUIAssets';
</script>

<div class="JOXPlayDetail">

<header class="JOXPlayDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader OLSKCommonEdgeBottom">
	<div class="OLSKToolbarElementGroup">
		<button class="JOXPlayDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile" title={ OLSKLocalized('JOXPlayDetailToolbarBackButtonText') } on:click={ JOXPlayDetailDispatchBack }>
			<div class="JOXPlayDetailToolbarBackButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		{#if !JOXPlayDetailItem.JOXDocumentIsArchived }
			<button class="JOXPlayDetailToolbarArchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JOXPlayDetailToolbarArchiveButtonText') } on:click={ JOXPlayDetailDispatchArchive }>
				<div class="JOXPlayDetailToolbarArchiveButtonImage"></div>
			</button>
		{/if}

		{#if JOXPlayDetailItem.JOXDocumentIsArchived }
			<button class="JOXPlayDetailToolbarUnarchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JOXPlayDetailToolbarUnarchiveButtonText') } on:click={ JOXPlayDetailDispatchUnarchive }>
				<div class="JOXPlayDetailToolbarUnarchiveButtonImage"></div>
			</button>
		{/if}

		<button class="JOXPlayDetailToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JOXPlayDetailToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('JOXPlayDetailDiscardConfirmText')) && JOXPlayDetailDispatchDiscard() }>
			<div class="JOXPlayDetailToolbarDiscardButtonImage">{@html OLSKUIAssets._OLSKSharedDiscard }</div>
		</button>
	</div>
</header>

</div>

<div>

<textarea class="JOXPlayDetailFormNotesField" placeholder="{ OLSKLocalized('JOXPlayDetailFormNotesFieldText') }" bind:value={ JOXPlayDetailItem.JOXDocumentNotes } on:input={ JOXPlayDetailDispatchUpdate }></textarea>

</div>

{#if _DebugLauncher && OLSK_SPEC_UI() }
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataPlayDetailRecipes() }) }></button>	
{/if}
