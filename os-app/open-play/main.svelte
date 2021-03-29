<script>
import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

import JOXDocument from '../_shared/JOXDocument/main.js';
import JOXSetting from '../_shared/JOXSetting/main.js';
import JOXTransport from '../_shared/JOXTransport/main.js';
import JOXPlayLogic from './ui-logic.js';
import OLSKThrottle from 'OLSKThrottle';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKObject from 'OLSKObject';
import OLSKServiceWorker from 'OLSKServiceWorker';
import RemoteStorage from 'remotestoragejs';
import OLSKString from 'OLSKString';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';
import zerodatawrap from 'zerodatawrap';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueFormIsVisible: false,
	_ValueFormData: '',

	_ValueRevealArchiveIsVisible: false,

	async ValueSetting (param1, param2) {
		await mod._ValueZDRWrap.App.JOXSetting.ZDRModelWriteObject({
			JOXSettingKey: param1,
			JOXSettingValue: param2,
		});

		mod._ValueSettingsAll[param1] = param2;
	},
	
	_ValueCloudToolbarHidden: true,

	_ValueSaveDocumentThrottleMap: {},

	_ValueSavePublishThrottleMap: {},

	_IsRunningDemo: false,

	// DATA

	DataSetting (inputData) {
		return mod._ValueSettingsAll[inputData];
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataWriteRecipes () {
		const outputData = [{
			LCHRecipeSignature: 'JOXPlayLauncherItemImportJSON',
			LCHRecipeName: OLSKLocalized('JOXPlayLauncherItemImportJSONText'),
			LCHRecipeCallback: async function JOXPlayLauncherItemImportJSON () {
				return mod.ControlDocumentsImportJSON(await this.api.LCHReadTextFile({
					accept: '.json',
				}));
			},
		}, {
			LCHRecipeSignature: 'JOXPlayLauncherItemExportJSON',
			LCHRecipeName: OLSKLocalized('JOXPlayLauncherItemExportJSONText'),
			LCHRecipeCallback: async function JOXPlayLauncherItemExportJSON () {
				return this.api.LCHSaveFile(await mod.DataExportJSON(), mod.DataExportJSONFilename());
			},
		}];

		if (OLSK_SPEC_UI()) {
			outputData.push(...[
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateDocument () {
						return mod.ZDRSchemaDispatchSyncCreateDocument(await mod._ValueZDRWrap.App.JOXDocument.JOXDocumentCreate(mod.FakeDocumentObjectValid('FakeZDRSchemaDispatchSyncCreateDocument')));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncUpdateDocument () {
						return mod.ZDRSchemaDispatchSyncUpdateDocument(await mod._ValueZDRWrap.App.JOXDocument.JOXDocumentUpdate(Object.assign(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.JOXDocumentNotes.match('FakeZDRSchemaDispatchSync');
						}).pop(), {
							JOXDocumentNotes: 'FakeZDRSchemaDispatchSyncUpdateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteDocument () {
						return mod.ZDRSchemaDispatchSyncDeleteDocument(await mod._ValueZDRWrap.App.JOXDocument.ZDRModelDeleteObject(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.JOXDocumentNotes.match('FakeZDRSchemaDispatchSync');
						}).pop()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncConflictDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncConflictDocument () {
						const item = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.JOXDocumentNotes.match('FakeZDRSchemaDispatchSyncConflictDocument');
						}).pop();
						
						return mod.ZDRSchemaDispatchSyncConflictDocument({
							origin: 'conflict',
							oldValue: JSON.parse(JSON.stringify(await mod._ValueZDRWrap.App.JOXDocument.JOXDocumentUpdate(Object.assign({}, item, {
								JOXDocumentNotes: item.JOXDocumentNotes + '-local',
							})))),
							newValue: JSON.parse(JSON.stringify(Object.assign({}, item, {
								JOXDocumentNotes: item.JOXDocumentNotes + '-remote',
							}))),
						});
					},
				}, {
					LCHRecipeName: 'JOXPlayLauncherItemDebug_PromptFakeImportSerialized',
					LCHRecipeCallback: function JOXPlayLauncherItemDebug_PromptFakeImportSerialized () {
						return mod.ControlDocumentsImportJSON(window.prompt());
					},
				}, {
					LCHRecipeName: 'JOXPlayLauncherItemDebug_AlertFakeExportSerialized',
					LCHRecipeCallback: async function JOXPlayLauncherItemDebug_AlertFakeExportSerialized () {
						return window.alert(JSON.stringify({
							OLSKDownloadName: mod.DataExportJSONFilename(),
							OLSKDownloadData: await mod.DataExportJSON(),
						}));
					},
				},
			]);
		}

		outputData.push(...zerodatawrap.ZDRRecipes({
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage()) {
			outputData.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
				ParamWindow: window,
				ParamStorage: mod._ValueZDRWrap.ZDRStorageClient(),
				OLSKLocalized: OLSKLocalized,
				ParamMod: mod,
				ParamSpecUI: OLSK_SPEC_UI(),
			}));
		}

		outputData.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		if (mod._JOXPlayDetail) {
			outputData.push(...mod._JOXPlayDetail.modPublic.JOXPlayDetailRecipes());
		}

		if (mod._ValueRevealArchiveIsVisible) {
			outputData.push({
				LCHRecipeSignature: 'JOXPlayLauncherItemRevealArchive',
				LCHRecipeName: OLSKLocalized('JOXPlayRevealArchiveButtonText'),
				LCHRecipeCallback: function JOXPlayLauncherItemRevealArchive () {
					mod.ControlRevealArchive();
				},
			});
		}

		return outputData;
	},

	async DataExportJSON () {
		return JSON.stringify(mod._ValueZDRWrap.App.JOXTransport.JOXTransportExport({
			JOXDocument: mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll(),
			JOXSetting: await mod._ValueZDRWrap.App.JOXSetting.JOXSettingList(),
		}));
	},

	DataExportBasename () {
		return `${ window.location.hostname }-${ Date.now() }`;
	},

	DataExportJSONFilename () {
		return `${ mod.DataExportBasename() }.json`;
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	FakeDocumentObjectValid(inputData) {
		return {
			JOXDocumentNotes: inputData || '',
		};
	},

	// INTERFACE

	InterfaceAddButtonDidClick () {
		mod._ValueFormIsVisible = !mod._ValueFormIsVisible;
	},

	InterfaceFormSubmitButtonDidClick (event) {
		event.preventDefault();

		mod._ValueFormData.split('\n').map(mod.ControlDocumentAdd);

		mod._ValueFormIsVisible = false;
		mod._ValueFormData = '';
	},

	InterfaceWindowDidKeydown (event) {
		if (window.Launchlet.LCHSingletonExists()) {
			return;
		}

		const handlerFunctions = {};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	ControlDocumentSave(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSaveDocumentThrottleMap, inputData.JOXDocumentID, {
			OLSKThrottleDuration: 500,
			OLSKThrottleCallback () {
				mod._ValueZDRWrap.App.JOXDocument.JOXDocumentUpdate(inputData);
			},
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveDocumentThrottleMap[inputData.JOXDocumentID])	
		}
	},

	async ControlDocumentAdd (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(await mod._ValueZDRWrap.App.JOXDocument.JOXDocumentCreate({
			JOXDocumentNotes: inputData || '',
		}));
	},
	
	_ControlHotfixUpdateInPlace(inputData) {
		mod.ControlDocumentActivate(inputData);
		mod._JOXPlayDetail.modPublic._JOXPlayDetailTriggerUpdate();
	},
	
	ControlDocumentActivate(inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		if (!inputData) {
			return;
		}

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();

		if (mod.DataIsMobile()) {
			return;
		}
	},

	ControlDocumentArchive (inputData) {
		inputData.JOXDocumentIsArchived = true;

		mod.ControlDocumentSave(inputData);

		mod.ControlDocumentActivate(inputData); // #purge-svelte-force-update
	},
	
	ControlDocumentUnarchive (inputData) {
		delete inputData.JOXDocumentIsArchived;

		mod.ControlDocumentSave(inputData);

		mod.ControlDocumentActivate(inputData); // #purge-svelte-force-update
	},
	
	ControlDocumentDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);

		mod._ValueZDRWrap.App.JOXDocument.ZDRModelDeleteObject(inputData);
	},

	ControlRevealArchive () {
		mod._ValueRevealArchiveIsVisible = false;
	},

	async ControlDocumentsImportJSON (inputData) {
		if (!inputData.trim()) {
			return window.alert(OLSKLocalized('JOXPlayLauncherItemImportJSONErrorNotFilledAlertText'))
		}

		try {
			await mod._ValueZDRWrap.App.JOXTransport.JOXTransportImport(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(inputData)));
			await mod.SetupCatalog();
		} catch (e) {
			window.alert(OLSKLocalized('JOXPlayLauncherItemImportJSONErrorNotValidAlertText'));
		}
	},

	// MESSAGE

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.JOXDocumentID;
	},

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlDocumentActivate(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchArchivedHide () {
		mod._ValueRevealArchiveIsVisible = true;
	},

	OLSKCatalogDispatchArchivedShow () {
		mod._ValueRevealArchiveIsVisible = false;
	},

	OLSKCatalogDispatchQuantity () {},

	OLSKAppToolbarDispatchApropos () {
		mod._OLSKModalView.modPublic.OLSKModalViewShow();
	},

	OLSKAppToolbarDispatchTongue () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		// #hotfix launchlet show all items
		let selected;

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: OLSKLanguageSwitcher.OLSKLanguageSwitcherRecipes({
				ParamLanguageCodes: window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable'),
				ParamCurrentLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
				ParamSpecUI: OLSK_SPEC_UI(),
				ParamWindow: window,
				ParamRouteConstant: window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'),
				OLSKCanonical: window.OLSKCanonical,
			}).map(function (e) {
				const item = e.LCHRecipeCallback;

				return Object.assign(e, {
					LCHRecipeCallback () {
						selected = item;
					},
				})
			}),
			LCHOptionCompletionHandler () {
			  selected && selected();
			},
			LCHOptionMode: Launchlet.LCHModePreview,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	OLSKAppToolbarDispatchCloud () {
		mod._ValueCloudToolbarHidden = !mod._ValueCloudToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataWriteRecipes(),
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	JOXPlayDetailDispatchBack () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
	},

	JOXPlayDetailDispatchArchive () {
		mod.ControlDocumentArchive(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	JOXPlayDetailDispatchUnarchive () {
		mod.ControlDocumentUnarchive(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	JOXPlayDetailDispatchUpdate () {
		mod.ControlDocumentSave(mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()));
	},

	JOXPlayDetailDispatchDiscard () {
		mod.ControlDocumentDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	ZDRSchemaDispatchSyncCreateDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(inputData);
	},

	ZDRSchemaDispatchSyncUpdateDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
		
		if (!OLSK_SPEC_UI() && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected() && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected().JOXDocumentID === inputData.JOXDocumentID) {
			mod._ControlHotfixUpdateInPlace(inputData);
		}
	},

	ZDRSchemaDispatchSyncDeleteDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
	},

	ZDRSchemaDispatchSyncConflictDocument (inputData) {
		return setTimeout(async function () {
			mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(await mod._ValueZDRWrap.App.JOXDocument.JOXDocumentUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData))))
		}, OLSK_SPEC_UI() ? 0 : 500);
	},

	OLSKCloudDispatchRenew () {
		mod._ValueZDRWrap.ZDRCloudReconnect(mod._ValueCloudIdentity);
	},

	OLSKCloudStatusDispatchDisconnect () {
		mod._ValueZDRWrap.ZDRCloudDisconnect();

		mod._ValueCloudIdentity = null;

		zerodatawrap.ZDRPreferenceProtocolClear();
	},

	ZDRParamDispatchError (error) {
		mod._ValueCloudErrorText = error.toString();
	},

	ZDRParamDispatchConnected (identity, token) {
		mod._ValueCloudIdentity = identity;
		mod._ValueCloudToken = token;
	},

	ZDRParamDispatchOnline () {
		mod._ValueCloudIsOffline = false;
	},

	ZDRParamDispatchOffline () {
		mod._ValueCloudIsOffline = true;
	},

	ZDRParamDispatchSyncDidStart () {
		mod._ValueIsSyncing = true;
	},

	ZDRParamDispatchSyncDidStop () {
		mod._ValueIsSyncing = false;
	},

	OLSKCloudStatusDispatchSyncStart () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().startSync();

		mod.ZDRParamDispatchSyncDidStart();
	},

	OLSKCloudStatusDispatchSyncStop () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().stopSync();
	},

	// REACT

	ReactIsLoading (inputData) {
		if (inputData) {
			return;
		}

		if (mod.DataIsMobile()) {
			return;
		}

		setTimeout(function () {
			document.querySelector('.OLSKMasterListFilterField').focus();
		})
	},

	// SETUP

	async SetupEverything () {
		await mod.SetupStorageClient();

		await mod.SetupCatalog();
		
		await mod.SetupValueSettingsAll();

		mod.ReactIsLoading(mod._ValueIsLoading = false);
	},

	DataStorageClient (inputData) {
		return zerodatawrap.ZDRWrap({
			ZDRParamLibrary: (function() {
				if (inputData === zerodatawrap.ZDRProtocolFission()) {
					return webnative;
				}

				return RemoteStorage;
			})(),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'joybox',
				ZDRScopeCreatorDirectory: 'rCreativ',
				ZDRScopeSchemas: [
					Object.assign(JOXDocument, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateDocument,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateDocument,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteDocument,
						ZDRSchemaDispatchSyncConflict: mod.ZDRSchemaDispatchSyncConflictDocument,
					}),
					JOXSetting,
					JOXTransport,
					],
			}],
			ZDRParamDispatchError: mod.ZDRParamDispatchError,
			ZDRParamDispatchConnected: mod.ZDRParamDispatchConnected,
			ZDRParamDispatchOnline: mod.ZDRParamDispatchOnline,
			ZDRParamDispatchOffline: mod.ZDRParamDispatchOffline,
			_ZDRParamDispatchJSONPreStringify: OLSKObject.OLSKObjectSafeCopy,
			_ZDRParamDispatchJSONPostParse: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse,
		})
	},

	async SetupStorageClient() {
		mod._ValueZDRWrap = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocol(zerodatawrap.ZDRProtocolRemoteStorage()));
	},

	async SetupCatalog() {
		if (zerodatawrap.ZDRPreferenceProtocolMigrate()) {
			const client = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocolMigrate());

			await Promise.all((await client.App.ZDRStoragePathsRecursive('/')).map(async function (e) {
				await mod._ValueZDRWrap.App.ZDRStorageWriteObject(e, await client.App.ZDRStorageReadObject(e));
				await client.App.ZDRStorageDeleteFile(e);
			}));

			zerodatawrap.ZDRPreferenceProtocolMigrateClear();

			client.ZDRCloudDisconnect();
		};

		if (!(await mod._ValueZDRWrap.App.JOXDocument.JOXDocumentList()).map(mod._OLSKCatalog.modPublic.OLSKCatalogInsert).length) {
			mod.OLSKCatalogDispatchQuantity(0);
		}
	},

	async SetupValueSettingsAll() {
		mod._ValueSettingsAll = Object.fromEntries((await mod._ValueZDRWrap.App.JOXSetting.JOXSettingList()).map(function (e) {
			return [e.JOXSettingKey, e.JOXSettingValue];
		}));
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKCatalog from 'OLSKCatalog';
import JOXPlayListItem from '../sub-listing/main.svelte';
import JOXPlayDetail from '../sub-detail/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../../node_modules/OLSKServiceWorker/main.svelte';
import OLSKInstall from 'OLSKInstall';
import OLSKCloud from 'OLSKCloud';
import OLSKWebView from 'OLSKWebView';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
import OLSKUIAssets from 'OLSKUIAssets';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="JOXPlay OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading } class:OLSKIsDemoing={ mod._IsRunningDemo }>

<div class="OLSKViewportContent">

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKMasterListItemAccessibilitySummaryFunction={ JOXPlayLogic.JOXPlayAccessibilitySummary }

	_OLSKCatalogArchiveField={ 'JOXDocumentIsArchived' }
	
	OLSKCatalogSortFunction={ JOXPlayLogic.JOXPlaySortFunction }
	OLSKCatalogIsMatch={ JOXPlayLogic.JOXPlayIsMatch }
	OLSKCatalogExactSortFunction={ JOXPlayLogic.JOXPlayExactSortFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }
	OLSKCatalogDispatchArchivedHide={ mod.OLSKCatalogDispatchArchivedHide }
	OLSKCatalogDispatchArchivedShow={ mod.OLSKCatalogDispatchArchivedShow }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }

	let:OLSKResultsListItem
	>

	<!-- MASTER -->

	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarTail">
		<button class="JOXPlayToggleFormButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JOXPlayToggleFormButtonText') } on:click={ mod.InterfaceAddButtonDidClick } accesskey="n">
			<div class="JOXPlayToggleFormButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- MASTER BODY HEAD -->

	{#if mod._ValueFormIsVisible }
		<div class="JOXPlayForm OLSKDecor OLSKDecorBigForm OLSKCommonEdgeBottom">
			<p>
				<textarea class="JOXPlayFormField" placeholder={ OLSKLocalized('JOXPlayFormFieldText') } bind:value={ mod._ValueFormData } autofocus></textarea>
			</p>
			<p>
				<button class="JOXPlayFormSubmitButton" on:click={ mod.InterfaceFormSubmitButtonDidClick }>{ OLSKLocalized('JOXPlayFormSubmitButtonText') }</button>
			</p>
		</div>
	{/if}

	<!-- MASTER LIST ITEM -->

	<div slot="OLSKMasterListItem">
		<JOXPlayListItem JOXPlayListItemObject={ OLSKResultsListItem } />
	</div>

	<!-- MASTER BODY TAIL -->

	<div class="OLSKMasterListBodyTail" slot="OLSKMasterListBodyTail">{#if mod._ValueRevealArchiveIsVisible }
		<button class="JOXPlayRevealArchiveButton OLSKDecorPress" on:click={ mod._OLSKCatalog.modPublic.OLSKCatalogRevealArchive }>{ OLSKLocalized('JOXPlayRevealArchiveButtonText') }</button>
	{/if}</div>

	<!-- DETAIL -->
	
	<div class="JOXPlayDetailContainer" slot="OLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
		<JOXPlayDetail
			JOXPlayDetailItem={ OLSKCatalogItemSelected }
			JOXPlayDetailDispatchBack={ mod.JOXPlayDetailDispatchBack }
			JOXPlayDetailDispatchArchive={ mod.JOXPlayDetailDispatchArchive }
			JOXPlayDetailDispatchUnarchive={ mod.JOXPlayDetailDispatchUnarchive }
			JOXPlayDetailDispatchUpdate={ mod.JOXPlayDetailDispatchUpdate }
			JOXPlayDetailDispatchDiscard={ mod.JOXPlayDetailDispatchDiscard }
			bind:this={ mod._JOXPlayDetail }
			/>
	</div>

</OLSKCatalog>

</div>

<footer class="JOXPlayViewportFooter OLSKMobileViewFooter">

	{#if !mod._ValueCloudToolbarHidden }
		<div class="JOXPlayCloudToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop">
			<div class="OLSKToolbarElementGroup">
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKCloud
					OLSKCloudErrorText={ mod._ValueCloudErrorText }
					OLSKCloudDispatchRenew={ mod.OLSKCloudDispatchRenew }
					OLSKCloudFormDispatchSubmit={ mod.OLSKCloudFormDispatchSubmit }
					OLSKCloudStatusIdentityText={ mod._ValueCloudIdentity }
					OLSKCloudStatusIsSyncing={ mod._ValueIsSyncing }
					OLSKCloudStatusDispatchSyncStart={ mod.OLSKCloudStatusDispatchSyncStart }
					OLSKCloudStatusDispatchSyncStop={ mod.OLSKCloudStatusDispatchSyncStop }
					OLSKCloudStatusDispatchDisconnect={ mod.OLSKCloudStatusDispatchDisconnect }
					/>
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
		OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
		OLSKAppToolbarGuideURL={ window.OLSKCanonical('JOXGuideRoute') }
		OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
		OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
		OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
		OLSKAppToolbarDispatchCloud={ mod.OLSKAppToolbarDispatchCloud }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

	<OLSKInstall />

	{#if !OLSK_SPEC_UI()}
		<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('JOXServiceWorkerRoute') } />
	{/if}
</footer>

</div>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'RP_X' + (mod._ValueFundClue ? '+' + mod._ValueFundClue : ''))) }')` }
		/>
</OLSKModalView>

<style>
.JOXPlayForm {
	font-size: unset;
}

.JOXPlayForm p:last-child {
	margin-bottom: 0;
}
</style>
